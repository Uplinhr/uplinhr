"use client";

import SectionTag from "@/components/SectionTag/SectionTag";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFoundView() {
  const router = useRouter();

  return (
    <>
      <style>{`
        .notfound-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #3C0E36 0%, #6D4098 100%);
          color: #FFFFFF;
          font-size: 0.92rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 20px -6px rgba(60,14,54,0.40);
          transition:
            box-shadow 0.35s cubic-bezier(0.4,0,0.2,1),
            transform  0.20s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
        }
        .notfound-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(114,191,88,0.30) 100%);
          opacity: 0;
          transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1);
          border-radius: 9999px;
          pointer-events: none;
        }
        .notfound-btn:hover::after { opacity: 1; }
        .notfound-btn:hover { transform: translateY(-2px); }
        .notfound-btn:active { transform: translateY(0) scale(0.97); }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: "7rem", paddingBottom: "4rem" }}
      >
        <SectionTag text="Error 404" />

        <h1
          className="gradient-purple-green"
          style={{
            fontSize: "clamp(4rem, 12vw, 8rem)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            margin: "0 0 1rem",
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--color-uplin-ink)",
            margin: "0 0 0.75rem",
          }}
        >
          ¡Página no encontrada!
        </h2>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--color-uplin-ink-soft)",
            maxWidth: 480,
            margin: "0 0 2rem",
          }}
        >
          Lo sentimos, la página que estás buscando no existe.
          <br />
          Verificá la URL o volvé al inicio.
        </p>

        <button onClick={() => router.push("/")} className="notfound-btn">
          <FiArrowLeft className="text-lg" />
          Volver al inicio
        </button>
      </div>
    </>
  );
}
