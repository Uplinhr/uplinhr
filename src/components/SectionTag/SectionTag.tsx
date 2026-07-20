interface SectionTagProps {
  text: string;
  marginBottom?: string;
}

const SectionTag = ({ text, marginBottom = "0" }: SectionTagProps) => {
  return (
    <span
      style={{
        backdropFilter: "blur(14px)",
        border: "1px solid var(--color-uplin-glass-border)",
        borderRadius: "var(--radius-uplin-pill)",
        padding: "0.35rem 0.9rem",
        fontSize: "var(--text-uplin-eyebrow)",
        fontWeight: 600,
        color: "var(--color-uplin-purple-deep)",
        letterSpacing: "var(--tracking-uplin-eyebrow)",
        textTransform: "uppercase",
        boxShadow: "0 4px 12px -4px rgba(60,14,54,0.1)",
        display: "inline-block",
        marginBottom,
      }}
    >
      {text}
    </span>
  );
};

export default SectionTag;
