import { RecursoBiblioteca, TipoRecurso } from "@/interfaces";
import {
  IconoTipoRecurso,
  IconoDescargar,
  IconoLinkExterno,
  IconoCandado,
  IconoReloj,
} from "./BibliotecaIcons";

const iconGradient: Record<TipoRecurso, string> = {
  pdf: "from-uplin-orange to-uplin-orange-dark",
  video: "from-uplin-purple to-uplin-purple-deep",
  xlsx: "from-uplin-green to-uplin-green-dark",
  doc: "from-uplin-purple-2 to-uplin-purple-deep",
};

const tipoLabel: Record<TipoRecurso, string> = {
  pdf: "PDF",
  video: "Video",
  xlsx: "XLSX",
  doc: "DOC",
};

interface Props {
  recurso: RecursoBiblioteca;
}

export default function ResourceCard({ recurso }: Props) {
  const { titulo, descripcion, tipo, meta, href, locked, descarga, externo } =
    recurso;

  return (
    <article
      className={[
        "group relative flex flex-col overflow-hidden rounded-r-lg border border-white/70 p-6",
        "bg-white/45 shadow-glass backdrop-blur-xl backdrop-saturate-150",
        "transition-all duration-300",
        locked
          ? "opacity-70 hover:-translate-y-0.5"
          : "hover:-translate-y-1.5 hover:bg-white/60",
      ].join(" ")}
    >
      {/* barra superior de acento (solo en disponibles) */}
      {!locked && (
        <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-uplin-purple-deep via-uplin-purple to-uplin-green transition-transform duration-500 group-hover:scale-x-100" />
      )}

      {/* tag "Próximamente" */}
      {locked && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-r-pill bg-uplin-purple-deep/8 px-3 py-1 text-[0.7rem] font-semibold text-uplin-purple-deep">
          <IconoReloj />
          Próximamente
        </span>
      )}

      {/* top: ícono + meta */}
      <div className="mb-4 flex items-start gap-3">
        <div
          className={[
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl p-3 text-white shadow-md transition-transform duration-300",
            "bg-gradient-to-br",
            iconGradient[tipo],
            locked ? "opacity-90 grayscale-[0.25]" : "group-hover:-rotate-6 group-hover:scale-105",
          ].join(" ")}
        >
          <IconoTipoRecurso tipo={tipo} />
        </div>

        {!locked && (
          <div className="flex flex-col gap-1">
            <span className="w-fit rounded-r-pill bg-uplin-purple-deep/8 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-uplin-purple-deep">
              {tipoLabel[tipo]}
            </span>
            {meta && (
              <span className="text-xs text-ink-soft">{meta}</span>
            )}
          </div>
        )}
      </div>

      {/* título + descripción */}
      <h3
        className={[
          "mb-2 text-lg font-bold leading-snug tracking-tight",
          locked ? "text-ink-soft" : "text-uplin-purple-deep",
        ].join(" ")}
      >
        {titulo}
      </h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-ink-soft">
        {descripcion}
      </p>

      {/* acción */}
      {locked ? (
        <button
          disabled
          className="inline-flex cursor-not-allowed items-center gap-2 self-start rounded-r-pill border border-uplin-purple-deep/10 bg-uplin-purple-deep/5 px-4 py-2 text-sm font-semibold text-ink-soft"
        >
          <IconoCandado />
          Disponible pronto
        </button>
      ) : (
        <a
          href={href}
          {...(descarga ? { download: true } : {})}
          {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="inline-flex items-center gap-2 self-start rounded-r-pill bg-gradient-to-br from-uplin-purple to-uplin-purple-deep px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          {externo ? "Ver webinar" : descarga ? "Descargar" : "Abrir"}
          {externo ? <IconoLinkExterno /> : <IconoDescargar />}
        </a>
      )}
    </article>
  );
}
