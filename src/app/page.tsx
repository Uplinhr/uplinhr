"use client";
import Solutions from "@/views/home/Solutions";
import ServiceHero from "@/components/ServiceHero/ServiceHero";
import { CardServices } from "@/components/CardServices/cardServices";
import { Banner } from "@/components/banner/banner";
import { Search, Users, Briefcase, Star, GraduationCap } from "lucide-react";
import { StrategicAlliances } from "@/components/strategicAlliances/StrategicAlliances";
import { AliadosCarrusel } from "@/components/strategicAlliances/AliadosCarrusel";
import Testimonios from "@/components/Testimonios/Testimonios";
import SectionTag from "@/components/SectionTag/SectionTag";
import Title from "@/components/Title/Title";
import { speakText } from "@/utils/textToSpeech";

export default function TestTailwind() {
  const handleHeroTTS = () => {
    speakText(
      "RRHH flexible para tu equipo. La primera consultora de servicios RRHH flexible en Latam. " +
      "Accede a soluciones de talento y gestión de personal cuando y como las necesites, sin contratos rígidos. " +
      "Tecnología y acompañamiento humano en un solo lugar."
    );
  };

  return (
    <div className="min-h-screen">
      <ServiceHero
        tag="RRHH flexible para tu equipo"
        title={{
          before: "La primera ",
          gradient: "consultora ",
          after: "de servicios RRHH flexible en Latam",
        }}
        gradientClass="gradient-purple-green"
        description="Accede a soluciones de talento y gestión de personal cuando y como las necesites, sin contratos rígidos. Tecnología y acompañamiento humano en un solo lugar."
        primaryBtn={{ text: "Conocer los servicios →", href: "#servicios" }}
        secondaryBtn={{ text: "Habla con un experto", href: "https://u030x.share.hsforms.com/2kmoJRY33TFChFJbTJ37Mlw" }}
        image={{ src: "/FOTO_EQUIPO.jpg", alt: "Equipo Uplinhr — RRHH flexible en Latam" }}
        onTTS={handleHeroTTS}
        ttsAriaLabel="Escuchar presentación"
        stats={[
          { value: 150, label: "Empresas activas", format: (v) => `+${v}` },
          { value: 25, label: "Talentos colocados", format: (v) => `+${(v / 10).toFixed(1)}K` },
          { value: 100, label: "Satisfacción", format: (v) => `${v}%` },
        ]}
      />
      <AliadosCarrusel />

      {/**
      <CardsPlan />
      <AditionalServices />
      <ComparativeCard /> */}

      {/* Encabezado de sección */}
      <div
        id="servicios"
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          textAlign: "center",
          marginBottom: "3rem",
          marginTop: "var(--spacing-uplin-md)",
          padding: "0 1rem",
          scrollMarginTop: "6rem",
        }}
      >
        <SectionTag text="SERVICIOS" />
        <Title before="Servicios que apoyan la gestión y el " gradient="crecimiento " after="de tu organización" gradientClass="gradient-purple-green" />
        <p
          style={{
            fontSize: "var(--text-uplin-lead)",
            color: "var(--color-uplin-ink-soft)",
            lineHeight: "var(--leading-uplin-body)",
          }}
        >
          Cuatro líneas de servicio diseñadas para acompañarte en cada etapa, con la flexibilidad de combinarlas según tu necesidad real.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        <CardServices
          icon={<Search className="w-[26px] h-[26px]" />}
          title="Búsqueda de talentos"
          description="Accedé a paquetes de créditos diseñados según tus necesidades. Podés simular tu plan y crear un modelo flexible y a medida para tu proceso de reclutamiento."
          linkHref="/servicios/creditos"
        />
        <CardServices
          icon={<Users className="w-[26px] h-[26px]" />}
          iconBg="var(--color-uplin-green)"
          title="People Partner Staffing"
          description="Nos convertimos en tu socio estratégico de talento. Te acompañamos en la contratación, integración y gestión de tu equipo con un enfoque humano y cercano."
          linkHref="/servicios/ppStaffing"
        />
        <div className="md:col-span-2 flex justify-center">
          <div className="w-full md:max-w-[calc(50%-0.75rem)]">
            <CardServices
              icon={<Briefcase className="w-[26px] h-[26px]" />}
              iconBg="var(--color-uplin-orange)"
              title="Consultorías"
              description="Asesoría especializada en recursos humanos para impulsar tu negocio. Te damos claridad y soluciones prácticas para enfrentar tus retos de gestión de personas."
              linkHref="/servicios/consultorias"
            />
          </div>
        </div>
      </div>
      <Solutions />
      <StrategicAlliances />
      <Testimonios />
      <Banner />
    </div>
  );
}
