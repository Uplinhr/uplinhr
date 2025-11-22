import React, { useState, useEffect } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { MembershipPlan } from "@/interfaces";
import { toast } from "sonner";

const MembershipsComponent: React.FC = () => {
  const { membershipPlans, fetchMembershipPlans, upsertMembershipPlan, loading } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Partial<MembershipPlan> | null>(null);

  useEffect(() => {
    fetchMembershipPlans();
  }, []);

  const handleEdit = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedPlan({
      code: "",
      name: "",
      priceMonthly: 0,
      currency: "USD",
      creditsPerMonth: 0,
      rolloverMonths: 0,
      benefits: [],
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    try {
      // Parse benefits if it's a string (from textarea)
      let benefitsToSave = selectedPlan.benefits;
      if (typeof benefitsToSave === 'string') {
        try {
            benefitsToSave = JSON.parse(benefitsToSave);
        } catch (error) {
            toast.error("El formato de beneficios debe ser un JSON válido");
            return;
        }
      }

      await upsertMembershipPlan({
        ...selectedPlan,
        benefits: benefitsToSave
      });
      toast.success("Plan de membresía guardado exitosamente");
      handleCloseModal();
    } catch (error) {
      toast.error("Error al guardar el plan");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!selectedPlan) return;
    const { name, value, type } = e.target;
    
    let finalValue: any = value;
    if (type === 'number') {
        finalValue = parseFloat(value);
    } else if (type === 'checkbox') {
        finalValue = (e.target as HTMLInputElement).checked;
    }

    setSelectedPlan({
      ...selectedPlan,
      [name]: finalValue,
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Planes de Membresía</h2>
        {/* <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Crear Nuevo Plan
        </button> */}
      </div>

      {loading ? (
        <div className="text-center py-10">Cargando planes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {membershipPlans.map((plan) => (
            <div
              key={plan.code}
              className={`border rounded-lg p-5 transition-shadow hover:shadow-lg ${
                plan.isActive ? "border-gray-200" : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.code}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                    plan.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                    {plan.isActive ? "Activo" : "Inactivo"}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-3xl font-bold text-blue-600">
                  {plan.currency} {plan.priceMonthly}
                  <span className="text-sm text-gray-500 font-normal">/mes</span>
                </p>
              </div>

              <div className="space-y-2 mb-4 text-sm text-gray-700">
                <p><strong>Créditos:</strong> {plan.creditsPerMonth}/mes</p>
                <p><strong>Rollover:</strong> {plan.rolloverMonths} meses</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Beneficios:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {Array.isArray(plan.benefits) && plan.benefits.map((benefit: string, index: number) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleEdit(plan)}
                className="w-full mt-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                Editar Plan
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold">
                {selectedPlan.id ? "Editar Plan" : "Crear Plan"}
              </h3>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                  <input
                    type="text"
                    name="code"
                    value={selectedPlan.code}
                    onChange={handleChange}
                    disabled={!!selectedPlan.id}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedPlan.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio Mensual</label>
                  <input
                    type="number"
                    name="priceMonthly"
                    value={selectedPlan.priceMonthly}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
                  <select
                    name="currency"
                    value={selectedPlan.currency}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="ARS">ARS</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Créditos por Mes</label>
                  <input
                    type="number"
                    name="creditsPerMonth"
                    value={selectedPlan.creditsPerMonth}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meses Rollover</label>
                  <input
                    type="number"
                    name="rolloverMonths"
                    value={selectedPlan.rolloverMonths}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Beneficios (JSON Array)
                </label>
                <textarea
                  name="benefits"
                  value={typeof selectedPlan.benefits === 'string' ? selectedPlan.benefits : JSON.stringify(selectedPlan.benefits, null, 2)}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder='["Beneficio 1", "Beneficio 2"]'
                />
                <p className="text-xs text-gray-500 mt-1">Debe ser un array de strings en formato JSON válido.</p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={selectedPlan.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Plan Activo
                </label>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipsComponent;
