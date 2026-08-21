import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type TopicProgress = {
  topicId: string;
  topicName: string;
  points: number;
  levelsDone: number;
  totalLevels: number;
  completedAt?: string;
  gift?: string;
};

type Settings = {
  sound: boolean;
  reduceMotion: boolean;
  bigText: boolean;
  captions: boolean;
};

type Ctx = {
  settings: Settings;
  setSetting: (key: keyof Settings, value: boolean) => void;
  progress: TopicProgress[];
  saveProgress: (p: TopicProgress) => void;
  playSound: (kind: "correct" | "gentle" | "celebrate" | "tap") => void;
  speak: (text: string) => void;
  hydrated: boolean;
};

const AppContext = createContext<Ctx | null>(null);
const SETTINGS_KEY = "bb.settings";
const PROGRESS_KEY = "bb.progress";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    sound: true,
    reduceMotion: false,
    bigText: false,
    captions: true,
  });
  const [progress, setProgress] = useState<TopicProgress[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(SETTINGS_KEY);
      if (s) setSettings((prev) => ({ ...prev, ...JSON.parse(s) }));
      const p = localStorage.getItem(PROGRESS_KEY);
      if (p) setProgress(JSON.parse(p));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    document.documentElement.classList.toggle("reduce-motion", settings.reduceMotion);
    document.documentElement.style.fontSize = settings.bigText ? "118%" : "";
  }, [settings, hydrated]);

  const setSetting = useCallback((key: keyof Settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const saveProgress = useCallback((p: TopicProgress) => {
    setProgress((prev) => {
      const next = [...prev.filter((x) => x.topicId !== p.topicId), p];
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const playSound = useCallback(
    (kind: "correct" | "gentle" | "celebrate" | "tap") => {
      if (!settings.sound || typeof window === "undefined") return;
      try {
        const AC = window.AudioContext ?? (window as any).webkitAudioContext;
        if (!AC) return;
        const ctx = new AC();
        const notes =
          kind === "correct"
            ? [660, 880]
            : kind === "celebrate"
              ? [523, 659, 784, 1046]
              : kind === "gentle"
                ? [392, 349]
                : [520];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          const start = ctx.currentTime + i * 0.12;
          gain.gain.exponentialRampToValueAtTime(0.12, start + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28);
          osc.connect(gain).connect(ctx.destination);
          osc.start(start);
          osc.stop(start + 0.3);
        });
        setTimeout(() => ctx.close().catch(() => {}), 1500);
      } catch {
        /* ignore */
      }
    },
    [settings.sound],
  );

  const speak = useCallback(
    (text: string) => {
      if (!settings.sound || typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.95;
      utter.pitch = 1.15;
      window.speechSynthesis.speak(utter);
    },
    [settings.sound],
  );

  const value = useMemo(
    () => ({ settings, setSetting, progress, saveProgress, playSound, speak, hydrated }),
    [settings, setSetting, progress, saveProgress, playSound, speak, hydrated],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
