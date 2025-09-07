"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminStore } from "@/store/useAdminStore";
interface InicioProps {
  setSelected: (value: string) => void;
  setMobileMenuOpen: (value: boolean) => void;
}
export default function Inicio({
  setSelected,
  setMobileMenuOpen,
}: InicioProps) {
  const {
    fetchUsers,
    fetchBusquedas,
    fetchConsultas,
    users,
    busquedas,
    consultas,
  } = useAdminStore();

  const [clientesActivos, setClientesActivos] = useState(0);
  const [solicitudesConsulta, setSolicitudesConsulta] = useState(0);
  const [solicitudesBusqueda, setSolicitudesBusqueda] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = isMobile
    ? ["/sandri_mobile.png", "/sol_mobile.png"]
    : ["/dashUserSandraDesktop.png", "/dashUserSolDesktop.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const loadData = async () => {
      await fetchUsers();
      await fetchBusquedas();
      await fetchConsultas();
    };
    loadData();
  }, [fetchUsers, fetchBusquedas, fetchConsultas]);

  useEffect(() => {
    if (users) {
      const count = users.filter((u) => u.rol === "cliente" && u.active).length;
      setClientesActivos(count);
    }
  }, [users]);

  useEffect(() => {
    if (busquedas) {
      const count = busquedas.filter((b) => b.estado === "Pendiente").length;
      setSolicitudesBusqueda(count);
    }
  }, [busquedas]);

  useEffect(() => {
    if (consultas) {
      const count = consultas.filter((c) => c.estado === "Pendiente").length;
      setSolicitudesConsulta(count);
    }
  }, [consultas]);

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full mb-6">
      <div className="w-full md:w-[30%] overflow-hidden flex-shrink-0">
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="w-full p-1"
            >
              <Image
                src={images[currentIndex]}
                alt="Carrusel"
                width={400}
                height={200}
                className="w-full h-auto object-contain scale-95 rounded-md"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full md:w-[70%] flex flex-col gap-16 mt-4 md:mt-6">
        <div className="relative rounded-xl shadow-md overflow-hidden h-[150px] w-full flex items-center justify-center">
          <Image
            src="/imgBannerDashUser.png"
            alt="Banner"
            width={1200}
            height={400}
            className="w-full h-full object-cover"
          />
          <h1 className="absolute text-xl md:text-4xl text-center font-bold text-white p-3 md:p-4 rounded-lg mb-2 md:mb-4">
            Datos Generales
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center h-[120px] flex flex-col justify-center">
            <p className="text-3xl font-bold text-[#6D4098]">
              {clientesActivos}
            </p>
            <p className="text-gray-600">Clientes Activos</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center h-[120px] flex flex-col justify-center">
            <p className="text-3xl font-bold text-[#6D4098]">
              {solicitudesConsulta}
            </p>
            <p className="text-gray-600">Nuevas Solicitudes de Consulta</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center h-[120px] flex flex-col justify-center">
            <p className="text-3xl font-bold text-[#6D4098]">
              {solicitudesBusqueda}
            </p>
            <p className="text-gray-600">Nuevas Solicitudes de Búsqueda</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <button
            onClick={() => {
              setSelected("Búsquedas");
              setMobileMenuOpen(false);
            }}
            className="bg-[#6D4098] hover:bg-[#553076] transition text-white cursor-pointer px-6 py-3 rounded-md shadow-md w-full md:w-1/2"
          >
            Gestión de Búsquedas
          </button>
          <button
            onClick={() => {
              setSelected("Consultoria");
              setMobileMenuOpen(false);
            }}
            className="bg-[#6D4098] hover:bg-[#553076] transition text-white cursor-pointer px-6 py-3 rounded-md w-full md:w-1/2"
          >
            Gestión de Consultoría
          </button>
        </div>
      </div>
    </div>
  );
}
