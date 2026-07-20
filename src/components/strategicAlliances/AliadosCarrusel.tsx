"use client";

import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

type Ally = {
  id: number;
  name: string;
  src: string;
};

const baseAllies: Ally[] = [
  { id: 1, name: "Colven", src: "/Colven_logo.jpeg" },
  { id: 2, name: "Isavisa", src: "/Isavisa_logo.jpeg" },
  { id: 3, name: "TrueLogic", src: "/TrueLogic_logo.png" },
];

// Repetir hasta completar 9 slots (múltiplo de 3) para que no haya contenedores vacíos
const allies: Ally[] = Array.from({ length: 9 }, (_, i) => ({
  ...baseAllies[i % baseAllies.length],
  id: i + 1,
}));

export const AliadosCarrusel = () => {
  // Duplicar el array para el efecto seamless:
  // cada item ocupa 180px + 20px (marginRight) = 200px
  // total track = 18 × 200px = 3600px → -50% = -1800px = exactamente 9 items
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
              <Image
                src={ally.src}
                alt={ally.name}
                width={140}
                height={70}
                className="object-contain"
                style={{ maxWidth: "140px", maxHeight: "70px" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
