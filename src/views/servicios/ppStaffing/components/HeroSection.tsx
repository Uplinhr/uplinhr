import Image from "next/image";
import Button from "@/components/Button/Button";

const HeroSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 lg:flex items-center">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold">
            <span className="text-[#AF93CC]">People partner</span>
            <br />
            <span className="text-gray-800">staffing</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-lg">
            ¿Necesitas un experto para tu equipo de People pero no quieres sumar
            a alguien a nómina? Imagina tener a un profesional de Recursos
            Humanos 100% dedicado a tu equipo, con el conocimiento y la
            experiencia para impulsar tus proyectos estratégicos. Todo esto, sin
            el compromiso ni los costos de una contratación a largo plazo. El
            desafío de muchas empresas hoy no es solo encontrar talento, sino
            gestionarlo de forma eficiente y flexible. Los proyectos de alta
            prioridad, los picos de trabajo o la falta de un rol específico a
            tiempo completo, pueden detener el crecimiento y la innovación.
          </p>
          <div className="mt-6">
            <Button
              link="https://meetings.hubspot.com/llopez-ramirez"
              tag="Agendá una llamada"
              mode={3}
              height={50}
              width={250}
            />
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-[500px] h-[300px] rounded-lg shadow-xl border-4 border-[#AF93CC] overflow-hidden">
            <Image
              src="/PPS-landing.png"
              alt="People Partner Staffing"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
