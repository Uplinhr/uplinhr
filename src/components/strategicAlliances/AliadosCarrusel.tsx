"use client";

import { motion, useAnimationControls } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { useEffect } from "react";

type Ally = {
  id: number;
  name: string;
};

const allies: Ally[] = [
  { id: 1, name: "Aliado 1" },
  { id: 2, name: "Aliado 2" },
  { id: 3, name: "Aliado 3" },
  { id: 4, name: "Aliado 4" },
  { id: 5, name: "Aliado 5" },
  { id: 6, name: "Aliado 6" },
  { id: 7, name: "Aliado 7" },
  { id: 8, name: "Aliado 8" },
];

export const AliadosCarrusel = () => {
  // Duplicar el array para el efecto seamless:
  // cada item ocupa 180px + 20px (marginRight) = 200px
  // total track = 16 × 200px = 3200px → -50% = -1600px = exactamente 8 items
  const doubled = [...allies, ...allies];
  const controls = useAnimationControls();

  useEffect(() => {
  controls.start({
    x: ["0%", "-50%"],
    transition: {
      duration: 28,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    },
  });
}, [controls]);

  return (
    <section className="py-16 md:py-24">
      {/* ── ENCABEZADO ── */}
      <div className="flex flex-col items-center gap-4 mb-4 px-4">
        {/* Eyebrow badge glassmorphism */}
        <span
          className="inline-flex items-center rounded-full border font-semibold uppercase"
          style={{
            padding: "0.200rem 1.125rem",
            background: "var(--color-uplin-glass-bg-strong)",
            backdropFilter: "blur(16px) saturate(160%)",
            WebkitBackdropFilter: "blur(16px) saturate(160%)",
            borderColor: "var(--color-uplin-glass-border)",
            color: "var(--color-uplin-purple)",
            fontSize: "var(--text-uplin-eyebrow)",
            letterSpacing: "var(--tracking-uplin-badge)",
          }}
        >
          NUESTROS ALIADOS
        </span>
      </div>

      {/* ── CARRUSEL ── */}
      <div
        style={{
          overflow: "hidden",
          paddingBlock: "1.5rem",
          width: "100%",
        }}
      >
        <motion.div
          className="flex carrusel-track"
          style={{ width: "max-content" }}
        >
          {doubled.map((ally, index) => (
            <motion.div
              key={`${ally.id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center border cursor-default select-none"
              style={{
                width: "180px",
                height: "90px",
                marginRight: "1.25rem",
                background: "var(--color-uplin-glass-bg-strong)",
                backdropFilter: "blur(24px) saturate(170%)",
                WebkitBackdropFilter: "blur(24px) saturate(170%)",
                borderColor: "var(--color-uplin-glass-border)",
                borderRadius: "var(--radius-uplin-md)",
                boxShadow: "var(--shadow-uplin-glass)",
              }}
              whileHover={{
                y: -4,
                background: "rgba(255, 255, 255, 0.58)",
                boxShadow:
                  "0 24px 50px -12px rgba(60, 14, 54, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.90)",
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              {/* Placeholder: se reemplaza por <Image> cuando lleguen los logos reales */}
              <div
                className="flex flex-col items-center justify-center gap-1"
                style={{
                  width: "calc(100% - 1rem)",
                  height: "calc(100% - 0.75rem)",
                  background: "rgba(109, 64, 152, 0.08)",
                  borderRadius: "calc(var(--radius-uplin-md) - 6px)",
                }}
              >
                <ImageIcon
                  size={20}
                  style={{ color: "var(--color-uplin-purple-4)" }}
                />
                <span
                  style={{
                    fontSize: "var(--text-uplin-xs)",
                    color: "var(--color-uplin-ink-muted)",
                  }}
                >
                  Logo aliado
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
