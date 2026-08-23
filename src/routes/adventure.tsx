import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAdventure, type AdventureResponse } from "@/lib/adventure.functions";
import { POINTS, SAFETY_LINE, type Adventure } from "@/lib/adventure-types";
import { useAppState } from "@/lib/app-state";
import { LevelView } from "@/components/adventure/level-view";

const GIFTS = [
  { emoji: "🎨", name: "Rainbow Colouring Badge", note: "Colour a picture of your favourite buddy." },
  { emoji: "🦸", name: "Super Learner Cape", note: "You earned your cape by being curious." },
  { emoji: "🌟", name: "Star Explorer Sticker", note: "Stick this on your chart or your heart." },
  { emoji: "🎵", name: "Happy Dance Ticket", note: "Play your favourite song and wiggle!" },
];

export const Route = createFileRoute("/adventure")({
  validateSearch: (search: Record<string, unknown>) => ({
    topic: typeof search['topic'] === "string" ? (search['topic'] as string) : "leukemia",
  }),
  head: () => ({
    meta: [
      { title: "Play a Brave Buddies Adventure" },
      {
        name: "description",
        content:
          "Five levels with five animal buddies: learn about your body, your topic, self-care, your care team, and celebrate what you learned.",
      },
      { property: "og:title", content: "Play a Brave Buddies Adventure" },
      {
        property: "og:description",
        content: "A five-level learning game with points, kind feedback and a surprise gift.",
      },
    ],
  }),
  component: AdventurePage,
});

function AdventurePage() {
  const { topic } = Route.useSearch();
  const navigate = useNavigate();
  const fetchAdventure = useServerFn(getAdventure);
  const { saveProgress, playSound, speak } = useAppState();

  const [levelIndex, setLevelIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [finished, setFinished] = useState(false);

  const mutation = useMutation<AdventureResponse>({
    mutationFn: () => fetchAdventure({ data: { query: topic } }),
  });

  const run = mutation.mutate;
  useEffect(() => {
    setLevelIndex(0);
    setPoints(0);
    setFinished(false);
    run();
  }, [topic, run]);

  if (mutation.isPending || mutation.isIdle) {
    return (
      <Shell>
        <div className="card-playful p-8 text-center">
          <div className="text-6xl animate-float" aria-hidden>
            🦁
          </div>
          <h1 className="mt-4 text-3xl">Getting your adventure ready…</h1>
          <p className="mt-2 text-lg">Your buddies are packing snacks and facts.</p>
        </div>
      </Shell>
    );
  }

  const data = mutation.data;

  if (mutation.isError || !data || data.status === "error") {
    return (
      <Shell>
        <div className="card-playful p-8 text-center">
          <div className="text-6xl" aria-hidden>
            🐢
          </div>
          <h1 className="mt-4 text-3xl">Let's try that again</h1>
          <p className="mt-2 text-lg">
            {data && data.status === "error"
              ? data.message
              : "Something went wobbly on the way here. Nothing is broken with you!"}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => mutation.mutate()}
              className="rounded-full bg-primary px-7 py-3 text-lg font-bold text-primary-foreground shadow-pop"
            >
              Try again
            </button>
            <Link to="/" className="rounded-full border-3 border-border bg-card px-7 py-3 text-lg font-bold">
              Pick another world
            </Link>
          </div>
        </div>
      </Shell>
    );
  }

  if (data.status === "unknown-topic") {
    return (
      <Shell>
        <div className="card-playful p-8">
          <div className="text-6xl" aria-hidden>
            🦊
          </div>
          <h1 className="mt-4 text-3xl">I want to get this right</h1>
          <p className="mt-2 text-lg">{data.message}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {data.suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate({ to: "/adventure", search: { topic: s.id } })}
                className="rounded-3xl border-3 border-border bg-card px-5 py-4 text-left text-lg font-bold"
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </Shell>
    );
  }

  const adventure: Adventure = data.adventure;
  const totalLevels = adventure.levels.length;
  const gift = GIFTS[Math.abs(hash(adventure.topicId)) % GIFTS.length]!;

  if (finished) {
    return (
      <Shell>
        <div className="card-playful p-8 text-center">
          <div className="text-7xl animate-bob" aria-hidden>
            {gift.emoji}
          </div>
          <h1 className="mt-4 text-4xl">You did it! 🎉</h1>
          <p className="mt-2 text-xl font-bold">{points + POINTS.finish} points</p>
          <p className="mt-3 text-lg">
            Your gift: <strong>{gift.name}</strong> — {gift.note}
          </p>
          <div className="mt-6 rounded-3xl border-3 border-dashed border-border bg-card p-5 text-left">
            <h2 className="text-2xl">Questions you can ask your team</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              {adventure.askYourTeam.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/" className="rounded-full bg-primary px-7 py-3 text-lg font-bold text-primary-foreground shadow-pop">
              Explore another world
            </Link>
            <Link to="/grown-ups" className="rounded-full border-3 border-border bg-card px-7 py-3 text-lg font-bold">
              For grown-ups
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{SAFETY_LINE}</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl">
            {adventure.worldEmoji} {adventure.worldName}
          </h1>
          <p className="text-sm font-semibold text-muted-foreground">{adventure.topicName}</p>
        </div>
        <span className="rounded-full border-3 border-sunny bg-sunny/25 px-5 py-2 text-lg font-bold">
          ⭐ {points} points
        </span>
      </div>

      <div className="mb-4 flex gap-2" aria-label={`Level ${levelIndex + 1} of ${totalLevels}`}>
        {adventure.levels.map((_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-full ${i <= levelIndex ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>

      {levelIndex === 0 && (
        <p className="card-playful mb-4 p-5 text-lg">
          {adventure.welcome} <strong className="mt-2 block">{adventure.bigIdea}</strong>
        </p>
      )}

      <LevelView
        key={levelIndex}
        level={adventure.levels[levelIndex]!}
        index={levelIndex}
        total={totalLevels}
        onComplete={(pts) => {
          const next = points + pts;
          setPoints(next);
          const done = levelIndex + 1 >= totalLevels;
          saveProgress({
            topicId: adventure.topicId,
            topicName: adventure.topicName,
            points: done ? next + POINTS.finish : next,
            levelsDone: levelIndex + 1,
            totalLevels,
            ...(done
              ? { completedAt: new Date().toISOString(), gift: `${gift.emoji} ${gift.name}` }
              : {}),
          });
          if (done) {
            playSound("celebrate");
            speak("You did it! You are a brave buddy.");
            setFinished(true);
          } else {
            playSound("correct");
            setLevelIndex(levelIndex + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      />

      <p className="mt-6 text-center text-sm text-muted-foreground">{SAFETY_LINE}</p>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <Link to="/" className="mb-4 inline-block font-bold underline">
        ← Home
      </Link>
      {children}
    </main>
  );
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}
