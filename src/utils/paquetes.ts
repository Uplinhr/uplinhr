export type Paquetes = {
  id: string
  title: string
  description: string
  price: number
  oldPrice?: number
  discount?: string
  buttonText: string
  buttonLink?: string
  features: string[]
}

export const data: Paquetes[] = [
  {
    id: "single",
    title: "Single Hire",
    description:
      "Ideal para quienes quieren sumar talento puntual mientras comienzan a armar su equipo.",
    price: 720,
    buttonText: "Comprar Single Hire",
    buttonLink: "https://app.uplinhr.com/adquiere-single-hire",
    features: [
      "120 créditos incluidos",
      "Vacantes posibles: 1 (junior y unique)",
      "Proceso básico de selección",
      "Soporte y acompañamiento",
      "Onboarding asistido",
      "Garantía de 3 meses",
      "Sin vencimiento",
      "Pago único",
    ],
  },
  {
    id: "pro",
    title: "Pro",
    description:
      "Ideal para startups o Pymes en fase de crecimiento que necesitan consolidar un equipo sólido.",
    price: 3762,
    oldPrice: 3960,
    discount: "5% OFF",
    buttonText: "Comprar Pro",
    buttonLink: "https://app.uplinhr.com/adquiere-pack-pro",
    features: [
      "600 créditos incluidos",
      "Vacantes posibles: hasta 5 juniors (combinables según nivel)",
      "Proceso básico de selección",
      "Soporte y acompañamiento",
      "Onboarding asistido",
      "Garantía de 3 meses",
      "Sin vencimiento",
      "Pago único",
    ],
  },
  {
    id: "premium",
    title: "Premium",
    description:
      "Ideal para startups en expansión que requieren sumar varios perfiles al mismo tiempo.",
    price: 5346,
    oldPrice: 5940,
    discount: "10% OFF",
    buttonText: "Comprar Premium",
    buttonLink: "https://app.uplinhr.com/adquiere-pack-premium",
    features: [
      "960 créditos incluidos",
      "Vacantes posibles: hasta 8 juniors (combinables según nivel)",
      "Proceso básico de selección",
      "Soporte y acompañamiento",
      "Onboarding asistido",
      "Garantía de 3 meses",
      "Sin vencimiento",
      "Pago único",
    ],
  },
  {
    id: "platinum",
    title: "Platinum",
    description:
      "Ideal para scale-ups o empresas en crecimiento continuo con contrataciones constantes.",
    price: 6732,
    oldPrice: 7920,
    discount: "15% OFF",
    buttonText: "Comprar Platinum",
    buttonLink: "https://app.uplinhr.com/adquiere-pack-platinum",
    features: [
      "1200 créditos incluidos",
      "Vacantes posibles: hasta 10 juniors (combinables según nivel)",
      "Proceso básico de selección",
      "Soporte y acompañamiento",
      "Onboarding asistido",
      "Garantía de 3 meses",
      "Sin vencimiento",
      "Pago único",
    ],
  },
]