"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import Button from "../Button/Button";

type Level = { name: string; credits: number };
type Pkg = {
  name: string;
  credits: number;
  price: number;
  features: string[];
  link: string;
};

const LEVELS: Level[] = [
  { name: "Entry / Principiante", credits: 10 },
  { name: "Junior", credits: 20 },
  { name: "Semi-Senior", credits: 30 },
  { name: "Senior", credits: 120 },
  { name: "Director", credits: 160 },
  { name: "C Level", credits: 200 },
];

const PACKAGES: Pkg[] = [
  {
    name: "Single Hire",
    credits: 120,
    price: 720,
    features: [
      "120 créditos incluidos",
      "Vacantes posibles: 1 (Entry o Junior)",
      "Proceso básico de selección",
      "Soporte y acompañamiento",
      "Sin vencimiento",
      "Pago único",
    ],
    link: "https://app.uplinhr.com/adquiere-single-hire",
  },
  {
    name: "Pro",
    credits: 660,
    price: 3960,
    features: [
      "660 créditos incluidos",
      "Vacantes posibles: hasta 5 Juniors",
      "Proceso básico de selección",
      "Soporte y acompañamiento",
      "Onboarding asistido",
      "Garantía de 3 meses",
      "Sin vencimiento",
      "Pago único",
    ],
    link: "https://app.uplinhr.com/adquiere-pack-pro",
  },
  {
    name: "Premium",
    credits: 990,
    price: 5940,
    features: [
      "990 créditos incluidos",
      "Vacantes posibles: hasta 8 Juniors",
      "Proceso básico de selección",
      "Soporte y acompañamiento",
      "Onboarding asistido",
      "Garantía de 3 meses",
      "Sin vencimiento",
      "Pago único",
    ],
    link: "https://app.uplinhr.com/adquiere-pack-premium",
  },
  {
    name: "Platinum",
    credits: 1320,
    price: 7920,
    features: [
      "1320 créditos incluidos",
      "Vacantes posibles: hasta 11 Juniors",
      "Proceso básico de selección",
      "Soporte y acompañamiento",
      "Onboarding asistido",
      "Garantía de 3 meses",
      "Sin vencimiento",
      "Pago único",
    ],
    link: "https://app.uplinhr.com/adquiere-pack-platinum",
  },
];

const PRICE_PER_INDIVIDUAL_CREDIT = 6; // USD

// Componente Modal reutilizable para el simulador
export default function CreditSimulatorModal({
  children,
}: {
  children: React.ReactNode; // Trigger
}) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState<number[]>(() => Array(LEVELS.length).fill(0));
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const totalCredits = useMemo(
    () => qty.reduce((acc, n, i) => acc + n * LEVELS[i].credits, 0),
    [qty]
  );

  const totalVacancies = useMemo(
    () => qty.reduce((acc, n) => acc + (Number(n) || 0), 0),
    [qty]
  );

  const baseFee = totalVacancies * 100; // USD $100 por vacante
  const exactPurchaseTotal =
    totalCredits * PRICE_PER_INDIVIDUAL_CREDIT + baseFee;

  const recommended = useMemo(() => {
    if (totalCredits <= 0) return null;
    const suitable = PACKAGES.find((p) => p.credits >= totalCredits);
    return suitable ?? PACKAGES[PACKAGES.length - 1];
  }, [totalCredits]);

  // apertura/cierre accesibles
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // foco al botón cerrar para accesibilidad
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC para cerrar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const reset = () => setQty(Array(LEVELS.length).fill(0));

  return (
    <>
      <span onClick={() => setOpen(true)} className="inline-block">
        {children}
      </span>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start md:items-center justify-center"
          aria-modal="true"
          role="dialog"
          aria-labelledby="simulador-title"
          onClick={(e) => {
            // cerrar al hacer click fuera del panel
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/70" />

          {/* panel */}
          <div className="relative w-[95vw] max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl m-3 p-5 md:p-6">
            {/* botón cerrar */}
            <button
              ref={closeBtnRef}
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute top-3 right-3 p-2 rounded-full text-white bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#502B7D]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* título */}
            <h2
              id="simulador-title"
              className="text-center text-3xl md:text-4xl font-extrabold text-[#5C2D91] mb-6"
            >
              Simulador de créditos
            </h2>
            <p className="text-black text-lg text-center lg:text-base leading-relaxed mt-1 mb-8">
              Cada vacante tiene un costo base de USD $100 + la cantidad de
              créditos requeridos según el perfil.
              <br />
              Cada crédito equivale a USD $6.
            </p>

            {/* CONTENIDO */}
            <div className="space-y-6">
              {/* filas de niveles */}
              <div className="space-y-4">
                {LEVELS.map((level, i) => (
                  <div
                    key={level.name}
                    className="flex items-center justify-between gap-3 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] rounded-2xl px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-[#3b2b57]">
                        {level.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {level.credits} créditos / vacante
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={0}
                        step={1}
                        inputMode="numeric"
                        className="w-24 md:w-28 rounded-xl border-2 border-[#6D4098] bg-white px-3 py-2 text-center font-semibold text-[#3b2b57] focus:outline-none focus:ring-2 focus:ring-[#6D4098]"
                        value={qty[i]}
                        onChange={(e) => {
                          const next = [...qty];
                          next[i] = Number(e.target.value ?? 0);
                          setQty(next);
                        }}
                      />
                      <div className="min-w-[110px] text-right font-bold text-[#5C2D91]">
                        {qty[i] * level.credits} créditos
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* total */}
              <hr className="border-t-2 border-[#5C2D91]/40" />
              <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[#5C2D91] px-4 py-4">
                <span className="text-[#3b2b57] font-semibold">
                  Créditos requeridos
                </span>
                <span className="text-[#5C2D91] font-extrabold text-xl md:text-2xl">
                  {totalCredits} créditos
                </span>
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={reset}
                  className="text-sm text-gray-600 underline decoration-gray-400 hover:text-gray-800"
                >
                  Limpiar simulador
                </button>
              </div>

              {/* compra directa */}
              <div className="flex items-center justify-between rounded-2xl bg-[#f6f5fb] shadow-[0_2px_10px_rgba(0,0,0,0.05)] px-5 py-4">
                <span className="font-semibold text-[#3b2b57]">
                  {/* opción compra exacta (comparación) */}
                  {totalCredits > 0 && (
                    <div className="mt-4 text-[18px] text-[#5C2D91]">
                      {totalCredits} créditos + {totalVacancies} vacante
                      {totalVacancies !== 1 ? "s" : ""} (USD $100 c/u) por{" "}
                      <strong className="text-[20px]">
                        USD ${exactPurchaseTotal.toLocaleString()}
                      </strong>
                    </div>
                  )}
                </span>
                <Button
                  link="/servicios/creditos/elegir-pais"
                  tag="Comprá créditos"
                  mode={2}
                  height={46}
                  width={180}
                />
              </div>

              {/* recomendación */}
              <div>
                <h3 className="text-2xl font-extrabold text-[#5C2D91] mb-3">
                  Hay un paquete para vos
                </h3>

                <div className="rounded-3xl p-6 md:p-7 bg-[radial-gradient(120%_120%_at_100%_0%,#E9D7FF_0%,#F7F2FF_40%,#FFFFFF_100%)] border border-[#E4D8FF] shadow-[0_6px_24px_rgba(80,43,125,0.12)]">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-[#6f61a8]">Precio total:</p>
                      <p className="text-2xl font-extrabold text-[#3b2b57]">
                        {recommended
                          ? `USD $${recommended.price.toLocaleString()}`
                          : "—"}
                        <span className="block text-xs font-normal text-[#6f61a8]">
                          + impuestos
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-[#6f61a8]">
                        Créditos incluidos:
                      </p>
                      <p className="text-2xl font-extrabold text-[#5C2D91]">
                        {recommended ? `${recommended.credits} créditos` : "—"}
                      </p>
                    </div>
                  </div>

                  {/* features */}
                  <div className="grid md:grid-cols-2 gap-y-2 gap-x-6 mt-4 text-sm text-[#3b2b57]">
                    {(recommended?.features ?? []).map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#5C2D91]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <a
                      href={recommended?.link ?? "/servicios/creditos"}
                      className="rounded-xl bg-[#5C2D91] px-5 py-2 text-white font-semibold hover:opacity-90"
                    >
                      {recommended
                        ? `Comprar ${recommended.name}`
                        : "Ver paquetes"}
                    </a>
                    <a
                      href="/servicios/creditos"
                      className="text-[#5C2D91] underline underline-offset-4"
                    >
                      Ver todos los paquetes
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
