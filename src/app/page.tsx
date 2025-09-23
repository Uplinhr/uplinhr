import Solutions from "@/views/Solutions";
import Presentation from "@/views/Presentation";
import { CardServices } from "@/components/CardServices/cardServices";
import { Banner } from "@/components/banner/banner";
import { CiSearch } from "react-icons/ci";
import { PiUsersThreeLight } from "react-icons/pi";
import { SlBriefcase } from "react-icons/sl";
import { MdOutlineCardMembership } from "react-icons/md";

export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-white ">
      <Presentation />
      <div className="relative w-full bg-gradient-to-r from-[#6C4099] to-[#502B7D] overflow-hidden">
        <div className="relative" style={{ paddingBottom: "5.208%" }}>
          {" "}
          {/* 150/1440*100 = 5.208% */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 1440 150"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              d="M0,80 C480,160 960,0 1440,80 L1440,150 L0,150 Z"
            />
          </svg>
        </div>
      </div>
      
      {/** 
      <CardsPlan />
      <AditionalServices />
      <ComparativeCard /> */}
      <h1 className="font-poppins text-[28px] text-black font-semibold text-center mb-8 mt-8">
        Servicios que apoyan la gestión y crecimiento de tu organización
      </h1>
      <CardServices
        icon={<CiSearch className="w-4 h-4 text-[#6C4099]" />}
        title="Búsqueda de talentos"
        description="Accedé a paquetes de créditos diseñados según tus necesidades. Podés simular tu plan y crear un modelo flexible y a medida para tu proceso de reclutamiento."
        linkHref="/servicios/creditos"
        imageSrc="/S-busqueda.jpeg"
        imageAlt="Busqueda de talentos"
      />
      <CardServices
        icon={<PiUsersThreeLight className="w-4 h-4 text-[#6C4099]" />}
        title="People Partner Staffing"
        description="Nos convertimos en tu socio estratégico de talento. Te acompañamos en la contratación, integración y gestión de tu equipo con un enfoque humano y cercano."
        linkHref="/servicios/ppStaffing"
        imageSrc="/S-ppstaffing.jpeg"
        imageAlt="Peple Partner Staffing"
      />
      <CardServices
        icon={<SlBriefcase className="w-4 h-4 text-[#6C4099]" />}
        title="Consultorías"
        description="Asesoría especializada en recursos humanos para impulsar tu negocio. Te damos claridad y soluciones prácticas para enfrentar tus retos de gestión de personas."
        linkHref="/servicios/consultorias"
        imageSrc="/S-consultorias.jpeg"
        imageAlt="Consultorias"
      />
      <CardServices
        icon={<MdOutlineCardMembership className="w-4 h-4 text-[#6C4099]" />}
        title="Membresías"
        description="Un plan flexible para acceder a beneficios y soporte continuo en RRHH. Acompañamos a tu organización con soluciones adaptadas a cada etapa de crecimiento."
        linkHref="/servicios/membresias"
        imageSrc="/S-membresias.jpeg"
        imageAlt="Membresías"
      />

      <Solutions />
      <Banner />
    </div>
  );
}
