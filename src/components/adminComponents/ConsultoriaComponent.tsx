"use client";

import React, { useEffect, useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Consulta } from "@/interfaces";
import { FaTimes, FaTrash } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { FiEdit, FiChevronDown, FiCalendar } from "react-icons/fi";

export default function Consultoria() {
  const { fetchConsultas, editConsulta, deleteConsulta, consultas } =
    useAdminStore();

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [consultaData, setConsultaData] = useState({
    cantidad_horas: 0,
    observaciones: "",
    estado: "Pendiente",
    id_consultoria: 0,
  });
  const [loading, setLoading] = useState(false);

  const estados = [
    "Pendiente",
    "En proceso",
    "Finalizado",
    "Eliminado",
  ] as const;
  const [filtroEstado, setFiltroEstado] =
    useState<(typeof estados)[number]>("Pendiente");

  useEffect(() => {
    fetchConsultas();
  }, [fetchConsultas]);

  useEffect(() => {
    if (showEditModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showEditModal]);

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

    setLoading(true);
    try {
      await editConsulta(selectedId, consultaData);
      setShowEditModal(false);
      fetchConsultas();
    } catch (error) {
      console.error("Error al editar consulta:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id: number) => {
    setLoading(true);
    try {
      await deleteConsulta(id);
      fetchConsultas();
    } catch (error) {
      console.error("Error al eliminar consulta:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConsultas = consultas?.filter(
    (c: Consulta) => c?.estado === filtroEstado
  );

  return (
    <div className="p-6 font-poppins">
      <h1 className="text-xl md:text-2xl text-center font-bold text-white bg-[#6d4098] p-3 md:p-4 rounded-lg mb-4 md:mb-6">
        Solicitudes de consultoría
      </h1>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {estados.map((estado) => (
          <button
            key={estado}
            onClick={() => setFiltroEstado(estado)}
            className={`px-4 py-2 rounded-md border border-[#6d4098] cursor-pointer transition-transform transform hover:scale-105 ${
              filtroEstado === estado
                ? "bg-[#6d4098] text-white"
                : "bg-white text-[#6d4098]"
            }`}
          >
            {estado}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredConsultas.length > 0 ? (
          filteredConsultas.map((consulta: Consulta) => (
            <div
              key={consulta.id}
              className="border border-[#6d4098] rounded-xl shadow-md overflow-hidden"
            >
              <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
                <span className="text-[#6d4098] font-semibold">
                  Solicitud de consultoría número: {consulta.id}
                </span>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 bg-[#6d4098] text-white px-2 py-1 rounded cursor-pointer transition-transform transform hover:scale-105">
                    <FiCalendar /> Agendar reunión
                  </button>

                  {consulta.estado !== "Eliminado" && (
                    <>
                      {consulta.estado === "Finalizado" ? (
                        <button
                          className="flex items-center gap-1 text-red-500 px-2 py-1 rounded cursor-pointer transition-transform transform hover:scale-110"
                          onClick={() => handleEliminar(consulta.id)}
                        >
                          <FaTrash />
                        </button>
                      ) : (
                        <FiEdit
                          className="cursor-pointer text-gray-700 transition-transform transform hover:scale-110"
                          size={20}
                          onClick={() => openEditModal(consulta.id)}
                        />
                      )}
                    </>
                  )}

                  <FiChevronDown
                    className="cursor-pointer text-gray-700 transition-transform transform hover:scale-110"
                    size={20}
                    onClick={() => toggleExpand(consulta.id)}
                  />
                </div>
              </div>

              {expandedId === consulta.id && (
                <div className="p-4 bg-white space-y-2">
                  {consulta.user && (
                    <p>
                      <strong>Usuario:</strong> {consulta.user.nombre} (
                      {consulta.user.email})
                    </p>
                  )}
                  <p>
                    <strong>Cantidad de horas:</strong>{" "}
                    {consulta.cantidad_horas}
                  </p>
                  <p>
                    <strong>Observaciones:</strong> {consulta.observaciones}
                  </p>
                  <p>
                    <strong>Estado:</strong> {consulta.estado}
                  </p>
                  <p>
                    <strong>ID consultoría:</strong> {consulta.id_consultoria}
                  </p>
                  <p>
                    <strong>Fecha alta:</strong> {consulta.fecha_alta}
                  </p>
                  <p>
                    <strong>Última modificación:</strong> {consulta.ultima_mod}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            No hay solicitudes disponibles en este estado.
          </p>
        )}
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-poppins">
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 relative z-10 shadow-lg">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer transition-transform transform hover:scale-110"
              disabled={loading}
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-semibold text-[#6d4098] mb-6 text-center">
              Editar consulta
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
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
                  className="w-full border rounded-md px-3 py-2 text-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Observaciones
                </label>
                <input
                  type="text"
                  value={consultaData.observaciones}
                  onChange={(e) =>
                    setConsultaData({
                      ...consultaData,
                      observaciones: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-3 py-2 text-gray-600"
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
                  className="w-full border rounded-md px-3 py-2 text-gray-600 cursor-pointer"
                >
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2"
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
    </div>
  );
}
