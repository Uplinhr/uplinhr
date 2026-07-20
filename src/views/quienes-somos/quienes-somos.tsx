"use client";
import BotonPrimario from "@/components/BotonPrimario/BotonPrimario";
import NeedsData from "@/views/quienes-somos/Needs";
import Card from "@/components/Card/Card";
import Image from "next/image";
import { Volume2 } from "lucide-react";
import { speakText } from "@/utils/textToSpeech";
import ServiceHero from "@/components/ServiceHero/ServiceHero";
import Title from "@/components/Title/Title";
import { motion } from "framer-motion";
import { Banner } from "@/components/banner/banner";

const teamMembers = [
  {
    name: "Sandra Benitez",
    role: "Co-founder de Uplin",
    image: "/Sandra_Perfil.png",
    linkedin: "https://www.linkedin.com/in/sandra-ben%C3%ADtez-441370185/",
  },
  {
    name: "Marisol Lopez",
    role: "Co-founder de Uplin",
    image: "/Sol_Perfil.png",
    linkedin: "https://www.linkedin.com/in/marisol-l%C3%B3pez-gonz%C3%A1lez92/",
  },
];

const QuienesSomos = () => {
  const handleHeroTTS = () => {
    speakText(
      "Cuidá a las personas de tu equipo y ellos van a cuidar de tu negocio. La empatía, la escucha activa y la adaptabilidad son claves para una gestión de personas real y con impacto. En Uplin, las ponemos en el centro."
    );
  };

  const handleDescriptionTTS = () => {
    speakText(
      "Uplin es una consejera que acompaña en la toma de decisiones, mostrando las mejores opciones con sus ventajas y desventajas. Sabe que todo proceso requiere tomar decisiones, todas las decisiones requieren tiempo y toda vivencia genera experiencia y nos hace crecer. Nosotras también hemos pasado por procesos que nos enseñaron y nos hicieron crecer y florecer como profesionales. Hoy nuestra experiencia y conocimiento nos permite poder acompañar a otros/as junto a emprendedores, ya que Uplin siempre apunta a que sus clientes nunca se sientan solos."
    );
  };

  const handleSaberMasTTS = () => {
    speakText(
      "¿Querés saber más? Si estás liderando una startup, escalando tu equipo o buscando una forma más humana de gestionar el talento, estamos acá para acompañarte."
    );
  };

  return (
    <main className="min-h-screen">
      <ServiceHero
        tag="Quiénes somos"
        title={{
          before: "Cuida a las personas de ",
          gradient: "tu equipo ",
          after: "y ellos van a cuidar de tu negocio.",
        }}
        description={
          <p>
            La empatía, la escucha activa y la adaptabilidad son claves para una
            gestión de personas real y con impacto. En Uplin, las ponemos en el
            centro.
          </p>
        }
        primaryBtn={{ text: "Descubre nuestros servicios", href: "/#servicios" }}
        secondaryBtn={{
          text: "Agenda una llamada inicial",
          href: "https://meetings.hubspot.com/llopez-ramirez",
        }}
        mediaSlot={
          <div className="aspect-video rounded-2xl overflow-hidden w-full">
            <iframe
              src="https://www.youtube.com/embed/PJmeRJxUJQc?autoplay=0&mute=1&controls=1"
              className="w-full h-full"
              title="Video de Uplin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        }
        onTTS={handleHeroTTS}
        ttsAriaLabel="Escuchar Quiénes somos"
      />

      {/* ── Sección intro ── */}
      <motion.section
        className="relative z-10 py-4 pb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div
          className="quienes-intro-grid-inner mx-auto px-4"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(190px, 290px) 1fr",
            gap: "2.6rem",
            alignItems: "center",
            maxWidth: "1000px",
          }}
        >
          {/* Columna izquierda — Logo animado */}
          <div className="flex justify-center items-center">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 20px 38px rgba(60,14,54,0.22))" }}
            >
              <Image
                src="/Logo_Uplin.png"
                alt="Logo Uplin"
                width={250}
                height={250}
                className="w-full"
                style={{ maxWidth: "250px", height: "auto", display: "block" }}
              />
            </motion.div>
          </div>

          {/* Columna derecha — Card oscura con blobs */}
          <div
            className="relative rounded-[var(--radius-uplin-lg)] overflow-hidden border"
            style={{
              background:
                "linear-gradient(135deg, var(--color-uplin-purple-deep), var(--color-uplin-purple-2))",
              borderColor: "rgba(255,255,255,0.16)",
              boxShadow: "0 22px 54px -14px rgba(60,14,54,0.45)",
              padding: "2.6rem 2.8rem",
            }}
          >
            {/* Blobs decorativos */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  radial-gradient(circle at 15% 18%, rgba(114,191,88,0.22) 0%, transparent 46%),
                  radial-gradient(circle at 88% 86%, rgba(248,154,28,0.20) 0%, transparent 48%)
                `,
                zIndex: 0,
              }}
            />

            {/* Botón escuchar — variante clara para fondo oscuro */}
            <div className="absolute top-5 right-5 z-10">
              <button
                onClick={handleDescriptionTTS}
                aria-label="Escuchar descripción de Uplin"
                title="Escuchar texto"
                type="button"
                className="inline-flex items-center justify-center rounded-full w-[38px] h-[38px] transition-all"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-uplin-green)";
                  e.currentTarget.style.borderColor =
                    "var(--color-uplin-green)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                <Volume2 size={16} />
              </button>
            </div>

            {/* Textos */}
            <div className="relative z-10 flex flex-col gap-[1.1rem]">
              <p
                className="text-[1.05rem] leading-[1.75] m-0"
                style={{ color: "#fff" }}
              >
                Uplin es una consejera que acompaña en la toma de decisiones,
                mostrando las mejores opciones con sus ventajas y desventajas.
              </p>
              <p
                className="text-[1.05rem] leading-[1.75] m-0"
                style={{ color: "#fff" }}
              >
                Sabe que todo proceso requiere tomar decisiones, todas las
                decisiones requieren tiempo y toda vivencia genera experiencia y
                nos hace crecer.
              </p>
              <p
                className="text-[1.05rem] leading-[1.75] m-0"
                style={{ color: "#fff" }}
              >
                Nosotras también hemos pasado por procesos que nos enseñaron y
                nos hicieron crecer y florecer como profesionales.
              </p>
              <p
                className="text-[1.05rem] leading-[1.75] m-0"
                style={{ color: "#fff" }}
              >
                Hoy nuestra experiencia y conocimiento nos permite poder
                acompañar a otros/as junto a emprendedores, ya que Uplin siempre
                apunta a que sus clientes nunca se sientan solos.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .quienes-intro-grid-inner {
              grid-template-columns: 1fr !important;
              max-width: 480px !important;
            }
            .quienes-intro-grid-inner img {
              max-width: 175px !important;
            }
          }
        `}</style>
      </motion.section>

      {/* ── Sección equipo ── */}
      <section className="relative py-12 sm:py-20 text-center px-4 sm:px-6 z-10">
        <Title
          before="Conocé nuestro "
          gradient="equipo"
          gradientClass="gradient-purple-orange"
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-[820px] mx-auto px-4 sm:px-8">
          {teamMembers.map((person, index) => (
            <motion.a
              key={index}
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver perfil de LinkedIn de ${person.name}`}
              className="block rounded-[var(--radius-uplin-lg)] border border-white/70 overflow-hidden text-left cursor-pointer"
              style={{
                background: "var(--color-uplin-glass-bg-strong)",
                backdropFilter: "blur(24px) saturate(170%)",
                boxShadow: "var(--shadow-uplin-glass)",
                textDecoration: "none",
                padding: "1.6rem 1.6rem 1.9rem",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.2, 0.7, 0.2, 1],
              }}
              whileHover={{ y: -6, background: "rgba(255,255,255,0.58)" }}
            >
              {/* Foto — aspect-ratio 4/5 */}
              <div
                className="relative w-full overflow-hidden mx-auto mb-5"
                style={{
                  maxWidth: "300px",
                  aspectRatio: "4/5",
                  borderRadius: "var(--radius-uplin-md)",
                  boxShadow: "0 10px 30px -10px rgba(60,14,54,0.22)",
                }}
              >
                <Image
                  alt={`${person.name}, ${person.role}`}
                  src={person.image}
                  fill
                  className="object-cover object-top transition-transform duration-500 hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Info */}
              <div className="flex justify-between items-center mt-2">
                <div>
                  <h3
                    className="text-[1.35rem] font-bold tracking-[-0.015em] mb-[0.2rem]"
                    style={{ color: "var(--color-uplin-ink)" }}
                  >
                    {person.name}
                  </h3>
                  <p
                    className="text-[0.98rem] mb-0"
                    style={{ color: "var(--color-uplin-ink-soft)" }}
                  >
                    {person.role}
                  </p>
                </div>

                {/* Ícono LinkedIn — decorativo */}
                <div
                  className="inline-flex items-center justify-center flex-shrink-0 w-[42px] h-[42px] rounded-[var(--radius-uplin-sm)] text-white transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))",
                  }}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="20"
                    height="20"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── Sección Needs ── */}
      <section className="text-center py-10 px-4 sm:px-6 max-w-[1000px] mx-auto">
        <Title before="Todo lo que necesitas para hacer crecer tu equipo," gradient=" en un solo lugar" gradientClass="gradient-purple-orange"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-7">
          {NeedsData.map((item, index) => (
            <Card key={index} {...item} animationDelay={index * 0.08} />
          ))}
        </div>
      </section>

      {/* ── Sección ¿Querés saber más? ── */}
      <motion.section
        className="relative z-10 py-8 pb-20 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div
          className="mx-auto relative overflow-hidden text-center rounded-[var(--radius-uplin-xl)]"
          style={{
            maxWidth: "880px",
            background: "linear-gradient(135deg, var(--color-uplin-purple-deep), var(--color-uplin-purple-2))",
            padding: "3rem 2.5rem",
            boxShadow: "0 22px 54px -14px rgba(60,14,54,0.45)",
          }}
        >
          {/* Blobs decorativos internos */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 18% 22%, rgba(114,191,88,0.28) 0%, transparent 45%),
                radial-gradient(circle at 84% 80%, rgba(248,154,28,0.26) 0%, transparent 48%)
              `,
              zIndex: 0,
            }}
          />

          {/* Contenido — sobre los blobs */}
          <div className="relative z-10">
            <h2
              className="font-bold tracking-[-0.02em] mb-[0.9rem]"
              style={{
                fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                color: "#fff",
              }}
            >
              ¿Quieres saber más?
            </h2>

            <p
              className="mx-auto mb-[1.8rem] leading-[1.6]"
              style={{
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.9)",
                maxWidth: "600px",
              }}
            >
              Si estás liderando una startup, escalando tu equipo o buscando una
              forma más humana de gestionar el talento, estamos acá para acompañarte.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-[0.9rem] justify-center">
              {/* Botón primario — gradiente purple, igual al sistema */}
              <BotonPrimario
                text="Descubre nuestros servicios"
                href="/#servicios"
              />

              {/* Botón secundario — variante para fondo oscuro */}
              <motion.a
                href="https://meetings.hubspot.com/llopez-ramirez"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-full px-6 py-3 text-white transition-all"
                style={{
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.24)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                }}
              >
                Agenda una llamada inicial
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>

      <Banner />
    </main>
  );
};

export default QuienesSomos;
