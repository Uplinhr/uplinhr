import React, { useState, useEffect } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { toast } from "sonner";

// Define interface locally if not yet in global interfaces
interface TalentSearchService {
  id: string;
  name: string;
  description: string | null;
  price: number; // Represents credits
  category: 'VACANTE' | 'ADICIONAL';
  isActive: boolean;
}

const SimulatorComponent: React.FC = () => {
  const { 
    talentSearchServices, 
    fetchTalentSearchServices, 
    upsertTalentSearchService, 
    deleteTalentSearchService, 
    loading 
  } = useAdminStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Partial<TalentSearchService> | null>(null);

  useEffect(() => {
    fetchTalentSearchServices();
  }, []);

  const handleEdit = (service: TalentSearchService) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedService({
      name: "",
      description: "",
      price: 0,
      category: "VACANTE",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    
    try {
        await upsertTalentSearchService(selectedService);
        toast.success("Servicio guardado exitosamente");
        handleCloseModal();
    } catch (error) {
        toast.error("Error al guardar el servicio");
    }
  };

  const handleDelete = async (id: string) => {
      if (confirm("¿Estás seguro de eliminar este servicio?")) {
          try {
              await deleteTalentSearchService(id);
              toast.success("Servicio eliminado");
          } catch (error) {
              toast.error("Error al eliminar");
          }
      }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!selectedService) return;
    const { name, value, type } = e.target;
    
    let finalValue: any = value;
    if (type === 'number') {
        finalValue = parseFloat(value);
    } else if (type === 'checkbox') {
        finalValue = (e.target as HTMLInputElement).checked;
    }

    setSelectedService({
      ...selectedService,
      [name]: finalValue,
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Simulador de Servicios</h2>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Crear Nuevo Servicio
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Cargando servicios...</div>
      ) : (
        <div className="space-y-8">
            {/* Vacantes Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Vacantes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {talentSearchServices.filter(s => s.category === 'VACANTE').map(service => (
                        <ServiceCard key={service.id} service={service} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                    {talentSearchServices.filter(s => s.category === 'VACANTE').length === 0 && (
                        <p className="text-gray-500 col-span-full">No hay servicios de vacantes configurados.</p>
                    )}
                </div>
            </div>

            {/* Adicionales Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Servicios Adicionales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {talentSearchServices.filter(s => s.category === 'ADICIONAL').map(service => (
                        <ServiceCard key={service.id} service={service} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                     {talentSearchServices.filter(s => s.category === 'ADICIONAL').length === 0 && (
                        <p className="text-gray-500 col-span-full">No hay servicios adicionales configurados.</p>
                    )}
                </div>
            </div>
        </div>
      )}

      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold">
                {selectedService.id ? "Editar Servicio" : "Crear Servicio"}
              </h3>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={selectedService.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  name="category"
                  value={selectedService.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="VACANTE">Vacante</option>
                  <option value="ADICIONAL">Adicional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Créditos</label>
                <input
                  type="number"
                  name="price"
                  value={selectedService.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  name="description"
                  value={selectedService.description || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={selectedService.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Servicio Activo
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
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ServiceCard = ({ service, onEdit, onDelete }: { service: TalentSearchService; onEdit: (s: TalentSearchService) => void; onDelete: (id: string) => void }) => (
    <div className={`border rounded-lg p-4 transition-shadow hover:shadow-md ${service.isActive ? 'bg-white' : 'bg-gray-50'}`}>
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-800">{service.name}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {service.isActive ? 'Activo' : 'Inactivo'}
            </span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
        <div className="flex justify-between items-center mt-auto">
            <span className="font-bold text-blue-600">{service.price} Créditos</span>
            <div className="flex gap-2">
                <button 
                    onClick={() => onEdit(service)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                    Editar
                </button>
                <button 
                    onClick={() => onDelete(service.id)}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                    Eliminar
                </button>
            </div>
        </div>
    </div>
);

export default SimulatorComponent;
