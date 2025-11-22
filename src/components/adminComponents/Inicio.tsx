"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminStore } from "@/store/useAdminStore";
import { useAuthStore } from "@/store/useAuthStore";
import { uploadAvatar } from "@/services/profileService";
import { toast } from "sonner";

interface InicioProps {
  setSelected: (value: string) => void;
  setMobileMenuOpen: (value: boolean) => void;
}

export default function Inicio({
  setSelected,
  setMobileMenuOpen,
}: InicioProps) {
  const {
    fetchUsers,
    fetchBusquedas,
    fetchConsultas,
    fetchEmpresas,
    users,
    busquedas,
    consultas,
    empresas,
  } = useAdminStore();

  const { user } = useAuthStore();

  const [clientesActivos, setClientesActivos] = useState(0);
  const [solicitudesConsulta, setSolicitudesConsulta] = useState(0);
  const [solicitudesBusqueda, setSolicitudesBusqueda] = useState(0);
  const [empresasActivas, setEmpresasActivas] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = isMobile
    ? ["/sandri_mobile.png", "/sol_mobile.png"]
    : ["/dashUserSandraDesktop.png", "/dashUserSolDesktop.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const loadData = async () => {
      await fetchUsers();
      await fetchBusquedas();
      await fetchConsultas();
      await fetchEmpresas();
    };
    loadData();
  }, [fetchUsers, fetchBusquedas, fetchConsultas, fetchEmpresas]);

  useEffect(() => {
    if (users) {
      const count = users.filter((u) => u.rol === "cliente" && u.active).length;
      setClientesActivos(count);
    }
  }, [users]);

  useEffect(() => {
    if (busquedas) {
      const count = busquedas.filter((b) => b.estado === "Pendiente").length;
      setSolicitudesBusqueda(count);
    }
  }, [busquedas]);

  useEffect(() => {
    if (consultas) {
      const count = consultas.filter((c) => c.estado === "Pendiente").length;
      setSolicitudesConsulta(count);
    }
  }, [consultas]);

  useEffect(() => {
    if (empresas) {
      const count = empresas.filter((e) => e.active).length;
      setEmpresasActivas(count);
    }
  }, [empresas]);

  const totalUsuarios = users ? users.length : 0;
  const totalAdmins = users ? users.filter((u) => u.rol === "admin").length : 0;
  const totalSolicitudesPendientes = solicitudesConsulta + solicitudesBusqueda;

  const fullName =
    user && (user.nombre || user.apellido)
      ? `${user.nombre ?? ""} ${user.apellido ?? ""}`.trim()
      : "";

  const initials = fullName
    ? fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "UP";

  const handlePhotoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError("");
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setSelectedPhotoFile(null);
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
        setPhotoPreview(null);
      }
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setPhotoError("Formato no permitido. Usa JPG, PNG o WEBP.");
      setSelectedPhotoFile(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("La imagen supera el tamaño máximo permitido (2MB).");
      setSelectedPhotoFile(null);
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
        setPhotoPreview(null);
      }
      return;
    }

    setSelectedPhotoFile(file);
    const objectUrl = URL.createObjectURL(file);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(objectUrl);
  };

  const handlePhotoSave = async () => {
    setPhotoError("");
    const file = selectedPhotoFile;

    if (!file) {
      setPhotoError("Seleccioná una imagen para continuar.");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setPhotoError("Formato no permitido. Usa JPG, PNG o WEBP.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("La imagen supera el tamaño máximo permitido (2MB).");
      return;
    }

    try {
      setPhotoLoading(true);
      const res = await uploadAvatar(file);
      useAuthStore.setState({
        user: { ...(user as any), pictureUrl: res?.data?.pictureUrl },
      });
      toast.success("Imagen de perfil actualizada");
      setShowPhotoModal(false);
      setSelectedPhotoFile(null);
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
        setPhotoPreview(null);
      }
    } catch (err: any) {
      const msg = err?.message || "No se pudo subir el avatar";
      setPhotoError(msg);
      toast.error(msg);
    } finally {
      setPhotoLoading(false);
    }
  };

  const handlePasswordChange = (field: "current" | "next" | "confirm", value: string) => {
    setPasswordError("");
    setPasswordSuccess("");
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordSave = () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      setPasswordError("Completá todos los campos.");
      return;
    }

    if (
      passwordForm.next.length < 8 ||
      !/[0-9]/.test(passwordForm.next) ||
      !/[^A-Za-z0-9]/.test(passwordForm.next)
    ) {
      setPasswordError(
        "La nueva contraseña no cumple los requisitos (8+ caracteres, número y símbolo)."
      );
      return;
    }

    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordError("La confirmación no coincide con la nueva contraseña.");
      return;
    }

    setPasswordSuccess("Contraseña actualizada correctamente (simulado).");
    toast.success("Contraseña cambiada correctamente (simulado).");

    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordForm({ current: "", next: "", confirm: "" });
      setPasswordSuccess("");
    }, 900);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full mb-6">
      <div className="w-full md:w-[30%] overflow-hidden flex-shrink-0">
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="w-full p-1"
            >
              <Image
                src={images[currentIndex]}
                alt="Carrusel"
                width={400}
                height={200}
                className="w-full h-auto object-contain scale-95 rounded-md"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full md:w-[70%] flex flex-col gap-6 mt-4 md:mt-6">
        <div className="relative rounded-xl shadow-md overflow-hidden h-[150px] w-full flex items-center justify-center">
          <Image
            src="/imgBannerDashUser.png"
            alt="Banner"
            width={1200}
            height={400}
            className="w-full h-full object-cover"
          />
          <h1 className="absolute text-xl md:text-4xl text-center font-bold text-white p-3 md:p-4 rounded-lg mb-2 md:mb-4">
            Dashboard Administrador
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 md:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-full border-4 border-[#6D4098] overflow-hidden bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-semibold">
                {user?.pictureUrl ? (
                  <Image
                    src={user.pictureUrl}
                    alt="Foto de perfil"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {fullName || "Administrador Uplin"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {user?.rol === "admin"
                      ? "Administrador Principal"
                      : user?.rol || "Rol administrador"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {user?.email || "admin@uplin.test"}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Última conexión: hace 2 horas
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowPhotoModal(true)}
                    className="px-4 py-2 rounded-full text-xs md:text-sm font-medium bg-green-500 hover:bg-green-600 text-white cursor-pointer transition shadow-sm"
                  >
                    📷 Cambiar Foto
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 rounded-full text-xs md:text-sm font-medium bg-[#6D4098] hover:bg-[#553076] text-white cursor-pointer transition shadow-sm"
                  >
                    🔒 Cambiar Contraseña
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected("Administradores")}
                    className="px-4 py-2 rounded-full text-xs md:text-sm font-medium bg-white text-[#6D4098] border border-[#6D4098]/60 hover:bg-purple-50 cursor-pointer transition shadow-sm"
                  >
                    Ver Perfil Completo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Total de Usuarios</span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-[#6D4098] text-xs font-semibold">
                U
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalUsuarios}</p>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <span className="text-[10px]">▲</span>
              <span>↑ 12% vs. mes anterior</span>
            </p>
            <p className="text-[11px] text-gray-400">Incluye clientes y usuarios internos.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Empresas Activas</span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-[#6D4098]">
                🏢
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{empresasActivas}</p>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <span className="text-[10px]">▲</span>
              <span>↑ 8% vs. mes anterior</span>
            </p>
            <p className="text-[11px] text-gray-400">Con membresía o plan activo.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Administradores</span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-[#6D4098]">
                🛡️
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalAdmins}</p>
            <p className="text-xs text-gray-400">Sin cambios recientes</p>
            <p className="text-[11px] text-gray-400">Usuarios con rol admin.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Solicitudes Pendientes</span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-[#6D4098]">
                ⏳
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalSolicitudesPendientes}</p>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <span className="text-[10px]">▲</span>
              <span>Nuevas solicitudes en curso</span>
            </p>
            <p className="text-[11px] text-gray-400">Consultas + búsquedas pendientes.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => {
              setSelected("Búsquedas");
              setMobileMenuOpen(false);
            }}
            className="bg-[#6D4098] hover:bg-[#553076] transition text-white cursor-pointer px-6 py-3 rounded-md shadow-md w-full md:w-1/3 text-sm"
          >
            Gestión de Búsquedas
          </button>
          <button
            onClick={() => {
              setSelected("Consultoria");
              setMobileMenuOpen(false);
            }}
            className="bg-[#6D4098] hover:bg-[#553076] transition text-white cursor-pointer px-6 py-3 rounded-md shadow-md w-full md:w-1/3 text-sm"
          >
            Gestión de Consultoría
          </button>
          <button
            onClick={() => {
              setSelected("Administradores");
              setMobileMenuOpen(false);
            }}
            className="bg-emerald-500 hover:bg-emerald-600 transition text-white cursor-pointer px-6 py-3 rounded-md shadow-md w-full md:w-1/3 text-sm"
          >
            + Agregar Administrador
          </button>
        </div>

        {showPhotoModal && (
          <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cambiar Foto de Perfil
                  </h2>
                  <p className="text-xs text-gray-500">
                    Máximo 2MB. Formatos permitidos: JPG, PNG o WEBP.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="mx-auto w-24 h-24 rounded-full border-4 border-[#6D4098] overflow-hidden bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-xl font-semibold">
                  {photoPreview ? (
                    // Vista previa local de la imagen seleccionada
                    // Usamos <img> directo porque Next/Image no soporta blob: URLs
                    <img
                      src={photoPreview}
                      alt="Vista previa de la foto seleccionada"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
                <label className="border border-dashed border-purple-300 bg-purple-50/40 rounded-lg px-4 py-3 text-xs text-gray-600 flex flex-col items-center gap-1 cursor-pointer">
                  <span className="font-medium text-[#6D4098]">Seleccionar imagen</span>
                  <span className="text-[11px] text-gray-500 text-center">
                    Arrastrá y soltá una imagen o haz clic para elegir un archivo.
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoFileChange}
                  />
                </label>
                {photoError && (
                  <p className="text-xs text-red-600">{photoError}</p>
                )}
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(false)}
                  className="px-3 py-2 rounded-md text-xs text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handlePhotoSave}
                  disabled={photoLoading}
                  className="px-4 py-2 rounded-md text-xs font-medium bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-60"
                >
                  {photoLoading ? "Guardando..." : "Guardar Foto"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showPasswordModal && (
          <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cambiar Contraseña
                  </h2>
                  <p className="text-xs text-gray-500">
                    Definí una contraseña segura para tu cuenta de administrador.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">Contraseña actual</label>
                  <input
                    type="password"
                    value={passwordForm.current}
                    onChange={(e) => handlePasswordChange("current", e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6D4098] focus:border-[#6D4098]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">Nueva contraseña</label>
                  <input
                    type="password"
                    value={passwordForm.next}
                    onChange={(e) => handlePasswordChange("next", e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6D4098] focus:border-[#6D4098]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">Confirmar contraseña</label>
                  <input
                    type="password"
                    value={passwordForm.confirm}
                    onChange={(e) => handlePasswordChange("confirm", e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6D4098] focus:border-[#6D4098]"
                  />
                </div>
                <p className="text-[11px] text-gray-500">
                  Requisitos mínimos: 8 caracteres, al menos un número y un símbolo.
                </p>
                {passwordError && (
                  <p className="text-xs text-red-600">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-xs text-emerald-600">{passwordSuccess}</p>
                )}
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-3 py-2 rounded-md text-xs text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handlePasswordSave}
                  className="px-4 py-2 rounded-md text-xs font-medium bg-[#6D4098] hover:bg-[#553076] text-white"
                >
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
