"use client";

import React, { useEffect, useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Busqueda } from "@/interfaces";
import { FaTimes, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { FiEdit, FiChevronDown, FiCalendar, FiAlertTriangle } from "react-icons/fi";

export default function SolicitudesComponent() {
  const { fetchBusquedas, editBusqueda, deleteBusqueda, busquedas } =
    useAdminStore();

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [busquedaData, setBusquedaData] = useState({
    info_busqueda: "",
    creditos_usados: 0,
    observaciones: "",
    estado: "Pendiente",
    id_cred: 0,
  });
  const [loading, setLoading] = useState(false);

  const estados = ["Pendiente", "En proceso", "Finalizado", "Eliminado"] as const;
  const [filtroEstado, setFiltroEstado] =
    useState<(typeof estados)[number]>("Pendiente");

  useEffect(() => {
    fetchBusquedas();
  }, [fetchBusquedas]);

  useEffect(() => {
    if (showEditModal || showConfirmModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showEditModal, showConfirmModal]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openEditModal = (id: number) => {
    const busqueda = busquedas.find((b) => b.id === id);
    if (!busqueda) return;

    setSelectedId(id);
    setBusquedaData({
      info_busqueda: busqueda.info_busqueda || "",
      creditos_usados: busqueda.creditos_usados || 0,
      observaciones: busqueda.observaciones || "",
      estado: busqueda.estado || "Pendiente",
      id_cred: busqueda.id_cred || 0,
    });

    setShowEditModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId === null) return;
    setShowConfirmModal(true);
  };

  const handleEliminarClick = (id: number) => {
    setSelectedId(id);
    setBusquedaData({
      info_busqueda: "",
      creditos_usados: 0,
      observaciones: "",
      estado: "Eliminado",
      id_cred: 0,
    });
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    if (selectedId === null) return;
    setLoading(true);
    try {
      if (busquedaData.estado === "Eliminado") {
        await deleteBusqueda(selectedId);
      } else {
        await editBusqueda(selectedId, busquedaData);
      }
      setShowEditModal(false);
      setShowConfirmModal(false);
      fetchBusquedas();
    } catch (error) {
      console.error("Error al confirmar acción:", error);
    } finally {
      setLoading(false);
    }
  };

  const abrirCalendario = () => {
    window.open(
      "https://calendar.google.com/calendar/u/0/r/eventedit?state=%5Bnull%2Cnull%2Cnull%2Cnull%2C%5B13%5D%5D",
      "_blank"
    );
  };

  const filteredBusquedas = busquedas?.filter((b) => b?.estado === filtroEstado);

  return (
    <div className="p-4 md:p-6 font-poppins">
      <h1 className="text-lg md:text-2xl text-center font-bold text-white bg-[#6d4098] p-3 md:p-4 rounded-lg mb-4 md:mb-6">
        Solicitudes de búsqueda
      </h1>

      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 md:mb-6">
        {estados.map((estado) => (
          <button
            key={estado}
            onClick={() => setFiltroEstado(estado)}
            className={`px-3 py-1 md:px-4 md:py-2 rounded-md border border-[#6d4098] cursor-pointer transition-transform transform hover:scale-105 text-sm md:text-base ${
              filtroEstado === estado
                ? "bg-[#6d4098] text-white"
                : "bg-white text-[#6d4098]"
            }`}
          >
            {estado}
          </button>
        ))}
      </div>

      <div className="space-y-3 md:space-y-4">
        {filteredBusquedas.length > 0 ? (
          filteredBusquedas.map((busqueda: Busqueda) => (
            <div
              key={busqueda.id}
              className="border border-[#6d4098] rounded-xl shadow-md overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-100 p-3 md:px-4 md:py-2 gap-2">
                <span className="text-[#6d4098] font-semibold text-sm md:text-base">
                  {busqueda.usuario?.nombre} {busqueda.usuario?.apellido}: búsqueda número {busqueda.id}
                </span>
                <div className="flex items-center justify-end sm:justify-start gap-2 md:gap-3">
                  <button
                    className="flex items-center gap-1 bg-[#6d4098] text-white px-2 py-1 rounded cursor-pointer transition-transform transform hover:scale-105 text-xs md:text-sm"
                    onClick={abrirCalendario}
                  >
                    <FiCalendar className="text-xs md:text-base" />
                    <span className="hidden xs:inline">Agendar</span>
                    <span className="xs:hidden">Reunión</span>
                    <FaExternalLinkAlt className="hidden sm:inline text-xs ml-1" />
                  </button>

                  {busqueda.estado !== "Eliminado" && (
                    <>
                      {busqueda.estado === "Finalizado" ? (
                        <button
                          className="flex items-center gap-1 text-red-500 px-2 py-1 rounded cursor-pointer transition-transform transform hover:scale-110"
                          onClick={() => handleEliminarClick(busqueda.id)}
                        >
                          <FaTrash className="text-sm md:text-base" />
                        </button>
                      ) : (
                        <FiEdit
                          className="cursor-pointer text-gray-700 transition-transform transform hover:scale-110"
                          size={18}
                          onClick={() => openEditModal(busqueda.id)}
                        />
                      )}
                    </>
                  )}

                  <FiChevronDown
                    className="cursor-pointer text-gray-700 transition-transform transform hover:scale-110"
                    size={18}
                    onClick={() => toggleExpand(busqueda.id)}
                  />
                </div>
              </div>

              {expandedId === busqueda.id && (
                <div className="p-3 md:p-4 bg-white space-y-2 text-sm md:text-base">
                  {busqueda.usuario && (
                    <p className="break-words">
                      <strong>Usuario:</strong> {busqueda.usuario.email}
                    </p>
                  )}
                  <p className="break-words">
                    <strong>Info búsqueda:</strong> {busqueda.info_busqueda}
                  </p>
                  <p>
                    <strong>Créditos usados:</strong> {busqueda.creditos_usados}
                  </p>
                  <p className="break-words">
                    <strong>Observaciones:</strong> {busqueda.observaciones}
                  </p>
                  <p>
                    <strong>Estado:</strong> {busqueda.estado}
                  </p>
                  <p>
                    <strong>ID crédito:</strong> {busqueda.id_cred}
                  </p>
                  <p>
                    <strong>Fecha alta:</strong> {busqueda.fecha_alta}
                  </p>
                  <p>
                    <strong>Última modificación:</strong> {busqueda.ultima_mod}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm md:text-base">
            No hay solicitudes disponibles en este estado.
          </p>
        )}
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-poppins">
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-md max-h-[80vh] overflow-y-auto mx-4 relative z-10 shadow-lg">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-lg md:text-xl font-semibold text-[#6d4098] mb-4 text-center">
              Editar búsqueda
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comentarios
                </label>
                <textarea
                  value={busquedaData.info_busqueda}
                  maxLength={150}
                  onChange={(e) =>
                    setBusquedaData({
                      ...busquedaData,
                      info_busqueda: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-3 py-2 text-gray-600 text-sm"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Créditos Usados <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={busquedaData.creditos_usados}
                  onChange={(e) =>
                    setBusquedaData({
                      ...busquedaData,
                      creditos_usados: Number(e.target.value),
                    })
                  }
                  className="w-full border rounded-md px-3 py-2 text-gray-600 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Observaciones
                </label>
                <textarea
                  maxLength={150}
                  value={busquedaData.observaciones}
                  onChange={(e) =>
                    setBusquedaData({
                      ...busquedaData,
                      observaciones: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-3 py-2 text-gray-600 text-sm"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estado <span className="text-red-500">*</span>
                </label>
                <select
                  value={busquedaData.estado}
                  onChange={(e) =>
                    setBusquedaData({ ...busquedaData, estado: e.target.value })
                  }
                  className="w-full border rounded-md px-3 py-2 text-gray-600 text-sm cursor-pointer"
                >
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col xs:flex-row justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-2 text-sm"
                  type="submit"
                  disabled={loading}
                >
                  {loading && <ImSpinner8 className="animate-spin" />}
                  {loading ? "Procesando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-poppins">
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md mx-4 relative z-10 shadow-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#6d4098] mb-4">
              Atención
            </h2>

            <div className="flex justify-center mb-4">
              <FiAlertTriangle className="text-[#6d4098] text-4xl" />
            </div>

            <p className="text-gray-700 mb-3">
              ¿Está seguro que quiere pasar esta solicitud a{" "}
              <span className="font-semibold">{busquedaData.estado}</span>?
            </p>

            {busquedaData.estado === "Finalizado" && (
              <p className="text-[#6d4098] italic font-semibold mb-4">
                Esto consumirá créditos y no podrá revertirse.
              </p>
            )}

            {busquedaData.estado === "Eliminado" && (
              <p className="text-[#6d4098] italic font-semibold mb-4">
                No se podrá recuperar después.
              </p>
            )}

            <div className="flex flex-col xs:flex-row justify-center gap-3 mt-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm md:text-base"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="bg-green-500 cursor-pointer  text-white px-4 py-2 rounded-md hover:bg-green-600 transition text-sm md:text-base"
                disabled={loading}
              >
                {loading ? "Procesando..." : "Aceptar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
