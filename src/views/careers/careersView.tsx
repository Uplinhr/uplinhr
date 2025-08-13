'use client'
import { motion } from 'framer-motion';

const CareersView = () => {
    const buttonAnimations = {
    hover: {
      scale: 1.05, 
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
    }
  };

  return (
    <>  
      
      <section className="font-poppins text-white bg-[radial-gradient(50%_50%_at_50%_50%,#8F68AC_0%,#6C4099_100%)] text-center h-auto min-h-[30vh] md:min-h-[40vh] w-full flex flex-col justify-center items-center p-5 box-border">
        <h1 className="text-3xl md:text-4xl font-normal text-center mb-3 md:mb-4">Encuentra el trabajo que buscás</h1>
        <h3 className="text-base md:text-lg font-normal">Si buscas trabajo ¡Uplin es tu mejor aliado!</h3>
      </section>

      <section className="font-poppins text-[#502B7D] bg-white text-center h-auto min-h-[30vh] md:min-h-[40vh] w-full flex flex-col justify-center items-center p-5 box-border">
        <h3 className="text-base md:text-lg mb-4 md:mb-5 font-normal">Consulta nuevas oportunidades diarias alineadas con tu experiencia.</h3>
          <motion.a
          href="/careers/jobOpenings"
          className="bg-white border-2 border-[#6C4099] text-[#6C4099] rounded-full px-4 py-2 md:px-6 md:py-3 no-underline font-bold"
          whileHover="hover"
          whileTap="tap"
          variants={buttonAnimations}
        >
          Descubre las vacantes disponibles aquí
        </motion.a>
      </section>

      <section className="font-poppins text-[#502B7D] bg-[#CDBADA] text-center h-auto min-h-[40vh] md:min-h-[50vh] w-full flex flex-col justify-center items-center p-5 box-border">
        <h3 className="text-base md:text-lg mb-4 md:mb-5 font-normal">¡Sube tu CV a Uplin y sé el primero en ser considerado para las mejores oportunidades en gestión de talento! 🚀</h3>
         <motion.a
          href="https://forms.gle/xoXqjr1dWizknQQTA"
          target='_blank'
          className="bg-[#502B7D] border-2 border-[#502B7D] text-white rounded-full px-4 py-2 md:px-6 md:py-3 no-underline font-bold"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#6C4099",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Carga tu CV aquí
        </motion.a>
      </section>
    </>
  );
};

export default CareersView