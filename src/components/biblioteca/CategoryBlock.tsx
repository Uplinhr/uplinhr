import { CategoriaBiblioteca } from "@/interfaces";
import { IconoCategoria } from "./BibliotecaIcons";
import ResourceCard from "./ResourceCard";

interface Props {
  categoria: CategoriaBiblioteca;
  filtroActivo: string;
}

export default function CategoryBlock({ categoria, filtroActivo }: Props) {
  const visible = filtroActivo === "all" || filtroActivo === categoria.slug;
  if (!visible) return null;

  return (
    <div id={categoria.slug} className="scroll-mt-28">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-uplin-purple to-uplin-purple-deep p-2.5 text-white shadow-md">
          <IconoCategoria slug={categoria.slug} />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-uplin-purple-deep">
          {categoria.titulo}
          <span className="ml-2 text-sm font-medium text-ink-soft">
            · {categoria.subtitulo}
          </span>
        </h2>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoria.recursos.map((recurso) => (
          <ResourceCard key={recurso.id} recurso={recurso} />
        ))}
      </div>
    </div>
  );
}
