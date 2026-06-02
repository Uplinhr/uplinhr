"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { motion, AnimatePresence } from "framer-motion";
import { EditPasswordRequest } from "@/services/userService";

const ease = [0.4, 0, 0.2, 1] as const;
const fast = { duration: 0.22, ease };
const base = { duration: 0.35, ease };

const serviceLinks = [
  { href: "/servicios/creditos", label: "Búsqueda de talento" },
  { href: "/servicios/ppStaffing", label: "People Partner Staffing" },
  { href: "/servicios/consultorias", label: "Consultorías" },
  { href: "/servicios/membresias", label: "Membresías" },
];

const bibliotecaLinks = [
  { href: "/biblioteca/plantillas", label: "Plantillas accionables" },
  { href: "/biblioteca/guias", label: "Guías descargables" },
  { href: "/biblioteca/webinars", label: "Webinars Grabados" },
];

const dropdownLinkClass =
  "nav-dropdown-item block px-6 py-3 pl-7 text-uplin-purple text-uplin-nav font-medium rounded-lg transition-all relative " +
  "focus-visible:bg-uplin-purple/10 " +
  "before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 before:h-3 before:w-[3px] before:rounded-full before:bg-transparent " +
  "hover:before:bg-uplin-purple focus-visible:before:bg-uplin-purple focus-visible:outline-none";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [bibliotecaOpen, setBibliotecaOpen] = useState(false);

  const servicesLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bibliotecaLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleServices = () => setServicesOpen((s) => !s);
  const toggleBiblioteca = () => setBibliotecaOpen((b) => !b);

  const openServices = () => {
    if (servicesLeaveTimer.current) clearTimeout(servicesLeaveTimer.current);
    setServicesOpen(true);
  };
  const closeServices = () => {
    servicesLeaveTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };
  const openBiblioteca = () => {
    if (bibliotecaLeaveTimer.current) clearTimeout(bibliotecaLeaveTimer.current);
    setBibliotecaOpen(true);
  };
  const closeBiblioteca = () => {
    bibliotecaLeaveTimer.current = setTimeout(() => setBibliotecaOpen(false), 120);
  };

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

  const closeAllMenus = () => {
    setIsOpen(false);
    setUserMenuOpen(false);
    setServicesOpen(false);
    setBibliotecaOpen(false);
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-7xl mx-auto rounded-[28px] border border-uplin-line bg-uplin-bg shadow-uplin-nav">
        <div className="pl-4 pr-6 py-3 flex justify-between items-center">
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
          <div className="hidden lg:flex gap-10 items-center">
            <motion.a
              href="/quienes-somos"
              className="text-uplin-ink text-uplin-nav font-medium px-4 py-2 rounded-xl hover:bg-uplin-purple-8 hover:text-uplin-purple cursor-pointer transition-colors"
              whileHover={{ y: -2 }}
              transition={fast}
            >
              Quiénes somos
            </motion.a>

            {/* Dropdown Servicios */}
            <div
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <motion.button
                type="button"
                onClick={toggleServices}
                aria-expanded={servicesOpen}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={fast}
                className={`flex items-center gap-2 text-uplin-nav font-medium rounded-xl px-4 py-2 transition-colors ${
                  servicesOpen
                    ? "bg-uplin-purple-8 text-uplin-purple"
                    : "text-uplin-ink hover:bg-uplin-purple-8 hover:text-uplin-purple"
                }`}
              >
                <span>Servicios</span>
                <motion.span
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={fast}
                  className="flex items-center"
                >
                  <FaChevronDown />
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={fast}
                    className="absolute left-0 mt-3 w-[320px] bg-white rounded-2xl shadow-uplin-glass border border-uplin-line py-4 z-30"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServices}
                  >
                    {serviceLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className={dropdownLinkClass}
                        onClick={closeAllMenus}
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.a
              href="/careers"
              className="text-uplin-ink text-uplin-nav font-medium px-4 py-2 rounded-xl hover:bg-uplin-purple-8 hover:text-uplin-purple cursor-pointer transition-colors"
              whileHover={{ y: -2 }}
              transition={fast}
            >
              Uplin Careers
            </motion.a>

            {/* Dropdown Biblioteca Uplin */}
            <div
              className="relative"
              onMouseEnter={openBiblioteca}
              onMouseLeave={closeBiblioteca}
            >
              <motion.button
                type="button"
                onClick={toggleBiblioteca}
                aria-expanded={bibliotecaOpen}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={fast}
                className={`flex items-center gap-2 text-uplin-nav font-medium rounded-xl px-4 py-2 transition-colors ${
                  bibliotecaOpen
                    ? "bg-uplin-purple-8 text-uplin-purple"
                    : "text-uplin-ink hover:bg-uplin-purple-8 hover:text-uplin-purple"
                }`}
              >
                <span>Biblioteca Uplin</span>
                <motion.span
                  animate={{ rotate: bibliotecaOpen ? 180 : 0 }}
                  transition={fast}
                  className="flex items-center"
                >
                  <FaChevronDown />
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {bibliotecaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={fast}
                    className="absolute left-0 mt-3 w-[280px] bg-white rounded-2xl shadow-uplin-glass border border-uplin-line py-4 z-30"
                    onMouseEnter={openBiblioteca}
                    onMouseLeave={closeBiblioteca}
                  >
                    {bibliotecaLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className={dropdownLinkClass}
                        onClick={closeAllMenus}
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.a
              href="https://u030x.share.hsforms.com/2kmoJRY33TFChFJbTJ37Mlw"
              className="text-uplin-ink text-uplin-nav font-medium px-4 py-2 rounded-xl hover:bg-uplin-purple-8 hover:text-uplin-purple cursor-pointer transition-colors"
              whileHover={{ y: -2 }}
              transition={fast}
            >
              Contacto
            </motion.a>

            {/* User menu — oculto visualmente, lógica preservada para reincorporar
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="text-uplin-purple-deep p-2 rounded-full cursor-pointer hover:opacity-80"
              >
                <FaUserCircle size={28} />
              </button>
              {userMenuOpen && (
                <div className="absolute text-uplin-purple-deep right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-20">
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
                        className="block text-uplin-purple-deep w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Cerrar sesión
                      </button>
                      <button
                        onClick={() => {
                          setIsModalPasswordOpen(true);
                          setUserMenuOpen(false);
                        }}
                        className="block text-uplin-purple-deep w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Cambiar contraseña
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            */}
          </div>

          {/* HAMBURGER */}
          <motion.button
            className="lg:hidden text-uplin-purple-deep focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.97 }}
            transition={fast}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={fast}
                  className="flex"
                >
                  <FaTimes size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={fast}
                  className="flex"
                >
                  <FaBars size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={base}
            className="lg:hidden overflow-hidden"
          >
            <div className="pb-4 px-4 space-y-1">
              <a
                href="/quienes-somos"
                className="block text-uplin-ink text-uplin-nav font-medium hover:text-uplin-purple py-2 px-4 hover:bg-uplin-purple/10 rounded-lg cursor-pointer transition-colors"
                onClick={closeAllMenus}
              >
                Quiénes Somos
              </a>

              {/* Servicios con submenú en mobile */}
              <button
                type="button"
                onClick={toggleServices}
                aria-expanded={servicesOpen}
                className={`flex items-center gap-2 w-full text-uplin-nav font-medium rounded-lg px-4 py-2 cursor-pointer transition-colors ${
                  servicesOpen
                    ? "bg-uplin-purple-deep text-white"
                    : "text-uplin-ink hover:bg-uplin-purple/10 hover:text-uplin-purple"
                }`}
              >
                <span>Servicios</span>
                <motion.span
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={fast}
                  className="flex items-center"
                >
                  <FaChevronDown />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={fast}
                    className="overflow-hidden ml-4 space-y-1"
                  >
                    {serviceLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className={dropdownLinkClass}
                        onClick={closeAllMenus}
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                href="/careers"
                className="block text-uplin-ink text-uplin-nav font-medium hover:text-uplin-purple py-2 px-4 hover:bg-uplin-purple/10 rounded-lg cursor-pointer transition-colors"
                onClick={closeAllMenus}
              >
                Uplin Careers
              </a>

              {/* Biblioteca Uplin con submenú en mobile */}
              <button
                type="button"
                onClick={toggleBiblioteca}
                aria-expanded={bibliotecaOpen}
                className={`flex items-center gap-2 w-full text-uplin-nav font-medium rounded-lg px-4 py-2 cursor-pointer transition-colors ${
                  bibliotecaOpen
                    ? "bg-uplin-purple-deep text-white"
                    : "text-uplin-ink hover:bg-uplin-purple/10 hover:text-uplin-purple"
                }`}
              >
                <span>Biblioteca Uplin</span>
                <motion.span
                  animate={{ rotate: bibliotecaOpen ? 180 : 0 }}
                  transition={fast}
                  className="flex items-center"
                >
                  <FaChevronDown />
                </motion.span>
              </button>

              <AnimatePresence>
                {bibliotecaOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={fast}
                    className="overflow-hidden ml-4 space-y-1"
                  >
                    {bibliotecaLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className={dropdownLinkClass}
                        onClick={closeAllMenus}
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-2">
                <a
                  href="https://u030x.share.hsforms.com/2kmoJRY33TFChFJbTJ37Mlw"
                  className="inline-block text-uplin-nav font-medium border-2 border-uplin-purple-deep text-uplin-purple-deep px-5 py-1.5 rounded-lg hover:bg-uplin-purple-deep hover:text-white cursor-pointer transition-colors"
                  onClick={closeAllMenus}
                >
                  Contacto
                </a>
              </div>

              {/* Sesión de usuario — oculta visualmente, lógica preservada para reincorporar
              {!user ? (
                <Link
                  href="/login"
                  className="block text-uplin-purple-deep px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={closeAllMenus}
                >
                  Iniciar sesión
                </Link>
              ) : (
                <>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-uplin-purple-deep text-left px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Cerrar sesión
                  </button>
                  <button
                    onClick={() => {
                      setIsModalPasswordOpen(true);
                      setIsOpen(false);
                    }}
                    className="block w-full text-uplin-purple-deep text-left px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Cambiar contraseña
                  </button>
                </>
              )}
              */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal cambio de contraseña — oculto visualmente, lógica preservada para reincorporar
      {isModalPasswordOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={() => setIsModalPasswordOpen(false)}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl z-10 mx-4">
            <button
              onClick={() => setIsModalPasswordOpen(false)}
              className="absolute top-3 right-3 text-uplin-purple cursor-pointer hover:opacity-70"
            >
              <IoMdClose size={24} />
            </button>

            <h2 className="text-xl font-semibold text-uplin-purple mb-4 text-center">
              Cambiar contraseña
            </h2>

            <div className="relative mb-4">
              <label
                htmlFor="newPassword"
                className="block text-uplin-purple font-normal mb-2"
              >
                Nueva contraseña
              </label>
              <input
                id="newPassword"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-uplin-purple text-uplin-ink focus:outline-none focus:ring-2 focus:ring-uplin-purple-deep pr-12"
                placeholder="Ingresa tu nueva contraseña"
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 text-uplin-ink-muted hover:text-uplin-ink-soft cursor-pointer"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <IoEyeSharp size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>

            <div className="relative mb-1">
              <label
                htmlFor="confirmPassword"
                className="block text-uplin-purple font-normal mb-2"
              >
                Repetir contraseña
              </label>
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white border ${
                  passwordsMatch ? "border-uplin-purple" : "border-red-500"
                } text-uplin-ink focus:outline-none focus:ring-2 focus:ring-uplin-purple-deep pr-12`}
                placeholder="Confirma tu nueva contraseña"
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 text-uplin-ink-muted hover:text-uplin-ink-soft cursor-pointer"
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
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={fast}
              onClick={handleChangePassword}
              disabled={loading}
              className="w-full bg-uplin-green border-4 border-uplin-green py-2 px-5 rounded-lg text-white font-semibold text-center cursor-pointer flex items-center justify-center gap-2 shadow-uplin-btn-green"
            >
              {loading ? "Procesando..." : "Cambiar Contraseña"}
            </motion.button>
          </div>
        </div>
      )}
      */}
    </nav>
  );
};

export default Navbar;
