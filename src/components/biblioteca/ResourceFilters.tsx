"use client";

import { conteoPorCategoria, totalRecursos } from "@/utils/biblioteca/catalogData";

interface Props {
  filtroActivo: string;
  onFiltroChange: (filtro: string) => void;
}

export default function ResourceFilters({ filtroActivo, onFiltroChange }: Props) {
  const chips = [
    { slug: "all", titulo: "Todos", count: totalRecursos },
    ...conteoPorCategoria,
  ];

  return (
    <div className="sticky top-24 z-20 mb-12">
      <div className="mx-auto flex max-w-fit flex-wrap items-center gap-2 rounded-r-pill border border-white/70 bg-white/60 px-4 py-2.5 shadow-glass backdrop-blur-xl">
        <span className="pl-1 pr-1 text-sm font-medium text-ink-soft">
          Filtrar:
        </span>
        {chips.map((chip) => {
          const activo = filtroActivo === chip.slug;
          return (
            <button
              key={chip.slug}
              onClick={() => onFiltroChange(chip.slug)}
              className={[
                "inline-flex items-center gap-1.5 rounded-r-pill px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                activo
                  ? "bg-gradient-to-br from-uplin-purple to-uplin-purple-deep text-white shadow-md"
                  : "text-ink-soft hover:bg-uplin-purple/8 hover:text-uplin-purple-deep",
              ].join(" ")}
            >
              {chip.titulo}
              <span
                className={[
                  "rounded-r-pill px-1.5 py-0.5 text-xs font-semibold",
                  activo ? "bg-white/20" : "bg-uplin-purple-deep/8",
                ].join(" ")}
              >
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
