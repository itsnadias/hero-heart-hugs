import { useState } from "react";
import { CHARACTERS, POINTS, type Level } from "@/lib/adventure-types";
import { useAppState } from "@/lib/app-state";
import { ActivityPlayer } from "./activity-player";
import { cn } from "@/lib/utils";

export function LevelView({
  level,
  index,
  total,
  onComplete,
}: {
  level: Level;
  index: number;
  total: number;
  onComplete: (points: number) => void;
}) {
  const buddy = CHARACTERS[level.character];
  const { speak, settings, playSound } = useAppState();
  const [stage, setStage] = useState<"intro" | "cards" | "activities">("intro");
  const [cardIndex, setCardIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [earned, setEarned] = useState(0);

  const bubble = `bg-${buddy.colorClass}/20 border-${buddy.colorClass}`;

  return (
    <section className="card-playful mx-auto w-full max-w-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="text-5xl animate-bob" aria-hidden>
          {buddy.emoji}
        </span>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Level {index + 1} of {total}
          </p>
          <h2 className="text-2xl sm:text-3xl">{level.title}</h2>
          <p className="text-sm font-semibold text-muted-foreground">with {buddy.name}</p>
        </div>
      </div>

      {stage === "intro" && (
        <div className="mt-6 animate-pop-in">
          <div className={cn("rounded-3xl border-3 p-5 text-lg", bubble)}>
            {settings.captions ? level.intro : level.intro}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => speak(level.intro)}
              className="rounded-full border-3 border-border bg-card px-5 py-3 font-bold"
            >
              🔊 Read to me
            </button>
            <button
              onClick={() => {
                playSound("tap");
                setStage("cards");
              }}
              className="rounded-full bg-primary px-7 py-3 text-lg font-bold text-primary-foreground shadow-pop transition-transform hover:scale-105 active:scale-95"
            >
              Let's go! →
            </button>
          </div>
        </div>
      )}

      {stage === "cards" && (
        <div className="mt-6 animate-pop-in">
          <div className="rounded-3xl border-3 border-border bg-muted/60 p-6">
            <div className="text-5xl" aria-hidden>
              {level.cards[cardIndex]!.emoji}
            </div>
            <h3 className="mt-2 text-2xl">{level.cards[cardIndex]!.title}</h3>
            <p className="mt-2 text-lg">{level.cards[cardIndex]!.body}</p>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => speak(level.cards[cardIndex]!.body)}
              className="rounded-full border-3 border-border bg-card px-5 py-3 font-bold"
            >
              🔊 Read to me
            </button>
            <button
              onClick={() => {
                playSound("tap");
                if (cardIndex + 1 < level.cards.length) setCardIndex(cardIndex + 1);
                else setStage("activities");
              }}
              className="rounded-full bg-primary px-7 py-3 text-lg font-bold text-primary-foreground shadow-pop transition-transform hover:scale-105 active:scale-95"
            >
              {cardIndex + 1 < level.cards.length ? "Next fact →" : "Play the game →"}
            </button>
            <span className="text-sm font-bold text-muted-foreground">
              Fact {cardIndex + 1} / {level.cards.length}
            </span>
          </div>
        </div>
      )}

      {stage === "activities" && (
        <div className="mt-6 animate-pop-in">
          <ActivityPlayer
            key={activityIndex}
            activity={level.activities[activityIndex]!}
            onDone={(pts) => {
              const total2 = earned + pts;
              setEarned(total2);
              if (activityIndex + 1 < level.activities.length) {
                setActivityIndex(activityIndex + 1);
              } else {
                playSound("celebrate");
                onComplete(total2 + POINTS.level);
              }
            }}
          />
        </div>
      )}

      {level.askTeam && (
        <p className="mt-6 rounded-3xl border-3 border-dashed border-border bg-card p-4 text-base">
          💬 <strong>Ask your team:</strong> “{level.askTeam}”
        </p>
      )}
    </section>
  );
}
