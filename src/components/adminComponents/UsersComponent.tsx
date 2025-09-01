"use client";

import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { useAdminStore } from "@/store/useAdminStore";
import { toast } from "sonner";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

export default function UsersComponent() {
  const {
    users,
    selectedUser,
    creditos,
    planes,
    fetchUsers,
    fetchCreditos,
    fetchPlanes,
    selectUser,
    registerUser,
    resetPassword,
    deleteUser,
    activateUser,
    editUser,
  } = useAdminStore();

  const [search, setSearch] = useState("");
  const [showUserList, setShowUserList] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rol: "",
    active: true,
    id_plan: "",
    email: "",
  });

  const [registerData, setRegisterData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasenia: "",
    num_celular: "",
  });

  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchCreditos();
    fetchPlanes();
  }, [fetchUsers, fetchCreditos, fetchPlanes]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    const anyModal =
      showEditModal || showRegisterModal || showResetModal || showDeleteModal;
    document.body.style.overflow = anyModal ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showEditModal, showRegisterModal, showResetModal, showDeleteModal]);

  useEffect(() => {
    if (selectedUser && showEditModal) {
      setFormData({
        nombre: selectedUser.nombre || "",
        apellido: selectedUser.apellido || "",
        rol: selectedUser.rol || "cliente",
        active: selectedUser.active ?? true,
        id_plan: selectedUser.plan?.id?.toString() || "",
        email: selectedUser.email || "",
      });
    }
  }, [selectedUser, showEditModal]);

  const handleSelectUser = (id: number) => {
    selectUser(id);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "active" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setLoading(true);
    try {
      await editUser(selectedUser.id, {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        active: formData.active,
        rol: formData.rol,
        id_plan: formData.id_plan ? parseInt(formData.id_plan) : null,
      });
      await fetchUsers();
      selectUser(selectedUser.id);
      setShowEditModal(false);
      toast.success("Usuario actualizado exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    if (!selectedUser) return;
    setShowEditModal(true);
  };
  const handleResetClick = () => {
    if (!selectedUser) return;
    setShowResetModal(true);
  };

  const handleDeleteClick = () => {
    if (!selectedUser) return;
    setShowDeleteModal(true);
  };
  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };
  const handleActivateUser = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      await activateUser(selectedUser.id);
      await fetchUsers();
      setShowDeleteModal(false);
      await fetchUsers();
      selectUser(selectedUser.id);
      toast.success("Usuario activado exitosamente");
    } catch (err) {
      console.error(err);
      toast.error("Error al activar usuario");
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(registerData);
      await fetchUsers();
      setShowRegisterModal(false);
      toast.success("Usuario registrado exitosamente");
      setRegisterData({
        nombre: "",
        apellido: "",
        email: "",
        contrasenia: "",
        num_celular: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setLoading(true);
    try {
      await resetPassword(selectedUser.id, password);
      setShowResetModal(false);
      toast.success("Contraseña restablecida");
      setPassword("");
    } catch (err) {
      console.error(err);
      toast.error("Error al restablecer contraseña");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      await deleteUser(selectedUser.id, {
        nombre: selectedUser.nombre,
        apellido: selectedUser.apellido,
        email: selectedUser.email,
        active: false,
        rol: selectedUser.rol,
      });
      await fetchUsers();
      selectUser(selectedUser.id);
      setShowDeleteModal(false);
      toast.success("Usuario desactivado");
    } catch (err) {
      console.error(err);
      toast.error("Error al desactivar usuario");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users
    .filter((u) => u.rol === "cliente")
    .filter(
      (u) =>
        u.nombre.toLowerCase().includes(search.toLowerCase()) ||
        u.apellido?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.active === b.active) return 0;
      return a.active ? -1 : 1;
    });

  return (
    <div className="min-h-[90%] flex flex-col lg:flex-row gap-4 mb-8 font-poppins">
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 font-poppins">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowEditModal(false)}
          ></div>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 relative z-10 shadow-lg">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              disabled={loading}
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-semibold text-[#6d4098] mb-6 text-center">
              Editar datos
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 text-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`px-4 cursor-pointer py-2 rounded-md ${
                      formData.active
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => setFormData({ ...formData, active: true })}
                  >
                    ACTIVO
                  </button>
                  <button
                    type="button"
                    className={`px-4 cursor-pointer py-2 rounded-md ${
                      !formData.active
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => setFormData({ ...formData, active: false })}
                  >
                    INACTIVO
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan
                </label>
                <div className="max-h-40 overflow-y-auto border rounded-md">
                  <select
                    name="id_plan"
                    value={formData.id_plan}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 text-[#6d4098] focus:outline-none focus:ring-2 focus:ring-[#6d4098] bg-white"
                    size={5}
                  >
                    {planes.map((plan) => (
                      <option key={plan.id} value={plan.id?.toString()}>
                        {plan.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 text-gray-600"
                />
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
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading && <ImSpinner8 className="animate-spin" />}{" "}
                  {loading ? "Procesando..." : "Confirmar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 font-poppins">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowRegisterModal(false)}
          ></div>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 relative z-10 shadow-lg">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              disabled={loading}
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-semibold text-[#6d4098] mb-6 text-center">
              Registrar nuevo usuario
            </h3>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={registerData.nombre}
                onChange={(e) =>
                  setRegisterData({ ...registerData, nombre: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 text-gray-600"
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                value={registerData.apellido}
                onChange={(e) =>
                  setRegisterData({ ...registerData, apellido: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 text-gray-600"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 text-gray-600"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={registerData.contrasenia}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      contrasenia: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-3 py-2 text-gray-600 pr-12"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoEyeSharp size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repetir contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-600 pr-12"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <IoEyeSharp size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>

              {confirmPassword &&
                registerData.contrasenia !== confirmPassword && (
                  <p className="text-red-500 text-sm">
                    Las contraseñas no coinciden
                  </p>
                )}

              <input
                type="text"
                placeholder="Número de celular (opcional)"
                value={registerData.num_celular}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    num_celular: e.target.value,
                  })
                }
                className="w-full border rounded-md px-3 py-2 text-gray-600"
              />
              <div className="flex justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2"
                  type="submit"
                  disabled={
                    loading ||
                    (!!confirmPassword &&
                      registerData.contrasenia !== confirmPassword)
                  }
                >
                  {loading && <ImSpinner8 className="animate-spin" />}{" "}
                  {loading ? "Procesando..." : "Registrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showResetModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 font-poppins">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowResetModal(false)}
          ></div>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 relative z-10 shadow-lg">
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              disabled={loading}
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-semibold text-[#6d4098] mb-6 text-center">
              Restablecer contraseña
            </h3>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-600 pr-12"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IoEyeSharp size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>
              <div className="flex justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading && <ImSpinner8 className="animate-spin" />}{" "}
                  {loading ? "Procesando..." : "Restablecer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 font-poppins">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowDeleteModal(false)}
          ></div>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 relative z-10 shadow-lg">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              disabled={loading}
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-semibold text-[#6d4098] mb-6 text-center">
              {selectedUser.active ? "Desactivar usuario" : "Activar usuario"}
            </h3>
            <p className="text-gray-600 mb-4 text-center">
              {selectedUser.active
                ? `¿Seguro que deseas desactivar a ${selectedUser.nombre} ${selectedUser.apellido}?`
                : `¿Seguro que deseas activar a ${selectedUser.nombre} ${selectedUser.apellido}?`}
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition cursor-pointer"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={
                  selectedUser.active ? handleDeleteUser : handleActivateUser
                }
                disabled={loading}
                className={`px-6 py-2 rounded-md flex items-center justify-center gap-2 transition cursor-pointer ${
                  selectedUser.active
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {loading && <ImSpinner8 className="animate-spin" />}{" "}
                {loading
                  ? "Procesando..."
                  : selectedUser.active
                  ? "Desactivar"
                  : "Activar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:hidden flex justify-between items-center bg-[#6d4098] text-white p-3 rounded-md">
        <span>Lista de usuarios</span>
        <button onClick={() => setShowUserList(!showUserList)}>
          {showUserList ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {(showUserList || !selectedUser) && (
        <div className="w-full lg:w-1/4 bg-white shadow-2xl p-4 flex flex-col rounded-md">
          <p className="hidden lg:block text-[#6d4098] text-center w-[60%] rounded-md font-semibold py-1 mx-auto px-2 mb-4 text-sm">
            Lista de usuarios
          </p>
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuario"
              className="pl-10 pr-4 py-2 w-full border rounded-md text-gray-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 max-h-80 lg:max-h-none">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 bg-white shadow-md p-2 rounded-md transform transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => {
                    handleSelectUser(u.id);
                    if (window.innerWidth < 1024) setShowUserList(false);
                  }}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      u.active ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <div className="flex flex-col text-sm">
                    <p className="font-medium">
                      {u.nombre} {u.apellido}
                    </p>
                    <p className="text-gray-500">
                      {u.empresas?.nombre || "Sin empresa"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 italic py-4">
                No se encontraron coincidencias
              </p>
            )}
          </div>
          <button
            className="mt-2 py-2 border border-[#6d4098] rounded-md text-white bg-[#6d4098] hover:bg-white hover:text-[#6d4098] transition cursor-pointer"
            onClick={handleRegisterClick}
          >
            Registrar un nuevo usuario
          </button>
        </div>
      )}

      {selectedUser ? (
        <div className="w-full lg:w-3/4 bg-white shadow-2xl p-4 flex flex-col lg:flex-row rounded-md">
          <div className="w-full lg:w-1/4 flex flex-col items-center border-b lg:border-b-0 lg:border-r border-gray-200 pb-4 lg:pb-0 lg:pr-4 mb-4 lg:mb-0">
            <FaUserCircle size={60} className="text-[#6d4098] mb-3" />
            <div className="text-center">
              <p className="font-semibold text-lg">{selectedUser.nombre}</p>
              <p className="font-semibold text-lg">{selectedUser.apellido}</p>
              <p className="text-sm text-gray-500 mt-2">
                {selectedUser.empresas?.nombre || "Sin empresa"}
              </p>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Fecha de alta:{" "}
              {selectedUser.fecha_alta?.split("T")[0] || "DD/MM/AAAA"}
            </p>
            <div className="mt-6 flex flex-col gap-2 w-full text-sm">
              <button
                className="bg-green-100 text-green-700 py-1 rounded-md hover:bg-green-200 cursor-pointer"
                onClick={handleEditClick}
              >
                Editar usuario
              </button>

              <button
                className="bg-yellow-100 text-yellow-700 py-1 rounded-md hover:bg-yellow-200 cursor-pointer"
                onClick={handleResetClick}
              >
                Restablecer contraseña
              </button>

              {selectedUser.active ? (
                <button
                  className="bg-red-100 text-red-700 py-1 rounded-md hover:bg-red-200 cursor-pointer"
                  onClick={handleDeleteClick}
                >
                  Desactivar usuario
                </button>
              ) : (
                <button
                  className="bg-green-100 text-green-700 py-1 rounded-md hover:bg-green-200 cursor-pointer"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Activar usuario
                </button>
              )}
            </div>
          </div>
          <div className="w-full lg:w-3/4 lg:pl-6 flex flex-col">
            <p className="text-sm text-gray-600">
              {selectedUser.plan?.nombre || "Sin plan"}
            </p>
            <h2 className="text-xl font-semibold text-[#6d4098] mb-4">
              {selectedUser.empresas?.nombre || "Nombre de la Empresa"}
            </h2>
            <div className="mb-4 flex-1 flex flex-col">
              <div className="bg-[#6d4098] text-white px-4 py-2 rounded-t-md w-full">
                <p>Créditos</p>
              </div>
              <div className="mt-2 space-y-3 border border-gray-200 rounded-b-md p-3 bg-gray-50">
                {creditos
                  .filter((c) => c.id_usuario === selectedUser.id)
                  .map((credito, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded-md shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
                    >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">TIPO</p>
                          <p className="font-medium">{credito.tipo_credito}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">CANTIDAD</p>
                          <p>{credito.cantidad}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            FECHA DE VENCIMIENTO
                          </p>
                          <p>{credito.vencimiento?.split("T")[0]}</p>
                        </div>
                      </div>
                      <button
                        className="bg-[#6d4098] px-3 py-1 text-xs rounded-md text-white cursor-pointer hover:opacity-90 w-full md:w-auto"
                        onClick={() => console.log("Ver consumo:", credito)}
                      >
                        Ver Consumo
                      </button>
                    </div>
                  ))}
                {creditos.filter((c) => c.id_usuario === selectedUser.id)
                  .length === 0 && (
                  <div className="text-center text-gray-400 italic py-4">
                    Este usuario no tiene créditos
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full lg:w-3/4 bg-white shadow-2xl p-4 flex items-center justify-center rounded-md">
          <p className="text-gray-500 text-lg">
            Seleccione un usuario para ver sus datos
          </p>
        </div>
      )}
    </div>
  );
}
