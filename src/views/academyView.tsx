'use client'
import Image from "next/image";
import WebinarsSection from "@/components/webinars/WebinarsSection";
import { motion } from "framer-motion";
function AcademyView() {
  const buttonAnimations = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };
  return (
    <>
      <section className="w-full mt-4 py-8 md:py-10 px-4 sm:px-6 flex justify-center items-center">
        <div className="w-full md:w-[80%] lg:w-[80%] bg-[#6C4099] rounded-2xl p-6 md:p-8 text-center transition-transform duration-300 hover:scale-[1.02]">
          <h1 className="text-white font-poppins text-3xl md:text-4xl font-normal text-center mb-3 md:mb-4">
            🚀 Empezá tu recorrido en <br />
            <span className="font-semibold">UPLIN ACADEMY</span>
          </h1>
          <p className="text-white font-poppins text-base md:text-lg font-normal text-center">
            El espacio donde la estrategia en gestión de personas se transforma
            en acción
          </p>
        </div>
      </section>

      <section className="w-full px-4 py-10">
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10 max-w-6xl mx-auto">
          <div
            className="flex-1 w-full lg:max-w-[40%] rounded-[20px] p-[1.5px] transition-transform duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(180deg, #502b7d, rgba(80,43,125,0))",
            }}
          >
            <div className="bg-white rounded-[20px] h-full w-full flex items-center p-6">
              <p className="text-[18px] font-light text-black text-center w-full">
                Descubrí nuestras próximas sesiones diseñadas para ayudarte a
                escalar tu empresa, resolver desafíos reales y conectar con
                referentes del mundo HR.
              </p>
            </div>
          </div>

          <div
            className="flex-1 w-full lg:max-w-[40%] rounded-[20px] p-[1.5px] transition-transform duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(0deg, #502b7d, rgba(80,43,125,0))",
            }}
          >
            <div className="bg-white rounded-[20px] h-full w-full flex items-start p-6">
              <ul className="space-y-4 w-full">
                <li className="text-[14px] font-normal text-black pl-6 relative">
                  <span className="absolute left-0 text-[#6C4099]">✓</span>
                  Aprendé lo que realmente mueve la aguja en talento, cultura y
                  liderazgo.
                </li>
                <li className="text-[14px] font-normal text-black pl-6 relative">
                  <span className="absolute left-0 text-[#6C4099]">✓</span>
                  Participá en vivo y llevá tus preguntas directo a quienes
                  están en el campo de acción.
                </li>
                <li className="text-[14px] font-normal text-black pl-6 relative">
                  <span className="absolute left-0 text-[#6C4099]">✓</span>
                  Accedé a recursos exclusivos, pensados para quienes lideran el
                  cambio.
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        
      </section>

      <section className="px-6 py-10 flex flex-col items-center mb-12">
        <div className="text-center mb-8">
          <motion.a
          href="https://docs.google.com/forms/d/e/1FAIpQLSe-1u1lciI4qkzyE2NPhCUGueDteFfS6KVnBYhMC0srdsDMnA/viewform?usp=publish-editor"
          target="_blank"
          className="bg-[#6C4099] border b-4 border-[#6C4099] text-white rounded-full px-4 py-2 md:px-6 md:py-3 no-underline font-bold
             hover:bg-white hover:text-[#6C4099] transition-colors duration-300"
          whileHover="hover"
          whileTap="tap"
          variants={buttonAnimations}
        >
          Únete a la comunidad UPLIN
        </motion.a>
          <h1 className=" mt-8 text-2xl md:text-3xl font-bold font-[Poppins]">
            Ciclo de Charlas Uplin Academy
          </h1>
          <h3 className="text-base md:text-lg font-[Poppins] mt-2 text-gray-700">
            Eleva tu Talento y tu Liderazgo
          </h3>
        </div>

        <div className="bg-[#FDEBD3] rounded-[25px] w-full md:w-[80%] lg:w-[80%] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2 order-2 md:order-1 px-0 md:pl-6 lg:pl-10">
            <p className="text-[#000000] font-poppins text-[15px] font-normal leading-[25px]">
              En Uplin Academy, estamos convencidos de que el crecimiento de tu
              negocio empieza con el desarrollo de tu equipo. Por eso, te
              invitamos a nuestro{" "}
              <span className="font-semibold">
                ciclo de charlas gratuitas de agosto
              </span>
              , diseñado para líderes, emprendedores y profesionales de Recursos
              Humanos que buscan innovar.
              <br />
              <br />
              <span className="font-semibold">
                ¡Prepárate para transformar tu gestión de personas!
              </span>
            </p>
          </div>

          <div className="relative flex justify-center order-1 md:order-2 w-full md:w-1/2 px-4 md:px-0">
            <Image
              alt="Reunión Uplin Academy"
              src="/imgReu.jpg"
              width={600}
              height={280}
              className="w-full max-w-[400px] rounded-[25px] object-cover  transition  duration-300  ease-in-out  hover:shadow-xl  hover:scale-105"
              priority
            />
          </div>
        </div>
      </section>

      <WebinarsSection />
    </>
  );
}

export default AcademyView;
