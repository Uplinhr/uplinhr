'use client';
import { useState } from 'react';
import { MapPin, Building2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Vacante } from '@/interfaces';

interface CardVacanteProps {
  vacante: Vacante;
}

const CardVacante = ({ vacante }: CardVacanteProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={vacante.enlace_formulario}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative overflow-hidden rounded-[var(--radius-uplin-lg)] border border-white/70 w-[90%] mx-auto"
      style={{
        background: "var(--color-uplin-glass-bg-strong)",
        backdropFilter: "blur(24px) saturate(170%)",
        boxShadow: "var(--shadow-uplin-glass)",
        textDecoration: "none",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ y: -4, background: "rgba(255,255,255,0.58)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left"
        style={{
          background: "linear-gradient(90deg, var(--color-uplin-purple-deep), var(--color-uplin-purple), var(--color-uplin-green))",
        }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />

      <div className="flex flex-col md:flex-row relative z-10">

        {/* Columna principal */}
        <div
          className="p-6 md:w-[75%] border-b md:border-b-0 md:border-r break-words"
          style={{ borderColor: "var(--color-uplin-line)" }}
        >
          <h3
            className="font-bold text-lg md:text-xl mb-1"
            style={{ color: "var(--color-uplin-purple-deep)" }}
          >
            {vacante.nombre_puesto}
          </h3>

          {!vacante.es_anonimo && (
            <p
              className="font-semibold text-[0.9rem] mb-2"
              style={{ color: "var(--color-uplin-purple)" }}
            >
              {vacante.nombre_empresa}
            </p>
          )}

          <p
            className="text-[0.9rem] leading-relaxed break-words"
            style={{
              color: "var(--color-uplin-ink-soft)",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            {vacante.descripcion_empleo}
          </p>
        </div>

        {/* Columna lateral */}
        <div className="p-6 md:w-[25%] flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3">

            <div className="flex items-center gap-2">
              <span
                className="w-7 h-7 rounded-[var(--radius-uplin-sm)] flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))" }}
              >
                <MapPin size={13} className="text-white" />
              </span>
              <span
                className="text-[0.88rem] font-medium"
                style={{ color: "var(--color-uplin-ink-soft)" }}
              >
                {vacante.ubicacion_empleo}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="w-7 h-7 rounded-[var(--radius-uplin-sm)] flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))" }}
              >
                <Building2 size={13} className="text-white" />
              </span>
              <span
                className="text-[0.88rem] font-medium"
                style={{ color: "var(--color-uplin-ink-soft)" }}
              >
                {vacante.modalidad_trabajo}
              </span>
            </div>
          </div>

          {/* CTA inline */}
          <div
            className="inline-flex items-center gap-1 text-[0.82rem] font-semibold mt-2"
            style={{ color: "var(--color-uplin-purple)" }}
          >
            Postularme
            <motion.span animate={{ x: isHovered ? 3 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowRight size={12} />
            </motion.span>
          </div>
        </div>

      </div>
    </motion.a>
  );
};

export default CardVacante;
