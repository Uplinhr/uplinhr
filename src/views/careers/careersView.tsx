"use client";
import { motion } from "framer-motion";

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

      <section className="font-poppins text-[#502B7D] bg-white text-center h-auto min-h-[30vh] md:min-h-[60vh] w-full flex flex-col justify-center items-center p-5 box-border">
        <h3 className="text-base md:text-lg mb-4 md:mb-5 font-normal">
          Te conectamos con las mejores startups y empresas de tecnología de
          Latam. Culturas que ponen a las personas en el centro, proyectos que
          inspiran y retos que impulsan tu desarrollo.
        </h3>
        <motion.a
          href="/careers/jobOpenings"
          className="bg-white border border-[#6C4099] text-[#6C4099] rounded-full px-4 py-2 md:px-6 md:py-3 no-underline font-bold"
          whileHover="hover"
          whileTap="tap"
          variants={buttonAnimations}
        >
          Ver vacantes disponibles
        </motion.a>
      </section>

      <section className="font-poppins text-[#502B7D] bg-[#CDBADA] text-center h-auto min-h-[60vh] md:min-h-[50vh] w-full flex flex-col justify-center items-center p-5 box-border">
        <h3 className="text-base md:text-lg mb-4 md:mb-5 font-bold">
          ¿No encontraste una vacante para ti hoy?
        </h3>

        <div className="mb-4">
          <h3 className="text-base md:text-md mb-2 font-normal">
            Déjanos tu CV y únete a nuestra base de talentos
          </h3>

          <ul className="space-y-4 text-left md:text-[14px]">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#502B7D] mr-2 rounded-full"></span>
              Te consideraremos para futuras oportunidades
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#502B7D] mr-2 rounded-full"></span>
              Recibí novedades y vacantes relacionadas a tu perfil
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#502B7D] mr-2 rounded-full"></span>
              Accede a invitaciones de eventos exclusivos de Uplin.
            </li>
          </ul>
        </div>
        <motion.a
          href="https://forms.gle/xoXqjr1dWizknQQTA"
          target="_blank"
          className="bg-[#502B7D] border border-[#502B7D] text-white rounded-full px-4 py-2 md:px-6 md:py-3 no-underline font-bold"
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
