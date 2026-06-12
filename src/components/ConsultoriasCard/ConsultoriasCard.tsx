"use client"
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Consultorias } from "@/utils/consultorias";
import BotonVolume from "@/components/BotonVolume/BotonVolume";
import { speakText } from "@/utils/textToSpeech";

export default function ConsultoriasCard({ consultorias }: { consultorias: Consultorias }) {
  const { name, tags, description, icon: Icon, color } = consultorias;
  const [open, setOpen] = useState(false);

  const handleTTS = () => {
    speakText(`${name}. ${tags.join(", ")}. ${description}`);
  };

  return (
    <article
      style={{
        position: "relative",
        background: "var(--color-uplin-glass-bg-strong)",
        borderRadius: "1.5rem",
        border: "1px solid rgba(92,45,145,0.1)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        overflow: "hidden",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      className="hover:shadow-[0_8px_32px_rgba(92,45,145,0.12)] hover:border-[rgba(92,45,145,0.22)]"
    >
      {/* Línea vertical izquierda */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: color,
          borderRadius: "1rem 0 0 1rem",
          zIndex: 1,
        }}
      />

      {/* Fila principal: icono + nombre + tags + controles */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen((v) => !v); }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1.75rem 1.1rem 1.1rem 1.75rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {/* Icono */}
        <div
          style={{
            flexShrink: 0,
            width: "2.75rem",
            height: "2.75rem",
            borderRadius: "0.75rem",
            background: `linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.08) 100%), ${color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} color="#ffffff" />
        </div>

        {/* Nombre + tags */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--color-uplin-ink, #1a1a2e)",
              margin: 0,
              lineHeight: 1.35,
            }}
          >
            {name}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  padding: "0.18rem 0.55rem",
                  borderRadius: "0.4rem",
                  border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
                  color: color,
                  background: `color-mix(in srgb, ${color} 16%, white)`,
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Volumen + chevron */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
          <BotonVolume onClick={handleTTS} ariaLabel={`Escuchar ${name}`} size={14} />
          <ChevronDown
            size={17}
            style={{
              transition: "transform 0.15s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              color: "var(--color-uplin-ink-soft, #6b7280)",
            }}
          />
        </div>
      </div>

      {/* Descripción colapsable */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.15s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p
            style={{
              fontSize: "0.92rem",
              lineHeight: 1.65,
              color: "var(--color-uplin-ink-soft, #6b7280)",
              margin: 0,
              padding: "0 1.25rem 1.1rem 1.75rem",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
