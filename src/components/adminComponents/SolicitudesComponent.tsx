"use client";

import React, { useEffect, useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Busqueda } from "@/interfaces";
import { FaTimes, FaTrash } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { FiEdit, FiChevronDown, FiCalendar } from "react-icons/fi";

export default function SolicitudesComponent() {
  const { fetchBusquedas, editBusqueda, deleteBusqueda, busquedas } =
    useAdminStore();

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [busquedaData, setBusquedaData] = useState({
    info_busqueda: "",
    creditos_usados: 0,
    observaciones: "",
    estado: "Pendiente",
    id_cred: 0,
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
    fetchBusquedas();
  }, [fetchBusquedas]);

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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId === null) return;

    setLoading(true);
    try {
      await editBusqueda(selectedId, busquedaData);
      setShowEditModal(false);
      fetchBusquedas();
    } catch (error) {
      console.error("Error al editar búsqueda:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id: number) => {
    setLoading(true);
    try {
      await deleteBusqueda(id);
      fetchBusquedas();
    } catch (error) {
      console.error("Error al eliminar búsqueda:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBusquedas = busquedas?.filter(
    (b) => b?.estado === filtroEstado
  );

  return (
    <div className="p-6 font-poppins">
      <h1 className="text-xl md:text-2xl text-center font-bold text-white bg-[#6d4098] p-3 md:p-4 rounded-lg mb-4 md:mb-6">
        Solicitudes de búsqueda
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
        {filteredBusquedas.length > 0 ? (
          filteredBusquedas.map((busqueda: Busqueda) => (
            <div
              key={busqueda.id}
              className="border border-[#6d4098] rounded-xl shadow-md overflow-hidden"
            >
              <div className="flex items-center justify-between bg-gray-100 px-4 py-2 cursor-pointer">
                <span className="text-[#6d4098] font-semibold">
                  Solicitud de búsqueda número: {busqueda.id}
                </span>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 bg-[#6d4098] text-white px-2 py-1 rounded cursor-pointer transition-transform transform hover:scale-105">
                    <FiCalendar /> Agendar reunión
                  </button>

                  {busqueda.estado !== "Eliminado" && (
                    <>
                      {busqueda.estado === "Finalizado" ? (
                        <button
                          className="flex items-center gap-1 text-red-500 px-2 py-1 rounded cursor-pointer transition-transform transform hover:scale-110"
                          onClick={() => handleEliminar(busqueda.id)}
                        >
                          <FaTrash />
                        </button>
                      ) : (
                        <FiEdit
                          className="cursor-pointer text-gray-700 transition-transform transform hover:scale-110"
                          size={20}
                          onClick={() => openEditModal(busqueda.id)}
                        />
                      )}
                    </>
                  )}

                  <FiChevronDown
                    className="cursor-pointer text-gray-700 transition-transform transform hover:scale-110"
                    size={20}
                    onClick={() => toggleExpand(busqueda.id)}
                  />
                </div>
              </div>

              {expandedId === busqueda.id && (
                <div className="p-4 bg-white space-y-2">
                  {busqueda.user && (
                    <p>
                      <strong>Usuario:</strong> {busqueda.user.nombre} (
                      {busqueda.user.email})
                    </p>
                  )}
                  <p>
                    <strong>Info búsqueda:</strong> {busqueda.info_busqueda}
                  </p>
                  <p>
                    <strong>Créditos usados:</strong> {busqueda.creditos_usados}
                  </p>
                  <p>
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
          <p className="text-center text-gray-400">
            No hay solicitudes disponibles en este estado.
          </p>
        )}
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-poppins">
          <div className="absolute inset-0 bg-black opacity-40 pointer-events-auto"></div>

          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 relative z-10 shadow-lg pointer-events-auto">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer transition-transform transform hover:scale-110"
              disabled={loading}
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-semibold text-[#6d4098] mb-6 text-center">
              Editar búsqueda
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comentarios
                </label>
                <input
                  type="text"
                  value={busquedaData.info_busqueda}
                  onChange={(e) =>
                    setBusquedaData({
                      ...busquedaData,
                      info_busqueda: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-3 py-2 text-gray-600 transition-transform transform hover:scale-105"
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
                  className="w-full border rounded-md px-3 py-2 text-gray-600 transition-transform transform hover:scale-105"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Observaciones
                </label>
                <input
                  type="text"
                  value={busquedaData.observaciones}
                  onChange={(e) =>
                    setBusquedaData({
                      ...busquedaData,
                      observaciones: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-3 py-2 text-gray-600 transition-transform transform hover:scale-105"
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
                  className="w-full border rounded-md px-3 py-2 text-gray-600 transition-transform transform hover:scale-105"
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
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-transform transform hover:scale-105 cursor-pointer"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
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
