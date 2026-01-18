export type Level = { name: string; credits: number };
export type Pkg = {
  name: string;
  credits: number;
  price: number;
  features: string[];
  link: string;
};

export const LEVELS: Level[] = [
  { name: "Entry / Principiante", credits: 125 },
  { name: "Junior", credits: 142 },
  { name: "Semi-Senior", credits: 185 },
  { name: "Senior", credits: 235 },
  { name: "Leader", credits: 325 },
  { name: "Director", credits: 595 },
];

export const PACKAGES: Pkg[] = [
  {
    name: "Single Hire",
    credits: 142,
    price: 852,
    features: [
      "142 créditos incluidos",
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
    credits: 710,
    price: 4260,
    features: [
      "710 créditos incluidos",
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
    credits: 1136,
    price: 6816,
    features: [
      "1136 créditos incluidos",
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
    credits: 1420,
    price: 9372,
    features: [
      "1420 créditos incluidos",
      "Vacantes posibles: hasta 10 Juniors",
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