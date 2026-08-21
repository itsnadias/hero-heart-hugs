import type { Adventure } from "./adventure-types";
import { APPROVED_SOURCE_DOMAINS, type TopicSeed } from "./topics";

const MODEL = "google/gemini-3.7-flash";
const ENDPOINT = "https://ai.gateway.lovable.dev/v1/chat/completions";

function systemPrompt(topic: TopicSeed) {
  return `You write medically careful, joyful educational content for children aged 7-12 who may have cancer or know someone who does.

TOPIC: ${topic.name} (${topic.kidBlurb})
APPROVED SOURCES (ground everything in what these organisations publish; only cite URLs on these domains: ${APPROVED_SOURCE_DOMAINS.join(", ")}):
${topic.sources.map((s) => `- ${s.organization}: ${s.title} (${s.url})`).join("\n")}

HARD SAFETY RULES:
- Never diagnose, never tell the child what treatment they need, never mention prognosis, survival rates, statistics or death.
- Never say or imply any food, activity, supplement or behaviour can cure or fight cancer. Habits support general wellbeing only.
- Always point personal medical questions to the child's grown-ups and healthcare team.
- Use warm, simple, concrete language (short sentences, grade 3-5 reading level). No frightening or graphic descriptions.
- Only state facts that the approved sources support. If unsure, leave it out.
- Reassure: cancer is not the child's fault and is not contagious.

Write in the voices of: Leo the Lion (warm, brave), Pia the Panda (curious), Daisy the Dolphin (caring), Finn the Fox (chatty helper), Toby the Turtle (calm cheerleader).

Return STRICT JSON only, no markdown, matching this shape:
{
 "worldName": string, "worldEmoji": string, "welcome": string, "bigIdea": string,
 "levels": [ { "character": "leo"|"pia"|"daisy"|"finn"|"toby", "title": string, "intro": string,
    "cards": [{"emoji": string, "title": string, "body": string}],
    "activities": [
      {"type":"mcq","prompt":string,"options":[string,string,string],"answerIndex":number,"explanation":string} |
      {"type":"truefalse","statement":string,"answer":boolean,"explanation":string} |
      {"type":"match","prompt":string,"pairs":[{"left":string,"right":string}]} |
      {"type":"habit","prompt":string,"options":[{"label":string,"emoji":string,"helpful":boolean,"note":string}]} |
      {"type":"bodymap","prompt":string,"spots":[{"label":string,"emoji":string,"highlight":boolean,"note":string}]}
    ],
    "askTeam": string } ],
 "askYourTeam": [string], "parentNotes": [string], "conversationStarters": [string], "flags": [string],
 "sources": [{"title":string,"organization":string,"url":string}]
}
Rules for structure: exactly 5 levels in the order leo, pia, daisy, finn, toby. Level 1 must include one "bodymap" activity using body areas such as ${topic.bodyAreas.join(", ")}. Each level has 2-4 activities and 2-4 cards.`;
}

type GatewayResult =
  | { ok: true; adventure: Omit<Adventure, "topicId" | "topicName" | "generated"> }
  | { ok: false; status: number; message: string };

export async function generateAdventure(topic: TopicSeed): Promise<GatewayResult> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return { ok: false, status: 401, message: "AI is not configured yet." };

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: MODEL,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt(topic) },
          {
            role: "user",
            content: `Create the json learning adventure about ${topic.name} for a child. Keep it hopeful and playful.`,
          },
        ],
      }),
    });
  } catch {
    return { ok: false, status: 503, message: "We couldn't reach our story helper." };
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const message =
      res.status === 429
        ? "Lots of friends are learning right now. Please try again in a moment."
        : res.status === 402
          ? "The learning helper is out of credits. A grown-up can top up Lovable AI credits."
          : `Our story helper had trouble (${res.status}). ${text.slice(0, 140)}`;
    return { ok: false, status: res.status, message };
  }

  const json = (await res.json().catch(() => null)) as
    | { choices?: { message?: { content?: string } }[] }
    | null;
  const content = json?.choices?.[0]?.message?.content;
  if (!content) return { ok: false, status: 502, message: "We couldn't verify that information." };

  let parsed: unknown;
  try {
    parsed = JSON.parse(content.replace(/^```json\s*|```$/g, "").trim());
  } catch {
    return { ok: false, status: 502, message: "We couldn't verify that information." };
  }

  const safe = validate(parsed, topic);
  if (!safe) return { ok: false, status: 502, message: "We couldn't verify that information safely." };
  return { ok: true, adventure: safe };
}

const BANNED = [
  /\bcure[sd]?\b/i,
  /\bsurvival rate\b/i,
  /\bdie\b/i,
  /\bdeath\b/i,
  /\bdying\b/i,
  /\bterminal\b/i,
  /\bfatal\b/i,
  /% of children/i,
];

function validate(
  raw: unknown,
  topic: TopicSeed,
): Omit<Adventure, "topicId" | "topicName" | "generated"> | null {
  if (!raw || typeof raw !== "object") return null;
  const a = raw as Record<string, any>;
  if (!Array.isArray(a["levels"]) || a["levels"].length === 0 || a["levels"].length > 5) return null;

  const text = JSON.stringify(a);
  // Content safety pass: reject unsupported/frightening claims outright.
  for (const rx of BANNED) {
    if (rx.test(text) && !/cannot cure|not a cure|no food can cure|does not cure/i.test(text)) {
      return null;
    }
  }

  const sources = (Array.isArray(a["sources"]) ? a["sources"] : [])
    .filter(
      (s: any) =>
        s && typeof s.url === "string" && APPROVED_SOURCE_DOMAINS.some((d) => s.url.includes(d)),
    )
    .map((s: any) => ({
      title: String(s.title ?? "Trusted medical information"),
      organization: String(s.organization ?? "Trusted health organisation"),
      url: String(s.url),
    }));

  const levels = a["levels"]
    .map((lv: any) => ({
      character: ["leo", "pia", "daisy", "finn", "toby"].includes(lv?.character)
        ? lv.character
        : "leo",
      title: String(lv?.title ?? "Let's learn"),
      intro: String(lv?.intro ?? ""),
      cards: (Array.isArray(lv?.cards) ? lv.cards : [])
        .slice(0, 4)
        .map((c: any) => ({
          emoji: String(c?.emoji ?? "✨"),
          title: String(c?.title ?? ""),
          body: String(c?.body ?? ""),
        }))
        .filter((c: any) => c.body),
      activities: (Array.isArray(lv?.activities) ? lv.activities : [])
        .slice(0, 4)
        .filter((act: any) => isValidActivity(act)),
      askTeam: lv?.askTeam ? String(lv.askTeam) : undefined,
    }))
    .filter((lv: any) => lv.cards.length > 0 && lv.activities.length > 0);

  if (levels.length === 0) return null;

  return {
    worldName: String(a["worldName"] ?? topic.worldName),
    worldEmoji: String(a["worldEmoji"] ?? topic.emoji),
    welcome: String(a["welcome"] ?? `Welcome to ${topic.worldName}!`),
    bigIdea: String(a["bigIdea"] ?? topic.kidBlurb),
    levels,
    askYourTeam: strings(a["askYourTeam"], ["Can you explain that in kid language?"]),
    parentNotes: strings(a["parentNotes"], [topic.kidBlurb]),
    conversationStarters: strings(a["conversationStarters"], [
      "What did you learn today that surprised you?",
    ]),
    flags: strings(a["flags"], [
      "Personal treatment questions belong with the child's healthcare team.",
    ]),
    sources: sources.length ? sources : topic.sources,
  };
}

function strings(v: unknown, fallback: string[]): string[] {
  const arr = Array.isArray(v) ? v.filter((x) => typeof x === "string" && x.trim()) : [];
  return arr.length ? (arr as string[]).slice(0, 8) : fallback;
}

function isValidActivity(act: any): boolean {
  if (!act || typeof act !== "object") return false;
  switch (act.type) {
    case "mcq":
      return (
        Array.isArray(act.options) &&
        act.options.length >= 2 &&
        typeof act.answerIndex === "number" &&
        act.answerIndex >= 0 &&
        act.answerIndex < act.options.length
      );
    case "truefalse":
      return typeof act.answer === "boolean" && typeof act.statement === "string";
    case "match":
      return Array.isArray(act.pairs) && act.pairs.length >= 2;
    case "habit":
      return (
        Array.isArray(act.options) &&
        act.options.length >= 3 &&
        act.options.some((o: any) => o?.helpful === true)
      );
    case "bodymap":
      return Array.isArray(act.spots) && act.spots.length >= 3;
    default:
      return false;
  }
}
