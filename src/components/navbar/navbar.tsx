"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { motion } from "framer-motion";
import { EditPasswordRequest } from "@/services/userService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Dropdown de Servicios
  const [servicesOpen, setServicesOpen] = useState(false);
  const toggleServices = () => setServicesOpen((s) => !s);

  const { user, logout } = useAuthStore();
  const { cambiarClave } = useUserStore();

  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordsMatch =
    newPassword.length > 0 && confirmPassword.length > 0
      ? newPassword === confirmPassword
      : true;

  const handleChangePassword = async () => {
    if (!passwordsMatch) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      setLoading(true);
      const body: EditPasswordRequest = { contrasenia: newPassword };
      await cambiarClave(body);
      toast.success("Contraseña cambiada correctamente");
      setIsModalPasswordOpen(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setIsOpen(false);
  };

  // helper para cerrar todos los overlays
  const closeAllMenus = () => {
    setIsOpen(false);
    setUserMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav className="font-[Poppins] bg-white shadow-gray-300 shadow-md relative">
      <div className="container mx-auto px-10 py-3 flex justify-between items-center">
        <Link href="/" className="self-start">
          <Image
            src="/logoUplin.svg"
            alt="Logo Uplin"
            width={80}
            height={40}
            className="w-20 h-10 block"
          />
        </Link>

        {/* DESKTOP */}
        <div className="hidden lg:flex gap-12 items-center">
          <a
            href="/quienes-somos"
            className="text-[#502B7D] hover:text-[#6b4699] cursor-pointer"
          >
            Quienes Somos
          </a>

          <div className="relative">
            <button
              type="button"
              onClick={toggleServices}
              aria-expanded={servicesOpen}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-colors
      ${
        servicesOpen
          ? "bg-[#502B7D] text-white"
          : "text-[#502B7D] hover:bg-[#502B7D] hover:text-white"
      }`}
            >
              <span>Servicios</span>
              <FaChevronDown
                className={`transition-transform hover:text-white ${
                  servicesOpen ? "rotate-180 text-white" : "text-[#502B7D]"
                }`}
              />
            </button>

            {servicesOpen && (
              <div
                className="absolute left-0 mt-3 w-[320px] bg-white rounded-2xl shadow-lg py-4 z-30"
                onMouseLeave={() => setServicesOpen(false)}
              >
                {/* ▼▼▼ AJUSTE: hover sutil sin subrayado ▼▼▼ */}
                <a
                  href="/servicios/creditos"
                  className="block px-6 py-3 pl-7 text-[#502B7D] rounded-lg transition-colors relative hover:bg-[#502B7D]/10 focus-visible:bg-[#502B7D]/10 before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 before:h-3 before:w-[3px] before:rounded-full before:bg-transparent hover:before:bg-[#502B7D] focus-visible:before:bg-[#502B7D] focus-visible:outline-none"
                  onClick={closeAllMenus}
                >
                  Búsqueda de Talento
                </a>
                <a
                  href="/servicios/ppStaffing"
                  className="block px-6 py-3 pl-7 text-[#502B7D] rounded-lg transition-colors relative hover:bg-[#502B7D]/10 focus-visible:bg-[#502B7D]/10 before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 before:h-3 before:w-[3px] before:rounded-full before:bg-transparent hover:before:bg-[#502B7D] focus-visible:before:bg-[#502B7D] focus-visible:outline-none"
                  onClick={closeAllMenus}
                >
                  People Partner Staffing
                </a>
                <a
                  href="/servicios/consultorias"
                  className="block px-6 py-3 pl-7 text-[#502B7D] rounded-lg transition-colors relative hover:bg-[#502B7D]/10 focus-visible:bg-[#502B7D]/10 before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 before:h-3 before:w-[3px] before:rounded-full before:bg-transparent hover:before:bg-[#502B7D] focus-visible:before:bg-[#502B7D] focus-visible:outline-none"
                  onClick={closeAllMenus}
                >
                  Consultorías
                </a>
                <a
                  href="/servicios/membresias"
                  className="block px-6 py-3 pl-7 text-[#502B7D] rounded-lg transition-colors relative hover:bg-[#502B7D]/10 focus-visible:bg-[#502B7D]/10 before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 before:h-3 before:w-[3px] before:rounded-full before:bg-transparent hover:before:bg-[#502B7D] focus-visible:before:bg-[#502B7D] focus-visible:outline-none"
                  onClick={closeAllMenus}
                >
                  Membresías
                </a>
              </div>
            )}
          </div>

          <a
            href="/academy"
            className="text-[#502B7D] hover:text-[#6b4699] cursor-pointer"
          >
            Uplin Academy
          </a>
          <a
            href="/careers"
            className="text-[#502B7D] hover:text-[#6b4699] cursor-pointer"
          >
            Uplin Careers
          </a>
          <a
            href="https://u030x.share.hsforms.com/2kmoJRY33TFChFJbTJ37Mlw"
            className="border-[#502B7D] border-2 px-5 py-1 rounded-lg hover:bg-[#502B7D] hover:text-white cursor-pointer"
          >
            Contacto
          </a>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-[#502B7D] p-2 rounded-full cursor-pointer hover:opacity-80"
            >
              <FaUserCircle size={28} />
            </button>
            {userMenuOpen && (
              <div className="absolute text-[#502B7D] right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-20">
                {!user ? (
                  <Link
                    href="/login"
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={handleLogout}
                      className="block text-[#502B7D] w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Cerrar sesión
                    </button>
                    <button
                      onClick={() => {
                        setIsModalPasswordOpen(true);
                        setUserMenuOpen(false);
                      }}
                      className="block text-[#502B7D] w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Cambiar contraseña
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* HAMBURGER */}
        <button
          className="lg:hidden text-[#502B7D] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* MOBILE */}
      {isOpen && (
        <div className="lg:hidden mt-4 pb-4 space-y-3">
          <a
            href="/quienes-somos"
            className="block text-[#502B7D] hover:text-[#6b4699] py-2 px-4 hover:bg-[#502B7D]/10 rounded cursor-pointer"
            onClick={closeAllMenus}
          >
            Quienes Somos
          </a>

          {/* Servicios con submenú en mobile */}
          <button
            type="button"
            onClick={() => setServicesOpen((s) => !s)}
            aria-expanded={servicesOpen}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-colors
            ${servicesOpen ? "bg-[#502B7D] text-white" : "text-[#502B7D]"}
            hover:bg-[#502B7D] hover:text-white`}
          >
            <span>Servicios</span>
            <FaChevronDown
              className={`transition-transform ${
                servicesOpen ? "rotate-180 text-white" : "text-[#502B7D]"
              }`}
            />
          </button>

          {servicesOpen && (
            <div className="ml-4 space-y-1">
              {/* ▼▼▼ AJUSTE: hover sutil sin subrayado ▼▼▼ */}
              <a
                href="/servicios/creditos"
                className="block px-6 py-3 pl-7 text-[#502B7D] rounded-lg transition-colors relative hover:bg-[#502B7D]/10 focus-visible:bg-[#502B7D]/10 before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 before:h-3 before:w-[3px] before:rounded-full before:bg-transparent hover:before:bg-[#502B7D] focus-visible:before:bg-[#502B7D] focus-visible:outline-none"
                onClick={closeAllMenus}
              >
                Búsqueda de Talento
              </a>
              <a
                href="/servicios/ppStaffing"
                className="block px-6 py-3 pl-7 text-[#502B7D] rounded-lg transition-colors relative hover:bg-[#502B7D]/10 focus-visible:bg-[#502B7D]/10 before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 before:h-3 before:w-[3px] before:rounded-full before:bg-transparent hover:before:bg-[#502B7D] focus-visible:before:bg-[#502B7D] focus-visible:outline-none"
                onClick={closeAllMenus}
              >
                People Partner Staffing
              </a>
              <a
                href="/servicios/consultorias"
                className="block px-6 py-3 pl-7 text-[#502B7D] rounded-lg transition-colors relative hover:bg-[#502B7D]/10 focus-visible:bg-[#502B7D]/10 before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 before:h-3 before:w-[3px] before:rounded-full before:bg-transparent hover:before:bg-[#502B7D] focus-visible:before:bg-[#502B7D] focus-visible:outline-none"
                onClick={closeAllMenus}
              >
                Consultorías
              </a>
              <a
                href="/servicios/membresias"
                className="block px-6 py-3 pl-7 text-[#502B7D] rounded-lg transition-colors relative hover:bg-[#502B7D]/10 focus-visible:bg-[#502B7D]/10 before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 before:h-3 before:w-[3px] before:rounded-full before:bg-transparent hover:before:bg-[#502B7D] focus-visible:before:bg-[#502B7D] focus-visible:outline-none"
                onClick={closeAllMenus}
              >
                Membresías
              </a>
            </div>
          )}

          <a
            href="/academy"
            className="block text-[#502B7D] hover:text-[#6b4699] py-2 px-4 hover:bg-[#502B7D]/10 rounded cursor-pointer"
            onClick={closeAllMenus}
          >
            Uplin Academy
          </a>
          <a
            href="/careers"
            className="block text-[#502B7D] hover:text-[#6b4699] py-2 px-4 hover:bg-[#502B7D]/10 rounded cursor-pointer"
            onClick={closeAllMenus}
          >
            Uplin Careers
          </a>
          <a
            href="https://u030x.share.hsforms.com/2kmoJRY33TFChFJbTJ37Mlw"
            className="inline-block border-[#502B7D] border-2 px-5 py-1 rounded-lg hover:bg-[#502B7D] hover:text-white mt-2 cursor-pointer"
            onClick={closeAllMenus}
          >
            Contacto
          </a>

          {!user ? (
            <Link
              href="/login"
              className="block text-[#502B7D] px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={closeAllMenus}
            >
              Iniciar sesión
            </Link>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="block w-full text-[#502B7D] text-left px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                Cerrar sesión
              </button>
              <button
                onClick={() => {
                  setIsModalPasswordOpen(true);
                  setIsOpen(false);
                }}
                className="block w-full text-[#502B7D] text-left px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                Cambiar contraseña
              </button>
            </>
          )}
        </div>
      )}

      {isModalPasswordOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={() => setIsModalPasswordOpen(false)}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl z-10 mx-4">
            <button
              onClick={() => setIsModalPasswordOpen(false)}
              className="absolute top-3 right-3 text-[#6D4098] cursor-pointer hover:opacity-70"
            >
              <IoMdClose size={24} />
            </button>

            <h2 className="text-xl font-semibold text-[#6D4098] mb-4 text-center">
              Cambiar Contraseña
            </h2>

            <div className="relative mb-4">
              <label
                htmlFor="newPassword"
                className="block text-[#6D4098] font-normal mb-2"
              >
                Nueva contraseña
              </label>
              <input
                id="newPassword"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#6D4098] text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d] pr-12"
                placeholder="Ingresa tu nueva contraseña"
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <IoEyeSharp size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>

            <div className="relative mb-1">
              <label
                htmlFor="confirmPassword"
                className="block text-[#6D4098] font-normal mb-2"
              >
                Repetir contraseña
              </label>
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white border ${
                  passwordsMatch ? "border-[#6D4098]" : "border-red-500"
                } text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d] pr-12`}
                placeholder="Confirma tu nueva contraseña"
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <IoEyeSharp size={20} />
                ) : (
                  <FaEyeSlash size={20} />
                )}
              </button>
            </div>

            {!passwordsMatch && (
              <p className="text-red-500 text-sm mb-2">
                Las contraseñas no coinciden
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleChangePassword}
              disabled={loading}
              className="w-full bg-[#72bf58] border-4 border-[#72bf58] py-2 px-5 rounded-lg text-white font-semibold text-center cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? "Procesando..." : "Cambiar Contraseña"}
            </motion.button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

