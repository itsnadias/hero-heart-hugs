import type { Adventure } from "./adventure-types";
import { TOPICS } from "./topics";

const leukemia = TOPICS[0]!;

/**
 * Hand-written, reviewed sample adventure. Used as the polished demo topic and
 * as a safe fallback if AI generation cannot be verified.
 */
export const SAMPLE_ADVENTURE: Adventure = {
  topicId: leukemia.id,
  topicName: leukemia.name,
  worldName: leukemia.worldName,
  worldEmoji: "🩵",
  welcome: "Welcome to Bloodstream Bay! Let's explore how blood cells work and how helpers take care of you.",
  bigIdea:
    "Leukemia starts in the blood cells that are made inside your bones. It is nobody's fault, it is not catchy like a cold, and lots of grown-ups are trained to help.",
  levels: [
    {
      character: "leo",
      title: "Meet Your Body",
      intro:
        "Rooooar, hello friend! I'm Leo. Your body is like a busy, brilliant city. Let's take a gentle tour and see where blood cells are born.",
      cards: [
        {
          emoji: "🦴",
          title: "Bones are little factories",
          body: "Inside some of your bones there is a soft, spongy part called bone marrow. That is where new blood cells are made every single day.",
        },
        {
          emoji: "🩸",
          title: "Three helper cells",
          body: "Red cells carry oxygen, white cells fight germs, and platelets help cuts stop bleeding. They all travel together in your blood.",
        },
        {
          emoji: "🩵",
          title: "What leukemia means",
          body: "In leukemia, the marrow makes white blood cells that do not grow up properly, so there is less room for the helper cells. Doctors have medicines and plans to work on this.",
        },
      ],
      activities: [
        {
          type: "bodymap",
          prompt: "Tap the parts of the body where blood cells live and travel.",
          spots: [
            { label: "Bone marrow", emoji: "🦴", highlight: true, note: "This spongy part inside bones makes new blood cells." },
            { label: "Blood", emoji: "🩸", highlight: true, note: "Blood is the highway your cells travel on." },
            { label: "Lymph nodes", emoji: "🫧", highlight: true, note: "Small bean-shaped helpers that fight germs." },
            { label: "Spleen", emoji: "🫀", highlight: true, note: "An organ that helps clean and store blood cells." },
            { label: "Hair", emoji: "💇", highlight: false, note: "Hair does not make blood cells — but it can change during some treatments, and that's okay." },
            { label: "Toenails", emoji: "🦶", highlight: false, note: "Nope! Toenails are not blood cell factories." },
          ],
        },
        {
          type: "mcq",
          prompt: "Where are new blood cells made?",
          options: ["Inside bone marrow", "In your hair", "In your shoes"],
          answerIndex: 0,
          explanation: "Bone marrow is the soft part inside bones where blood cells are born.",
        },
      ],
      askTeam: "Can you show me a picture of what my blood cells look like?",
    },
    {
      character: "pia",
      title: "Understanding Leukemia",
      intro:
        "Hi, I'm Pia! I love good questions. Let's sort out some true facts and toss out the mix-ups.",
      cards: [
        {
          emoji: "🚫🤧",
          title: "You cannot catch it",
          body: "Leukemia is not like a cold or the flu. You cannot catch it from someone, and you cannot give it to a friend.",
        },
        {
          emoji: "💛",
          title: "It is not your fault",
          body: "Nothing you thought, said, ate or did made this happen. Doctors say kids do not cause leukemia.",
        },
        {
          emoji: "🧪",
          title: "Tests are clues",
          body: "Blood tests and scans are how the team collects clues. They can feel like a quick pinch or a big camera taking pictures.",
        },
      ],
      activities: [
        {
          type: "truefalse",
          statement: "You can catch leukemia from a friend at school.",
          answer: false,
          explanation: "Leukemia is not contagious. Hugs, sharing snacks and playing together are all safe.",
        },
        {
          type: "match",
          prompt: "Match each helper cell to its job.",
          pairs: [
            { left: "🩸 Red cells", right: "Carry oxygen around" },
            { left: "🛡️ White cells", right: "Fight germs" },
            { left: "🩹 Platelets", right: "Help cuts stop bleeding" },
          ],
        },
        {
          type: "mcq",
          prompt: "Who is a great person to ask about your own body and treatment?",
          options: ["A video comment section", "Your doctor, nurse or grown-up", "A guessing game"],
          answerIndex: 1,
          explanation: "Your care team and your grown-ups know you best. Questions are always allowed.",
        },
      ],
      askTeam: "What do my blood test numbers mean this week?",
    },
    {
      character: "daisy",
      title: "Taking Care of Yourself",
      intro:
        "Splash! I'm Daisy. These habits help your whole self feel a bit better day to day. They are not medicine and they do not cure cancer — your team's plan does the medical part.",
      cards: [
        {
          emoji: "💧",
          title: "Sips of water",
          body: "Water helps your body do its jobs. Some kids have a special drinking plan — always follow what your team says.",
        },
        {
          emoji: "😴",
          title: "Rest is powerful",
          body: "Resting is not lazy; it is one of the ways bodies recharge. Naps and quiet time count.",
        },
        {
          emoji: "🧼",
          title: "Clean hands, happy day",
          body: "Washing hands helps keep germs away, which matters a lot when white cells are busy.",
        },
        {
          emoji: "🫂",
          title: "Feelings are allowed",
          body: "Happy, grumpy, scared, silly — all feelings are okay. Telling someone how you feel is a brave, healthy habit.",
        },
      ],
      activities: [
        {
          type: "habit",
          prompt: "Which of these are friendly, everyday habits? Tap all the helpful ones.",
          options: [
            { label: "Washing my hands", emoji: "🧼", helpful: true, note: "Great choice! Clean hands help keep germs away." },
            { label: "Telling a grown-up how I feel", emoji: "🫂", helpful: true, note: "Sharing feelings helps your heart and your team." },
            { label: "Eating one magic food to cure cancer", emoji: "🥦", helpful: false, note: "No food can cure cancer. Healthy food helps you feel stronger, and your team decides the medicine." },
            { label: "Resting when I feel tired", emoji: "😴", helpful: true, note: "Rest helps your body recharge." },
            { label: "Skipping my medicine plan", emoji: "🚫", helpful: false, note: "Medicine plans come from your care team. Always talk to them first." },
          ],
        },
        {
          type: "truefalse",
          statement: "Special foods can make cancer go away all by themselves.",
          answer: false,
          explanation: "Healthy food helps you feel good, but it is not a cure. Your healthcare team's plan is the medical part.",
        },
      ],
      askTeam: "Are there any foods or activities I should skip right now?",
    },
    {
      character: "finn",
      title: "Your Healthcare Team",
      intro:
        "Hey hey, Finn here! You have a whole team of helpers. Let's learn who does what — and practise asking questions.",
      cards: [
        { emoji: "🩺", title: "Doctors", body: "They study your clues and plan your care with your grown-ups." },
        { emoji: "💉", title: "Nurses", body: "They are with you the most: checks, medicine, and lots of kindness." },
        { emoji: "💊", title: "Pharmacists", body: "Medicine experts who prepare and double-check every dose." },
        { emoji: "🧠", title: "Psychologists & child life specialists", body: "Feelings helpers. They use play and talking to make hard days easier." },
        { emoji: "🥗", title: "Dietitians", body: "Food helpers who plan meals that fit your body's needs." },
      ],
      activities: [
        {
          type: "match",
          prompt: "Match each helper to what they do.",
          pairs: [
            { left: "🩺 Doctor", right: "Plans your care" },
            { left: "💉 Nurse", right: "Gives medicine and checks on you" },
            { left: "💊 Pharmacist", right: "Prepares medicines safely" },
            { left: "🧠 Child life specialist", right: "Helps with feelings and play" },
          ],
        },
        {
          type: "mcq",
          prompt: "You have a question about your treatment. What is a great thing to do?",
          options: ["Keep it secret", "Ask your grown-up or care team", "Guess the answer"],
          answerIndex: 1,
          explanation: "There are no silly questions. Asking helps your team take better care of you.",
        },
      ],
      askTeam: "Can you explain that word again in kid language?",
    },
    {
      character: "toby",
      title: "You're a Super Learner!",
      intro: "Slow and steady, superstar! I'm Toby. Let's celebrate everything you learned today.",
      cards: [
        {
          emoji: "🌟",
          title: "You learned a lot",
          body: "Blood cells, bone marrow, healthy habits and your team of helpers. That is big brain work!",
        },
      ],
      activities: [
        {
          type: "mcq",
          prompt: "Final challenge! Where does leukemia start?",
          options: ["In blood cells made in bone marrow", "In your sneakers", "In the sky"],
          answerIndex: 0,
          explanation: "You got it — leukemia starts in blood cells made inside bone marrow.",
        },
        {
          type: "truefalse",
          statement: "Asking questions to my care team is a great idea.",
          answer: true,
          explanation: "Always! Questions help you understand your own body.",
        },
        {
          type: "habit",
          prompt: "Choose the kind things you can do for yourself today.",
          options: [
            { label: "Rest when tired", emoji: "😴", helpful: true, note: "Rest recharges you." },
            { label: "Share a feeling", emoji: "💬", helpful: true, note: "Feelings are easier when shared." },
            { label: "Blame myself", emoji: "🙁", helpful: false, note: "This is never your fault. Be gentle with yourself." },
            { label: "Ask one question", emoji: "❓", helpful: true, note: "Curiosity is a superpower." },
          ],
        },
      ],
      askTeam: "What is one thing I can look forward to this week?",
    },
  ],
  askYourTeam: [
    "What will happen at my next visit?",
    "Can you explain that word in kid language?",
    "Will it hurt, and what can help if it does?",
    "What can I still do for fun this week?",
  ],
  parentNotes: [
    "Leukemia is a cancer of blood-forming tissue, most often the bone marrow. Acute lymphoblastic leukemia (ALL) is the most common childhood cancer.",
    "Content in this adventure is deliberately general: it explains cell types, that leukemia is not contagious, and that treatment plans come from the child's own team.",
    "No prognosis, survival statistics, or treatment recommendations are presented to the child.",
  ],
  conversationStarters: [
    "Which animal friend did you like most, and what did they teach you?",
    "Was there anything in the game you want to ask the nurse about?",
    "What is one healthy habit you'd like us to do together this week?",
  ],
  flags: [
    "Specific treatment plans, medicines, doses, and prognosis must come from the child's healthcare team.",
    "Diet and activity changes should be checked with the team, especially during active treatment.",
  ],
  sources: leukemia.sources,
  generated: false,
};
