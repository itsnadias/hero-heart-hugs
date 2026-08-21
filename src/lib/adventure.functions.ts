import { createServerFn } from "@tanstack/react-start";
import type { Adventure } from "./adventure-types";
import { findTopic, TOPICS } from "./topics";
import { SAMPLE_ADVENTURE } from "./sample-adventure";

export type AdventureResponse =
  | { status: "ok"; adventure: Adventure }
  | { status: "unknown-topic"; message: string; suggestions: { id: string; name: string }[] }
  | { status: "error"; message: string };

export const getAdventure = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const q = (data as { query?: unknown })?.query;
    if (typeof q !== "string" || !q.trim()) throw new Error("Please tell us a topic to explore.");
    return { query: q.trim().slice(0, 80) };
  })
  .handler(async ({ data }): Promise<AdventureResponse> => {
    const topic = findTopic(data.query);
    if (!topic) {
      return {
        status: "unknown-topic",
        message:
          "Hmm, I'm not sure about that one yet, and I never want to guess about health. Could you pick one of these, or check the spelling with a grown-up?",
        suggestions: TOPICS.map((t) => ({ id: t.id, name: t.name })),
      };
    }

    if (topic.id === SAMPLE_ADVENTURE.topicId) {
      return { status: "ok", adventure: SAMPLE_ADVENTURE };
    }

    const { generateAdventure } = await import("./adventure.server");
    const result = await generateAdventure(topic);
    if (!result.ok) {
      return {
        status: "error",
        message: `${result.message} You can try again, or explore Leukemia in Bloodstream Bay while we fix things.`,
      };
    }

    return {
      status: "ok",
      adventure: {
        ...result.adventure,
        topicId: topic.id,
        topicName: topic.name,
        generated: true,
      },
    };
  });
