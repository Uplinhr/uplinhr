import { FaExchangeAlt } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import CardBeneficios from "./CardBeneficios";

const features = [
  {
    icon: <FaExchangeAlt />,
    title: "Flexible",
    description: "Armá tu búsqueda combinando perfiles de distintos niveles. Sin vencimientos: usá los créditos cuando quieras."
  },
  {
    icon: <GoShieldCheck />,
    title: "Garantía",
    description: "Cada proceso incluye 3 meses de garantía con la flexibilidad de extensión por perfiles."
  },
  {
    icon: <MdOutlineCurrencyExchange />,
    title: "Ahorro",
    description: "Accedé a descuentos por volumen en planes Pro, Premium y Platinum."
  },
  {
    icon: <HiMiniArrowTrendingUp />,
    title: "Escalable y a la medida",
    description: "Avanzá con un proceso mínimo y sumá créditos adicionales para ampliar necesidades, cubrir perfiles más complejos o abrir nuevas vacantes."
  }
];

export default function FeaturesSection() {
  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <CardBeneficios
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}