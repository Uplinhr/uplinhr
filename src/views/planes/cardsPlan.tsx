"use client"
import { CardMembresia } from "@/components/CardServices/CardMembresia";
import { useMembresias } from "@/hooks/useMembresias";
import { TbLoader2 } from "react-icons/tb";

const CardsPlanView = () => {
  const { membresias, loading, error } = useMembresias();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <TbLoader2 className="animate-spin text-[#6C4099] text-4xl" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-12">{error}</p>;
  }

  return (
    <section className="py-12" style={{ padding: "3rem clamp(1.25rem, 4vw, 3rem)" }}>
      <div className="max-w-[1280px] mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        {membresias.map((membresia, index) => (
          <CardMembresia key={membresia.title} membresia={membresia} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CardsPlanView;
