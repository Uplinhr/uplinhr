"use client";

import React, { useEffect, useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Consulta } from "@/interfaces";
import { FaTimes, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { FiEdit, FiChevronDown, FiCalendar, FiAlertTriangle } from "react-icons/fi";

export default function Consultoria() {
  const { fetchConsultas, editConsulta, deleteConsulta, consultas } = useAdminStore();

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [consultaData, setConsultaData] = useState({
    cantidad_horas: 0,
    observaciones: "",
    estado: "Pendiente",
    id_consultoria: 0,
  });
  const [loading, setLoading] = useState(false);

  const estados = ["Pendiente", "En proceso", "Finalizado", "Eliminado"] as const;
  const [filtroEstado, setFiltroEstado] = useState<(typeof estados)[number]>("Pendiente");

  useEffect(() => {
    fetchConsultas();
  }, [fetchConsultas]);

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
    const consulta = consultas.find((c: Consulta) => c.id === id);
    if (!consulta) return;

    setSelectedId(id);
    setConsultaData({
      cantidad_horas: consulta.cantidad_horas || 0,
      observaciones: consulta.observaciones || "",
      estado: consulta.estado || "Pendiente",
      id_consultoria: consulta.id_consultoria || 0,
    });

    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId === null) return;
    setShowConfirmModal(true);
  };

  const handleEliminarClick = (id: number) => {
    setSelectedId(id);
    setConsultaData({
      cantidad_horas: 0,
      observaciones: "",
      estado: "Eliminado",
      id_consultoria: 0,
    });
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    if (selectedId === null) return;

    setLoading(true);
    try {
      if (consultaData.estado === "Eliminado") {
        await deleteConsulta(selectedId);
      } else {
        await editConsulta(selectedId, consultaData);
      }
      setShowEditModal(false);
      setShowConfirmModal(false);
      fetchConsultas();
    } finally {
      setLoading(false);
    }
  };

  const formatFechaArg = (fecha?: string | null) => {
  if (!fecha) return "";
  const fechaObj = new Date(fecha);
  return fechaObj.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};


  const filteredConsultas = consultas?.filter(
    (c: Consulta) => c?.estado === filtroEstado
  );

  const abrirCalendario = () => {
    window.open(
      "https://calendar.google.com/calendar/u/0/r/eventedit?state=%5Bnull%2Cnull%2Cnull%2Cnull%2C%5B13%5D%5D",
      "_blank"
    );
  };

  return (
    <div className="p-4 md:p-6 font-poppins">
      <h1 className="text-lg md:text-2xl text-center font-bold text-white bg-[#6d4098] p-3 md:p-4 rounded-lg mb-4 md:mb-6">
        Solicitudes de consultoría
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
        {filteredConsultas.length > 0 ? (
          filteredConsultas.map((consulta: Consulta) => (
            <div
              key={consulta.id}
              className="border border-[#6d4098] rounded-xl shadow-md overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-100 p-3 md:px-4 md:py-2 gap-2">
                <span className="text-[#6d4098] font-semibold text-sm md:text-base">
                  {consulta.usuario?.nombre} {consulta.usuario?.apellido}: consultoría número {consulta.id}
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

                  {consulta.estado !== "Eliminado" && (
                    <>
                      {consulta.estado === "Finalizado" ? (
                        <button
                          className="flex items-center gap-1 text-red-500 px-2 py-1 rounded cursor-pointer transition-transform transform hover:scale-110"
                          onClick={() => handleEliminarClick(consulta.id)}
                        >
                          <FaTrash className="text-sm md:text-base" />
                        </button>
                      ) : (
                        <FiEdit
                          className="cursor-pointer text-gray-700 transition-transform transform hover:scale-110"
                          size={18}
                          onClick={() => openEditModal(consulta.id)}
                        />
                      )}
                    </>
                  )}

                  <FiChevronDown
                    className="cursor-pointer text-gray-700 transition-transform transform hover:scale-110"
                    size={18}
                    onClick={() => toggleExpand(consulta.id)}
                  />
                </div>
              </div>

              {expandedId === consulta.id && (
                <div className="p-3 md:p-4 bg-white space-y-2 text-sm md:text-base">
                  {consulta.usuario && (
                    <p className="break-words">
                      <strong>Usuario:</strong> {consulta.usuario.email}
                    </p>
                  )}
                  <p>
                    <strong>Cantidad de horas:</strong> {consulta.cantidad_horas}
                  </p>
                  <p className="break-words">
                    <strong>Observaciones:</strong> {consulta.observaciones}
                  </p>
                  <p>
                    <strong>Comentarios:</strong> {consulta.comentarios}
                  </p>
                  <p>
                    <strong>Estado:</strong> {consulta.estado}
                  </p>
                  <p>
                    <strong>ID consultoría:</strong> {consulta.id_consultoria}
                  </p>
                  <p>
                    <strong>Fecha alta:</strong> {formatFechaArg(consulta.fecha_alta)}
                  </p>
                  <p>
                    <strong>Última modificación:</strong> {formatFechaArg(consulta.ultima_mod)}
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
              Editar consulta
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cantidad de horas <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={consultaData.cantidad_horas}
                  onChange={(e) =>
                    setConsultaData({
                      ...consultaData,
                      cantidad_horas: Number(e.target.value),
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
                  value={consultaData.observaciones}
                  onChange={(e) =>
                    setConsultaData({
                      ...consultaData,
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
                  value={consultaData.estado}
                  onChange={(e) =>
                    setConsultaData({ ...consultaData, estado: e.target.value })
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
                  className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-red-600 transition text-sm"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  className="bg-green-500 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center justify-center gap-2 text-sm"
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

          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 relative z-10 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-[#6d4098] mb-4">Atención</h2>

            <div className="flex justify-center mb-4">
              <FiAlertTriangle className="text-[#6d4098] text-4xl" />
            </div>

            <p className="text-gray-700 mb-3">
              ¿Está seguro que quiere pasar esta solicitud a{" "}
              <span className="font-semibold">{consultaData.estado}</span>?
            </p>

            {consultaData.estado === "Finalizado" && (
              <p className="text-[#6d4098] italic font-semibold mb-4">
                Esto consumirá créditos y no podrá revertirse.
              </p>
            )}

            {consultaData.estado === "Eliminado" && (
              <p className="text-[#6d4098] italic font-semibold mb-4">
                No se podrá recuperar después.
              </p>
            )}

            <div className="flex flex-col xs:flex-row justify-center gap-3 mt-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-red-600 transition text-sm"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-green-600 transition text-sm"
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
