"use client";

import React, { useEffect, useState } from "react";
import { FaUserCircle, FaTimes, FaSearch, FaBars } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { useAdminStore } from "@/store/useAdminStore";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/interfaces/index";
import { editUser } from "@/services/adminService";
import { toast } from "sonner";

export default function AdminsComponent() {
  const { users, fetchUsers } = useAdminStore();
  const { user: currentUser } = useAuthStore();
  
  // State for layout and selection
  const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null);
  const [showAdminList, setShowAdminList] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [selectedUserIdToAdd, setSelectedUserIdToAdd] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter admins (excluding current user if needed)
  const admins = users.filter((u) => u.rol === "admin" && u.id !== currentUser?.id);

  // Filter for the list view
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic for "Add Admin" modal (Promote user)
  const clientUsers = users.filter((u) => u.rol === "cliente" && u.active);
  const filteredClientUsers = clientUsers.filter(
    (user) =>
      user.nombre.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.apellido?.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const handleAddAdmin = async () => {
    if (!selectedUserIdToAdd) return;
    setLoading(true);
    try {
      const userToUpdate = users.find((u) => u.id === selectedUserIdToAdd);
      if (!userToUpdate) return;

      await editUser(selectedUserIdToAdd, {
        nombre: userToUpdate.nombre,
        apellido: userToUpdate.apellido || "",
        email: userToUpdate.email,
        active: userToUpdate.active ?? true,
        rol: "admin",
        id_plan: userToUpdate.plan?.id || null,
      });

      await fetchUsers();
      setSelectedUserIdToAdd(null);
      setShowAddModal(false);
      setUserSearchTerm("");
      toast.success("Usuario convertido a administrador exitosamente");
    } catch (error) {
      console.error("Error al agregar administrador:", error);
      toast.error("Error al convertir usuario a administrador");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAdmin = async () => {
    if (!selectedAdmin) return;
    setLoading(true);
    try {
      await editUser(selectedAdmin.id, {
        nombre: selectedAdmin.nombre,
        apellido: selectedAdmin.apellido || "",
        email: selectedAdmin.email,
        active: true,
        rol: "cliente",
        id_plan: selectedAdmin.plan?.id || null,
      });

      await fetchUsers();
      setShowDeleteModal(false);
      setSelectedAdmin(null);
      toast.success("Administrador eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar administrador:", error);
      toast.error("Error al eliminar administrador");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Fecha no disponible";
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  return (
    <div className="min-h-[90%] flex flex-col lg:flex-row gap-4 mb-8 font-poppins">
      {/* Mobile Header for List Toggle */}
      <div className="lg:hidden flex justify-between items-center bg-[#6d4098] text-white p-3 rounded-md">
        <span>Lista de administradores</span>
        <button onClick={() => setShowAdminList(!showAdminList)}>
          {showAdminList ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Left Panel: Admin List */}
      {(showAdminList || !selectedAdmin) && (
        <div className="w-full lg:w-1/4 bg-white shadow-2xl p-4 flex flex-col rounded-md">
          <button
            className="mt-2 py-2 border border-[#6d4098] rounded-md text-white bg-[#6d4098] hover:bg-white mb-4 hover:text-[#6d4098] transition cursor-pointer"
            onClick={() => setShowAddModal(true)}
          >
            Agregar nuevo admin
          </button>
          
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar administrador"
              className="pl-10 pr-4 py-2 w-full border rounded-md text-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 max-h-80 lg:max-h-none">
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <div
                  key={admin.id}
                  className={`flex items-center gap-3 bg-white shadow-md p-2 rounded-md transform transition-transform hover:scale-105 cursor-pointer ${
                    selectedAdmin?.id === admin.id ? "border-l-4 border-[#6d4098]" : ""
                  }`}
                  onClick={() => {
                    setSelectedAdmin(admin);
                    if (window.innerWidth < 1024) setShowAdminList(false);
                  }}
                >
                  <FaUserCircle size={32} className="text-[#6d4098]" />
                  <div className="flex flex-col text-sm overflow-hidden">
                    <p className="font-medium truncate">
                      {admin.nombre} {admin.apellido}
                    </p>
                    <p className="text-gray-500 truncate">{admin.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 italic py-4">
                No se encontraron coincidencias
              </p>
            )}
          </div>
        </div>
      )}

      {/* Right Panel: Admin Details */}
      {selectedAdmin ? (
        <div className="w-full lg:w-3/4 bg-white shadow-2xl p-4 flex flex-col items-center justify-center rounded-md relative">
           {/* Close button for mobile mostly, or just deselect */}
           <button 
             className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 lg:hidden"
             onClick={() => setSelectedAdmin(null)}
           >
             <FaTimes size={24} />
           </button>

          <div className="flex flex-col items-center text-center max-w-md w-full">
            <FaUserCircle size={100} className="text-[#6d4098] mb-4" />
            
            <h2 className="text-2xl font-bold text-[#6d4098] mb-1">
              {selectedAdmin.nombre} {selectedAdmin.apellido}
            </h2>
            <p className="text-gray-600 mb-4">{selectedAdmin.email}</p>
            
            <div className="bg-gray-50 p-4 rounded-lg w-full mb-6 border border-gray-100">
              <p className="text-sm text-gray-500 mb-2">
                <strong>Fecha de Alta:</strong> {formatDate(selectedAdmin.fecha_alta)}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Rol:</strong> Administrador
              </p>
            </div>

            <button
              className="bg-red-100 text-red-700 px-6 py-2 rounded-md hover:bg-red-200 transition cursor-pointer flex items-center gap-2"
              onClick={() => setShowDeleteModal(true)}
            >
              Eliminar como Administrador
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex w-3/4 bg-white shadow-2xl p-4 items-center justify-center rounded-md">
          <div className="text-center text-gray-400">
            <FaUserCircle size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Seleccione un administrador para ver sus detalles</p>
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black opacity-60" onClick={() => setShowAddModal(false)}></div>
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#6d4098]">Agregar Administrador</h3>
              <button onClick={() => setShowAddModal(false)}><FaTimes /></button>
            </div>
            
            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuario para promover"
                className="pl-10 pr-4 py-2 w-full border rounded-md"
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
              {filteredClientUsers.length > 0 ? (
                filteredClientUsers.map(user => (
                  <div 
                    key={user.id}
                    className={`p-2 border rounded cursor-pointer flex items-center gap-2 ${selectedUserIdToAdd === user.id ? 'border-[#6d4098] bg-purple-50' : ''}`}
                    onClick={() => setSelectedUserIdToAdd(user.id)}
                  >
                    <FaUserCircle className="text-gray-400" />
                    <div className="text-sm">
                      <p className="font-medium">{user.nombre} {user.apellido}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-sm">No se encontraron usuarios</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancelar
              </button>
              <button 
                onClick={handleAddAdmin}
                disabled={!selectedUserIdToAdd || loading}
                className="px-4 py-2 bg-[#6d4098] text-white rounded hover:bg-[#5a3685] disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <ImSpinner8 className="animate-spin" />}
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Admin Modal */}
      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black opacity-60" onClick={() => setShowDeleteModal(false)}></div>
          <div className="bg-white rounded-lg p-6 w-full max-w-sm relative z-10 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">¿Estás seguro?</h3>
            <p className="text-gray-600 mb-6">
              {selectedAdmin.nombre} dejará de ser administrador y volverá a ser un usuario cliente.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancelar
              </button>
              <button 
                onClick={handleRemoveAdmin}
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <ImSpinner8 className="animate-spin" />}
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
