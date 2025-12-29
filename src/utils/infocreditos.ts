export type Level = { name: string; credits: number };
export type Pkg = {
  name: string;
  credits: number;
  price: number;
  features: string[] ;
  link: string;
};

export const LEVELS: Level[] = [
  { name: "Entry / Principiante", credits: 117 },
  { name: "Junior", credits: 142 },
  { name: "Semi-Senior", credits: 150 },
  { name: "Senior", credits: 234 },
  { name: "Leader", credits: 310 },
  { name: "Director", credits: 595 },
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
    link: "https://u030x.share.hsforms.com/2MdBclWfdRSq5x_BbXUzjzA",
  },
  {
    name: "Pro",
    credits: 660,
    price: 3762,
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
    link: "https://u030x.share.hsforms.com/2W0JUlQ23TuSpMpoGCAGitA",
  },
  {
    name: "Premium",
    credits: 990,
    price: 5346,
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
    link: "https://u030x.share.hsforms.com/2iOmWDCM_QGiaXaTlrxbjLA",
  },
  {
    name: "Platinum",
    credits: 1320,
    price: 6732,
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
    link: "https://u030x.share.hsforms.com/22L5jpd-mRhOomjDh4k7xfQ",
  },
];

export const PRICE_PER_INDIVIDUAL_CREDIT = 6; // USD

/* ===== NUEVO: catálogo de servicios adicionales ===== */
export const ADDITIONAL_SERVICES = [
  { name: "Publicación en 1 portal especializado", creditsPerUnit: 20 },
  { name: "Pauta en LinkedIn", creditsPerUnit: 20 },
  { name: "Aplicación de tests psicotécnicos o personalidad", creditsPerUnit: 10 },
  { name: "Prueba técnica (varios)", creditsPerUnit: 10 },
  { name: "Entrevista 100% en inglés", creditsPerUnit: 20 },
  { name: "Garantía 6 meses", creditsPerUnit: 20 },
];