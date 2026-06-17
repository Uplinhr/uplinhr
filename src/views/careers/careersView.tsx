"use client";
import { motion } from "framer-motion";
import { IoRocket, IoNotifications } from "react-icons/io5";
import { SlEnvolopeLetter } from "react-icons/sl";
import { PlayCircle } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";
import ServiceHero from "@/components/ServiceHero/ServiceHero";
import SectionTag from "@/components/SectionTag/SectionTag";
import { Banner } from "@/components/banner/banner";

const CareersView = () => {
  const buttonAnimations = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  // Función TTS para el header
  const handleHeaderTTS = () => {
    const text = "Uplin Careers. Conecta con oportunidades que te impulsen a crecer. Te conectamos con las mejores startups y empresas de tecnología de Latam. Culturas que ponen a las personas en el centro, proyectos que inspiran y retos que impulsan tu desarrollo.";
    speakText(text);
  };


  // Función TTS para base de talentos
  const handleTalentPoolTTS = () => {
    const text = "¿No encontraste una vacante para ti hoy? Déjanos tu CV y únete a nuestra base de talentos. Te consideraremos para futuras oportunidades. Recibí novedades y vacantes relacionadas a tu perfil. Accede a invitaciones de eventos exclusivos de Uplin.";
    speakText(text);
  };

  return (
    <main className="min-h-screen">
      <ServiceHero
      tag="Uplin Careers"
        title={{
          before: "Uplin",
          gradient: "Careers",
        }}
        description={
          <>
            <p className="lead-intro" style={{ margin: "0 0 0.5rem" }}>
              Conecta con oportunidades que te impulsen a crecer
            </p>
            Te conectamos con las mejores startups y empresas de tecnología de Latam. Culturas que ponen a las personas en el centro, proyectos que inspiran y retos que impulsan tu desarrollo.
          </>
        }
        primaryBtn={{ text: "Ver vacantes →", href: "/servicios" }}
        secondaryBtn={{ text: "Unirme a la base de talentos", href: "/contacto" }}
        image={{ src: "/busqueda_de_talento.jpeg", alt: "Búsqueda de talento" }}
        onTTS={handleHeaderTTS}
        />
      

      <section className=" flex items-center ">
        <SectionTag text="TU PROXIMO PASO" />

        
      </section>

      <section className="font-poppins text-[#502B7D] bg-white text-center h-auto min-h-[60vh] md:min-h-[50vh] w-full flex flex-col justify-center items-center p-5 box-border mt-10 mb-16">
        <div className="flex items-center justify-center gap-2 mb-6">
          <h3 className="text-base md:text-lg font-bold">
            ¿No encontraste una vacante para ti hoy?
          </h3>
          <button
            onClick={handleTalentPoolTTS}
            className="p-2 hover:bg-[#502B7D]/10 rounded-full transition-colors duration-200"
            aria-label="Escuchar base de talentos"
            title="Escuchar texto"
          >
            <PlayCircle size={24} className="text-[#502B7D]" />
          </button>
        </div>

        <h3 className="text-base md:text-md mb-8 font-normal">
          Déjanos tu CV y únete a nuestra base de talentos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          <motion.div
            whileHover="hover"
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center max-w-sm mx-auto"
            variants={{ hover: { scale: 1.05 } }}
          >
            <motion.div
              variants={{ hover: { scale: 1.3, y: -5 } }}
              className="mb-4 text-3xl text-[#502B7D]"
            >
              <IoRocket />
            </motion.div>
            <p className="text-sm md:text-base font-medium">
              Te consideraremos para futuras oportunidades
            </p>
          </motion.div>

          <motion.div
            whileHover="hover"
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center max-w-sm mx-auto"
            variants={{ hover: { scale: 1.05 } }}
          >
            <motion.div
              variants={{ hover: { scale: 1.3, y: -5 } }}
              className="mb-4 text-3xl text-[#502B7D]"
            >
              <IoNotifications />
            </motion.div>
            <p className="text-sm md:text-base font-medium">
              Recibí novedades y vacantes relacionadas a tu perfil
            </p>
          </motion.div>

          <motion.div
            whileHover="hover"
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center max-w-sm mx-auto"
            variants={{ hover: { scale: 1.05 } }}
          >
            <motion.div
              variants={{ hover: { scale: 1.3, y: -5 } }}
              className="mb-4 text-3xl text-[#502B7D]"
            >
              <SlEnvolopeLetter />
            </motion.div>
            <p className="text-sm md:text-base font-medium">
              Accede a invitaciones de eventos exclusivos de Uplin.
            </p>
          </motion.div>
        </div>

        <motion.a
          href="https://forms.gle/xoXqjr1dWizknQQTA"
          target="_blank"
          className="mt-10 bg-[#502B7D] border border-[#502B7D] text-white rounded-full px-4 py-2 md:px-6 md:py-3 no-underline font-bold"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#6C4099",
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          Unirme a la base de talentos
        </motion.a>
      </section>

      <Banner />

    </main>
  );
};

export default CareersView;
