export type CharacterKey = "leo" | "pia" | "daisy" | "finn" | "toby";

export type Character = {
  key: CharacterKey;
  name: string;
  emoji: string;
  animal: string;
  personality: string;
  colorClass: string;
  levelTitle: string;
};

export const CHARACTERS: Record<CharacterKey, Character> = {
  leo: {
    key: "leo",
    name: "Leo the Lion",
    emoji: "🦁",
    animal: "Lion",
    personality: "Warm and brave. Leo speaks slowly and makes everyone feel safe.",
    colorClass: "sunny",
    levelTitle: "Meet Your Body",
  },
  pia: {
    key: "pia",
    name: "Pia the Panda",
    emoji: "🐼",
    animal: "Panda",
    personality: "Curious and clever. Pia loves questions and big ideas.",
    colorClass: "sky",
    levelTitle: "Understanding This Topic",
  },
  daisy: {
    key: "daisy",
    name: "Daisy the Dolphin",
    emoji: "🐬",
    animal: "Dolphin",
    personality: "Splashy and kind. Daisy cares about rest, water and feelings.",
    colorClass: "leaf",
    levelTitle: "Taking Care of Yourself",
  },
  finn: {
    key: "finn",
    name: "Finn the Fox",
    emoji: "🦊",
    animal: "Fox",
    personality: "Chatty and helpful. Finn knows everyone on the care team.",
    colorClass: "mango",
    levelTitle: "Your Healthcare Team",
  },
  toby: {
    key: "toby",
    name: "Toby the Turtle",
    emoji: "🐢",
    animal: "Turtle",
    personality: "Calm and encouraging. Toby says every try counts.",
    colorClass: "grape",
    levelTitle: "You're a Super Learner!",
  },
};

export const CHARACTER_ORDER: CharacterKey[] = ["leo", "pia", "daisy", "finn", "toby"];

export type Source = {
  title: string;
  organization: string;
  url: string;
};

export type TeachCard = {
  title: string;
  body: string;
  emoji: string;
};

export type Activity =
  | {
      type: "mcq";
      prompt: string;
      options: string[];
      answerIndex: number;
      explanation: string;
    }
  | {
      type: "truefalse";
      statement: string;
      answer: boolean;
      explanation: string;
    }
  | {
      type: "match";
      prompt: string;
      pairs: { left: string; right: string }[];
    }
  | {
      type: "habit";
      prompt: string;
      options: { label: string; emoji: string; helpful: boolean; note: string }[];
    }
  | {
      type: "bodymap";
      prompt: string;
      spots: { label: string; emoji: string; note: string; highlight: boolean }[];
    };

export type Level = {
  character: CharacterKey;
  title: string;
  intro: string;
  cards: TeachCard[];
  activities: Activity[];
  askTeam?: string;
};

export type Adventure = {
  topicId: string;
  topicName: string;
  worldName: string;
  worldEmoji: string;
  welcome: string;
  bigIdea: string;
  levels: Level[];
  askYourTeam: string[];
  parentNotes: string[];
  conversationStarters: string[];
  flags: string[];
  sources: Source[];
  generated: boolean;
};

export const POINTS = {
  correct: 10,
  activity: 20,
  level: 50,
  finish: 100,
};

export const SAFETY_LINE =
  "This app is for learning and encouragement. It is not a doctor. For anything about your own body, ask a grown-up you trust or your healthcare team.";
