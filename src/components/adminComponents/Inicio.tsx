"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminStore } from "@/store/useAdminStore";
import { useAuthStore } from "@/store/useAuthStore";
import { uploadAvatar, editProfile, ProfileData } from "@/services/profileService";
import { toast } from "sonner";
import { IoMdClose } from "react-icons/io";

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
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "company">("personal");
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
  
  // Profile edit form states
  const [profileForm, setProfileForm] = useState<ProfileData>({
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    num_celular: user?.num_celular || "",
    email: user?.email || "",
    country: user?.profile?.country || "",
    linkedin: user?.profile?.linkedinUrl || "",
    companyName: user?.company?.companyName || "",
    website: user?.company?.website || "",
    companyEmail: user?.company?.companyEmail || "",
    companyPhone: user?.company?.companyPhone || "",
    companyAddress: user?.company?.address || "",
    companyTaxId: user?.company?.taxId || "",
  });
  const [editableFields, setEditableFields] = useState({
    nombre: false,
    apellido: false,
    num_celular: false,
    country: false,
    linkedin: false,
    companyName: false,
    website: false,
    companyEmail: false,
    companyPhone: false,
    companyAddress: false,
    companyTaxId: false,
  });
  const [newEmail, setNewEmail] = useState("");
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showFullProfile, setShowFullProfile] = useState(false);


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

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return "Fecha no disponible";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const handlePasswordSubmit = async () => {
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

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In a real app, you'd call your API here
      setPasswordSuccess("Contraseña actualizada correctamente.");
      toast.success("Contraseña cambiada correctamente.");
      setPasswordForm({ current: "", next: "", confirm: "" });
      setShowPasswordChange(false);
    } catch (error: any) {
      setPasswordError(error.message || "Error al cambiar la contraseña.");
      toast.error(error.message || "Error al cambiar la contraseña.");
    }
  };

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
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Left: Profile Photo with Edit Icon */}
            <div className="relative flex-shrink-0">
              <div className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-[#6D4098] overflow-hidden bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-3xl font-semibold">
                {user?.pictureUrl ? (
                  <Image
                    src={user.pictureUrl}
                    alt="Foto de perfil"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              {/* Edit Pencil Icon */}
              <button
                onClick={() => setShowPhotoModal(true)}
                className="absolute bottom-2 right-2 bg-white rounded-full p-2.5 shadow-lg border-2 border-[#6D4098] hover:bg-gray-100 cursor-pointer transition-all hover:scale-110"
                title="Cambiar foto de perfil"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6D4098]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <span className="absolute bottom-8 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
            </div>

            {/* Center: Admin Info as List */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {fullName || "Administrador Uplin"}
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-medium min-w-[100px]">Rol:</span>
                  <span className="text-gray-700">
                    Administrador
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-medium min-w-[100px]">Email:</span>
                  <span className="text-gray-700">{user?.email || "admin@uplin.test"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-medium min-w-[100px]">Teléfono:</span>
                  <span className="text-gray-700">{user?.num_celular || "No especificado"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-medium min-w-[100px]">Miembro desde:</span>
                  <span className="text-gray-700">{formatDate(user?.fecha_alta)}</span>
                </li>
              </ul>
              <button
                onClick={() => setShowFullProfile(true)}
                className="mt-4 text-xs text-[#6D4098] font-medium hover:underline flex items-center gap-1"
              >
                Ver más
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Right: Vertical Action Buttons */}
            <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[180px]">
              <button
                type="button"
                onClick={() => setShowPhotoModal(true)}
                className="px-5 py-3 rounded-lg text-sm font-semibold bg-green-500 hover:bg-green-600 text-white cursor-pointer transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Foto de Perfil
              </button>
              <button
                type="button"
                onClick={() => setShowProfileEditModal(true)}
                className="px-5 py-3 rounded-lg text-sm font-semibold bg-[#6D4098] hover:bg-[#553076] text-white cursor-pointer transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                Datos de Perfil
              </button>
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

        {/* Profile Edit Modal */}
        {showProfileEditModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Editar Datos de Perfil</h2>
                  <p className="text-sm text-gray-500 mt-1">Actualiza tu información personal y de seguridad</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProfileEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-4">
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === "personal"
                        ? "text-[#6D4098] border-b-2 border-[#6D4098]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("personal")}
                  >
                    Datos Personales
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === "company"
                        ? "text-[#6D4098] border-b-2 border-[#6D4098]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("company")}
                  >
                    Datos de Empresa
                  </button>
                </div>

                {activeTab === "personal" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: "Nombre", key: "nombre", type: "text", placeholder: "Tu nombre" },
                        { label: "Apellido", key: "apellido", type: "text", placeholder: "Tu apellido" },
                        { label: "Teléfono Personal", key: "num_celular", type: "tel", placeholder: "+54 9 11 1234-5678", colSpan: 2 },
                        { label: "País", key: "country", type: "text", placeholder: "Argentina" },
                        { label: "LinkedIn", key: "linkedin", type: "url", placeholder: "https://linkedin.com/in/tu-perfil", colSpan: 2 },
                      ].map((field) => (
                        <div key={field.key} className={field.colSpan ? `md:col-span-${field.colSpan}` : ""}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                          <div className="relative">
                            <input
                              type={field.type}
                              value={profileForm[field.key as keyof typeof profileForm]}
                              onChange={(e) => setProfileForm({ ...profileForm, [field.key]: e.target.value })}
                              disabled={!editableFields[field.key as keyof typeof editableFields]}
                              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D4098] focus:border-transparent pr-10 ${
                                !editableFields[field.key as keyof typeof editableFields] ? "bg-gray-100 text-gray-500 border-gray-200" : "border-gray-300 bg-white"
                              }`}
                              placeholder={field.placeholder}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setEditableFields((prev) => ({
                                  ...prev,
                                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                  [field.key]: !prev[field.key as keyof typeof editableFields],
                                }))
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6D4098] transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 mb-6">
                        <h3 className="text-lg font-semibold text-[#6D4098] mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Seguridad y Acceso
                        </h3>
                        
                        <div className="space-y-6">
                          {/* Email Section */}
                          <div className="bg-white rounded-lg p-4 border border-purple-100 shadow-sm">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Correo Electrónico</h4>
                            <div className="flex items-start gap-3 mb-3">
                              <div className="bg-blue-50 text-blue-600 p-2 rounded-full">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-600">
                                  Tu email actual es: <strong className="text-gray-900">{user?.email}</strong>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Para cambiar tu email, ingresa el nuevo y te enviaremos un código de verificación.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D4098] focus:border-transparent"
                                placeholder="nuevo@email.com"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newEmail && newEmail !== user?.email) {
                                    setShowEmailConfirm(true);
                                  } else {
                                    toast.error("Ingresa un email válido y diferente al actual");
                                  }
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  newEmail && newEmail !== user?.email
                                    ? "bg-[#6D4098] text-white hover:bg-[#553076]"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                                disabled={!newEmail || newEmail === user?.email}
                              >
                                Solicitar Cambio
                              </button>
                            </div>
                          </div>

                          {/* Password Section */}
                          <div className="bg-white rounded-lg p-4 border border-purple-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-semibold text-gray-900">Contraseña</h4>
                              <button
                                type="button"
                                onClick={() => setShowPasswordChange(!showPasswordChange)}
                                className="text-sm text-[#6D4098] hover:text-[#553076] font-medium hover:underline"
                              >
                                {showPasswordChange ? "Cancelar" : "Cambiar Contraseña"}
                              </button>
                            </div>
                            
                            {showPasswordChange && (
                              <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
                                  <input
                                    type="password"
                                    value={passwordForm.current}
                                    onChange={(e) => handlePasswordChange("current", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D4098] focus:border-transparent"
                                    placeholder="Ingresa tu contraseña actual"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                                  <input
                                    type="password"
                                    value={passwordForm.next}
                                    onChange={(e) => handlePasswordChange("next", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D4098] focus:border-transparent"
                                    placeholder="Mínimo 8 caracteres"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
                                  <input
                                    type="password"
                                    value={passwordForm.confirm}
                                    onChange={(e) => handlePasswordChange("confirm", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D4098] focus:border-transparent"
                                    placeholder="Repite la nueva contraseña"
                                  />
                                </div>
                                
                                <div className="flex justify-end pt-2">
                                  <button
                                    type="button"
                                    onClick={handlePasswordSubmit}
                                    className="px-4 py-2 bg-[#6D4098] text-white rounded-lg text-sm font-medium hover:bg-[#553076] transition-colors"
                                  >
                                    Actualizar Contraseña
                                  </button>
                                </div>

                                {passwordError && (
                                  <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{passwordError}</p>
                                )}
                                {passwordSuccess && (
                                  <p className="text-sm text-green-600 bg-green-50 p-2 rounded">{passwordSuccess}</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "company" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de la Empresa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: "Nombre de la Empresa", key: "companyName", type: "text", placeholder: "Nombre de tu empresa", colSpan: 2 },
                        { label: "Sitio Web", key: "website", type: "url", placeholder: "https://www.tuempresa.com" },
                        { label: "Email de Empresa", key: "companyEmail", type: "email", placeholder: "contacto@empresa.com" },
                        { label: "Teléfono de Empresa", key: "companyPhone", type: "tel", placeholder: "+54 9 11 1234-5678" },
                        { label: "CUIT / Tax ID", key: "companyTaxId", type: "text", placeholder: "20-12345678-9" },
                        { label: "Dirección Fiscal", key: "companyAddress", type: "text", placeholder: "Calle 123, Ciudad, Provincia", colSpan: 2 },
                      ].map((field) => (
                        <div key={field.key} className={field.colSpan ? `md:col-span-${field.colSpan}` : ""}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                          <div className="relative">
                            <input
                              type={field.type}
                              value={(profileForm as any)[field.key]}
                              onChange={(e) => setProfileForm({ ...profileForm, [field.key]: e.target.value })}
                              disabled={!editableFields[field.key as keyof typeof editableFields]}
                              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6D4098] focus:border-transparent pr-10 ${
                                !editableFields[field.key as keyof typeof editableFields] ? "bg-gray-100 text-gray-500 border-gray-200" : "border-gray-300 bg-white"
                              }`}
                              placeholder={field.placeholder}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setEditableFields((prev) => ({
                                  ...prev,
                                  [field.key]: !prev[field.key as keyof typeof editableFields],
                                }))
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6D4098] transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProfileEditModal(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => setShowSaveConfirmation(true)}
                  className="px-5 py-2.5 bg-[#6D4098] text-white rounded-lg text-sm font-medium hover:bg-[#553076] transition-colors shadow-sm cursor-pointer"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Confirmation Modal */}
        {showSaveConfirmation && (
          <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center px-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all scale-100">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
                  <svg className="h-6 w-6 text-[#6D4098]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">¿Guardar cambios?</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Estás a punto de actualizar tu información de perfil. Esta acción modificará tus datos visibles.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowSaveConfirmation(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={async () => {
                      setShowSaveConfirmation(false);
                      try {
                        if (user?.id) {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          const updatedUser = await editProfile(String(user.id), {
                            nombre: profileForm.nombre,
                            apellido: profileForm.apellido,
                            num_celular: profileForm.num_celular,
                            country: profileForm.country,
                            linkedin: profileForm.linkedin,
                            companyName: profileForm.companyName,
                            website: profileForm.website,
                            companyEmail: profileForm.companyEmail,
                            companyPhone: profileForm.companyPhone,
                            companyAddress: profileForm.companyAddress,
                            companyTaxId: profileForm.companyTaxId,
                          });
                          
                          // Update local user state
                          useAuthStore.setState({
                            user: {
                              ...user,
                              ...updatedUser,
                              profile: updatedUser.profile,
                              company: updatedUser.company
                            }
                          });

                          toast.success("Perfil actualizado correctamente");
                          setShowProfileEditModal(false);
                          
                          // Reset editable fields
                          setEditableFields(Object.keys(editableFields).reduce((acc, key) => ({
                            ...acc,
                            [key]: false
                          }), {} as typeof editableFields));
                        }
                      } catch (error) {
                        console.error("Error updating profile:", error);
                        toast.error("Error al actualizar el perfil");
                      }
                    }}
                    className="px-4 py-2 bg-[#6D4098] text-white rounded-lg text-sm font-medium hover:bg-[#553076] transition-colors shadow-lg shadow-purple-500/30"
                  >
                    Confirmar y Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Profile View Modal */}
        {showFullProfile && (
          <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center px-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex items-center justify-between z-10">
                <h3 className="text-xl font-bold text-gray-900">Detalles del Perfil</h3>
                <button 
                  onClick={() => setShowFullProfile(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <IoMdClose size={24} className="text-gray-500" />
                </button>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Personal Section */}
                <section>
                  <h4 className="text-sm font-bold text-[#6D4098] uppercase tracking-wider mb-4 border-b border-purple-100 pb-2">
                    Información Personal
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">Nombre Completo</span>
                      <p className="text-gray-900 font-medium">{fullName}</p>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">Email</span>
                      <p className="text-gray-900 font-medium">{user?.email}</p>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">Teléfono Personal</span>
                      <p className="text-gray-900 font-medium">{user?.num_celular || "-"}</p>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">País</span>
                      <p className="text-gray-900 font-medium">{user?.profile?.country || "-"}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="block text-xs text-gray-500 mb-1">LinkedIn</span>
                      <a href={user?.profile?.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block">
                        {user?.profile?.linkedinUrl || "-"}
                      </a>
                    </div>
                  </div>
                </section>

                {/* Company Section */}
                <section>
                  <h4 className="text-sm font-bold text-[#6D4098] uppercase tracking-wider mb-4 border-b border-purple-100 pb-2">
                    Información de Empresa
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">Empresa</span>
                      <p className="text-gray-900 font-medium">{user?.company?.companyName || "-"}</p>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">CUIT / Tax ID</span>
                      <p className="text-gray-900 font-medium">{user?.company?.taxId || "-"}</p>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">Email Corporativo</span>
                      <p className="text-gray-900 font-medium">{user?.company?.companyEmail || "-"}</p>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mb-1">Teléfono Corporativo</span>
                      <p className="text-gray-900 font-medium">{user?.company?.companyPhone || "-"}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="block text-xs text-gray-500 mb-1">Sitio Web</span>
                      <a href={user?.company?.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block">
                        {user?.company?.website || "-"}
                      </a>
                    </div>
                    <div className="md:col-span-2">
                      <span className="block text-xs text-gray-500 mb-1">Dirección Fiscal</span>
                      <p className="text-gray-900 font-medium">{user?.company?.address || "-"}</p>
                    </div>
                  </div>
                </section>
              </div>
              
              <div className="bg-gray-50 p-5 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setShowFullProfile(false)}
                  className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Confirmation Modal */}
        {showEmailConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">¿Cambiar Email?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Estás por cambiar tu email de <strong>{user?.email}</strong> a <strong>{newEmail}</strong>.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-left">
                  <p className="text-xs text-blue-800">
                    📧 Te enviaremos un correo a <strong>{newEmail}</strong> con un enlace de verificación. 
                    El cambio se efectuará solo después de que confirmes el nuevo email.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEmailConfirm(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success(`Email de verificación enviado a ${newEmail}`);
                    setShowEmailConfirm(false);
                    setNewEmail("");
                  }}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white cursor-pointer"
                >
                  Confirmar y Enviar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
