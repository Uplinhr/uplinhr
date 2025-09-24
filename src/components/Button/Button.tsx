import Link from "next/link";

interface ButtonProps {
  link?: string;
  onClick?: () => void;
  tag: string;
  mode: 0 | 1 | 2 | 3;
  height?: number;
  width?: number;
  className?: string; // nuevo
}

const Button = ({
  link,
  onClick,
  tag,
  mode,
  height,
  width,
  className = "",
}: ButtonProps) => {
  const colorConfig = {
    0: {
      base: { bg: "bg-[#502B7D]", text: "text-white", border: "border border-[#502B7D]", fontWeight: "font-semibold" },
      hover: { bg: "hover:bg-white", text: "hover:text-[#502B7D]" },
    },
    1: {
      base: { bg: "bg-white", text: "text-[#502B7D]", border: "border border-[#502B7D]", fontWeight: "font-semibold" },
      hover: { bg: "hover:bg-[#502B7D]", text: "hover:text-white" },
    },
    2: {
      base: { bg: "bg-[#72C058]", text: "text-white", border: "border border-[#72C058]", fontWeight: "font-semibold" },
      hover: { bg: "hover:bg-white", text: "hover:text-[#72C058]" },
    },
    3: {
      base: { bg: "bg-transparent", text: "text-[#502B7D]", border: "border border-[#502B7D]", fontWeight: "font-semibold" },
      hover: { bg: "hover:bg-[#502B7D]", text: "hover:text-white" },
    },
  };

  const { base, hover } = colorConfig[mode];

  // Si NO pasas width/height -> ocupa w-full en mobile y auto en sm:
  const responsiveWidth = width ? "" : "w-full sm:w-auto";

  const classNames = `
    inline-flex items-center justify-center
    rounded-[6px] px-5 py-3
    text-[16px] leading-tight text-center
    whitespace-normal break-words
    cursor-pointer
    transition-colors duration-300 ease-in-out
    ${base.border} ${base.bg} ${base.text} ${base.fontWeight}
    ${hover.bg} ${hover.text}
    ${responsiveWidth}
    ${className}
  `;

  const style: React.CSSProperties = {};
  if (typeof height === "number") style.height = `${height}px`;
  if (typeof width === "number") style.width = `${width}px`;

  // Link interno vs externo
  if (link) {
    const isExternal = /^https?:\/\//.test(link);
    return (
      <Link
        href={link}
        className={classNames}
        style={style}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {tag}
      </Link>
    );
  }

  return (
    <button className={classNames} style={style} onClick={onClick}>
      {tag}
    </button>
  );
};

export default Button;


