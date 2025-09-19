import { ReactNode } from "react";

interface CardBeneficiosProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function CardBeneficios({ icon, title, description }: CardBeneficiosProps) {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-sm shadow-[#502B7D] p-6 border border-[#502B7D] hover:shadow-md transition">
      <div className="text-[#502B7D] text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-[#502B7D]">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  );
}
