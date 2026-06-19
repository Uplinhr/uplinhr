import Solutions from "@/views/home/Solutions";
import Presentation from "@/views/home/Presentation";
import { CardServices } from "@/components/CardServices/cardServices";
import { Banner } from "@/components/banner/banner";
import { Search, Users, Briefcase, Star, GraduationCap } from "lucide-react";
import { StrategicAlliances } from "@/components/strategicAlliances/StrategicAlliances";
import { AliadosCarrusel } from "@/components/strategicAlliances/AliadosCarrusel";
import Testimonios from "@/components/Testimonios/Testimonios";
import SectionTag from "@/components/SectionTag/SectionTag";
import Title from "@/components/Title/Title";

export default function TestTailwind() {
  return (
    <div className="min-h-screen">
      <Presentation />
      <AliadosCarrusel />

      {/**
      <CardsPlan />
      <AditionalServices />
      <ComparativeCard /> */}

      {/* Encabezado de sección */}
      <div
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          textAlign: "center",
          marginBottom: "3rem",
          marginTop: "var(--spacing-uplin-md)",
          padding: "0 1rem",
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
        <CardServices
          icon={<Briefcase className="w-[26px] h-[26px]" />}
          iconBg="var(--color-uplin-orange)"
          title="Consultorías"
          description="Asesoría especializada en recursos humanos para impulsar tu negocio. Te damos claridad y soluciones prácticas para enfrentar tus retos de gestión de personas."
          linkHref="/servicios/consultorias"
        />
        <CardServices
          icon={<Star className="w-[26px] h-[26px]" />}
          title="Membresías"
          description="Un plan flexible para acceder a beneficios y soporte continuo en RRHH. Acompañamos a tu organización con soluciones adaptadas a cada etapa de crecimiento."
          linkHref="/servicios/membresias"
        />
         <div className="md:col-span-2 flex justify-center">
          <CardServices
            icon={<GraduationCap className="w-[26px] h-[26px]" />}
            iconBg="var(--color-uplin-green)"
            title="Formación organizacional"
            description="Diseñamos programas de formación y consultoría para potenciar liderazgo, productividad, comunicación e inteligencia artificial en equipos y organizaciones. Adaptamos cada experiencia a los desafíos reales del negocio, combinando habilidades humanas, tecnología y aprendizaje aplicado. Trabajamos con empresas de Latinoamérica en formatos virtuales, presenciales e híbridos."
            linkHref=""
          />
        </div>
      </div>
      <Solutions />
      <StrategicAlliances />
      <Testimonios />
      <Banner />
    </div>
  );
}
