"use client"
import { useState } from "react";
import { Paquete } from "@/interfaces";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Props = {
  paquetes: Paquete;
  index?: number;
};

const cardAccents = [
  { nameColor: "var(--color-uplin-purple)",      glowHover: "rgba(109,64,152,0.15)"  },
  { nameColor: "var(--color-uplin-green-dark)",  glowHover: "rgba(114,191,88,0.16)"  },
  { nameColor: "var(--color-uplin-orange-dark)", glowHover: "rgba(248,154,28,0.16)"  },
  { nameColor: "var(--color-uplin-purple-deep)", glowHover: "rgba(83,43,134,0.18)"   },
];

export function CardCreditos({ paquetes, index = 0 }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  return (
    <motion.div
      className="relative flex flex-col overflow-hidden rounded-[var(--radius-uplin-lg)] border border-white/70 p-[2rem_1.6rem_1.8rem]"
      style={{
        background: "var(--color-uplin-glass-bg-strong)",
        backdropFilter: "blur(24px) saturate(170%)",
        boxShadow: "var(--shadow-uplin-glass)",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[var(--radius-uplin-lg)]"
        style={{ background: `linear-gradient(135deg, ${cardAccents[index].glowHover} 0%, transparent 100%)` }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Nombre eyebrow */}
        <div
          className="text-[var(--text-uplin-eyebrow)] font-semibold uppercase tracking-[0.1em] mb-2"
          style={{ color: cardAccents[index].nameColor }}
        >
          {paquetes.title}
        </div>

        {/* Título */}
        <div
          className="text-[1.6rem] font-bold leading-[1.2] tracking-[-0.01em] mb-2 flex items-start min-h-[3.9rem]"
          style={{ color: "var(--color-uplin-ink)" }}
        >
          {paquetes.title}
        </div>

        {/* Descripción */}
        <p
          className="text-[0.88rem] leading-[1.5] min-h-[4.2rem]"
          style={{ color: "var(--color-uplin-ink-soft)" }}
        >
          {paquetes.description}
        </p>

        {/* Bloque de precio */}
        <div
          className="my-[1.2rem] py-4 flex flex-col justify-center min-h-[120px]"
          style={{
            borderTop: "1px solid var(--color-uplin-line)",
            borderBottom: "1px solid var(--color-uplin-line)",
          }}
        >
          {paquetes.oldPrice && (
            <p
              className="text-[0.95rem] line-through mb-[0.15rem]"
              style={{ color: "var(--color-uplin-ink-muted)" }}
            >
              USD {paquetes.oldPrice.toLocaleString()}
            </p>
          )}
          <div className="flex items-center gap-[0.6rem] flex-wrap">
            <span
              className="text-[1.85rem] font-bold leading-[1.1] tracking-[-0.02em]"
              style={{ color: "var(--color-uplin-ink)" }}
            >
              USD {paquetes.price.toLocaleString()}
            </span>
            {paquetes.discount && (
              <span
                className="text-[0.7rem] font-bold tracking-[0.04em] text-white px-[0.6rem] py-[0.22rem] rounded-full whitespace-nowrap"
                style={{ background: "var(--color-uplin-green)", boxShadow: "0 4px 12px rgba(114,191,88,0.3)" }}
              >
                {paquetes.discount}
              </span>
            )}
          </div>
          <p
            className="text-[0.78rem] font-medium mt-[0.4rem]"
            style={{ color: "var(--color-uplin-ink-muted)" }}
          >
            + impuestos · Pago único
          </p>
        </div>

        {/* Lista de features */}
        <ul className="flex-1 list-none p-0 mb-6">
          {paquetes.features.map((feature, i) => (
            <li
              key={i}
              className="relative text-[0.84rem] leading-[1.4] py-[0.4rem] pl-6"
              style={{ color: "var(--color-uplin-ink-soft)" }}
            >
              <span
                className="absolute left-[0.1rem] top-[0.65rem] inline-block"
                style={{
                  width: 14,
                  height: 8,
                  borderLeft: "2px solid var(--color-uplin-green)",
                  borderBottom: "2px solid var(--color-uplin-green)",
                  transform: "rotate(-45deg)",
                }}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* Botón CTA */}
        <motion.a
          href={paquetes.buttonLink}
          target="_blank"
          rel="noopener"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-[0.8rem] rounded-full text-[0.95rem] font-semibold text-white"
          style={{
            background: isBtnHovered
              ? "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))"
              : "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))",
            boxShadow: isBtnHovered ? "var(--shadow-uplin-btn-green)" : "var(--shadow-uplin-btn-primary)",
            transition: "all var(--transition-uplin-base)",
          }}
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setIsBtnHovered(true)}
          onHoverEnd={() => setIsBtnHovered(false)}
        >
          {paquetes.buttonText}
          <ArrowRight size={13} />
        </motion.a>
      </div>
    </motion.div>
  );
}
