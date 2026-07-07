const blobs = [
  "b1 h-[700px] w-[700px] -left-[10%] -top-[15%] opacity-60 bg-[radial-gradient(circle,var(--uplin-purple-6)_0%,var(--uplin-purple-7)_35%,transparent_70%)]",
  "b2 h-[520px] w-[520px] -right-[8%] top-[15%] opacity-50 bg-[radial-gradient(circle,var(--uplin-green-3)_0%,var(--uplin-green-5)_40%,transparent_70%)]",
  "b3 h-[480px] w-[480px] left-[42%] top-[48%] opacity-40 bg-[radial-gradient(circle,var(--uplin-orange-4)_0%,var(--uplin-orange-6)_40%,transparent_70%)]",
  "b4 h-[600px] w-[600px] right-[5%] top-[55%] opacity-45 bg-[radial-gradient(circle,var(--uplin-purple-5)_0%,var(--uplin-purple-8)_40%,transparent_70%)]",
];

export default function BibliotecaBackground() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-bg"
      >
        {blobs.map((cls) => (
          <div
            key={cls.split(" ")[0]}
            className={`absolute rounded-full blur-[70px] ${cls}`}
          />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-30 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 .24 0 0 0 0 .05 0 0 0 0 .21 0 0 0 .08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </>
  );
}
