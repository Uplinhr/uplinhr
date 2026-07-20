"use client"
import { motion } from "framer-motion";

interface BotonPrimarioProps {
  text: string;
  href: string;
  onClick?: () => void;
}

const BotonPrimario = ({ text, href, onClick }: BotonPrimarioProps) => {
  return (
    <>
      <style>{`
        .uplin-btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.75rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #3C0E36 0%, #6D4098 100%);
          color: #FFFFFF;
          font-size: 0.92rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 20px -6px rgba(60,14,54,0.40);
          transition:
            box-shadow 0.35s cubic-bezier(0.4,0,0.2,1),
            transform  0.20s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
        }
        .uplin-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(114,191,88,0.30) 100%);
          opacity: 0;
          transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1);
          border-radius: 9999px;
          pointer-events: none;
        }
        .uplin-btn-primary:hover::after { opacity: 1; }
      `}</style>
      <motion.a
        href={href}
        className="uplin-btn-primary"
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

export default BotonPrimario;
