import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TOPICS } from "@/lib/topics";
import { CHARACTERS, CHARACTER_ORDER, SAFETY_LINE } from "@/lib/adventure-types";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brave Buddies — Kid-Friendly Cancer Learning Adventures" },
      {
        name: "description",
        content:
          "A playful, hopeful learning game where children explore cancer topics with animal buddies, five levels, points and a fun gift.",
      },
      { property: "og:title", content: "Brave Buddies — Kid-Friendly Cancer Learning Adventures" },
      {
        property: "og:description",
        content:
          "Pick a topic, meet five animal buddies, learn about your body and your care team, and earn a surprise gift.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { progress, settings, setSetting, hydrated } = useAppState();

  const go = (topic: string) => {
    if (!topic.trim()) return;
    navigate({ to: "/adventure", search: { topic: topic.trim() } });
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <header className="text-center">
        <div className="flex justify-center gap-2 text-5xl sm:text-6xl" aria-hidden>
          {CHARACTER_ORDER.map((k, i) => (
            <span key={k} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
              {CHARACTERS[k].emoji}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-4xl sm:text-5xl">Brave Buddies</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-balance-pretty">
          Learn about your body with five animal friends. Play 5 levels, collect points, and unlock a
          surprise gift at the end. 🌈
        </p>
      </header>

      <section className="card-playful mt-8 p-6 sm:p-8">
        <h2 className="text-2xl">What would you like to learn about?</h2>
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            go(query);
          }}
        >
          <label className="sr-only" htmlFor="topic">
            Topic
          </label>
          <input
            id="topic"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a topic, like leukemia"
            className="flex-1 rounded-full border-3 border-border bg-card px-6 py-4 text-lg outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-pop transition-transform hover:scale-105 active:scale-95"
          >
            Start adventure →
          </button>
        </form>

        <p className="mt-6 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Or tap a world
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={() => go(t.id)}
              className="rounded-3xl border-3 border-border bg-card p-4 text-left transition-transform hover:scale-[1.03] active:scale-95"
            >
              <div className="text-3xl" aria-hidden>
                {t.emoji}
              </div>
              <div className="mt-1 text-lg font-bold">{t.worldName}</div>
              <div className="text-sm font-semibold text-muted-foreground">{t.name}</div>
              <p className="mt-1 text-sm">{t.kidBlurb}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="card-playful mt-6 p-6 sm:p-8">
        <h2 className="text-2xl">Meet your buddies</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHARACTER_ORDER.map((k) => {
            const c = CHARACTERS[k];
            return (
              <div key={k} className="rounded-3xl border-3 border-border bg-muted/50 p-4">
                <div className="text-3xl" aria-hidden>
                  {c.emoji}
                </div>
                <div className="text-lg font-bold">{c.name}</div>
                <p className="text-sm">{c.personality}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Level: {c.levelTitle}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {hydrated && progress.length > 0 && (
        <section className="card-playful mt-6 p-6 sm:p-8">
          <h2 className="text-2xl">Your adventures 🏅</h2>
          <ul className="mt-3 grid gap-2">
            {progress.map((p) => (
              <li
                key={p.topicId}
                className="flex flex-wrap items-center justify-between gap-2 rounded-3xl border-3 border-border bg-card px-4 py-3"
              >
                <span className="font-bold">{p.topicName}</span>
                <span className="text-sm font-semibold text-muted-foreground">
                  {p.levelsDone}/{p.totalLevels} levels · {p.points} points {p.gift ? `· ${p.gift}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="card-playful mt-6 p-6 sm:p-8">
        <h2 className="text-2xl">Comfort settings</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(
            [
              ["sound", "🔊 Sounds & voice"],
              ["captions", "💬 Captions"],
              ["bigText", "🔠 Bigger text"],
              ["reduceMotion", "🌙 Calm mode (less motion)"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSetting(key, !settings[key])}
              aria-pressed={settings[key]}
              className={`rounded-3xl border-3 px-4 py-3 text-left text-lg font-bold ${
                settings[key] ? "border-leaf bg-leaf/20" : "border-border bg-card"
              }`}
            >
              {label} — {settings[key] ? "On" : "Off"}
            </button>
          ))}
        </div>
      </section>

      <footer className="mt-8 text-center">
        <Link to="/grown-ups" className="text-lg font-bold underline">
          👩‍👧 For grown-ups & care teams
        </Link>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">{SAFETY_LINE}</p>
      </footer>
    </main>
  );
}
