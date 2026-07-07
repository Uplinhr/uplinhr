import Link from "next/link";
import BibliotecaBackground from "@/components/biblioteca/BibliotecaBackground";
import { IconoFlecha } from "@/components/biblioteca/BibliotecaIcons";

const pasos = [
  {
    n: 1,
    titulo: "Explora los recursos",
    desc: "Recorre las guías, plantillas y webinars disponibles. Elige los que más se alinean con tu desafío actual.",
    cta: "Ver biblioteca",
    href: "/biblioteca/recursos",
    externo: false,
  },
  {
    n: 2,
    titulo: "Aplica la primera herramienta",
    desc: "Los mejores founders no leen, ejecutan. Elige una plantilla y aplícala esta semana. Iteras después.",
    cta: "Ver plantillas",
    href: "/biblioteca/recursos#plantillas",
    externo: false,
  },
  {
    n: 3,
    titulo: "Agenda un diagnóstico",
    desc: "Si quieres un análisis personalizado de tu estructura de talento, agenda una llamada gratuita con un experto de Uplin.",
    cta: "Agendar llamada",
    href: "https://meetings.hubspot.com/llopez-ramirez",
    externo: true,
  },
];

export default function GraciasView() {
  return (
    <>
      <BibliotecaBackground />

      <main className="relative">
        {/* ===================== HERO ÉXITO ===================== */}
        <section className="px-6 pb-16 pt-32 text-center md:pt-44">
          <div className="mx-auto max-w-2xl">
            {/* check animado */}
            <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-uplin-green/30" />
              <span className="absolute inset-2 animate-pulse rounded-full bg-uplin-green/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-uplin-green to-uplin-green-dark text-white shadow-lg">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-9 w-9"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-r-pill border border-uplin-green/30 bg-white/50 px-3.5 py-1.5 text-xs font-semibold text-uplin-green-dark">
              <span className="h-2 w-2 rounded-full bg-uplin-green" />
              Registro confirmado
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-uplin-purple-deep md:text-5xl">
              ¡Ya tienes acceso a los{" "}
              <em className="not-italic text-uplin-green-dark">recursos</em>!
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-base text-ink-soft">
              Ahora puedes descargar el material y empezar a optimizar la gestión
              de tu equipo con mejores decisiones.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/biblioteca/recursos"
                className="inline-flex items-center gap-2 rounded-r-pill bg-gradient-to-br from-uplin-purple to-uplin-purple-deep px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Ver el material
                <IconoFlecha />
              </Link>
              <a
                href="https://wa.me/573006796513"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-r-pill border border-uplin-purple-deep/15 bg-white/60 px-5 py-3 text-sm font-semibold text-uplin-purple-deep transition-all duration-300 hover:bg-white/80"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Hablá con un experto
              </a>
            </div>

            <p className="mt-8 text-sm text-muted">
              📩 También te enviamos un email con el acceso permanente.
              <br />
              Revisa tu bandeja de entrada (y promociones, por si acaso).
            </p>
          </div>
        </section>

        {/* ===================== PRÓXIMOS PASOS ===================== */}
        <section className="px-6 pb-24 pt-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-uplin-purple">
                <span className="h-px w-8 bg-uplin-purple/40" />
                Próximos pasos
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-uplin-purple-deep">
                ¿Cómo aprovechar al{" "}
                <em className="not-italic text-uplin-green-dark">máximo</em> el
                material?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-ink-soft">
                Tres acciones simples para sacarle el mejor jugo desde hoy.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {pasos.map((paso) => (
                <div
                  key={paso.n}
                  className="flex flex-col rounded-r-lg border border-white/70 bg-white/45 p-8 shadow-glass backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/60"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-uplin-purple to-uplin-purple-deep text-lg font-bold text-white shadow-md">
                    {paso.n}
                  </div>
                  <h3 className="mb-2 text-lg font-bold tracking-tight text-uplin-purple-deep">
                    {paso.titulo}
                  </h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-ink-soft">
                    {paso.desc}
                  </p>
                  {paso.externo ? (
                    <a
                      href={paso.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-uplin-purple transition-colors hover:text-uplin-purple-deep"
                    >
                      {paso.cta}
                      <IconoFlecha />
                    </a>
                  ) : (
                    <Link
                      href={paso.href}
                      className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-uplin-purple transition-colors hover:text-uplin-purple-deep"
                    >
                      {paso.cta}
                      <IconoFlecha />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
