"use client"
import { motion } from "framer-motion";

interface BotonSecundarioProps {
  text: string;
  href: string;
  onClick?: () => void;
}

const BotonSecundario = ({ text, href, onClick }: BotonSecundarioProps) => {
  return (
    <>
      <style>{`
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
            background  0.35s cubic-bezier(0.4,0,0.2,1),
            box-shadow  0.35s cubic-bezier(0.4,0,0.2,1),
            transform   0.20s cubic-bezier(0.4,0,0.2,1);
        }
        .uplin-btn-secondary:hover {
          background: rgba(255,255,255,0.95) !important;
        }
      `}</style>
      <motion.a
        href={href}
        className="glass-card uplin-btn-secondary"
        onClick={onClick}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      >
        {text}
      </motion.a>
    </>
  );
};

export default BotonSecundario;
