"use client";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import BotonPrimario from "@/components/BotonPrimario/BotonPrimario";

export default function EmptyVacantes() {
  return (
    <motion.section
      className="flex flex-col items-center py-16 px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div
        className="max-w-[620px] w-full mx-auto text-center rounded-[var(--radius-uplin-lg)] border border-white/70 p-[3rem_2.4rem]"
        style={{
          background: "var(--color-uplin-glass-bg-strong)",
          backdropFilter: "blur(20px) saturate(160%)",
          boxShadow: "var(--shadow-uplin-glass)",
        }}
      >
        {/* Ícono decorativo */}
        <div
          className="w-[70px] h-[70px] mx-auto mb-6 rounded-[var(--radius-uplin-md)] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, var(--color-uplin-purple-8), var(--color-uplin-green-6))" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-uplin-purple)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="34"
            height="34"
          >
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
            <line x1="12" y1="12" x2="12" y2="16"/>
            <line x1="10" y1="14" x2="14" y2="14"/>
          </svg>
        </div>

        {/* Título */}
        <h3
          className="text-[1.4rem] font-bold tracking-[-0.01em] mb-[0.7rem]"
          style={{ color: "var(--color-uplin-ink)" }}
        >
          Hoy no tenemos vacantes disponibles
        </h3>

        {/* Subtítulo */}
        <p
          className="text-[1rem] leading-[1.7] max-w-[480px] mx-auto mb-6"
          style={{ color: "var(--color-uplin-ink-soft)" }}
        >
          Déjanos tu CV y sé parte de nuestra base de talentos.
        </p>

        {/* Lista con checkmarks */}
        <ul className="flex flex-col gap-[0.7rem] list-none p-0 text-left max-w-[400px] mx-auto mb-8">
          {[
            "Te consideraremos para futuras oportunidades",
            "Recibí novedades y vacantes relacionadas a tu perfil",
            "Accede a invitaciones de eventos exclusivos de Uplin",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-[0.7rem] text-[0.95rem] font-medium"
              style={{ color: "var(--color-uplin-ink-soft)" }}
            >
              <span
                className="flex-shrink-0 w-[20px] h-[20px] rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--color-uplin-green), var(--color-uplin-green-dark))",
                  padding: "3px",
                }}
              >
                <Check className="text-white" size={12} strokeWidth={2.5} />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <BotonPrimario
          text="Quiero unirme a la base de talentos"
          href="https://forms.gle/xoXqjr1dWizknQQTA"
        />
      </div>
    </motion.section>
  );
}
