import Image from "next/image";
import { QaCursosCompletos } from "@/components/cursosCompletos/QaCursosCompletos";
import { FAQLIDEREQUIPO } from "@/utils/cursosCompletos/faqLiderEquipo";
import { CiMonitor, CiMoneyBill } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
/* import { PiCalendarBlankDuotone } from "react-icons/pi"; */

const LiderazgoDeEquipos = () => {
  return (
    <>
      <section className="mb-6 w-full px-4 py-6 font-[Poppins] bg-white flex flex-col items-center gap-10">
        <Image
          src="/bannerLiderazgoEquipo.png"
          alt="Certificación en Liderazgo de Equipo"
          width={1200}
          height={500}
          className="mx-auto block w-[95%] md:w-[80%] max-w-6xl transform hover:scale-105 ease-in-out duration-300"
        />
        <div className="w-fullfont-[Poppins] bg-white flex flex-col items-center gap-10">
          <a
            href="/cursosCompletos/liderazgoDeEquipos/elegir-pais"
            className="inline-block rounded-[15px] bg-[#502B7D] px-8 py-3 text-white font-medium font-poppins text-[14px] transform hover:scale-105 ease-in-out duration-300"
          >
            Inscribirme ahora
          </a>
        </div>

        <div className="w-[80%] max-w-6xl flex flex-col lg:flex-row gap-6">
          <div className="flex-1 border border-[#72BF58] bg-white rounded-[25px] p-6 text-[#000] font-[Poppins] text-[16px] leading-[25px] flex justify-center items-center text-justify transform hover:scale-105 ease-in-out duration-300">
            <div>
              <p className="text-[14px] font-normal leading-[25px]">
                En un mundo donde los equipos necesitan adaptarse rápido y
                rendir al máximo, el liderazgo no se trata solo de dirigir, sino
                de inspirar, comunicar con claridad, gestionar emociones y
                resolver conflictos de manera efectiva.
              </p>
              <br />
              <p className="text-[14px] font-normal leading-[25px]">
                🚀 Liderá con confianza, inteligencia emocional y habilidades de
                alto impacto
              </p>
            </div>
          </div>

          <div className="flex-1 border border-[#72BF58] bg-[#D2E8C9] rounded-[25px] p-6 font-[Poppins] text-[#000] flex justify-center items-center transform hover:scale-105 ease-in-out duration-300">
            <div>
              <p className="text-[18px] font-medium leading-[25px] mb-4 text-center">
                <span>¿Por qué hacer esta certificación?</span>
              </p>
              <p className="text-[14px] font-normal leading-[25px] text-center md:text-justify lg:text-justify">
                Este programa te brinda herramientas prácticas, estrategias
                probadas y habilidades clave para liderar equipos motivados,
                cohesionados y orientados a resultados sostenibles, sin importar
                el sector o el tamaño de tu organización.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-auto w-full bg-white">
        <div className="w-[80%] mx-auto mb-14 md:mb-10">
          <div className="w-full rounded-[25px] border-2 border-[#A482BB] bg-white overflow-hidden shadow-lg">
            <div className="w-full bg-[#CDBADA] py-3 md:py-2 border-b border-[#A482BB]">
              <p className="text-black px-6 font-poppins text-[16px] font-medium">
                Este curso te ayudará a comprender, valorar y acompañar mejor
                esos procesos dentro de tu equipo y tu liderazgo.
              </p>
            </div>
            <div className="w-full">
              {FAQLIDEREQUIPO.map((item, index) => (
                <QaCursosCompletos
                  key={`general-${index}`}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-[80%] mx-auto my-8 md:my-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="min-h-[120px] rounded-[25px] bg-white shadow-[0_3px_7px_0_rgba(0,0,0,0.25)] p-4 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform ease-in-out duration-300">
              <CiMonitor className="text-[#502B7D]" size={24} />
              <p className="text-[#502B7D] font-poppins text-[16px] font-semibold mt-2 md:mt-1">
                Formato
              </p>
              <p className="font-poppins text-[14px] font-light mt-1 md:mt-0.5">
                Online
              </p>
            </div>

            <div className="min-h-[120px] rounded-[25px] bg-white shadow-[0_3px_7px_0_rgba(0,0,0,0.25)] p-4 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform ease-in-out duration-300">
              <IoTimeOutline className="text-[#502B7D]" size={24} />
              <p className="text-[#502B7D] font-poppins text-[16px] font-semibold mt-2 md:mt-1">
                Duración
              </p>
              <p className="font-poppins text-[14px] font-light mt-1 md:mt-0.5">
                4 sesiones de 1h cada una
              </p>
            </div>

            {/* <div className="min-h-[120px] rounded-[25px] bg-white shadow-[0_3px_7px_0_rgba(0,0,0,0.25)] p-4 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform ease-in-out duration-300">
              <PiCalendarBlankDuotone className="text-[#6D4098]" size={24} />
              <p className="text-[#502B7D] font-poppins text-[16px] font-semibold mt-2 md:mt-1">
                Inicia
              </p>
              <div className="flex flex-col items-center">
                <p className="font-poppins text-[14px] font-light">
                  Lunes 25 de agosto
                </p>
                <p className="font-poppins text-[12px] font-light text-[#BB9ECA] mt-1 md:mt-0.5">
                  cada lunes durante 4 semanas
                </p>
              </div>
            </div> */}

            <div className="min-h-[120px] rounded-[25px] bg-white shadow-[0_3px_7px_0_rgba(0,0,0,0.25)] p-4 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform ease-in-out duration-300">
              <CiMoneyBill className="text-[#502B7D]" size={24} />
              <p className="text-[#502B7D] font-poppins text-[16px] font-semibold mt-2 md:mt-1">
                Inversión
              </p>
              <p className="font-poppins text-[14px] font-light mt-1 md:mt-0.5">
                Precio general: USD 90
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full font-poppins bg-white flex flex-col items-center my-8">
        <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto rounded-[25px] bg-gradient-to-l from-[#D2E8C9] to-[#72BF58] shadow-lg min-h-[300px] md:min-h-[350px] flex items-end overflow-hidden transform hover:scale-105 ease-in-out duration-300">
          <div className="flex flex-col md:flex-row w-full h-full">
            
            <div className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[280px] flex-shrink-0 mx-auto mt-4 md:mx-0 md:mt-0 md:self-end md:ml-4 lg:ml-6">
              <Image
                src="/ImgMelissa.png"
                alt="Melisa img"
                fill
                className="object-contain object-bottom"
                quality={100}
                sizes="(max-width: 640px) 200px, (max-width: 768px) 220px, 260px"
              />
            </div>

            
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-5 md:px-6 py-5 md:py-8 text-black">
              <h3 className="font-medium text-[17px] sm:text-[18px] md:text-[20px] lg:text-[22px] mb-3 md:mb-4">
                Facilitadora: Melisa Restrepo
              </h3>
              <div className="space-y-2 sm:space-y-3 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
                <p>
                  Coach y mentora, líder en Sales & Customer Success. Experta en
                  escalar Equipos Comerciales y maximizar la Retención de
                  clientes, con más de 12 años impulsando el crecimiento
                  acelerado de startups y compañías digitales.
                </p>
                <p>
                  Domino la implementación de estructuras comerciales desde
                  cero, así como la optimización de procesos para mejorar
                  conversión, retención y expansión de ingresos.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[80%] mx-auto flex flex-col md:flex-row justify-center items-stretch gap-6 mt-10 md:mt-8">
          <div className="flex flex-col flex-1 transition-transform duration-300 ease-in-out hover:scale-105 md:min-h-[300px]">
            <div className="bg-[#502B7D] text-white rounded-t-[20px] border border-[#502B7D] px-4 py-4 md:py-3">
              <h2 className="font-[600] text-[16px] leading-[24px] tracking-[-0.3px]">
                ¿Qué incluye?
              </h2>
            </div>
            <div className="bg-white rounded-b-[20px] border border-[#502B7D] px-4 py-3 md:py-2 space-y-2 flex flex-col h-full">
              {[
                "Acceso a las 4 sesiones en vivo.",
                "Grabaciones disponibles por tiempo ilimitado.",
                "Materiales descargables y herramientas prácticas.",
                "Certificado digital al completar el curso.",
                "Comunidad para networking y acompañamiento.",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 min-h-[38px]">
                  <span className="text-[#502B7D] text-[14px]">✔️</span>
                  <p className="text-black leading-[21px] tracking-[-0.3px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col flex-1 transition-transform duration-300 ease-in-out hover:scale-105 md:min-h-[300px]">
            <div className="bg-[#BB9ECA] text-black rounded-t-[20px] border border-[#502B7D] px-4 py-4 md:py-3">
              <h2 className="font-[600] text-[16px] leading-[24px] tracking-[-0.3px]">
                Este curso es para vos si...
              </h2>
            </div>
            <div className="bg-white rounded-b-[20px] border border-[#502B7D] px-4 py-3 md:py-4 flex flex-col h-full">
              <div className="space-y-2">
                {[
                  "Liderás o querés liderar equipos de cualquier área o industria.",
                  "Buscás desarrollar tu autoconfianza y liderazgo auténtico.",
                  "Querés mejorar tu comunicación, motivar y resolver conflictos de forma constructiva.",
                  "Aspirás a construir un equipo cohesionado, autónomo y de alto rendimiento.",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 min-h-[38px]">
                    <span className="text-[#502B7D] text-[14px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 16.25C13.4518 16.25 16.25 13.4518 16.25 10C16.25 6.54822 13.4518 3.75 10 3.75C6.54822 3.75 3.75 6.54822 3.75 10C3.75 13.4518 6.54822 16.25 10 16.25Z"
                          fill="#A482BB"
                        />
                        <path
                          d="M10 18.75C8.26942 18.75 6.57769 18.2368 5.13876 17.2754C3.69983 16.3139 2.57832 14.9473 1.91606 13.3485C1.25379 11.7496 1.08051 9.9903 1.41813 8.29296C1.75575 6.59563 2.58911 5.03653 3.81282 3.81282C5.03653 2.58911 6.59563 1.75575 8.29296 1.41813C9.9903 1.08051 11.7496 1.25379 13.3485 1.91606C14.9473 2.57832 16.3139 3.69983 17.2754 5.13876C18.2368 6.57769 18.75 8.26942 18.75 10C18.7474 12.3198 17.8246 14.5439 16.1843 16.1843C14.5439 17.8246 12.3198 18.7474 10 18.75ZM10 2.5C8.51664 2.5 7.0666 2.93987 5.83323 3.76398C4.59986 4.58809 3.63856 5.75943 3.07091 7.12988C2.50325 8.50032 2.35473 10.0083 2.64411 11.4632C2.9335 12.918 3.64781 14.2544 4.6967 15.3033C5.7456 16.3522 7.08197 17.0665 8.53683 17.3559C9.99168 17.6453 11.4997 17.4968 12.8701 16.9291C14.2406 16.3614 15.4119 15.4001 16.236 14.1668C17.0601 12.9334 17.5 11.4834 17.5 10C17.4977 8.01159 16.7068 6.10528 15.3007 4.69926C13.8947 3.29324 11.9884 2.50232 10 2.5Z"
                          fill="#A482BB"
                        />
                      </svg>
                    </span>
                    <p className="text-black leading-[21px] tracking-[-0.3px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full m-12 md:m-8 h-80 bg-[#6C4099] flex flex-col justify-center items-center gap-6 px-4">
          <p className="text-white font-poppins text-[25px] font-medium text-center">
            👉 ¡Inscribite ahora y empezá a liderar con todo lo que sos! 👈
          </p>
          <a
            href="/cursosCompletos/liderazgoDeEquipos/elegir-pais"
            className="inline-block rounded-[15px] bg-[#CDBADA] px-8 py-3 text-black font-medium font-poppins text-[14px] transform hover:scale-105 ease-in-out duration-300"
          >
            Inscribirme ahora
          </a>
        </div>
      </section>
    </>
  );
};

export default LiderazgoDeEquipos;
