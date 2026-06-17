interface SectionTagProps {
  text: string;
}

const SectionTag = ({ text }: SectionTagProps) => {
  return (
    <span
      style={{
        backdropFilter: "blur(14px)",
        border: "1px solid var(--color-uplin-glass-border)",
        borderRadius: "var(--radius-uplin-pill)",
        padding: "0.35rem 0.9rem",
        fontSize: "var(--text-uplin-eyebrow)",
        fontWeight: 700,
        color: "var(--color-uplin-purple-deep)",
        letterSpacing: "var(--tracking-uplin-eyebrow)",
        textTransform: "uppercase",
        boxShadow: "0 4px 12px -4px rgba(60,14,54,0.1)",
        display: "inline-block",
        marginBottom: "1rem",
      }}
    >
      {text}
    </span>
  );
};

export default SectionTag;
