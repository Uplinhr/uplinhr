"use client"
import { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

interface BotonVolumeProps {
  onClick: () => void;
  size?: number;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

const BotonVolume = ({
  onClick,
  size = 15,
  ariaLabel = "Escuchar texto",
  className = "",
  style,
}: BotonVolumeProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      className={`uplin-tts-btn ${className}`.trim()}
      aria-label={ariaLabel}
      title="Escuchar texto"
      type="button"
      style={style}
    >
      <Volume2 size={size} />
    </motion.button>
  );
};

export default BotonVolume;
