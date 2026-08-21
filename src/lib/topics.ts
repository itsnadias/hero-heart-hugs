import type { Source } from "./adventure-types";

export type TopicSeed = {
  id: string;
  name: string;
  emoji: string;
  worldName: string;
  kidBlurb: string;
  aliases: string[];
  bodyAreas: string[];
  sources: Source[];
};

const CORE_SOURCES: Source[] = [
  {
    title: "Childhood Cancer information for patients and families",
    organization: "National Cancer Institute (NCI, U.S. government)",
    url: "https://www.cancer.gov/types/childhood-cancers",
  },
  {
    title: "Cancer basics explained for kids and teens",
    organization: "St. Jude Children's Research Hospital / Together by St. Jude",
    url: "https://together.stjude.org/en-us/",
  },
  {
    title: "KidsHealth — Cancer Center for kids",
    organization: "Nemours KidsHealth",
    url: "https://kidshealth.org/en/kids/cancer.html",
  },
  {
    title: "Children's cancer information",
    organization: "American Cancer Society",
    url: "https://www.cancer.org/cancer/types/cancer-in-children.html",
  },
];

/**
 * Approved, trusted source list. Update here to change what the AI is allowed
 * to ground content in — the generator receives this list with every request.
 */
export const APPROVED_SOURCE_DOMAINS = [
  "cancer.gov",
  "stjude.org",
  "kidshealth.org",
  "cancer.org",
  "chop.edu",
  "childrensoncologygroup.org",
  "cancerresearchuk.org",
  "who.int",
  "cdc.gov",
  "nih.gov",
];

export const TOPICS: TopicSeed[] = [
  {
    id: "leukemia",
    name: "Leukemia",
    emoji: "🩵",
    worldName: "Bloodstream Bay",
    kidBlurb: "A cancer that starts in blood cells made inside your bones.",
    aliases: ["all", "aml", "blood cancer", "acute lymphoblastic leukemia"],
    bodyAreas: ["Bone marrow", "Blood", "Lymph nodes", "Spleen"],
    sources: [
      {
        title: "Childhood Acute Lymphoblastic Leukemia Treatment (PDQ) — Patient Version",
        organization: "National Cancer Institute",
        url: "https://www.cancer.gov/types/leukemia/patient/child-all-treatment-pdq",
      },
      {
        title: "Leukemia — information for children and families",
        organization: "St. Jude Children's Research Hospital",
        url: "https://www.stjude.org/disease/leukemia.html",
      },
      ...CORE_SOURCES.slice(2),
    ],
  },
  {
    id: "lymphoma",
    name: "Lymphoma",
    emoji: "💧",
    worldName: "Lymph Lagoon",
    kidBlurb: "A cancer that starts in the body's germ-fighting lymph system.",
    aliases: ["hodgkin", "non-hodgkin"],
    bodyAreas: ["Lymph nodes", "Spleen", "Thymus", "Tonsils"],
    sources: [
      {
        title: "Childhood Hodgkin Lymphoma Treatment (PDQ) — Patient Version",
        organization: "National Cancer Institute",
        url: "https://www.cancer.gov/types/lymphoma/patient/child-hodgkin-treatment-pdq",
      },
      ...CORE_SOURCES,
    ],
  },
  {
    id: "brain-tumor",
    name: "Brain tumors",
    emoji: "🧠",
    worldName: "Thinking Forest",
    kidBlurb: "A lump of cells that grows in or near the brain.",
    aliases: ["medulloblastoma", "glioma", "brain cancer", "brain tumour"],
    bodyAreas: ["Brain", "Cerebellum", "Brain stem", "Spinal cord"],
    sources: [
      {
        title: "Childhood Brain and Spinal Cord Tumors — Patient Version",
        organization: "National Cancer Institute",
        url: "https://www.cancer.gov/types/brain/patient/child-brain-tumor-treatment-pdq",
      },
      ...CORE_SOURCES,
    ],
  },
  {
    id: "bone-cancer",
    name: "Bone cancer",
    emoji: "🦴",
    worldName: "Strong Bones Canyon",
    kidBlurb: "A cancer that starts inside a bone, like the leg or arm.",
    aliases: ["osteosarcoma", "ewing sarcoma", "ewing's"],
    bodyAreas: ["Leg bones", "Arm bones", "Pelvis", "Ribs"],
    sources: [
      {
        title: "Osteosarcoma Treatment (PDQ) — Patient Version",
        organization: "National Cancer Institute",
        url: "https://www.cancer.gov/types/bone/patient/osteosarcoma-treatment-pdq",
      },
      ...CORE_SOURCES,
    ],
  },
  {
    id: "neuroblastoma",
    name: "Neuroblastoma",
    emoji: "⭐",
    worldName: "Nerve Star Valley",
    kidBlurb: "A cancer that grows from very young nerve cells.",
    aliases: ["nerve cancer"],
    bodyAreas: ["Adrenal glands", "Tummy area", "Chest", "Neck"],
    sources: [
      {
        title: "Neuroblastoma Treatment (PDQ) — Patient Version",
        organization: "National Cancer Institute",
        url: "https://www.cancer.gov/types/neuroblastoma/patient/neuroblastoma-treatment-pdq",
      },
      ...CORE_SOURCES,
    ],
  },
  {
    id: "wilms-tumor",
    name: "Wilms tumor",
    emoji: "🫘",
    worldName: "Kidney Meadow",
    kidBlurb: "A kidney tumor that mostly happens in young children.",
    aliases: ["nephroblastoma", "kidney tumor"],
    bodyAreas: ["Kidneys", "Tummy area"],
    sources: [
      {
        title: "Wilms Tumor and Other Childhood Kidney Tumors — Patient Version",
        organization: "National Cancer Institute",
        url: "https://www.cancer.gov/types/kidney/patient/wilms-treatment-pdq",
      },
      ...CORE_SOURCES,
    ],
  },
  {
    id: "retinoblastoma",
    name: "Retinoblastoma",
    emoji: "👁️",
    worldName: "Rainbow Eye Island",
    kidBlurb: "A cancer that starts in the back of the eye.",
    aliases: ["eye cancer"],
    bodyAreas: ["Eye", "Retina"],
    sources: [
      {
        title: "Retinoblastoma Treatment (PDQ) — Patient Version",
        organization: "National Cancer Institute",
        url: "https://www.cancer.gov/types/retinoblastoma/patient/retinoblastoma-treatment-pdq",
      },
      ...CORE_SOURCES,
    ],
  },
  {
    id: "rhabdomyosarcoma",
    name: "Rhabdomyosarcoma",
    emoji: "💪",
    worldName: "Muscle Mountain",
    kidBlurb: "A cancer that starts in cells that build muscles.",
    aliases: ["soft tissue sarcoma", "muscle cancer", "rms"],
    bodyAreas: ["Muscles", "Head and neck", "Arms and legs"],
    sources: [
      {
        title: "Childhood Rhabdomyosarcoma Treatment (PDQ) — Patient Version",
        organization: "National Cancer Institute",
        url: "https://www.cancer.gov/types/soft-tissue-sarcoma/patient/rhabdomyosarcoma-treatment-pdq",
      },
      ...CORE_SOURCES,
    ],
  },
];

export function findTopic(query: string): TopicSeed | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return (
    TOPICS.find((t) => t.id === q || t.name.toLowerCase() === q) ??
    TOPICS.find(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        q.includes(t.name.toLowerCase()) ||
        t.aliases.some((a) => a === q || q.includes(a)),
    ) ??
    null
  );
}
