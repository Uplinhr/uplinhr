"use client";
import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const UserDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-6 bg-white font-poppins min-h-screen flex flex-col items-center">
      <div className="text-center mb-6 max-w-[900px] w-full">
        <h1 className="text-3xl md:text-4xl font-bold italic text-[#6D4098] mb-2">
          Hola, {user?.nombre || ""}!
        </h1>
        <h3 className="text-md md:text-lg text-[#6D4098]">
          Nos alegra verte aquí. En Uplin podrás gestionar tus créditos,
          adquirir cursos y mucho más.
        </h3>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-8 w-full max-w-[1000px] mx-auto">
  <motion.div whileHover={{ y: -4 }} className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[40%] max-w-[340px] min-h-[140px] flex flex-col">
    <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">Fecha de registro</div>
    <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex items-center justify-center">
      <p className="text-lg font-semibold">{user?.fecha_alta ? formatDate(user.fecha_alta) : ""}</p>
    </div>
  </motion.div>

  <motion.div whileHover={{ y: -4 }} className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[40%] max-w-[340px] min-h-[140px] flex flex-col">
    <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">Plan contratado</div>
    <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex items-center justify-center">
      <p className="text-lg font-semibold">{user?.id_plan || ""}</p>
    </div>
  </motion.div>

  <motion.div whileHover={{ y: -4 }} className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[40%] max-w-[340px] min-h-[140px] flex flex-col">
    <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">Horas de consultoría restantes</div>
    <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex items-center justify-center">
      <p className="text-lg font-semibold">4 horas</p>
    </div>
  </motion.div>

  <motion.div whileHover={{ y: -4 }} className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[40%] max-w-[340px] min-h-[140px] flex flex-col">
    <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">Créditos disponibles</div>
    <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex items-center justify-center">
      <p className="text-lg font-semibold">3 créditos</p>
    </div>
  </motion.div>
</div>


      <div className="flex flex-col md:flex-row justify-center gap-3 mb-4 w-full">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center"
        >
          Iniciar solicitud de consultoría
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center"
        >
          Iniciar solicitud de búsqueda
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center"
        >
          Adquirir Servicios Adicionales
        </motion.a>
      </div>

      <div className="text-center w-full max-w-[900px]">
        <a
          href="#"
          className="text-[#6D4098] font-semibold underline hover:opacity-80"
        >
          Cambia tu contraseña aquí
        </a>
      </div>
    </div>
  );
};

export default UserDashboard;
