import { useMemo, useState } from "react";
import type { Activity } from "@/lib/adventure-types";
import { POINTS } from "@/lib/adventure-types";
import { useAppState } from "@/lib/app-state";
import { cn } from "@/lib/utils";

type Props = {
  activity: Activity;
  onDone: (pointsEarned: number) => void;
};

function Feedback({ tone, children }: { tone: "good" | "gentle"; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "mt-4 animate-pop-in rounded-3xl border-3 p-4 text-base font-semibold",
        tone === "good"
          ? "border-leaf bg-leaf/15 text-leaf-foreground"
          : "border-sky bg-sky/15 text-sky-foreground",
      )}
    >
      {children}
    </div>
  );
}

function NextButton({ onClick, label = "Next" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 rounded-full bg-primary px-7 py-3 text-lg font-bold text-primary-foreground shadow-pop transition-transform hover:scale-105 active:scale-95"
    >
      {label} →
    </button>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j]!;
    copy[j] = temp;
  }
  return copy;
}

export function ActivityPlayer({ activity, onDone }: Props) {
  const { playSound, speak } = useAppState();
  const [picked, setPicked] = useState<number | null>(null);
  const [tfPick, setTfPick] = useState<boolean | null>(null);
  const [matched, setMatched] = useState<Record<number, number>>({});
  const [activeLeft, setActiveLeft] = useState<number | null>(null);
  const [tapped, setTapped] = useState<number[]>([]);

  const optionClass =
    "w-full rounded-3xl border-3 border-border bg-card px-5 py-4 text-left text-lg font-semibold transition-transform hover:scale-[1.02] active:scale-95";

  if (activity.type === "mcq") {
    const correct = picked === activity.answerIndex;
    return (
      <div>
        <h3 className="text-2xl">{activity.prompt}</h3>
        <div className="mt-4 grid gap-3">
          {activity.options.map((opt, i) => (
            <button
              key={opt}
              disabled={picked !== null}
              onClick={() => {
                setPicked(i);
                const ok = i === activity.answerIndex;
                playSound(ok ? "correct" : "gentle");
                speak(ok ? "Great job!" : "Good try! Let's look again.");
              }}
              className={cn(
                optionClass,
                picked !== null &&
                  i === activity.answerIndex &&
                  "border-leaf bg-leaf/20",
                picked === i && i !== activity.answerIndex && "border-mango bg-mango/20",
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        {picked !== null && (
          <>
            <Feedback tone={correct ? "good" : "gentle"}>
              {correct ? "🎉 Yes! " : "💛 Good try! "}
              {activity.explanation}
            </Feedback>
            <NextButton onClick={() => onDone(correct ? POINTS.correct + POINTS.activity : POINTS.activity)} />
          </>
        )}
      </div>
    );
  }

  if (activity.type === "truefalse") {
    const correct = tfPick === activity.answer;
    return (
      <div>
        <h3 className="text-2xl">True or false?</h3>
        <p className="mt-2 text-lg">{activity.statement}</p>
        <div className="mt-4 flex gap-3">
          {[true, false].map((v) => (
            <button
              key={String(v)}
              disabled={tfPick !== null}
              onClick={() => {
                setTfPick(v);
                playSound(v === activity.answer ? "correct" : "gentle");
              }}
              className={cn(
                optionClass,
                "flex-1 text-center",
                tfPick !== null && v === activity.answer && "border-leaf bg-leaf/20",
                tfPick === v && v !== activity.answer && "border-mango bg-mango/20",
              )}
            >
              {v ? "👍 True" : "👎 False"}
            </button>
          ))}
        </div>
        {tfPick !== null && (
          <>
            <Feedback tone={correct ? "good" : "gentle"}>
              {correct ? "🎉 Spot on! " : "💛 Nice thinking! "}
              {activity.explanation}
            </Feedback>
            <NextButton onClick={() => onDone(correct ? POINTS.correct + POINTS.activity : POINTS.activity)} />
          </>
        )}
      </div>
    );
  }

  if (activity.type === "match") {
    const rights = activity.pairs.map((p, i) => ({ text: p.right, i }));
    const allDone = Object.keys(matched).length === activity.pairs.length;
    return (
      <div>
        <h3 className="text-2xl">{activity.prompt}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="grid gap-3">
            {activity.pairs.map((p, i) => (
              <button
                key={p.left}
                disabled={matched[i] !== undefined}
                onClick={() => setActiveLeft(i)}
                className={cn(
                  optionClass,
                  activeLeft === i && "border-primary bg-primary/10",
                  matched[i] !== undefined && "border-leaf bg-leaf/20",
                )}
              >
                {p.left}
              </button>
            ))}
          </div>
          <div className="grid gap-3">
            {rights.map((r) => {
              const usedBy = Object.entries(matched).find(([, v]) => v === r.i);
              return (
                <button
                  key={r.text}
                  disabled={!!usedBy}
                  onClick={() => {
                    if (activeLeft === null) return;
                    if (activeLeft === r.i) {
                      setMatched((m) => ({ ...m, [activeLeft]: r.i }));
                      playSound("correct");
                    } else {
                      playSound("gentle");
                    }
                    setActiveLeft(null);
                  }}
                  className={cn(optionClass, usedBy && "border-leaf bg-leaf/20")}
                >
                  {r.text}
                </button>
              );
            })}
          </div>
        </div>
        {allDone && (
          <>
            <Feedback tone="good">🎉 All matched! You know your helpers.</Feedback>
            <NextButton onClick={() => onDone(POINTS.activity + POINTS.correct)} />
          </>
        )}
      </div>
    );
  }

  if (activity.type === "habit") {
    const helpfulCount = activity.options.filter((o) => o.helpful).length;
    const chosenHelpful = tapped.filter((i) => activity.options[i]!.helpful).length;
    return (
      <div>
        <h3 className="text-2xl">{activity.prompt}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {activity.options.map((o, i) => (
            <button
              key={o.label}
              onClick={() => {
                if (tapped.includes(i)) return;
                setTapped((t) => [...t, i]);
                playSound(o.helpful ? "correct" : "gentle");
              }}
              className={cn(
                optionClass,
                tapped.includes(i) && (o.helpful ? "border-leaf bg-leaf/20" : "border-sky bg-sky/15"),
              )}
            >
              <span className="mr-2 text-2xl">{o.emoji}</span>
              {o.label}
              {tapped.includes(i) && <span className="mt-1 block text-sm font-medium">{o.note}</span>}
            </button>
          ))}
        </div>
        {chosenHelpful >= helpfulCount && (
          <>
            <Feedback tone="good">🌟 You found all the kind choices!</Feedback>
            <NextButton onClick={() => onDone(POINTS.activity + POINTS.correct)} />
          </>
        )}
      </div>
    );
  }

  const highlights = activity.spots.filter((s) => s.highlight).length;
  const found = tapped.filter((i) => activity.spots[i]!.highlight).length;
  return (
    <div>
      <h3 className="text-2xl">{activity.prompt}</h3>
      <div className="mt-4 flex flex-wrap gap-3">
        {activity.spots.map((s, i) => (
          <button
            key={s.label}
            onClick={() => {
              if (tapped.includes(i)) return;
              setTapped((t) => [...t, i]);
              playSound(s.highlight ? "correct" : "gentle");
            }}
            className={cn(
              "rounded-3xl border-3 border-border bg-card px-5 py-4 text-left text-base font-semibold transition-transform hover:scale-105 active:scale-95",
              tapped.includes(i) && (s.highlight ? "border-leaf bg-leaf/20" : "border-sky bg-sky/15"),
            )}
          >
            <span className="mr-2 text-2xl">{s.emoji}</span>
            {s.label}
            {tapped.includes(i) && <span className="mt-1 block max-w-56 text-sm font-medium">{s.note}</span>}
          </button>
        ))}
      </div>
      {found >= highlights && (
        <>
          <Feedback tone="good">🎉 You found every spot. Body explorer badge unlocked!</Feedback>
          <NextButton onClick={() => onDone(POINTS.activity + POINTS.correct)} />
        </>
      )}
    </div>
  );
}
