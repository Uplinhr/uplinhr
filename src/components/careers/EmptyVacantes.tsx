"use client";
import { motion } from "framer-motion";

export default function EmptyVacantes() {
  return (
    <section className="flex flex-col items-center gap-6 px-4 py-8">
      <p className="text-[#6C4099] text-lg font-semibold text-center">
        Hoy no tenemos vacantes disponibles
      </p>

      <div className="font-poppins text-center max-w-xl w-full bg-white/5 rounded-lg shadow-lg flex flex-col items-center gap-6 p-6">
        <h3 className="text-base md:text-lg font-normal text-[#6C4099] leading-relaxed">
          Déjanos tu CV y se parte de nuestra base de talentos.
        </h3>

        <ul className="space-y-4 text-left w-full max-w-md text-[#6C4099]">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-[#502B7D] rounded-full mr-3" />
            Te consideraremos para futuras oportunidades
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-[#502B7D] rounded-full mr-3" />
            Recibí novedades y vacantes relacionadas a tu perfil
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-[#502B7D] rounded-full mr-3" />
            Accede a invitaciones de eventos exclusivos de Uplin.
          </li>
        </ul>

        <motion.a
          href="https://forms.gle/xoXqjr1dWizknQQTA"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#502B7D] border-2 border-[#502B7D] text-white rounded-full px-4 py-2 md:px-6 md:py-3 no-underline font-bold cursor-pointer"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#6C4099",
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          Quiero unirme a la base de talentos
        </motion.a>
      </div>
    </section>
  );
}
