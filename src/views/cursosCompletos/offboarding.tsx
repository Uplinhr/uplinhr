import Image from "next/image";
import { QaCursosCompletos } from "@/components/cursosCompletos/QaCursosCompletos";
import { FAQOFFBOARDING } from "@/utils/cursosCompletos/faqOffboarding";
import { CiMonitor, CiMoneyBill } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";

const Offboarding = () => {
  return (
    <>
      <section className="mb-6 w-full px-4 py-6 font-[Poppins] bg-white flex flex-col items-center gap-10">
        <div className="w-[95%] md:w-[80%] max-w-6xl mx-auto shadow-xl rounded-xl overflow-hidden bg-white flex justify-center transform hover:scale-105 ease-in-out duration-300">
          <Image
            src="/bannerIvonne.png"
            alt="Offboarding"
            width={1200}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="w-fullfont-[Poppins] bg-white flex flex-col items-center gap-10">
          <a
            href="/cursosCompletos/offboarding/elegir-pais"
            className="inline-block rounded-[15px] bg-[#502B7D] px-8 py-3 text-white font-medium font-poppins text-[14px] transform hover:scale-105 ease-in-out duration-300"
          >
            Inscribirme ahora
          </a>
        </div>

        <div className="w-[80%] max-w-6xl flex flex-col lg:flex-row gap-6">
          <div className="flex-1 border border-[#502B7D] bg-white rounded-[25px] p-6 text-[#000] font-[Poppins] text-[16px] leading-[25px] flex justify-center items-center text-justify transform hover:scale-105 ease-in-out duration-300">
            <div>
              <p className="text-[14px] font-normal leading-[25px]">
                Un offboarding estratégico no es un gasto, es una inversión que asegura la reputación de tu empresa y el bienestar de tu equipo.               
              </p>
          
            </div>
          </div>

          <div className="flex-1 border border-[##502B7D] bg-[#CDBADA] rounded-[25px] p-6 font-[Poppins] text-[#000] flex justify-center items-center transform hover:scale-105 ease-in-out duration-300">
            <div>
              <p className="text-[18px] font-medium leading-[25px] mb-4 text-center">
                ¿Por qué hacer esta certificación?
              </p>
              <p className="text-[14px] font-normal leading-[25px] text-center md:text-justify lg:text-justify">
                Esta certificación te dará las herramientas para transformar el proceso de desvinculación en una ventaja competitiva. 
              </p>
              <p className="text-[14px] font-normal leading-[25px] mt-2 text-center md:text-justify lg:text-justify">
                Aprenderás a minimizar los riesgos, proteger la marca empleadora y fortalecer la moral del equipo.
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
                Este curso te ayudará a comprender, valorar y acompañar mejor esos procesos dentro de tu equipo y tu liderazgo.
              </p>
            </div>
            <div className="w-full">
              {FAQOFFBOARDING.map((item, index) => (
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
                4 sesiones de 1 hora cada una
              </p>
            </div>

           

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
        <div className="w-[80%] mx-auto rounded-[25px] bg-gradient-to-l from-[#FFD296] to-[#F89A1C] p-0 shadow-lg min-h-[300px] flex items-end transform hover:scale-105 ease-in-out duration-300">
          <div className="flex flex-col md:flex-row w-full gap-x-10">
            <div className="relative w-[240px] h-[260px] md:w-[260px] md:h-[280px] flex-shrink-0 self-center md:self-end ml-0">
              <Image
                src="/imgIvonne.png"
                alt="Ivonne Camacho"
                fill
                className="object-cover"
                quality={100}
                priority
                style={{ objectPosition: "top" }}
              />
            </div>
            <div className="text-black flex-1 flex flex-col justify-start px-4 py-4 ml-0 md:justify-center md:px-6 md:py-8 md:ml-10">
              <h3 className="font-medium text-[18px] md:text-[20px] mb-2 md:mb-3">
                Facilitadora: Ivonne Camacho
              </h3>
              <div className="space-y-2 md:space-y-3 text-[15px] md:text-[16px] leading-snug">
                <p>
                  Es una especialista en People & Culture, HRBP y Talent Acquisition con una sólida experiencia de más de 10 años en el área de Recursos Humanos. Su trayectoria profesional se ha centrado en la adquisición de talento, el desarrollo de equipos y la gestión de la cultura organizacional en empresas de alto crecimiento en Latinoamérica.
                </p>
                <p>
                 Como cofundadora de Workify-WF, se dedica a potenciar la empleabilidad y guiar a profesionales a alcanzar sus metas de carrera. 
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="w-[80%] mx-auto flex flex-col md:flex-row justify-center items-stretch gap-6 mt-10 md:mt-8">
          <div className="flex flex-col flex-1 transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="bg-[#502B7D] text-white rounded-t-[20px] border border-[#502B7D] px-4 py-4 md:py-3">
              <h2 className="font-[600] text-[16px] leading-[24px] tracking-[-0.3px]">
                ¿Qué incluye?
              </h2>
            </div>
            <div className="bg-white rounded-b-[20px] border border-[#502B7D] px-4 py-3 md:py-2 space-y-2 flex-1 flex flex-col justify-between">
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

          <div className="flex flex-col flex-1 transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="bg-[#BB9ECA] text-black rounded-t-[20px] border border-[#502B7D] px-4 py-4 md:py-3">
              <h2 className="font-[600] text-[16px] leading-[24px] tracking-[-0.3px]">
                Este curso es para vos si eres...
              </h2>
            </div>
            <div className="bg-white rounded-b-[20px] border border-[#502B7D] px-4 py-3 md:py-2 space-y-2 flex-1 flex flex-col justify-between">
              {[
                "Analista de RRHH o especialista que busca profesionalizar los procesos de salida.",
                "Líder o gerente con personal a cargo, responsable de la experiencia de su equipo.",
                "Director o Head de RRHH enfocado en estrategias de talento y en la protección de la reputación de la empresa",
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

        <div className="w-full m-12 md:m-8 h-80 bg-[#6C4099] flex flex-col justify-center items-center gap-6 px-4">
          <p className="text-white font-poppins text-[25px] font-medium text-center">
            👉 ¡Inscribite ahora y empezá a liderar con todo lo que sos! 👈
          </p>
          <a
            href="/cursosCompletos/offboarding/elegir-pais"
            className="inline-block rounded-[15px] bg-[#CDBADA] px-8 py-3 text-black font-medium font-poppins text-[14px] transform hover:scale-105 ease-in-out duration-300"
          >
            Inscribirme ahora
          </a>
        </div>
      </section>
    </>
  );
};

export default Offboarding;
