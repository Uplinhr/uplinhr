"use client"

interface EyebrowPillProps {
  text: string;
}

const EyebrowPill = ({ text }: EyebrowPillProps) => {
  return (
    <>
      <style>{`
        @keyframes dotPulse {
          0%,100% { opacity: 1;    transform: scale(1);    }
          50%     { opacity: 0.45; transform: scale(0.72); }
        }
        .uplin-dot-pulse { animation: dotPulse 2s ease-in-out infinite; }
      `}</style>
      <div
        className="glass-card"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.38rem 1rem",
          borderRadius: 9999,
        }}
      >
        <span
          className="uplin-dot-pulse"
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "var(--color-uplin-green)",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "var(--color-uplin-purple-deep)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {text}
        </span>
      </div>
    </>
  );
};

export default EyebrowPill;
