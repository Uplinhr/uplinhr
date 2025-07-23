import Link from "next/link";

interface ButtonProps {
  link: string;
  tag: string;
  mode: 0 | 1 | 2 | 3;
  height: number;
  width: number;
}

/**
 * Componente button personalizado
 * @param {string} link - URL del botón
 * @param {string} tag - Etiqueta del botón
 * @param {0 | 1 | 2 | 3} mode - Estilo visual del botón
 * @param {number} height - Altura del botón
 * @param {number} width - Ancho del botón
 * @returns {JSX.Element} Botón estilizado
 */
const Button = ({ link, tag, mode, height, width }: ButtonProps) => {
  const colorConfig = {
    0: {
      base: {
        bg: "bg-[#502B7D]",
        text: "text-white",
        border: "border border-[#502B7D]",
        fontWeight: "font-semibold",
      },
      hover: {
        bg: "hover:bg-white",
        text: "hover:text-[#502B7D]",
      },
    },
    1: {
      base: {
        bg: "bg-white",
        text: "text-[#502B7D]",
        border: "border border-[#502B7D]",
        fontWeight: "font-semibold",
      },
      hover: {
        bg: "hover:bg-[#502B7D]",
        text: "hover:text-white",
      },
    },
    2: {
      base: {
        bg: "bg-[#72C058]",
        text: "text-white",
        border: "border border-[#72C058]",
        fontWeight: "font-semibold",
      },
      hover: {
        bg: "hover:bg-white",
        text: "hover:text-[#72C058]",
      },
    },
    3: {
      base: {
        bg: "bg-transparent",
        text: "text-[#502B7D]",
        border: "border border-[#502B7D]",
        fontWeight: "font-semibold",
      },
      hover: {
        bg: "hover:bg-[#502B7D]",
        text: "hover:text-white",
      },
    },
  };

  const { base, hover } = colorConfig[mode];

  return (
    <div className="flex justify-center">
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <button
          className={`
            font-poppins 
            text-[16px] 
            rounded-[6px] 
            px-4 py-2 
            cursor-pointer 
            transition-colors duration-300 ease-in-out
            ${base.border}
            ${base.bg} 
            ${base.text} 
            ${base.fontWeight}
            ${hover.bg} 
            ${hover.text}
          `}
          style={{
            height: `${height}px`,
            width: `${width}px`,
            minWidth: "fit-content",
            fontStyle: "normal",
            textAlign: "center",
          }}
        >
          {tag}
        </button>
      </Link>
    </div>
  );
};

export default Button;
