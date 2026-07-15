"use client";

import RegistroForm from "@/components/biblioteca/RegistroForm";
import EyebrowPill from "@/components/EyebrowPill/EyebrowPill";
import ServiceHero from "@/components/ServiceHero/ServiceHero";
import Card from "@/components/Card/Card";
import QueEncontraras from "@/views/biblioteca/QueEncontraras";
import Beneficios from "@/views/biblioteca/Beneficios";
import { speakText } from "@/utils/textToSpeech";
import { heroStats, stats } from "@/utils/biblioteca/landingData";
import Title from "@/components/Title/Title";

const paraQuien = [
  "Founders de startups en etapa de crecimiento (Seed → Serie B)",
  "CEOs que ya no pueden gestionar todo desde su cabeza",
  "Líderes que necesitan ordenar procesos de talento",
  "Operadores y COOs buscando frameworks aplicables",
  "Empresas escalando sin RR.HH. consolidado todavía",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-uplin-purple">
      <span className="h-px w-8 bg-uplin-purple/40" />
      {children}
    </div>
  );
}

export default function BibliotecaView() {
  const handleHeroTTS = () => {
    speakText(
      "Desbloquea recursos estratégicos gratis para escalar tu equipo con mejores decisiones. Accede a guías, documentos y videos exclusivos pensados para founders, CEOs y líderes que quieren ordenar su gestión de talento, optimizar procesos y crecer con más claridad."
    );
  };

  return (

      <main className="relative">
        {/* ===================== HERO ===================== */}
        <ServiceHero
          tag="Recursos exclusivos · Acceso gratuito"
          titleSlot={
            <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight text-uplin-purple-deep md:text-5xl">
              Desbloquea recursos estratégicos{" "}
              <span className="gradient-purple-green">gratis</span> para
              escalar tu equipo con{" "}
              <span className="text-uplin-orange-dark">
                mejores decisiones
              </span>
              .
            </h1>
          }
          description={
            <>
              Accede a guías, documentos y videos exclusivos pensados para
              founders, CEOs y líderes que quieren ordenar su gestión de
              talento, optimizar procesos y crecer con más claridad.
              <div className="mt-8 flex flex-wrap gap-8">
                {heroStats.map((s) => (
                  <div key={s.num}>
                    <div className="text-2xl font-extrabold text-uplin-purple-deep">
                      {s.num}
                    </div>
                    <div className="mt-1 max-w-[180px] text-xs text-ink-soft">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </>
          }
          mediaSlot={
            <div id="registro">
              <RegistroForm />
            </div>
          }
          onTTS={handleHeroTTS}
          ttsAriaLabel="Escuchar presentación de la biblioteca"
        />

        {/* ===================== QUÉ VAS A ENCONTRAR ===================== */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <EyebrowPill text="Qué vas a encontrar"/>
            <Title before="Material " gradient="real" after=", listo para aplicar." gradientClass="gradient-purple-green"/>
            <p className="mt-3 max-w-xl text-ink-soft">
              Contenido pensado para founders, CEOs y líderes que ya saben que el
              éxito no está en más teoría, sino en mejores herramientas.
            </p>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {QueEncontraras.map((item, index) => (
                <Card key={index} {...item} animationDelay={index * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* ===================== BENEFICIOS ===================== */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>Beneficios</Eyebrow>
            <Title before="Todo lo que necesitas para tomar " gradient="mejores decisiones" gradientClass="gradient-purple-green"/>
            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Beneficios.map((item, index) => (
                <Card key={index} {...item} animationDelay={index * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* ===================== STATS (banda morada) ===================== */}
        <section className="px-6 py-8">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-r-xl bg-gradient-to-br from-uplin-purple-deep to-[#2A0824] px-8 py-16 text-white md:px-14">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-uplin-green-2">
              <span className="h-px w-8 bg-white/30" />
              Por qué ahora · Tendencias 2026
            </div>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight">
              El mercado de talento está en su{" "}
              <em className="not-italic text-uplin-green-2">punto más tenso</em>.
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              Datos verificados de nuestro último reporte estratégico para
              founders y líderes de RR.HH. en Latinoamérica.
            </p>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {stats.map((s) => (
                <div
                  key={s.fuente}
                  className="rounded-r-md border border-white/15 bg-white/5 p-7 backdrop-blur-sm"
                >
                  <div className="bg-gradient-to-br from-uplin-green to-uplin-orange bg-clip-text text-5xl font-extrabold leading-none text-transparent">
                    {s.valor}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/85">
                    {s.desc}
                  </p>
                  <p className="mt-3 text-[0.68rem] uppercase tracking-wider text-white/50">
                    {s.fuente}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== PARA QUIÉN ===================== */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>Para quién es esto</Eyebrow>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-uplin-purple-deep">
              Si te suena alguno,{" "}
              <em className="not-italic text-uplin-green-dark">es para ti</em>.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-ink-soft">
              Diseñado para líderes que sienten que su empresa creció más rápido
              que sus procesos internos.
            </p>

            <ul className="mx-auto mt-11 w-fit max-w-xl">
              {paraQuien.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-b border-uplin-purple-deep/8 py-4 text-left text-[0.95rem] font-medium text-ink last:border-none"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-uplin-green to-uplin-green-dark text-white shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===================== CTA FINAL ===================== */}
        <section className="px-6 py-8 pb-20">
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 overflow-hidden rounded-r-xl bg-gradient-to-br from-uplin-purple-deep via-uplin-purple-2 to-uplin-purple px-8 py-16 text-white md:px-14 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-uplin-green-2">
                <span className="h-px w-8 bg-white/30" />
                Último paso
              </div>
              <h2 className="text-4xl font-bold leading-tight tracking-tight">
                Empieza a liderar con{" "}
                <em className="not-italic text-uplin-green-2">claridad</em>.
              </h2>
              <p className="mt-4 max-w-md text-white/85">
                Acceso inmediato. Sin tarjeta, sin compromiso. Solo material útil
                para ordenar tu empresa y escalar mejor.
              </p>
            </div>
            <div>
              <RegistroForm />
            </div>
          </div>
        </section>
      </main>
  );
}
