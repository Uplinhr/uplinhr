"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoRocket, IoNotifications } from "react-icons/io5";
import { SlEnvolopeLetter } from "react-icons/sl";

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

  return (
    <>
      <section className="font-poppins text-white bg-[radial-gradient(50%_50%_at_50%_50%,#8F68AC_0%,#6C4099_100%)] text-center h-auto min-h-[30vh] md:min-h-[60vh] w-full flex flex-col justify-center items-center p-5 box-border">
        <h1 className="text-3xl md:text-4xl font-normal text-center mb-3 md:mb-4">
          Uplin Careers
        </h1>
        <h3 className="text-base md:text-lg font-normal">
          Conecta con oportunidades que te impulsen a crecer
        </h3>
      </section>

      <section className="font-poppins text-[#502B7D] bg-white text-center md:text-left h-auto min-h-[30vh] md:min-h-[60vh] w-full flex items-center p-5 box-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-6xl mx-auto">
          <div className="flex justify-center md:justify-center order-1 md:order-2">
            <Image
              src="/careersImg.jpg"
              alt="Careers"
              width={600}
              height={600}
              className="w-72 h-56 md:w-[28rem] md:h-80 rounded-2xl object-cover"
            />
          </div>

          <div className="flex flex-col justify-center items-center md:items-start order-2 md:order-1">
            <h3 className="text-base md:text-lg mb-4 md:mb-5 font-normal">
              Te conectamos con las mejores startups y empresas de tecnología de
              Latam. Culturas que ponen a las personas en el centro, proyectos
              que inspiran y retos que impulsan tu desarrollo.
            </h3>
            <motion.a
              href="/careers/jobOpenings"
              className="bg-white border border-[#6C4099] text-[#6C4099] rounded-full px-4 py-2 md:px-6 md:py-3 no-underline font-bold
             hover:bg-[#6C4099] hover:text-white transition-colors duration-300"
              whileHover="hover"
              whileTap="tap"
              variants={buttonAnimations}
            >
              Ver vacantes disponibles
            </motion.a>
          </div>
        </div>
      </section>

      <section className="font-poppins text-[#502B7D] bg-white text-center h-auto min-h-[60vh] md:min-h-[50vh] w-full flex flex-col justify-center items-center p-5 box-border mt-10 mb-16">
        <h3 className="text-base md:text-lg mb-6 font-bold">
          ¿No encontraste una vacante para ti hoy?
        </h3>

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
    </>
  );
};

export default CareersView;
