import xray from "@/assets/cartoon-xray.jpg";
import scan from "@/assets/cartoon-scan.jpg";
import family from "@/assets/cartoon-family.jpg";
import careteam from "@/assets/cartoon-careteam.jpg";
import cells from "@/assets/cartoon-cells.jpg";
import medicine from "@/assets/cartoon-medicine.jpg";
import selfcare from "@/assets/cartoon-selfcare.jpg";
import hospital from "@/assets/cartoon-hospital.jpg";

export type Illustration = { src: string; alt: string };

const RULES: { rx: RegExp; art: Illustration }[] = [
  {
    rx: /\bx-?ray/i,
    art: { src: xray, alt: "Cartoon X-ray machine with a friendly face next to an X-ray picture of bones" },
  },
  {
    rx: /\bmri|ct scan|\bscan|scanner|ultrasound|picture of the inside/i,
    art: { src: scan, alt: "Cartoon scanner tunnel with a smiling child lying on the bed" },
  },
  {
    rx: /famil|mum|mom|dad|parent|grandma|grandpa|brother|sister|sibling|carer|caregiver|home/i,
    art: { src: family, alt: "Cartoon family hugging with hearts around them" },
  },
  {
    rx: /doctor|nurse|care team|healthcare|specialist|play specialist|social worker|hospital team|appointment/i,
    art: { src: careteam, alt: "Cartoon doctor and nurses smiling and waving" },
  },
  {
    rx: /blood|cell|platelet|marrow|white cells|red cells|immune/i,
    art: { src: cells, alt: "Cartoon blood cells with happy faces" },
  },
  {
    rx: /medicine|chemo|treatment|drip|iv\b|infusion|plaster|bandage|port\b|injection/i,
    art: { src: medicine, alt: "Cartoon medicine drip with a smiling face and colourful plasters" },
  },
  {
    rx: /sleep|rest|water|drink|eat|food|snack|wash|hands|tooth|teeth|feeling|calm|breath|play|exercise/i,
    art: { src: selfcare, alt: "Cartoon child resting cosily with water, fruit and a toothbrush" },
  },
  {
    rx: /hospital|clinic|ward|ambulance|visit/i,
    art: { src: hospital, alt: "Friendly cartoon hospital building with an ambulance and trees" },
  },
];

export function pickIllustration(...parts: (string | undefined)[]): Illustration | null {
  const text = parts.filter(Boolean).join(" ");
  if (!text.trim()) return null;
  for (const rule of RULES) if (rule.rx.test(text)) return rule.art;
  return null;
}
