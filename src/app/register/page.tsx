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
    email: "",
    contrasenia: "",
    confirm: "",
    companyName: "",
    country: "",
    website: "",
    linkedin: "",
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
        email: form.email,
        contrasenia: form.contrasenia,
        companyName: form.companyName || undefined,
        country: form.country || undefined,
        website: form.website || undefined,
        linkedin: form.linkedin || undefined,
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#6D4098] to-[#502B7D]">
      <div className="w-full max-w-md">
        <h1 className="text-white text-3xl font-bold text-center mb-8 font-poppins">Registrarse</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 p-6 rounded-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Nombre</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 ${fieldErrors.nombre ? 'ring-2 ring-red-500' : 'focus:ring-[#502b7d]'}`} />
              {fieldErrors.nombre && <p className="text-red-200 text-sm mt-1">{fieldErrors.nombre}</p>}
            </div>
            <div>
              <label className="block text-white mb-2">Apellido</label>
              <input name="apellido" value={form.apellido} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d]" />
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Correo Electrónico</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 ${fieldErrors.email ? 'ring-2 ring-red-500' : 'focus:ring-[#502b7d]'}`} />
            {fieldErrors.email && <p className="text-red-200 text-sm mt-1">{fieldErrors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Contraseña</label>
              <input type="password" name="contrasenia" value={form.contrasenia} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 ${fieldErrors.contrasenia ? 'ring-2 ring-red-500' : 'focus:ring-[#502b7d]'}`} />
              {fieldErrors.contrasenia && <p className="text-red-200 text-sm mt-1">{fieldErrors.contrasenia}</p>}
            </div>
            <div>
              <label className="block text-white mb-2">Confirmar</label>
              <input type="password" name="confirm" value={form.confirm} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 ${fieldErrors.confirm ? 'ring-2 ring-red-500' : 'focus:ring-[#502b7d]'}`} />
            </div>
          </div>
          {!passwordsMatch && <p className="text-red-200 text-sm">Las contraseñas no coinciden</p>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Empresa</label>
              <input name="companyName" value={form.companyName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d]" />
            </div>
            <div>
              <label className="block text-white mb-2">País</label>
              <input name="country" value={form.country} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Website</label>
              <input name="website" value={form.website} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d]" />
            </div>
            <div>
              <label className="block text-white mb-2">LinkedIn</label>
              <input name="linkedin" value={form.linkedin} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !isFormValid}
            title={!isFormValid ? 'Completa los campos obligatorios' : ''}
            className={`w-full py-3 rounded-xl text-white font-poppins font-bold text-lg disabled:opacity-70 flex items-center justify-center gap-2 ${(!isFormValid || loading) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            style={{ backgroundColor: "#72bf58" }}
          >
            {loading ? (
              <>
                <TbLoader2 className="w-5 h-5 animate-spin" color="#fff" />
                Registrando
              </>
            ) : (
              "Crear cuenta"
            )}
          </button>

          {/* Separador y opciones sociales */}
          <div className="relative flex items-center mt-2">
            <div className="flex-grow border-t border-gray-300" />
            <span className="flex-shrink mx-4 text-white">o registrarse con</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleSocialSignup('google')}
              disabled={auth0Loading}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 transition-all duration-200 disabled:opacity-70 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
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
