"use client";

import { useState } from "react";
import ResourceFilters from "@/components/biblioteca/ResourceFilters";
import CategoryBlock from "@/components/biblioteca/CategoryBlock";
import { categorias, totalRecursos } from "@/utils/biblioteca/catalogData";

const disponibles = categorias
  .flatMap((c) => c.recursos)
  .filter((r) => !r.locked).length;

const proximos = totalRecursos - disponibles;

const headerStats = [
  { num: String(disponibles), label: "Recursos disponibles ahora" },
  { num: `+${proximos}`, label: "Próximos lanzamientos en camino" },
  { num: "100%", label: "Acceso gratuito e ilimitado" },
];

export default function RecursosView() {
  const [filtro, setFiltro] = useState("all");

  return (
      <main className="relative">
        {/* ===================== HEADER ===================== */}
        <section className="px-6 pb-4 pt-32 text-center md:pt-40">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-r-pill border border-uplin-green/30 bg-white/50 px-3.5 py-1.5 text-xs font-semibold text-uplin-green-dark">
              <span className="h-2 w-2 rounded-full bg-uplin-green" />
              Acceso desbloqueado
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-uplin-purple-deep md:text-5xl">
              Tu biblioteca de{" "}
              <em className="not-italic text-uplin-green-dark">recursos</em>
              <br />
              está lista.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-ink-soft">
              Material curado para que ordenes tu gestión de talento, optimices
              procesos y tomes mejores decisiones desde el primer día.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-10">
              {headerStats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-extrabold text-uplin-purple-deep">
                    {s.num}
                  </div>
                  <div className="mt-1 max-w-[160px] text-xs text-ink-soft">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== FILTROS + CATEGORÍAS ===================== */}
        <section className="px-6 pb-24 pt-8">
          <div className="mx-auto max-w-6xl">
            <ResourceFilters filtroActivo={filtro} onFiltroChange={setFiltro} />

            {categorias.map((categoria) => (
              <CategoryBlock
                key={categoria.slug}
                categoria={categoria}
                filtroActivo={filtro}
              />
            ))}
          </div>
        </section>
      </main>
  );
}
