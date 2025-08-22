"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordsMatch =
    newPassword.length > 0 && confirmPassword.length > 0
      ? newPassword === confirmPassword
      : true;

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
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[40%] max-w-[340px] min-h-[140px] flex flex-col"
        >
          <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">
            Fecha de registro
          </div>
          <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex items-center justify-center">
            <p className="text-lg font-semibold">
              {user?.fecha_alta ? formatDate(user.fecha_alta) : ""}
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[40%] max-w-[340px] min-h-[140px] flex flex-col"
        >
          <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">
            Plan contratado
          </div>
          <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex items-center justify-center">
            <p className="text-lg font-semibold">{user?.plan?.nombre || ""}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[40%] max-w-[340px] min-h-[140px] flex flex-col"
        >
          <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">
            Horas de consultoría restantes
          </div>
          <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex items-center justify-center">
            <p className="text-lg font-semibold">
              {user?.consultorias?.horas_restantes || ""} horas
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[40%] max-w-[340px] min-h-[140px] flex flex-col"
        >
          <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">
            Créditos disponibles
          </div>
          <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex items-center justify-center">
            <p className="text-lg font-semibold">
              {user?.creditos?.reduce(
                (total, c) => total + (c.cantidad || 0),
                0
              ) || 0}{" "}
              créditos
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-3 mb-4 w-full">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center cursor-pointer"
        >
          Iniciar solicitud de consultoría
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center cursor-pointer"
        >
          Iniciar solicitud de búsqueda
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center cursor-pointer"
        >
          Adquirir Servicios Adicionales
        </motion.a>
      </div>

      <div className="text-center w-full max-w-[900px]">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[#6D4098] font-semibold underline hover:opacity-80 cursor-pointer hover:cursor-pointer"
        >
          Cambia tu contraseña aquí
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-70"></div>

          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl z-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-[#6D4098] cursor-pointer hover:opacity-70"
            >
              <IoMdClose size={24} />
            </button>

            <h2 className="text-xl font-semibold text-[#6D4098] mb-4 text-center">
              Cambiar Contraseña
            </h2>

            <div className="relative mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-[#6D4098] font-poppins font-normal mb-2"
              >
                Contraseña actual
              </label>
              <input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#6D4098] text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d] pr-12"
                placeholder="Ingresa tu contraseña actual"
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? (
                  <IoEyeSharp size={20} />
                ) : (
                  <FaEyeSlash size={20} />
                )}
              </button>
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="newPassword"
                className="block text-[#6D4098] font-poppins font-normal mb-2"
              >
                Nueva contraseña
              </label>
              <input
                id="newPassword"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#6D4098] text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d] pr-12"
                placeholder="Ingresa tu nueva contraseña"
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <IoEyeSharp size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-[#6D4098] font-poppins font-normal mb-2"
              >
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white border ${
                  passwordsMatch ? "border-[#6D4098]" : "border-red-500"
                } text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d] pr-12`}
                placeholder="Confirma tu nueva contraseña"
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <IoEyeSharp size={20} />
                ) : (
                  <FaEyeSlash size={20} />
                )}
              </button>
              {!passwordsMatch && (
                <p className="text-red-500 text-sm mt-1">
                  Las contraseñas no coinciden
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center cursor-pointer"
            >
              Cambiar Contraseña
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
