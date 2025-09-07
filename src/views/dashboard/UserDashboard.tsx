"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import {
  ConsultaRequest,
  BusquedaRequest,
} from "@/services/userService";

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
  const { postConsulta, postBusqueda } = useUserStore();

  const [isModalConsultaOpen, setIsModalConsultaOpen] = useState(false);
  const [cantidadHoras, setCantidadHoras] = useState<number>(0);
  const [comentarios, setComentarios] = useState("");
  const [isModalBusquedaOpen, setIsModalBusquedaOpen] = useState(false);
  const [infoBusqueda, setInfoBusqueda] = useState("");

  const handleSubmitConsulta = async () => {
    if (cantidadHoras <= 0) {
      toast.error("Debes ingresar una cantidad de horas válida");
      return;
    }
    if (!user?.consultorias?.id) {
      toast.error("No se encontró la consultoría del usuario");
      return;
    }

    const body: ConsultaRequest = {
      cantidad_horas: cantidadHoras,
      comentarios,
      id_consultoria: user.consultorias?.id,
    };

    try {
      await postConsulta(body);
      toast.success("Solicitud de consultoría enviada correctamente");
      setIsModalConsultaOpen(false);
      setCantidadHoras(0);
      setComentarios("");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      toast.error(message);
    }
  };

  const handleSubmitBusqueda = async () => {
    if (!infoBusqueda.trim()) {
      toast.error("Debes ingresar la información de búsqueda");
      return;
    }
    if (!user?.creditos?.[0]?.id) {
      toast.error("No se encontró el crédito del usuario");
      return;
    }

    const body: BusquedaRequest = {
      info_busqueda: infoBusqueda,
      id_cred: user.creditos[0].id,
    };

    try {
      await postBusqueda(body);
      toast.success("Solicitud de búsqueda enviada correctamente");
      setIsModalBusquedaOpen(false);
      setInfoBusqueda("");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      toast.error(message);
    }
  };

  return (
    <div className="p-6 bg-white font-poppins min-h-screen flex flex-col items-center">
      <div className="text-center mb-6 max-w-[900px] w-full">
        <h1 className="text-3xl md:text-4xl font-bold italic text-[#6D4098] mb-2">
          Hola, {user?.nombre || ""}
        </h1>
        <h3 className="text-md md:text-lg text-[#6D4098]">
          Nos alegra verte aquí. En Uplin podrás gestionar tus créditos,
          adquirir cursos y mucho más.
        </h3>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mb-8 w-full max-w-[1000px] mx-auto">
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[30%] max-w-[340px] min-h-[140px] flex flex-col"
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
          className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[30%] max-w-[340px] min-h-[140px] flex flex-col"
        >
          <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">
            Créditos disponibles
          </div>
          <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex flex-col items-center justify-center">
            <p className="text-lg font-semibold">
              {user?.creditos?.reduce(
                (total, c) => total + (c.cantidad || 0),
                0
              ) || 0}{" "}
              créditos
            </p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[30%] max-w-[340px] min-h-[140px] flex flex-col"
        >
          <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">
            Horas de consultoría restantes
          </div>
          <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex items-center justify-center">
            <p className="text-lg font-semibold">
              {user?.consultorias?.horas_restantes || 0} horas
            </p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[30%] max-w-[340px] min-h-[140px] flex flex-col"
        >
          <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">
            Plan contratado
          </div>
          <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex items-center justify-center">
            <p className="text-lg font-semibold">
              {user?.plan?.nombre || "Sin plan"}
            </p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[12px] not-last:shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[30%] max-w-[340px] min-h-[140px] flex flex-col"
        >
          <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">
            Créditos por vencerse
          </div>
          <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex flex-col items-center justify-center">
            <p className="text-lg font-semibold">
              {user?.creditos?.reduce(
                (total, c) => total + (c.cantidad || 0),
                0
              ) || 0}{" "}
              créditos
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Vence:{" "}
              {user?.creditos?.[0]?.vencimiento
                ? formatDate(user.creditos[0].vencimiento)
                : "-"}
            </p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-[45%] md:w-[30%] max-w-[340px] min-h-[140px] flex flex-col"
        >
          <div className="bg-[#6D4098] text-white p-3 text-center text-sm font-semibold rounded-t-[12px]">
            Horas de consultoría por vencerse
          </div>
          <div className="bg-white text-[#6D4098] p-6 text-center flex-1 flex flex-col items-center justify-center">
            <p className="text-lg font-semibold">
              {user?.consultorias?.horas_restantes || 0} horas
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Vence:{" "}
              {user?.consultorias?.vencimiento
                ? formatDate(user.consultorias?.vencimiento)
                : "-"}
            </p>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-3 mb-4 w-full">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalConsultaOpen(true)}
          className="bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center cursor-pointer"
        >
          Iniciar solicitud de consultoría
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalBusquedaOpen(true)}
          className="bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center cursor-pointer"
        >
          Iniciar solicitud de búsqueda
        </motion.button>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://app.uplinhr.com/adquirir-servicios-adicionales"
          target="_blank"
          className="bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center cursor-pointer"
        >
          Adquirir Servicios Adicionales
        </motion.a>
      </div>
      <div className="text-center w-full max-w-[900px]"></div>

      {isModalConsultaOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={() => setIsModalConsultaOpen(false)}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl z-10 mx-4">
            <button
              onClick={() => setIsModalConsultaOpen(false)}
              className="absolute top-3 right-3 text-[#6D4098] cursor-pointer hover:opacity-70"
            >
              <IoMdClose size={24} />
            </button>

            <h2 className="text-xl font-semibold text-[#6D4098] mb-4 text-center">
              Solicitud de Consultoría
            </h2>

            <div className="mb-4">
              <label
                htmlFor="cantidadHoras"
                className="block text-[#6D4098] font-normal mb-2"
              >
                Cantidad de horas
              </label>
              <input
                id="cantidadHoras"
                type="number"
                min={1}
                value={cantidadHoras}
                onChange={(e) => setCantidadHoras(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#6D4098] text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d]"
                placeholder="Ingresa cantidad de horas"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="comentarios"
                className="block text-[#6D4098] font-normal mb-2"
              >
                Comentarios
              </label>
              <textarea
                maxLength={150}
                id="comentarios"
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#6D4098] text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d]"
                placeholder="Agrega tus comentarios"
              />
            </div>

            <div className="flex justify-between gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalConsultaOpen(false)}
                className="flex-1 bg-gray-300 border border-gray-400 py-2 px-5 rounded-lg text-black font-semibold text-center cursor-pointer"
              >
                Cancelar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitConsulta}
                className="flex-1 bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center cursor-pointer"
              >
                Enviar Solicitud
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {isModalBusquedaOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={() => setIsModalBusquedaOpen(false)}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl z-10 mx-4">
            <button
              onClick={() => setIsModalBusquedaOpen(false)}
              className="absolute top-3 right-3 text-[#6D4098] cursor-pointer hover:opacity-70"
            >
              <IoMdClose size={24} />
            </button>

            <h2 className="text-xl font-semibold text-[#6D4098] mb-4 text-center">
              Solicitud de Búsqueda
            </h2>

            <div className="mb-4">
              <label
                htmlFor="infoBusqueda"
                className="block text-[#6D4098] font-normal mb-2"
              >
                Información de búsqueda
              </label>
              <textarea
                id="infoBusqueda"
                maxLength={150}
                value={infoBusqueda}
                onChange={(e) => setInfoBusqueda(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#6D4098] text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d]"
                placeholder="Describe la información que deseas buscar"
              />
            </div>

            <div className="flex justify-between gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalBusquedaOpen(false)}
                className="flex-1 bg-red-500 border border-red-600 py-2 px-5 rounded-lg text-white font-semibold text-center cursor-pointer"
              >
                Cancelar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitBusqueda}
                className="flex-1 bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center cursor-pointer"
              >
                Enviar Solicitud
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;