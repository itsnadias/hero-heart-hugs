import { createFileRoute, Link } from "@tanstack/react-router";
import { SAFETY_LINE } from "@/lib/adventure-types";
import { SAMPLE_ADVENTURE } from "@/lib/sample-adventure";
import { APPROVED_SOURCE_DOMAINS } from "@/lib/topics";

export const Route = createFileRoute("/grown-ups")({
  head: () => ({
    meta: [
      { title: "For Grown-Ups & Care Teams — Brave Buddies" },
      {
        name: "description",
        content:
          "How Brave Buddies keeps children's cancer education safe: trusted sources, conversation starters, and what the app never does.",
      },
      { property: "og:title", content: "For Grown-Ups & Care Teams — Brave Buddies" },
      {
        property: "og:description",
        content: "Trusted sources, safety rules, and conversation starters for caregivers.",
      },
    ],
  }),
  component: GrownUps,
});

function GrownUps() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link to="/" className="font-bold underline">
        ← Back to the adventures
      </Link>
      <h1 className="mt-4 text-4xl">For grown-ups & care teams</h1>
      <p className="mt-3 text-lg text-balance-pretty">
        Brave Buddies explains childhood cancer topics in age-appropriate language, using content grounded
        in paediatric oncology patient-education material. It is a learning companion — never a substitute
        for the child's healthcare team.
      </p>

      <section className="card-playful mt-6 p-6">
        <h2 className="text-2xl">What the app never does</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>No diagnosis, prognosis, survival statistics, or treatment recommendations.</li>
          <li>No medicine names, doses, or schedules.</li>
          <li>No promises of outcomes — hope is framed as care, helpers and coping, not certainty.</li>
          <li>Unknown or unverifiable topics are declined rather than guessed at.</li>
        </ul>
      </section>

      <section className="card-playful mt-6 p-6">
        <h2 className="text-2xl">Clinical notes (sample topic)</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          {SAMPLE_ADVENTURE.parentNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <h3 className="mt-5 text-xl">Please discuss with the care team</h3>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          {SAMPLE_ADVENTURE.flags.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="card-playful mt-6 p-6">
        <h2 className="text-2xl">Conversation starters</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          {SAMPLE_ADVENTURE.conversationStarters.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="card-playful mt-6 p-6">
        <h2 className="text-2xl">Trusted sources</h2>
        <ul className="mt-3 space-y-2">
          {SAMPLE_ADVENTURE.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer" className="font-bold underline">
                {s.title}
              </a>
              <span className="block text-sm text-muted-foreground">{s.organization}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          AI-generated adventures are grounded only in these organisations: {APPROVED_SOURCE_DOMAINS.join(", ")}.
        </p>
      </section>

      <p className="mt-8 text-sm text-muted-foreground">{SAFETY_LINE}</p>
    </main>
  );
}
