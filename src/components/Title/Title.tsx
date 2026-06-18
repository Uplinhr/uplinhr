type TitleTag = "h1" | "h2" | "h3" | "h4";

interface TitleProps {
  before?: string;
  gradient: string;
  after?: string;
  as?: TitleTag;
  gradientClass?: string;
  style?: React.CSSProperties;
}

const Title = ({ 
  before, 
  gradient, 
  after, 
  as: Tag = "h1", 
  gradientClass, 
  style }: TitleProps) => {
  return (
    <Tag
      style={{
        fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
        margin: "0 0 1rem",
        color: "var(--color-uplin-ink)",
        ...style,
      }}
    >
      {before}
      <span className={gradientClass ?? "color-uplin-ink"}>{gradient}</span>
      {after}
    </Tag>
  );
};

export default Title;
