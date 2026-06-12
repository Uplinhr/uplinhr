"use client"
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import BotonVolume from "@/components/BotonVolume/BotonVolume";
import { useEffect, useRef, useState } from "react";
import { speakText } from "@/utils/textToSpeech";

function useAnimatedCounter(target: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration]);
  return value;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.10,
      ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number],
    },
  }),
};

const Presentation = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "0px 0px -80px 0px" });

  const c0 = useAnimatedCounter(150, 1400, statsInView);
  const c1 = useAnimatedCounter(25,  1400, statsInView); // 25 → "2.5"
  const c2 = useAnimatedCounter(100,  1400, statsInView);

  const handleTTS = () => {
    speakText(
      "RRHH flexible para tu equipo. La primera consultora de servicios RRHH flexible en Latam. " +
      "Accede a soluciones de talento y gestión de personal cuando y como las necesites, sin contratos rígidos. " +
      "Tecnología y acompañamiento humano en un solo lugar."
    );
  };

  return (
    <section className="uplin-hero">
      <style>{`
        .uplin-hero {

          position: relative;
          overflow: hidden;
          padding-top: 7rem;
          padding-bottom: 5rem;
        }
        .uplin-hero-grid {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: clamp(300px, 55%, 640px) 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .uplin-hero { padding-top: 6rem; }
          .uplin-hero-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .uplin-hero-img-col { order: -1; }
        }
        @keyframes blobDrift {
          from { transform: translate(0px,  0px)  scale(1);    }
          to   { transform: translate(30px, 20px) scale(1.06); }
        }
        @keyframes teamFloat {
          0%,100% { transform: translateY(0px);   }
          50%     { transform: translateY(-14px); }
        }
        @keyframes accentUnderline {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes dotPulse {
          0%,100% { opacity: 1;    transform: scale(1);    }
          50%     { opacity: 0.45; transform: scale(0.72); }
        }
        .uplin-dot-pulse    { animation: dotPulse    2s   ease-in-out infinite; }
        .uplin-team-float   { animation: teamFloat   9s   ease-in-out infinite; }
        .uplin-accent-line  {
          position: absolute;
          left: 0; bottom: -3px;
          width: 100%; height: 3px;
          background: #72BF58;
          border-radius: 2px;
          transform-origin: left center;
          transform: scaleX(0);
          animation: accentUnderline 1.5s cubic-bezier(0.4,0,0.2,1) 1s forwards;
        }
        .uplin-btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.75rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #3C0E36 0%, #6D4098 100%);
          color: #FFFFFF;
          font-size: 0.92rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 20px -6px rgba(60,14,54,0.40);
          transition:
            box-shadow 0.35s cubic-bezier(0.4,0,0.2,1),
            transform  0.20s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
        }
        .uplin-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(114,191,88,0.30) 100%);
          opacity: 0;
          transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1);
          border-radius: 9999px;
          pointer-events: none;
        }
        .uplin-btn-primary:hover::after { opacity: 1; }
        .uplin-btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.75rem;
          border-radius: 9999px;
          color: #3C0E36;
          font-size: 0.92rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition:
            background     0.35s cubic-bezier(0.4,0,0.2,1),
            box-shadow     0.35s cubic-bezier(0.4,0,0.2,1),
            transform      0.20s cubic-bezier(0.4,0,0.2,1);
        }
        .uplin-btn-secondary:hover {
          background: rgba(255,255,255,0.95) !important;
        }
        .uplin-stats-divider {
          border-top: 1px solid rgba(60,14,54,0.08);
          padding-top: 1.25rem;
          display: flex;
          gap: 2.5rem;
        }
      `}</style>

      {/* ── Blobs de fondo ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "8%", left: "5%", width: 480, height: 480,
          background: "radial-gradient(circle, #CDBADA 0%, transparent 70%)",
          filter: "blur(70px)", opacity: 0.45,
          animation: "blobDrift 9s ease-in-out infinite alternate",
        }} />
        <div style={{
          position: "absolute", top: "55%", left: "30%", width: 360, height: 360,
          background: "radial-gradient(circle, #A2D18F 0%, transparent 70%)",
          filter: "blur(70px)", opacity: 0.35,
          animation: "blobDrift 11s ease-in-out infinite alternate-reverse",
        }} />
        <div style={{
          position: "absolute", top: "10%", right: "5%", width: 400, height: 400,
          background: "radial-gradient(circle, #FDC57C 0%, transparent 70%)",
          filter: "blur(70px)", opacity: 0.30,
          animation: "blobDrift 13s ease-in-out infinite alternate",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", right: "15%", width: 320, height: 320,
          background: "radial-gradient(circle, #E0D6EA 0%, transparent 70%)",
          filter: "blur(70px)", opacity: 0.55,
          animation: "blobDrift 10s ease-in-out infinite alternate-reverse",
        }} />
      </div>

      <div className="uplin-hero-grid">

        {/* ────────────────── COLUMNA IZQUIERDA ────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Eyebrow pill + TTS */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div
              className="glass-card"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.38rem 1rem", borderRadius: 9999,
              }}
            >
              <span
                className="uplin-dot-pulse"
                style={{
                  width: 8, height: 8, borderRadius: "50%",
                  backgroundColor: "#72BF58",
                  display: "inline-block", flexShrink: 0,
                }}
              />
              <span style={{
                fontSize: "0.82rem", fontWeight: 500,
                color: "#3C0E36",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                RRHH flexible para tu equipo
              </span>
            </div>

            <BotonVolume
              onClick={handleTTS}
              ariaLabel="Escuchar presentación"
            />
          </motion.div>

          {/* H1 */}
          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "#2A0824",
              margin: 0,
            }}
          >
            La primera<br />
            <span style={{ position: "relative", display: "inline-block" }}>
              <span className="text-gradient-uplin">consultora</span>
              <span className="uplin-accent-line" />
            </span>{" "}de
            <br />servicios RRHH
            <br />flexible en Latam
          </motion.h1>

          {/* Lead */}
          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            style={{
              fontSize: "1.07rem",
              lineHeight: 1.6,
              color: "#5A4566",
              margin: 0,
            }}
          >
            Accede a soluciones de talento y gestión de personal cuando y como las
            necesites, sin contratos rígidos. Tecnología y acompañamiento humano en un
            solo lugar.
          </motion.p>

          {/* Botones */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}
          >
            <motion.a
              href="/servicios"
              className="uplin-btn-primary"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            >
              Conocer los servicios →
            </motion.a>
            <motion.a
              href="/contacto"
              className="glass-card uplin-btn-secondary"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            >
              Habla con un experto
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="uplin-stats-divider"
          >
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#2A0824" }}>
                +{c0}
              </div>
              <div style={{ fontSize: "0.80rem", fontWeight: 500, color: "#8B7A95" }}>
                Empresas activas
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#2A0824" }}>
                +{(c1 / 10).toFixed(1)}K
              </div>
              <div style={{ fontSize: "0.80rem", fontWeight: 500, color: "#8B7A95" }}>
                Talentos colocados
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#2A0824" }}>
                {c2}%
              </div>
              <div style={{ fontSize: "0.80rem", fontWeight: 500, color: "#8B7A95" }}>
                Satisfacción
              </div>
            </div>
          </motion.div>
        </div>

        {/* ────────────────── COLUMNA DERECHA ────────────────── */}
        <motion.div
          className="relative flex items-center justify-center"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          {/* Halo multicapa */}
           <div
              className="
                absolute inset-[5%]
                rounded-full
                blur-[40px]
                z-0
                animate-[blobDrift_7s_ease-in-out_infinite_alternate]
              "
              style={{
                background:
                  "radial-gradient(circle, rgba(109,64,152,0.22) 0%, rgba(114,191,88,0.12) 50%, transparent 75%)",
              }}
            />

             {/* Halo secundario */}
            <div
              className="
                absolute inset-[20%]
                rounded-full
                blur-[20px]
                z-0
              "
              style={{
                background:
                  "radial-gradient(circle, rgba(60,14,54,0.10) 0%, transparent 70%)",
              }}
            />

          {/* Imagen flotante */}
           <div
            className="
              uplin-team-float
              relative
               z-[1]
              w-[220px]
              sm:w-[280px]
              lg:w-[340px]
            "
          >
            <Image
              alt="Equipo Uplinhr — RRHH flexible en Latam"
              src="/FOTO_EQUIPO.jpg"
              width={500}
              height={500}
              priority
              className="
                w-full
                h-auto
                uplin-hero-mask
                uplin-hero-image
              "
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Presentation;
