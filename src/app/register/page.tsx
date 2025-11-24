"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TbLoader2 } from "react-icons/tb";
import { registerUser } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    num_celular: "",
    email: "",
    contrasenia: "",
    confirm: "",
    companyName: "",
    country: "",
    website: "",
    linkedin: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: "",
    companyTaxId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loginWithRedirect, isLoading: auth0Loading } = useAuth0();

  const passwordsMatch = form.contrasenia.length > 0 && form.contrasenia === form.confirm;

  const fieldErrors = useMemo(() => {
    const errs: Record<string, string> = {};
    if (!form.nombre.trim()) errs["nombre"] = "El nombre es requerido";
    if (!form.email.trim()) {
      errs["email"] = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs["email"] = "Email inválido";
    }
    if (form.contrasenia.length < 8) {
      errs["contrasenia"] = "Mínimo 8 caracteres";
    }
    if (form.confirm && !passwordsMatch) {
      errs["confirm"] = "Las contraseñas no coinciden";
    }
    return errs;
  }, [form, passwordsMatch]);

  const isFormValid = useMemo(() => {
    return (
      !!form.nombre.trim() &&
      !!form.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      form.contrasenia.length >= 8 &&
      passwordsMatch
    );
  }, [form, passwordsMatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isFormValid) {
      setError("Revisa los campos resaltados");
      return;
    }
    try {
      setLoading(true);
      await registerUser({
        nombre: form.nombre,
        apellido: form.apellido || undefined,
        num_celular: form.num_celular || undefined,
        email: form.email,
        contrasenia: form.contrasenia,
        companyName: form.companyName || undefined,
        country: form.country || undefined,
        website: form.website || undefined,
        linkedin: form.linkedin || undefined,
        companyEmail: form.companyEmail || undefined,
        companyPhone: form.companyPhone || undefined,
        companyAddress: form.companyAddress || undefined,
        companyTaxId: form.companyTaxId || undefined,
      });
      toast.success("Registro exitoso. Te enviamos un correo para verificar tu cuenta. Por favor, confirma para poder iniciar sesión.");
      router.push("/login");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: "google" | "linkedin") => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: provider === "google" ? "google-oauth2" : "linkedin",
          screen_hint: "signup",
        },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error en registro social");
    }
  };

  if (auth0Loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#6D4098]">
        <TbLoader2 className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#6D4098] p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Registrarse</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Datos Personales */}
          <div className="space-y-4">
            <h3 className="text-white/80 text-sm font-semibold border-b border-white/20 pb-1">Datos Personales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    fieldErrors.nombre ? "border-red-400" : "border-white/20"
                  } text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30`}
                  placeholder="Leo"
                />
                {fieldErrors.nombre && (
                  <p className="text-xs text-red-300 mt-1">{fieldErrors.nombre}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Caiguan"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-1">Teléfono Personal</label>
                <input
                  type="tel"
                  name="num_celular"
                  value={form.num_celular}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="+54 9 11 1234-5678"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm mb-1">Correo Electrónico</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-purple-300 ${
                  fieldErrors.email ? "border-2 border-red-400" : ""
                }`}
              />
              {fieldErrors.email && <p className="text-red-300 text-xs mt-1">{fieldErrors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm mb-1">Contraseña</label>
                <input
                  name="contrasenia"
                  type="password"
                  value={form.contrasenia}
                  onChange={handleChange}
                  className={`w-full p-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-purple-300 ${
                    fieldErrors.contrasenia ? "border-2 border-red-400" : ""
                  }`}
                />
                {fieldErrors.contrasenia && (
                  <p className="text-red-300 text-xs mt-1">{fieldErrors.contrasenia}</p>
                )}
              </div>
              <div>
                <label className="block text-white text-sm mb-1">Confirmar</label>
                <input
                  name="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={handleChange}
                  className={`w-full p-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-purple-300 ${
                    fieldErrors.confirm ? "border-2 border-red-400" : ""
                  }`}
                />
              </div>
            </div>
            {fieldErrors.confirm && <p className="text-red-300 text-xs">{fieldErrors.confirm}</p>}
          </div>

          {/* Datos de Empresa */}
          <div className="space-y-4 pt-2">
            <h3 className="text-white/80 text-sm font-semibold border-b border-white/20 pb-1">Datos de Empresa</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm mb-1">Empresa</label>
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-white text-sm mb-1">País</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm mb-1">Website</label>
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-white text-sm mb-1">LinkedIn</label>
                <input
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm mb-1">Email Empresa</label>
                <input
                  name="companyEmail"
                  type="email"
                  value={form.companyEmail}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-white text-sm mb-1">Teléfono Empresa</label>
                <input
                  name="companyPhone"
                  value={form.companyPhone}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm mb-1">Dirección Fiscal</label>
                <input
                  name="companyAddress"
                  value={form.companyAddress}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-white text-sm mb-1">CUIT / Tax ID</label>
                <input
                  name="companyTaxId"
                  value={form.companyTaxId}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-200 text-sm text-center bg-red-500/20 p-2 rounded">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8BC540] hover:bg-[#7ab036] text-white font-bold py-3 rounded-lg transition-colors shadow-lg disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? <TbLoader2 className="animate-spin text-xl" /> : "Crear cuenta"}
          </button>

          <div className="flex items-center gap-4 my-4">
            <div className="h-px bg-white/30 flex-1" />
            <span className="text-white/70 text-sm">o registrarse con</span>
            <div className="h-px bg-white/30 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleSocialSignup("google")}
              className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialSignup('linkedin')}
              disabled={auth0Loading}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0077B5] text-white hover:bg-[#006699] transition-all duration-200 disabled:opacity-70 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.77 2.65 4.77 6.1V23h-4v-6.65c0-1.58-.03-3.62-2.2-3.62-2.2 0-2.54 1.72-2.54 3.5V23h-4V8z"/></svg>
              LinkedIn
            </button>
          </div>

          <div className="text-center mt-2">
            <button onClick={() => router.push("/login")} className="text-white cursor-pointer font-poppins font-normal hover:underline">
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
