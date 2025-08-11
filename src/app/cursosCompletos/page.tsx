import Image from "next/image";
import { CardCurso } from "@/components/cursosCompletos/cardCurso";
import { cursosCompletos } from "@/utils/cursosCompletos/cardDetails";
import { LuTvMinimalPlay } from "react-icons/lu";
import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";

export default function CursosCompletos() {
  return (
    <div className="min-h-screen">
      <section className="bg-[#6C4099] text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1 space-y-3 md:space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="hidden md:block flex-1 h-px bg-[#6C4099]"></div>
                <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
                  Cursos Completos
                </h1>
                <div className="hidden md:block flex-1 h-px bg-[#6C4099]"></div>
              </div>
              <p className="text-lg md:text-xl text-center md:text-left">
                Domina las claves del talento con nuestros cursos de RRHH.
                ¡Aprende estrategias prácticas y lleva tu gestión al siguiente
                nivel! 🚀
              </p>
            </div>

            <div className="flex-1 mt-4 md:mt-0">
              <Image
                src="/imgBannerCursos.png"
                alt="Banner Cursos"
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-auto max-h-[250px] md:max-h-[300px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="hidden md:block flex-1 h-px bg-[#6C4099]"></div>
            <h1 className="text-2xl md:text-3xl font-bold text-center text-black">
              Beneficios
            </h1>
            <div className="hidden md:block flex-1 h-px bg-[#6C4099]"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 hover:border-[#502B7D] hover:border-opacity-30 border border-transparent group relative overflow-hidden">
                <div className="bg-[#502B7D]/10 p-3 rounded-full mb-3 group-hover:bg-[#502B7D]/20 transition-colors duration-500 group-hover:rotate-[15deg]">
                  <LuTvMinimalPlay className="text-[#502B7D] text-2xl group-hover:scale-125 transition-transform duration-300" />
                </div>
                <p className="text-sm group-hover:text-gray-800 transition-colors">
                  Acceso a las 4 sesiones en vivo
                </p>
                <div className="absolute inset-0 bg-[#502B7D] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 hover:border-[#502B7D] hover:border-opacity-30 border border-transparent group relative overflow-hidden">
                <div className="bg-[#502B7D]/10 p-3 rounded-full mb-3 group-hover:bg-[#502B7D]/20 transition-colors duration-500 group-hover:-rotate-[15deg]">
                  <IoVideocamOutline className="text-[#502B7D] text-2xl group-hover:scale-125 transition-transform duration-300" />
                </div>

                <p className="text-sm group-hover:text-gray-800 transition-colors">
                  Grabaciones isponibles por tiempo ilimitado
                </p>
                <div className="absolute inset-0 bg-[#502B7D] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 hover:border-[#502B7D] hover:border-opacity-30 border border-transparent group relative overflow-hidden">
                <div className="bg-[#502B7D]/10 p-3 rounded-full mb-3 group-hover:bg-[#502B7D]/20 transition-colors duration-500 group-hover:rotate-[15deg]">
                  <MdOutlineFileDownload className="text-[#502B7D] text-2xl group-hover:scale-125 transition-transform duration-300" />
                </div>

                <p className="text-sm group-hover:text-gray-800 transition-colors">
                  Materiales escargables y herramientas prácticas
                </p>
                <div className="absolute inset-0 bg-[#502B7D] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 hover:border-[#502B7D] hover:border-opacity-30 border border-transparent group relative overflow-hidden">
                <div className="bg-[#502B7D]/10 p-3 rounded-full mb-3group-hover:bg-[#502B7D]/20 transition-colors duration-500 group-hover:-rotate-[15deg]">
                  <FaGraduationCap className="text-[#502B7D] text-2xl group-hover:scale-125 transition-transform duration-300" />
                </div>
                <p className="text-sm group-hover:text-gray-800 transition-colors">
                  Certificado digital al completar el curso
                </p>
                <div className="absolute inset-0 bg-[#502B7D] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="hidden md:block flex-1 h-px bg-[#6C4099]"></div>
          <h1 className="text-2xl md:text-3xl font-bold text-center text-black">
            Cursos Disponibles
          </h1>
          <div className="hidden md:block flex-1 h-px bg-[#6C4099]"></div>
        </div>

        <div className="flex justify-center w-full px-4">
          <div className="flex flex-wrap justify-center gap-6 w-full max-w-[1240px]">
            {cursosCompletos.map((curso, index) => (
              <div key={index} className="flex justify-center">
                <CardCurso {...curso} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
