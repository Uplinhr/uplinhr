export type Level = { name: string; credits: number };
export type Pkg = {
  name: string;
  credits: number;
  price: number;
  features: string[];
  link: string;
};

export const LEVELS: Level[] = [
  { name: "Entry / Principiante", credits: 110 },
  { name: "Junior", credits: 120 },
  { name: "Semi-Senior", credits: 130 },
  { name: "Senior", credits: 220 },
  { name: "Director", credits: 260 },
  { name: "C Level", credits: 300 },
];

export const PACKAGES: Pkg[] = [
  {
    name: "Single Hire",
    credits: 120,
    price: 720,
    features: [
      "120 créditos incluidos",
      "Vacantes posibles: 1 (Entry o Junior)",
      "Proceso básico de selección",
      "Soporte y acompañamiento",
      "Sin vencimiento",
      "Pago único",
    ],
    link: "https://app.uplinhr.com/adquiere-single-hire",
  },
  {
    name: "Pro",
    credits: 660,
    price: 3960,
    features: [
      "660 créditos incluidos",
      "Vacantes posibles: hasta 5 Juniors",
      "Proceso básico de selección",
      "Soporte y acompañamiento",
      "Onboarding asistido",
      "Garantía de 3 meses",
      "Sin vencimiento",
      "Pago único",
    ],
    link: "https://app.uplinhr.com/adquiere-pack-pro",
  },
  {
    name: "Premium",
    credits: 990,
    price: 5940,
    features: [
      "990 créditos incluidos",
      "Vacantes posibles: hasta 8 Juniors",
      "Proceso básico de selección",
      "Soporte y acompañamiento",
      "Onboarding asistido",
      "Garantía de 3 meses",
      "Sin vencimiento",
      "Pago único",
    ],
    link: "https://app.uplinhr.com/adquiere-pack-premium",
  },
  {
    name: "Platinum",
    credits: 1320,
    price: 7920,
    features: [
      "1320 créditos incluidos",
      "Vacantes posibles: hasta 11 Juniors",
      "Proceso básico de selección",
      "Soporte y acompañamiento",
      "Onboarding asistido",
      "Garantía de 3 meses",
      "Sin vencimiento",
      "Pago único",
    ],
    link: "https://app.uplinhr.com/adquiere-pack-platinum",
  },
];

export const PRICE_PER_INDIVIDUAL_CREDIT = 6; // USD

/* ===== NUEVO: catálogo de servicios adicionales ===== */
export const ADDITIONAL_SERVICES = [
  { name: "Publicación en 1 portal especializado", creditsPerUnit: 20 },
  { name: "Pauta en LinkedIn", creditsPerUnit: 20 },
  { name: "Aplicación de tests psicotécnicos o personalidad", creditsPerUnit: 10 },
  { name: "Coding Interview (algoritmos, estructuras de datos)", creditsPerUnit: 10 },
  { name: "Technical Screening (test online o entrevista rápida)", creditsPerUnit: 10 },
  { name: "System Design Interview (arquitectura, escalabilidad)", creditsPerUnit: 10 },
  { name: "Pair Programming Interview (colaboración y estilo de trabajo)", creditsPerUnit: 10 },
  { name: "Live Coding Interview (codificación en tiempo real)", creditsPerUnit: 10 },
  { name: "Take-Home Assignment (proyecto técnico con entrega)", creditsPerUnit: 10 },
  { name: "Technical Deep Dive (profundización en tecnología/stack)", creditsPerUnit: 10 },
  { name: "Entrevista 100% en inglés", creditsPerUnit: 20 },
  { name: "Garantía 6 meses", creditsPerUnit: 20 },
];