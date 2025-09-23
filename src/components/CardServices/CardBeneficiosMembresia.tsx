import { FaExchangeAlt, FaRegHandshake } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import CardBeneficios from "./CardBeneficios";

const features = [
  {
    icon: <FaExchangeAlt />,
    title: "Flexibilidad total",
    description: "Elegís el plan que mejor se adapta a tu empresa, con servicios escalables"
  },
  {
    icon: <FaRegHandshake />,
    title: "People-first mindset",
    description: "Potenciamos la cultura y el talento, sin perder el foco en los resultados"
  },
  {
    icon: <MdOutlineCurrencyExchange />,
    title: "Ahorro inteligente",
    description: "Accedés a múltiples soluciones de HR en una sola suscripción mensual"
  },
  {
    icon: <GoShieldCheck />,
    title: "HR Advisor dedicado",
    description: "Persona experta en HR para brindarte soporte, consultorías  y acompañarte en decisiones estratégicas de talento"
  }
];

export default function SectionMembership() {
  return (
    <section className="w-full max-w-6xl mx-auto p-4 py-2 px-6">
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