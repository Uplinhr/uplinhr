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
    price: 852,
    buttonText: "Comprar Single Hire",
    buttonLink: "https://u030x.share.hsforms.com/2MdBclWfdRSq5x_BbXUzjzA",
    features: [
      "142 créditos incluidos",
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
    price: 4047,
    oldPrice: 4260,
    discount: "5% OFF",
    buttonText: "Comprar Pro",
    buttonLink: "https://u030x.share.hsforms.com/2W0JUlQ23TuSpMpoGCAGitA",
    features: [
      "710 créditos incluidos",
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
    price: 6339,
    oldPrice: 6816,
    discount: "7% OFF",
    buttonText: "Comprar Premium",
    buttonLink: "https://u030x.share.hsforms.com/2iOmWDCM_QGiaXaTlrxbjLA",
    features: [
      "1136 créditos incluidos",
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
    price: 7668,
    oldPrice: 8520,
    discount: "10% OFF",
    buttonText: "Comprar Platinum",
    buttonLink: "https://u030x.share.hsforms.com/22L5jpd-mRhOomjDh4k7xfQ",
    features: [
      "1420 créditos incluidos",
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