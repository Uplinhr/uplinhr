"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegistroBibliotecaForm } from "@/interfaces";
import { rolesOptions, paisesOptions } from "@/utils/biblioteca/formOptions";
import { IconoFlecha, IconoCandado } from "./BibliotecaIcons";

// ⚠️ ESTADO ACTUAL (sin backend): al enviar solo redirige a /biblioteca/gracias.
// 🔧 TODO: reemplazar el cuerpo de handleSubmit por una llamada al service real.

const initialState: RegistroBibliotecaForm = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  empresa: "",
  rol: "",
  pais: "",
};

const inputClass =
  "w-full rounded-r-sm border border-uplin-purple-deep/10 bg-white/70 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-uplin-purple focus:ring-2 focus:ring-uplin-purple/20";

const labelClass = "mb-1.5 block text-xs font-semibold text-ink-soft";

export default function RegistroForm() {
  const router = useRouter();
  const [form, setForm] = useState<RegistroBibliotecaForm>(initialState);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    router.push("/biblioteca/gracias");
  };

  return (
    <div className="rounded-r-lg border border-white/70 bg-white/72 p-7 shadow-glass backdrop-blur-xl backdrop-saturate-150">
      <span className="mb-3 inline-block rounded-r-pill bg-uplin-green/15 px-3 py-1 text-xs font-semibold text-uplin-green-dark">
        Acceso gratuito
      </span>
      <h2 className="mb-1 text-2xl font-bold tracking-tight text-uplin-purple-deep">
        Desbloquea tu <em className="not-italic text-uplin-green-dark">acceso</em>
      </h2>
      <p className="mb-5 text-sm text-ink-soft">
        Completa tus datos y recibe el material en minutos.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor="nombre">
            Nombre <span className="text-uplin-orange-dark">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder="María"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="apellido">
            Apellido <span className="text-uplin-orange-dark">*</span>
          </label>
          <input
            id="apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            required
            placeholder="López"
            className={inputClass}
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass} htmlFor="email">
            Email corporativo <span className="text-uplin-orange-dark">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="maria@empresa.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="telefono">
            Teléfono <span className="text-uplin-orange-dark">*</span>
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={form.telefono}
            onChange={handleChange}
            required
            placeholder="+54 11 ..."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="empresa">
            Empresa <span className="text-uplin-orange-dark">*</span>
          </label>
          <input
            id="empresa"
            name="empresa"
            value={form.empresa}
            onChange={handleChange}
            required
            placeholder="Tu empresa"
            className={inputClass}
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass} htmlFor="rol">
            Tu rol <span className="text-uplin-orange-dark">*</span>
          </label>
          <select
            id="rol"
            name="rol"
            value={form.rol}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Selecciona tu rol…</option>
            {rolesOptions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className={labelClass} htmlFor="pais">
            País <span className="text-uplin-orange-dark">*</span>
          </label>
          <select
            id="pais"
            name="pais"
            value={form.pais}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Selecciona tu país…</option>
            {paisesOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-r-pill bg-gradient-to-br from-uplin-purple to-uplin-purple-deep px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
        >
          {enviando ? "Redirigiendo…" : "Acceder a los recursos"}
          {!enviando && <IconoFlecha />}
        </button>
      </form>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
        <IconoCandado />
        Tus datos están protegidos. Sin spam.
      </p>
    </div>
  );
}
