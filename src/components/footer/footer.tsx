"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/uplin/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/uplinhr/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@uplinhr",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.65a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.08z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@uplinhr",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const empresaLinks = [
  { label: "Quiénes somos", href: "#" },
  { label: "Trabaja con Uplin", href: "#" },
  { label: "Uplin Careers", href: "#" },
  { label: "Biblioteca Uplin", href: "#" },
  { label: "Contacto", href: "https://u030x.share.hsforms.com/2kmoJRY33TFChFJbTJ37Mlw" },
];

const serviciosLinks = [
  { label: "Búsqueda de Talento", href: "/servicios/creditos" },
  { label: "People Partner Staffing", href: "/servicios/ppStaffing" },
  { label: "Consultorías", href: "/servicios/consultorias" },
  { label: "Membresías", href: "/servicios/membresias" },
  { label: "Programa de Partners", href: "#" },
];

const legalesLinks = [
  { label: "Política de privacidad", href: "/politicas-privacidad" },
  { label: "Términos y condiciones", href: "/terminos-condiciones" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  { label: "contacto@uplinhr.com", href: "mailto:contacto@uplinhr.com" },
];

const LinkColumn = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div>
    <h5
      style={{
        fontSize: "var(--text-uplin-eyebrow)",
        fontWeight: 700,
        letterSpacing: "var(--tracking-uplin-eyebrow)",
        textTransform: "uppercase",
        color: "var(--color-uplin-purple-deep)",
        marginBottom: "1rem",
      }}
    >
      {title}
    </h5>
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {links.map((link) => (
        <li key={link.label} style={{ marginBottom: "0.6rem" }}>
          <Link
            href={link.href}
            style={{
              fontSize: "var(--text-uplin-sm)",
              color: "var(--color-uplin-ink-soft)",
              display: "inline-block",
              textDecoration: "none",
              transition: "all var(--transition-uplin-fast)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "var(--color-uplin-green-dark)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateX(3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "var(--color-uplin-ink-soft)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateX(0)";
            }}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialButton = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        background: hovered
          ? "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))"
          : "var(--color-uplin-glass-bg-strong)",
        backdropFilter: "blur(14px)",
        border: "1px solid var(--color-uplin-glass-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hovered ? "#ffffff" : "var(--color-uplin-purple-deep)",
        boxShadow: hovered
          ? "0 10px 20px -6px rgba(60,14,54,0.4)"
          : "0 4px 12px -4px rgba(60,14,54,0.15)",
        transition: "all var(--transition-uplin-base)",
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      {icon}
    </motion.a>
  );
};

const Footer = () => {
  return (
    <footer
      style={{
        position: "relative",
        padding: "var(--spacing-uplin-lg) 0 var(--spacing-uplin-md)",
        marginTop: "var(--spacing-uplin-lg)",
        background: "linear-gradient(180deg, transparent, rgba(109,64,152,0.06))",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Columna Brand */}
          <div>
            <Image
              alt="Uplin logo"
              src="/logoUplin.svg"
              width={120}
              height={40}
              style={{ marginBottom: "1rem" }}
            />
            <p
              style={{
                fontSize: "var(--text-uplin-sm)",
                color: "var(--color-uplin-ink-soft)",
                lineHeight: "var(--leading-uplin-body)",
                maxWidth: 320,
                marginBottom: "1rem",
              }}
            >
              La primera consultora flexible de servicios RRHH en Latam.
              Tecnología y acompañamiento humano en un mismo lugar.
            </p>
            <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
              {socialLinks.map((s) => (
                <SocialButton key={s.label} href={s.href} label={s.label} icon={s.icon} />
              ))}
            </div>
          </div>

          {/* Columnas de links */}
          <LinkColumn title="Empresa" links={empresaLinks} />
          <LinkColumn title="Servicios" links={serviciosLinks} />
          <LinkColumn title="Legales" links={legalesLinks} />
        </div>

        {/* Footer bottom */}
        <div
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid var(--color-uplin-line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "var(--text-uplin-xs)",
            color: "var(--color-uplin-ink-muted)",
          }}
        >
          <span>© 2025 Uplin. Todos los derechos reservados.</span>
          <span>Hecho con 💜 desde Latam</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
