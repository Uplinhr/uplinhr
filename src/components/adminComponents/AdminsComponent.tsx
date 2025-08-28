"use client";

import React, { useEffect, useState } from "react";
import { FaUserCircle, FaTimes, FaSearch } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { useAdminStore } from "@/store/useAdminStore";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/interfaces/index";
import { editUser } from "@/services/adminService";
import { toast } from "sonner";

export default function AdminsComponent() {
  const { users, fetchUsers } = useAdminStore();
  const { user: currentUser } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [operationType, setOperationType] = useState<"add" | "remove" | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (showModal || showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal, showDeleteModal]);

  const admins = users.filter((u) => u.rol === "admin" && u.id !== currentUser?.id);

  const clientUsers = users.filter((u) => u.rol === "cliente" && u.active);

  const filteredUsers = clientUsers.filter(
    (user) =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellido?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAdminClick = () => {
    setShowModal(true);
  };

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId);
  };

  const handleAdminClick = (admin: User) => {
    setSelectedAdmin(admin);
    setShowDeleteModal(true);
  };

  const handleAddAdmin = async () => {
    if (!selectedUserId) return;

    setLoading(true);
    setOperationType("add");
    try {
      const userToUpdate = users.find((u) => u.id === selectedUserId);
      if (!userToUpdate) return;

      await editUser(selectedUserId, {
        nombre: userToUpdate.nombre,
        apellido: userToUpdate.apellido || "",
        email: userToUpdate.email,
        active: userToUpdate.active ?? true,
        rol: "admin",
        id_plan: userToUpdate.plan?.id || null,
      });

      await fetchUsers();
      setSelectedUserId(null);
      setShowModal(false);
      setSearchTerm("");
      toast.success("Usuario convertido a administrador exitosamente");
    } catch (error) {
      console.error("Error al agregar administrador:", error);
      toast.error("Error al convertir usuario a administrador");
    } finally {
      setLoading(false);
      setOperationType(null);
    }
  };

  const handleRemoveAdmin = async () => {
    if (!selectedAdmin) return;

    setLoading(true);
    setOperationType("remove");
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
      setOperationType(null);
    }
  };

  const handleCancel = () => {
    setSelectedUserId(null);
    setShowModal(false);
    setSearchTerm("");
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
    setShowModal(false);
    setSearchTerm("");
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedAdmin(null);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Fecha no disponible";

    try {
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    } catch (error) {
      console.log(error);
      return "Fecha inválida";
    }
  };

  return (
    <div className="w-full bg-white shadow-2xl p-6 rounded-md">
      <h2 className="text-center text-[#6d4098] font-semibold text-lg mb-4">
        Administradores
      </h2>
      <div className="flex gap-4 flex-wrap justify-center">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="flex items-center border border-[#6d4098] rounded-md p-2 w-64 hover:scale-105 transform transition cursor-pointer"
            onClick={() => handleAdminClick(admin)}
          >
            <FaUserCircle size={40} className="text-[#6d4098] mr-3" />
            <p className="text-md">
              {admin.nombre} {admin.apellido || ""}
            </p>
          </div>
        ))}

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md p-3 w-64">
          <p className="text-gray-500 text-center mb-2 text-xs">
            ¿Deseas agregar un administrador?
          </p>
          <button
            className="bg-[#6d4098] text-white px-3 py-1 rounded-md text-sm hover:bg-[#55307a] transition cursor-pointer"
            onClick={handleAddAdminClick}
          >
            Agregar un admin
          </button>
        </div>
      </div>

      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={closeDeleteModal}
          ></div>

          <div className="bg-white rounded-lg p-6 w-full max-w-xs mx-4 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative z-10">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={closeDeleteModal}
              disabled={loading}
            >
              <FaTimes size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <FaUserCircle size={60} className="text-[#6d4098] mb-4" />

              <h3 className="text-lg font-semibold mb-1">
                {selectedAdmin.nombre} {selectedAdmin.apellido || ""}
              </h3>

              <p className="text-gray-600 text-sm mb-3 break-words">
                {selectedAdmin.email}
              </p>

              <p className="text-gray-500 text-xs mb-5">
                Fecha de Alta: {formatDate(selectedAdmin.fecha_alta)}
              </p>

              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition cursor-pointer w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                onClick={handleRemoveAdmin}
                disabled={loading}
              >
                {loading && operationType === "remove" && (
                  <ImSpinner8 className="animate-spin" />
                )}
                {loading ? "Procesando..." : "Eliminar como Administrador"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={handleCloseModal}
          ></div>

          <div className="bg-white rounded-lg p-6 w-full max-w-xs mx-4 sm:max-w-sm md:max-w-md lg:max-w-2xl max-h-[80vh] overflow-y-auto relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#6d4098]">
                Selecciona el usuario para convertirlo en admin
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                disabled={loading}
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuario"
                className="pl-10 pr-4 py-2 w-full border rounded-md text-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2 mb-6 max-h-96 overflow-y-auto border border-gray-200 rounded-md p-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center border rounded-md p-2 hover:scale-[1.02] transform transition cursor-pointer ${
                      selectedUserId === user.id
                        ? "border-2 border-[#6d4098] bg-[#f5f0fa]"
                        : "border-gray-300"
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => !loading && handleUserClick(user.id)}
                  >
                    <FaUserCircle
                      size={24}
                      className={`mr-3 ${
                        selectedUserId === user.id
                          ? "text-[#6d4098]"
                          : "text-gray-400"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate text-sm">
                        {user.nombre} {user.apellido || ""}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.empresas?.nombre || "Sin empresa"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  {searchTerm
                    ? "No se encontraron coincidencias"
                    : "No hay usuarios disponibles"}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition cursor-pointer order-2 sm:order-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleAddAdmin}
                disabled={!selectedUserId || loading}
                className="px-6 py-2 rounded-md transition cursor-pointer bg-green-700 text-white hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed order-1 sm:order-2 flex items-center justify-center gap-2"
              >
                {loading && operationType === "add" && (
                  <ImSpinner8 className="animate-spin" />
                )}
                {loading ? "Procesando..." : "Aceptar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
