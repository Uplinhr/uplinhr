"use client";

import React, { useEffect, useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Plan } from "@/interfaces";
import { FaTimes } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

export default function PlansComponent() {
  const { planes, fetchPlanes, createPlan, editPlan, loading } =
    useAdminStore();

  const [filter, setFilter] = useState<"todos" | "principales" | "custom">(
    "todos"
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState<Partial<Plan>>({
    nombre: "",
    creditos_mes: 0,
    meses_cred: 1,
    horas_cons: 0,
    precio: "",
    custom: false,
    active: false,
  });

  useEffect(() => {
    fetchPlanes();
  }, [fetchPlanes]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "active" || name === "custom") {
      setFormData((prev) => ({ ...prev, [name]: value === "true" }));
    } else if (name === "precio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (
      name === "creditos_mes" ||
      name === "meses_cred" ||
      name === "horas_cons"
    ) {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = (plan: Plan) => {
    const currentPlan = planes.find(p => p.id === plan.id);
  if (currentPlan) {
    setSelectedPlan(currentPlan);
    setFormData({ ...currentPlan });
    setShowEditModal(true);
  }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlan) {
      await editPlan(selectedPlan.id!, {
        nombre: formData.nombre || "",
        creditos_mes: formData.creditos_mes || 0,
        meses_cred: formData.meses_cred || 1,
        horas_cons: formData.horas_cons || 0,
        precio: formData.precio || "",
        custom: formData.custom || false,
        active: formData.active ?? false,
      });
      await fetchPlanes();
      setShowEditModal(false);
      setSelectedPlan(null);
      setFormData({});
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPlan({
      nombre: formData.nombre || "",
      creditos_mes: formData.creditos_mes || 0,
      meses_cred: formData.meses_cred || 1,
      horas_cons: formData.horas_cons || 0,
      precio: formData.precio || "",
      custom: formData.custom || false,
    });
    await fetchPlanes();
    setShowCreateModal(false);
    setFormData({});
  };

  const filteredPlanes = planes
  .filter((p) => {
    if (!p) return false;
    if (filter === "principales") return !p?.custom;
    if (filter === "custom") return p?.custom;
    return true;
  })
  .sort((a, b) => (b?.active === a?.active ? 0 : b?.active ? 1 : -1));

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  return (
    <div className="font-poppins p-6">
      <h1 className="text-xl md:text-2xl text-center font-bold text-white bg-[#6d4098] p-3 md:p-4 rounded-lg mb-4 md:mb-6">
        Lista de planes
      </h1>

      <div className="flex justify-center gap-4 mb-8">
        {(["todos", "principales", "custom"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md border border-[#6d4098] cursor-pointer ${
              filter === f
                ? "bg-[#6d4098] text-white"
                : "bg-white text-[#6d4098]"
            }`}
          >
            {f === "todos" && "Todos los planes"}
            {f === "principales" && "Planes principales"}
            {f === "custom" && "Planes Custom"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPlanes
          .filter((plan): plan is Plan => plan !== null && plan !== undefined)
          .map((plan) => (
            <div
              key={plan.id}
              className="border border-[#6d4098] rounded-xl shadow-sm p-4 flex flex-col justify-between"
            >
          
              <div className="flex gap-2 mb-2">
                {plan.active ? (
                  <span className="px-3 py-1 text-sm rounded-md bg-green-500 text-white cursor-pointer">
                    ACTIVO
                  </span>
                ) : (
                  <span className="px-3 py-1 text-sm rounded-md bg-red-500 text-white cursor-pointer">
                    INACTIVO
                  </span>
                )}
              </div>

              <h2 className="text-xl mb-1">{plan.nombre}</h2>

             
              <p className="mb-2">
                USD {plan.precio}/mes{" "}
                <span className="text-sm text-gray-500">+ impuestos</span>
              </p>

             
              <p className="italic text-sm text-gray-500 mb-4">
                Última modificación: {formatDate(plan.ultima_mod)}
              </p>

           
              <button
                onClick={() => handleEdit(plan)}
                className="bg-[#6d4098] text-white rounded-lg px-4 py-2 transition-transform hover:scale-105 cursor-pointer"
              >
                Editar plan
              </button>
            </div>
          ))}

       
        <div className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6">
          <p className="mb-4 text-gray-600">¿Deseas agregar un nuevo plan?</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#6d4098] text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform cursor-pointer"
          >
            Agregar plan
          </button>
        </div>
      </div>

     
      {showEditModal && selectedPlan && formData && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 font-poppins">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowEditModal(false)}
          ></div>
          <div className="bg-white rounded-xl p-5 w-full max-w-md mx-4 relative z-10 shadow-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              disabled={loading}
            >
              <FaTimes size={18} />
            </button>
            <h3 className="text-lg font-semibold text-[#6d4098] mb-4 text-center">
              Editar plan
            </h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              {/* campos nombre, creditos_mes, meses_cred, horas_cons, precio */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-1.5 text-sm text-gray-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Créditos mes
                  </label>
                  <input
                    type="number"
                    name="creditos_mes"
                    value={formData.creditos_mes || ""}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-1.5 text-sm text-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Meses crédito
                  </label>
                  <input
                    type="number"
                    name="meses_cred"
                    value={formData.meses_cred || ""}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-1.5 text-sm text-gray-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Horas consultoría
                  </label>
                  <input
                    type="number"
                    name="horas_cons"
                    value={formData.horas_cons || ""}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-1.5 text-sm text-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Precio
                  </label>
                  <input
                    type="text"
                    name="precio"
                    value={formData.precio || ""}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-1.5 text-sm text-gray-600"
                    required
                  />
                </div>
              </div>

              {/* estado y custom */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className={`px-2 py-1 text-xs rounded-md cursor-pointer ${
                        !!formData.active
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                      onClick={() => setFormData({ ...formData, active: true })}
                    >
                      ACTIVO
                    </button>
                    <button
                      type="button"
                      className={`px-2 py-1 text-xs rounded-md cursor-pointer ${
                        formData.active === false
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, active: false })
                      }
                    >
                      INACTIVO
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Custom
                  </label>
                  <select
                    name="custom"
                    value={formData.custom ? "true" : "false"}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-2 py-1.5 text-sm text-gray-600 cursor-pointer"
                  >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-red-500 text-white px-4 py-1.5 text-sm rounded-md hover:bg-red-600 transition cursor-pointer"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 text-white px-4 py-1.5 text-sm rounded-md hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-1"
                >
                  {loading && <ImSpinner8 className="animate-spin" size={14} />}
                  {loading ? "Procesando..." : "Confirmar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 font-poppins">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowCreateModal(false)}
          ></div>
          <div className="bg-white rounded-xl p-5 w-full max-w-md mx-4 relative z-10 shadow-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              disabled={loading}
            >
              <FaTimes size={18} />
            </button>
            <h3 className="text-lg font-semibold text-[#6d4098] mb-4 text-center">
              Crear nuevo plan
            </h3>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-1.5 text-sm text-gray-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Créditos mes
                  </label>
                  <input
                    type="number"
                    name="creditos_mes"
                    value={formData.creditos_mes || ""}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-1.5 text-sm text-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Meses crédito
                  </label>
                  <input
                    type="number"
                    name="meses_cred"
                    value={formData.meses_cred || ""}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-1.5 text-sm text-gray-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Horas consultoría
                  </label>
                  <input
                    type="number"
                    name="horas_cons"
                    value={formData.horas_cons || ""}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-1.5 text-sm text-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Precio
                  </label>
                  <input
                    type="text"
                    name="precio"
                    value={formData.precio || ""}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-1.5 text-sm text-gray-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Custom
                </label>
                <select
                  name="custom"
                  value={formData.custom ? "true" : "false"}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-2 py-1.5 text-sm text-gray-600 cursor-pointer"
                >
                  <option value="false">No</option>
                  <option value="true">Sí</option>
                </select>
              </div>

              <div className="flex justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-red-500 text-white px-4 py-1.5 text-sm rounded-md hover:bg-red-600 transition cursor-pointer"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 text-white px-4 py-1.5 text-sm rounded-md hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-1"
                >
                  {loading && <ImSpinner8 className="animate-spin" size={14} />}
                  {loading ? "Procesando..." : "Confirmar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
