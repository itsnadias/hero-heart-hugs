import { useEffect, useState } from "react";
import { CHARACTERS, POINTS, type Level } from "@/lib/adventure-types";
import { useAppState } from "@/lib/app-state";
import { ActivityPlayer } from "./activity-player";
import { ConfettiPoppers } from "./confetti-poppers";
import { cn } from "@/lib/utils";
import { pickIllustration } from "@/lib/card-illustrations";


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
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!showConfetti) return;
    const id = setTimeout(() => {
      onComplete(earned + POINTS.level);
    }, 1600);
    return () => clearTimeout(id);
  }, [showConfetti, earned, onComplete]);

  const bubbles: Record<string, string> = {
    sunny: "bg-sunny/20 border-sunny",
    sky: "bg-sky/20 border-sky",
    leaf: "bg-leaf/20 border-leaf",
    mango: "bg-mango/20 border-mango",
    grape: "bg-grape/20 border-grape",
  };
  const bubble = bubbles[buddy.colorClass] ?? "bg-muted border-border";

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
            {(() => {
              const art = pickIllustration(
                level.cards[cardIndex]!.title,
                level.cards[cardIndex]!.body,
                level.title,
              );
              return art ? (
                <img
                  src={art.src}
                  alt={art.alt}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="mt-3 w-full rounded-2xl border-3 border-border bg-card object-cover"
                />
              ) : null;
            })()}
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
                if (settings.reduceMotion) {
                  onComplete(total2 + POINTS.level);
                } else {
                  setShowConfetti(true);
                }
              }
            }}
          />
        </div>
      )}

      {showConfetti && (
        <ConfettiPoppers
          active={showConfetti}
          onDone={() => onComplete(earned + POINTS.level)}
        />
      )}

      {level.askTeam && (
        <p className="mt-6 rounded-3xl border-3 border-dashed border-border bg-card p-4 text-base">
          💬 <strong>Ask your team:</strong> “{level.askTeam}”
        </p>
      )}
    </section>
  );
}
