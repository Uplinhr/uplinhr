"use client";

import React, { useEffect, useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Plan } from "@/interfaces";
import { FaTimes, FaCheck, FaEdit } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "sonner";

export default function PlansComponent() {
  const { planes, fetchPlanes, editPlan, loading } = useAdminStore();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<Plan>>({});
  const [featuresJson, setFeaturesJson] = useState("");
  
  // Separate fields for price calculation
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    fetchPlanes();
  }, [fetchPlanes]);

  // Calculate final price when original price or discount changes
  useEffect(() => {
    if (originalPrice > 0) {
      const discount = (originalPrice * discountPercentage) / 100;
      const calculated = originalPrice - discount;
      setFinalPrice(Math.round(calculated)); // Round to nearest integer
    } else {
      setFinalPrice(0);
    }
  }, [originalPrice, discountPercentage]);

  // Filter to show only the main 4 plans from the design
  const displayPlans = planes.filter(p => 
    ["Single Hire", "Pro", "Premium", "Platinum"].includes(p.nombre)
  ).sort((a, b) => a.precio === b.precio ? 0 : Number(a.precio) > Number(b.precio) ? 1 : -1);

  const handleEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    setFormData({ ...plan });
    
    // Parse features to get oldPrice and discount
    const features = plan.features || {};
    const oldPrice = features.oldPrice || plan.precio;
    const discountText = features.descuento || "";
    const discountNum = discountText ? parseFloat(discountText.replace(/[^0-9.]/g, '')) : 0;
    
    setOriginalPrice(oldPrice);
    setDiscountPercentage(discountNum);
    setFinalPrice(plan.precio);
    setFeaturesJson(JSON.stringify(features, null, 2));
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || !selectedPlan.id) return;

    try {
      // Parse existing features JSON
      let parsedFeatures = {};
      try {
        parsedFeatures = JSON.parse(featuresJson);
      } catch (err) {
        toast.error("El JSON de características es inválido");
        return;
      }

      // Update features with new price information
      const updatedFeatures = {
        ...parsedFeatures,
        oldPrice: discountPercentage > 0 ? originalPrice : null,
        descuento: discountPercentage > 0 ? `${discountPercentage}% OFF` : null
      };

      await editPlan(selectedPlan.id, {
        ...formData,
        precio: finalPrice.toString(),
        features: updatedFeatures
      });
      
      await fetchPlanes();
      setShowEditModal(false);
      setSelectedPlan(null);
      toast.success("Plan actualizado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el plan");
    }
  };

  const getDiscountBadge = (features: any) => {
    if (features && features.descuento) {
      return (
        <span className="absolute top-4 right-4 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded">
          {features.descuento}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="font-poppins p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl text-center font-bold text-gray-800 mb-2">
        Encontrá el <span className="text-[#6d4098]">paquete perfecto</span> para tu empresa
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        {displayPlans.map((plan) => {
          const features = plan.features || {};
          return (
            <div 
              key={plan.id} 
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col relative border border-gray-100 hover:shadow-xl transition-shadow"
            >
              {getDiscountBadge(features)}
              
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{plan.nombre}</h3>
              <p className="text-sm text-gray-500 text-center mb-6 h-12 overflow-hidden">
                {/* Description would ideally come from DB, using a fallback here if not in model yet */}
                {features.description || "Plan ideal para tu empresa"}
              </p>

              <div className="text-center mb-6">
                {features.originalPrice && (
                   <p className="text-gray-400 line-through text-sm">USD {features.originalPrice}</p>
                )}
                <p className="text-3xl font-bold text-gray-900">USD {plan.precio}</p>
                <p className="text-xs text-gray-500">+ impuestos</p>
              </div>

              <button 
                className="w-full bg-[#00C040] hover:bg-[#00a035] text-white font-bold py-3 rounded-lg mb-6 transition-colors"
              >
                Comprar {plan.nombre}
              </button>

              <div className="flex-1 space-y-3 text-sm text-gray-600">
                {features.creditos && (
                  <div className="flex items-start gap-2">
                    <FaCheck className="text-[#6d4098] mt-1 flex-shrink-0" size={12} />
                    <span>{features.creditos} créditos incluidos</span>
                  </div>
                )}
                {features.vacantes && (
                  <div className="flex items-start gap-2">
                    <FaCheck className="text-[#6d4098] mt-1 flex-shrink-0" size={12} />
                    <span>Vacantes posibles: {features.vacantes}</span>
                  </div>
                )}
                 {features.proceso && (
                  <div className="flex items-start gap-2">
                    <FaCheck className="text-[#6d4098] mt-1 flex-shrink-0" size={12} />
                    <span>{features.proceso}</span>
                  </div>
                )}
                {features.soporte && (
                  <div className="flex items-start gap-2">
                    <FaCheck className="text-[#6d4098] mt-1 flex-shrink-0" size={12} />
                    <span>{features.soporte}</span>
                  </div>
                )}
                 {features.onboarding && (
                  <div className="flex items-start gap-2">
                    <FaCheck className="text-[#6d4098] mt-1 flex-shrink-0" size={12} />
                    <span>{features.onboarding}</span>
                  </div>
                )}
                 {features.garantia && (
                  <div className="flex items-start gap-2">
                    <FaCheck className="text-[#6d4098] mt-1 flex-shrink-0" size={12} />
                    <span>{features.garantia}</span>
                  </div>
                )}
                 {features.vencimiento && (
                  <div className="flex items-start gap-2">
                    <FaCheck className="text-[#6d4098] mt-1 flex-shrink-0" size={12} />
                    <span>{features.vencimiento}</span>
                  </div>
                )}
                 {features.pago && (
                  <div className="flex items-start gap-2">
                    <FaCheck className="text-[#6d4098] mt-1 flex-shrink-0" size={12} />
                    <span>{features.pago}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleEdit(plan)}
                className="mt-4 w-full border border-[#6d4098] text-[#6d4098] py-2 rounded-lg hover:bg-purple-50 transition flex items-center justify-center gap-2 text-sm"
              >
                <FaEdit /> Editar Plan
              </button>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedPlan && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 font-poppins">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowEditModal(false)}></div>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#6d4098]">Editar {selectedPlan.nombre}</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre || ""}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              
              {/* Price Calculator Section */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-3 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Calculadora de Precios</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio Oficial (USD)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full border rounded-md px-3 py-2"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descuento (%)
                  </label>
                  <input
                    type="number"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                    className="w-full border rounded-md px-3 py-2"
                    min="0"
                    max="100"
                  />
                </div>

                <div className="bg-green-100 rounded-md p-3 border border-green-300">
                  <label className="block text-sm font-medium text-green-900 mb-1">
                    Precio Final (Automático)
                  </label>
                  <div className="text-2xl font-bold text-green-900">
                    USD {finalPrice.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    {discountPercentage > 0 
                      ? `Ahorro: $${(originalPrice - finalPrice).toLocaleString()} (${discountPercentage}%)`
                      : "Sin descuento"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Características (JSON)</label>
                <p className="text-xs text-gray-500 mb-2">Edita creditos, vacantes, proceso, soporte, etc.</p>
                <textarea
                  rows={8}
                  value={featuresJson}
                  onChange={(e) => setFeaturesJson(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 font-mono text-sm bg-gray-50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#6d4098] text-white rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <ImSpinner8 className="animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
