"use client"
import { useState } from "react";
import { Membresia } from "@/interfaces";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Props = {
  membresia: Membresia;
  index?: number;
};

const cardAccents = [
  { nameColor: "var(--color-uplin-purple)",      glowHover: "rgba(109,64,152,0.15)"  },
  { nameColor: "var(--color-uplin-green-dark)",  glowHover: "rgba(114,191,88,0.16)"  },
  { nameColor: "var(--color-uplin-orange-dark)", glowHover: "rgba(248,154,28,0.16)"  },
  { nameColor: "var(--color-uplin-purple-deep)", glowHover: "rgba(83,43,134,0.18)"   },
];

export function CardMembresia({ membresia, index = 0 }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const accent = cardAccents[index % cardAccents.length];

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
        style={{ background: `linear-gradient(135deg, ${accent.glowHover} 0%, transparent 100%)` }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Eyebrow tipo */}
        <div
          className="text-[var(--text-uplin-eyebrow)] font-semibold uppercase tracking-[0.1em] mb-2"
          style={{ color: accent.nameColor }}
        >
          {membresia.tipo}
        </div>

        {/* Título */}
        <div
          className="text-[1.6rem] font-bold leading-[1.2] tracking-[-0.01em] mb-2 min-h-[3.9rem]"
          style={{ color: "var(--color-uplin-ink)" }}
        >
          {membresia.title}
        </div>

        {/* Ideal para */}
        <p
          className="text-[0.88rem] leading-[1.5] min-h-[4.2rem]"
          style={{ color: "var(--color-uplin-ink-soft)" }}
        >
          {membresia.idealPara}
        </p>

        {/* Bloque de precio */}
        <div
          className="my-[1.2rem] py-4 flex flex-col justify-center min-h-[120px]"
          style={{
            borderTop: "1px solid var(--color-uplin-line)",
            borderBottom: "1px solid var(--color-uplin-line)",
          }}
        >
          {membresia.oldPrice && (
            <p
              className="text-[0.95rem] line-through mb-[0.15rem]"
              style={{ color: "var(--color-uplin-ink-muted)" }}
            >
              USD {membresia.oldPrice.toLocaleString()}
            </p>
          )}
          <div className="flex items-center gap-[0.6rem] flex-wrap">
            <span
              className="text-[1.85rem] font-bold leading-[1.1] tracking-[-0.02em]"
              style={{ color: "var(--color-uplin-ink)" }}
            >
              USD {membresia.price.toLocaleString()}
            </span>
            {membresia.discount && (
              <span
                className="text-[0.7rem] font-bold tracking-[0.04em] text-white px-[0.6rem] py-[0.22rem] rounded-full whitespace-nowrap"
                style={{ background: "var(--color-uplin-green)", boxShadow: "0 4px 12px rgba(114,191,88,0.3)" }}
              >
                {membresia.discount}
              </span>
            )}
          </div>
          <p
            className="text-[0.78rem] font-medium mt-[0.4rem]"
            style={{ color: "var(--color-uplin-ink-muted)" }}
          >
            + impuestos · Por mes
          </p>
        </div>

        {/* Incluye */}
        <ul className="flex-1 list-none p-0 mb-4">
          {membresia.includes.map((item, i) => (
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
              {item}
            </li>
          ))}
        </ul>

        {/* No incluye — sección opcional */}
        {membresia.excludes.length > 0 && (
          <div className="mb-6">
            <p
              className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] mb-2"
              style={{ color: "var(--color-uplin-ink-muted)" }}
            >
              No incluye
            </p>
            <ul className="list-none p-0">
              {membresia.excludes.map((item, i) => (
                <li
                  key={i}
                  className="relative text-[0.82rem] leading-[1.4] py-[0.3rem] pl-5"
                  style={{ color: "var(--color-uplin-ink-muted)" }}
                >
                  <span className="absolute left-0">–</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Botón CTA */}
        <motion.a
          href={membresia.buttonLink}
          target="_blank"
          rel="noopener"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-[0.8rem] rounded-full text-[0.95rem] font-semibold text-white mt-auto"
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
          Adquirir {membresia.title}
          <ArrowRight size={13} />
        </motion.a>
      </div>
    </motion.div>
  );
}
