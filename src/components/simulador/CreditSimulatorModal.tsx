"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useSimulator } from "@/hooks/useSimulator";
import { usePaquetes } from "@/hooks/usePaquetes";
import { Paquete } from "@/interfaces";
import BotonPrimario from "../BotonPrimario/BotonPrimario";
import BotonSecundario from "../BotonSecundario/BotonSecundario";
import BotonVerde from "../BotonTerceario/BotónVerde";

function parsePct(pkg: Paquete): number {
  if (pkg.oldPrice && pkg.oldPrice > pkg.price) {
    return (pkg.oldPrice - pkg.price) / pkg.oldPrice;
  }
  const match = pkg.discount?.match(/(\d+(?:\.\d+)?)%/);
  return match ? Number(match[1]) / 100 : 0;
}

function getDiscountInfo(pkg: Paquete | undefined, creditPriceUsd: number) {
  if (!pkg) return { pct: 0, msrp: null as number | null, savingsVsUnit: 0 };
  const pct = parsePct(pkg);
  const msrp = pkg.oldPrice ?? (pct > 0 ? Math.round(pkg.price / (1 - pct)) : null);
  const unitCost = pkg.credits * creditPriceUsd;
  const savingsVsUnit = Math.max(0, unitCost - pkg.price);
  return { pct, msrp, savingsVsUnit };
}

export default function CreditSimulatorModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const { simulatorData, loading: simLoading, error: simError } = useSimulator();
  const { paquetes, loading: paqLoading, error: paqError } = usePaquetes();
  const loading = simLoading || paqLoading;
  const error = simError || paqError;

  const [qty, setQty] = useState<number[]>([]);
  const [svcQty, setSvcQty] = useState<number[]>([]);

  useEffect(() => {
    if (!simulatorData) return;
    setQty(Array(simulatorData.levels.length).fill(0));
    setSvcQty(Array(simulatorData.additionalServices.length).fill(0));
  }, [simulatorData]);

  const creditPriceUsd = simulatorData?.creditPriceUsd ?? 0;

  const totalCreditsVacancies = useMemo(
    () =>
      simulatorData
        ? qty.reduce(
            (acc, n, i) =>
              acc + (Number(n) || 0) * Number(simulatorData.levels[i]?.credits ?? 0),
            0
          )
        : 0,
    [qty, simulatorData]
  );
  const totalVacanciesUSD = totalCreditsVacancies * creditPriceUsd;

  const totalCreditsServices = useMemo(
    () =>
      simulatorData
        ? svcQty.reduce(
            (acc, n, i) =>
              acc +
              (Number(n) || 0) *
                Number(simulatorData.additionalServices[i]?.creditsPerUnit ?? 0),
            0
          )
        : 0,
    [svcQty, simulatorData]
  );
  const totalServicesUSD = totalCreditsServices * creditPriceUsd;

  const combinedCredits = totalCreditsVacancies + totalCreditsServices;
  const combinedUSD = combinedCredits * creditPriceUsd;

  const recommended = useMemo(() => {
    if (totalCreditsVacancies <= 0 || paquetes.length === 0) return null;
    const sorted = [...paquetes].sort((a, b) => a.credits - b.credits);
    return sorted.find((p) => p.credits >= totalCreditsVacancies) ?? sorted[sorted.length - 1];
  }, [totalCreditsVacancies, paquetes]);

  const {
    pct: pkgDiscountPct,
    msrp: pkgMSRP,
    savingsVsUnit,
  } = getDiscountInfo(recommended || undefined, creditPriceUsd);

  const chosenPkg = recommended || null;
  const pkgCredits = Number(chosenPkg?.credits ?? 0);
  const packageUSD = Number(chosenPkg?.price ?? 0);

  const extraVacancyCreditsNeeded = Math.max(
    0,
    totalCreditsVacancies - pkgCredits
  );
  const extraCreditsUSD = extraVacancyCreditsNeeded * creditPriceUsd;

  const servicesUSD = totalServicesUSD;
  const finalUSD = chosenPkg
    ? packageUSD + servicesUSD + extraCreditsUSD
    : null;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const reset = () => {
    if (!simulatorData) return;
    setQty(Array(simulatorData.levels.length).fill(0));
    setSvcQty(Array(simulatorData.additionalServices.length).fill(0));
    setShowDetail(false);
  };

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
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="absolute inset-0" style={{ background: "rgba(60,14,54,0.55)", backdropFilter: "blur(8px)" }} />

          <div
            className="relative w-[96vw] sm:w-[95vw] max-w-3xl lg:max-w-5xl max-h-[92vh] overflow-y-auto overscroll-contain rounded-[var(--radius-uplin-xl)] m-3 p-4 pb-20 md:p-8 border border-white/70"
            style={{
              background: "var(--color-uplin-glass-bg-strong)",
              backdropFilter: "blur(32px) saturate(180%)",
              boxShadow: "var(--shadow-uplin-glass)",
            }}
          >
            <button
              ref={closeBtnRef}
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center border border-white/70 transition-all"
              style={{
                background: "var(--color-uplin-glass-bg-strong)",
                backdropFilter: "blur(14px)",
                color: "var(--color-uplin-purple-deep)",
              }}
            >
              <X size={18} />
            </button>

            <h2
              id="simulador-title"
              className="text-[1.6rem] font-bold tracking-[-0.02em] mb-1"
              style={{ color: "var(--color-uplin-ink)" }}
            >
              Simulá tu{" "}
              <span className="gradient-purple-green">paquete ideal</span>
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-full border-2 border-t-transparent"
                  style={{ borderColor: "var(--color-uplin-purple)" }}
                />
              </div>
            ) : error ? (
              <p className="text-red-500 text-center py-10">{error}</p>
            ) : (
              <>
                <p className="mb-6" style={{ fontSize: "var(--text-uplin-sm)", color: "var(--color-uplin-ink-soft)" }}>
                  Personalizá tu paquete.
                </p>

                {/* VACANTES */}
                <section className="space-y-4">
                  <details open className="group">
                    <summary
                      className="list-none w-full flex items-center justify-between cursor-pointer rounded-[var(--radius-uplin-md)] px-4 py-3 border border-white/70"
                      style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(8px)" }}
                    >
                      <p style={{ fontSize: "var(--text-uplin-eyebrow)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-uplin-eyebrow)", color: "var(--color-uplin-purple-deep)" }}>
                        Vacantes por seniority
                      </p>
                      <span style={{ color: "var(--color-uplin-purple-deep)", fontSize: "1rem", lineHeight: 1 }}>▾</span>
                    </summary>

                    <div className="space-y-3">
                      {simulatorData!.levels.map((level, i) => (
                        <div
                          key={level.name}
                          className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3 rounded-[var(--radius-uplin-md)] px-4 py-3 border border-white/70"
                          style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}
                        >
                          <div className="sm:col-span-7 min-w-0">
                            <p style={{ color: "var(--color-uplin-ink)", fontSize: "var(--text-uplin-body)" }}>{level.name}</p>
                            <p style={{ color: "var(--color-uplin-ink-muted)", fontSize: "var(--text-uplin-xs)" }}>{level.credits} créditos c/u</p>
                          </div>
                          <div className="sm:col-span-5 flex items-center justify-between sm:justify-end gap-3">
                            <input
                              type="number"
                              min={0}
                              step={1}
                              inputMode="numeric"
                              className="w-16 text-center rounded-[var(--radius-uplin-sm)] border px-2 py-1 text-[var(--text-uplin-sm)] font-semibold focus:outline-none focus:ring-2"
                              style={{
                                borderColor: "var(--color-uplin-line)",
                                color: "var(--color-uplin-ink)",
                                background: "rgba(255,255,255,0.7)",
                              }}
                              value={qty[i] ?? 0}
                              onChange={(e) => { const next = [...qty]; next[i] = Number(e.target.value ?? 0); setQty(next); }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                </section>

                {/* SERVICIOS */}
                <section className="mt-8">
                  <details className="group">
                    <summary
                      className="list-none w-full flex items-center justify-between cursor-pointer rounded-[var(--radius-uplin-md)] px-4 py-3 border border-white/70"
                      style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(8px)" }}
                    >
                      <p style={{ fontSize: "var(--text-uplin-eyebrow)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-uplin-eyebrow)", color: "var(--color-uplin-purple-deep)" }}>
                        Servicios adicionales
                      </p>
                      <span style={{ color: "var(--color-uplin-purple-deep)", fontSize: "1rem", lineHeight: 1 }}>▾</span>
                    </summary>

                    <div className="space-y-3">
                      {simulatorData!.additionalServices.map((svc, i) => {
                        const credits = (Number(svcQty[i]) || 0) * Number(svc.creditsPerUnit);
                        return (
                          <div
                            key={svc.name}
                            className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3 rounded-[var(--radius-uplin-md)] px-4 py-3 border border-white/70"
                            style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}
                          >
                            <div className="sm:col-span-8 min-w-0">
                              <p className="break-words" style={{ color: "var(--color-uplin-ink)", fontSize: "var(--text-uplin-body)" }}>{svc.name}</p>
                              <p style={{ color: "var(--color-uplin-ink-muted)", fontSize: "var(--text-uplin-xs)" }}>{svc.creditsPerUnit} créditos c/u</p>
                            </div>
                            <div className="sm:col-span-4 flex items-center justify-end">
                              <input
                                type="number"
                                min={0}
                                step={1}
                                inputMode="numeric"
                                className="w-16 text-center rounded-[var(--radius-uplin-sm)] border px-2 py-1 text-[var(--text-uplin-sm)] font-semibold focus:outline-none focus:ring-2"
                                style={{
                                  borderColor: "var(--color-uplin-line)",
                                  color: "var(--color-uplin-ink)",
                                  background: "rgba(255,255,255,0.7)",
                                }}
                                value={svcQty[i] ?? 0}
                                onChange={(e) => { const next = [...svcQty]; next[i] = Number(e.target.value ?? 0); setSvcQty(next); }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </details>
                </section>

                {/* TOTALES / CTA */}
                <div className="mt-8">
                  <div
                    className="rounded-[var(--radius-uplin-lg)] p-5 border border-white/70"
                    style={{
                      background: "rgba(255,255,255,0.5)",
                      backdropFilter: "blur(14px)",
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <p style={{ color: "var(--color-uplin-ink-soft)", fontSize: "var(--text-uplin-sm)", fontWeight: 600 }}>
                        Total Estimado
                      </p>
                      <p style={{ color: "var(--color-uplin-purple-deep)", fontSize: "1.6rem", fontWeight: 700 }}>
                        USD ${combinedUSD.toLocaleString()}
                      </p>
                      <button
                        onClick={() => setShowDetail((v) => !v)}
                        className="underline"
                        style={{ color: "var(--color-uplin-purple)", fontSize: "var(--text-uplin-sm)" }}
                      >
                        {showDetail ? "Ocultar detalle" : "Ver detalle"}
                      </button>
                    </div>
                  </div>

                  {showDetail && (
                    <div
                      className="mt-2 mx-auto max-w-md rounded-[var(--radius-uplin-lg)] border border-white/70 overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.6)",
                        backdropFilter: "blur(14px)",
                      }}
                    >
                      {/* Header del detalle */}
                      <div
                        className="px-5 py-3"
                        style={{ background: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-deep))" }}
                      >
                        <p className="text-white font-bold text-base tracking-wide text-center">Detalle de tu estimación</p>
                      </div>

                      <div className="px-5 py-4 space-y-1">
                        {/* Encabezado columnas */}
                        <div
                          className="grid grid-cols-[1fr_2.5rem_auto] gap-x-3 uppercase tracking-wider pb-1 border-b"
                          style={{ color: "var(--color-uplin-purple)", fontSize: "var(--text-uplin-xs)", borderColor: "var(--color-uplin-line)" }}
                        >
                          <span>Ítem</span>
                          <span className="text-center">Cant.</span>
                          <span className="text-right">Subtotal</span>
                        </div>

                        {/* Vacantes con qty > 0 */}
                        {simulatorData!.levels.some((_, i) => (Number(qty[i]) || 0) > 0) && (
                          <div className="pt-2 space-y-1">
                            <p className="uppercase tracking-wider" style={{ color: "var(--color-uplin-purple-deep)", fontSize: "var(--text-uplin-eyebrow)" }}>Vacantes</p>
                            {simulatorData!.levels.map((level, i) => {
                              const n = Number(qty[i]) || 0;
                              if (n === 0) return null;
                              const credits = n * Number(level.credits);
                              const cost = credits * creditPriceUsd;
                              return (
                                <div key={level.name} className="grid grid-cols-[1fr_2.5rem_auto] gap-x-3 items-baseline">
                                  <span className="break-words" style={{ color: "var(--color-uplin-ink)" }}>{level.name}</span>
                                  <span className="text-center tabular-nums" style={{ color: "var(--color-uplin-ink)" }}>{n}</span>
                                  <span className="text-right tabular-nums font-semibold" style={{ color: "var(--color-uplin-ink)" }}>USD ${cost.toLocaleString()}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Servicios con qty > 0 */}
                        {simulatorData!.additionalServices.some((_, i) => (Number(svcQty[i]) || 0) > 0) && (
                          <div className="pt-2 space-y-1">
                            <p className="uppercase tracking-wider" style={{ color: "var(--color-uplin-purple-deep)", fontSize: "var(--text-uplin-eyebrow)" }}>Servicios adicionales</p>
                            {simulatorData!.additionalServices.map((svc, i) => {
                              const n = Number(svcQty[i]) || 0;
                              if (n === 0) return null;
                              const credits = n * Number(svc.creditsPerUnit);
                              const cost = credits * creditPriceUsd;
                              return (
                                <div key={svc.name} className="grid grid-cols-[1fr_2.5rem_auto] gap-x-3 items-baseline">
                                  <span className="break-words" style={{ color: "var(--color-uplin-ink)" }}>{svc.name}</span>
                                  <span className="text-center tabular-nums" style={{ color: "var(--color-uplin-ink)" }}>{n}</span>
                                  <span className="text-right tabular-nums font-semibold" style={{ color: "var(--color-uplin-ink)" }}>USD ${cost.toLocaleString()}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Sin selección */}
                        {combinedCredits === 0 && (
                          <p className="text-center py-4" style={{ color: "var(--color-uplin-ink-muted)", fontSize: "var(--text-uplin-sm)" }}>
                            No has seleccionado nada aún.
                          </p>
                        )}
                      </div>

                      {/* Footer total */}
                      <div
                        className="border-t px-5 py-3 flex items-center justify-between"
                        style={{ borderColor: "var(--color-uplin-line)", background: "rgba(255,255,255,0.4)" }}
                      >
                        <span className="font-bold" style={{ color: "var(--color-uplin-ink)" }}>Total estimado</span>
                        <span className="text-lg font-extrabold" style={{ color: "var(--color-uplin-purple)" }}>
                          USD ${combinedUSD.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col items-center sm:flex-row gap-3 sm:items-center sm:justify-center">
                    <button
                      onClick={reset}
                      className="underline"
                      style={{ color: "var(--color-uplin-purple-deep)", fontSize: "var(--text-uplin-sm)", fontWeight: 600 }}
                    >
                      Limpiar simulador
                    </button>
                    <BotonVerde text="Agendá una llamada" href="https://meetings.hubspot.com/llopez-ramirez" />
                  </div>
                </div>

                {/* RECOMENDACIÓN + DESGLOSE */}
                <div className="mt-10">
                  <h3
                    className="text-[1.6rem] font-extrabold mb-1"
                    style={{ color: "var(--color-uplin-purple-deep)" }}
                  >
                    Hay un paquete para vos
                  </h3>
                  <p className="mb-4" style={{ color: "var(--color-uplin-ink-soft)", fontSize: "var(--text-uplin-sm)" }}>
                    Recomendación basada en vacantes. Los servicios adicionales se cobran por separado.
                  </p>

                  <div
                    className="rounded-[var(--radius-uplin-lg)] p-6 md:p-7 border border-white/70"
                    style={{
                      background: "linear-gradient(135deg, rgba(224,214,234,0.6) 0%, rgba(247,242,255,0.5) 40%, rgba(255,255,255,0.4) 100%)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 6px 24px rgba(60,14,54,0.12)",
                    }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        {pkgDiscountPct > 0 && (
                          <span
                            className="inline-block mb-2 rounded-[var(--radius-uplin-sm)] text-xs font-bold px-2 py-1"
                            style={{ background: "var(--color-uplin-orange-7)", color: "var(--color-uplin-orange-dark)" }}
                          >
                            {Math.round(pkgDiscountPct * 100)}% OFF
                          </span>
                        )}
                        <p style={{ color: "var(--color-uplin-ink-soft)", fontSize: "var(--text-uplin-sm)" }}>Precio total:</p>
                        <p style={{ color: "var(--color-uplin-ink)", fontSize: "1.5rem", fontWeight: 800 }}>
                          {recommended ? `USD $${Number(recommended.price).toLocaleString()}` : "—"}
                          <span className="block" style={{ color: "var(--color-uplin-ink-muted)", fontSize: "var(--text-uplin-xs)", fontWeight: 400 }}>+ impuestos</span>
                        </p>
                        {pkgMSRP && (
                          <p style={{ color: "var(--color-uplin-ink-muted)", textDecoration: "line-through", fontSize: "var(--text-uplin-sm)" }}>
                            USD ${Number(pkgMSRP).toLocaleString()}
                          </p>
                        )}
                        {recommended && savingsVsUnit > 0 && (
                          <p className="mt-1" style={{ color: "var(--color-uplin-green-dark)", fontWeight: 600, fontSize: "var(--text-uplin-sm)" }}>
                            Ahorrás aprox. USD ${savingsVsUnit.toLocaleString()} vs comprar {recommended.credits.toLocaleString()} créditos sueltos
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-y-2 gap-x-6 mt-4">
                      {(recommended?.features ?? []).map((f) => (
                        <div key={f} className="flex items-start gap-2">
                          <span
                            className="mt-[0.35rem] flex-shrink-0 inline-block"
                            style={{
                              width: 14,
                              height: 8,
                              borderLeft: "2px solid var(--color-uplin-green)",
                              borderBottom: "2px solid var(--color-uplin-green)",
                              transform: "rotate(-45deg)",
                            }}
                          />
                          <span style={{ color: "var(--color-uplin-ink)", fontSize: "var(--text-uplin-sm)" }}>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
                      <div className="flex items-center gap-4 flex-wrap">
                        <BotonPrimario
                          text={recommended ? recommended.buttonText : "Ver paquetes"}
                          href={recommended?.buttonLink ?? "/servicios/creditos"}
                        />
                        <BotonSecundario text="Ver todos los paquetes" href="/servicios/creditos" />
                      </div>

                      {chosenPkg && (
                        <div
                          className="w-full md:max-w-[560px] rounded-[var(--radius-uplin-lg)] border border-white/70 p-4 overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(14px)" }}
                        >
                          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2">
                            <div className="min-w-0 break-words" style={{ color: "var(--color-uplin-ink)", fontSize: "var(--text-uplin-sm)" }}>
                              Paquete {chosenPkg.title} — {pkgCredits.toLocaleString()} créditos
                            </div>
                            <div className="text-right whitespace-normal sm:whitespace-nowrap font-semibold" style={{ color: "var(--color-uplin-ink)" }}>
                              USD ${packageUSD.toLocaleString()}
                            </div>

                            <div className="min-w-0 break-words" style={{ color: "var(--color-uplin-ink)", fontSize: "var(--text-uplin-sm)" }}>
                              Servicios adicionales
                              <span className="block" style={{ color: "var(--color-uplin-ink-muted)", fontSize: "var(--text-uplin-xs)" }}>
                                ({totalCreditsServices.toLocaleString()} créditos × USD {Number(creditPriceUsd).toLocaleString()})
                              </span>
                            </div>
                            <div className="text-right whitespace-normal sm:whitespace-nowrap font-semibold" style={{ color: "var(--color-uplin-ink)" }}>
                              USD ${servicesUSD.toLocaleString()}
                            </div>

                            <div className="min-w-0 break-words" style={{ color: "var(--color-uplin-ink)", fontSize: "var(--text-uplin-sm)" }}>
                              Créditos extra por VACANTES
                              <span className="block" style={{ color: "var(--color-uplin-ink-muted)", fontSize: "var(--text-uplin-xs)" }}>
                                ({extraVacancyCreditsNeeded.toLocaleString()} créditos × USD {Number(creditPriceUsd).toLocaleString()})
                              </span>
                            </div>
                            <div className="text-right whitespace-normal sm:whitespace-nowrap font-semibold" style={{ color: "var(--color-uplin-ink)" }}>
                              USD ${extraCreditsUSD.toLocaleString()}
                            </div>
                          </div>

                          <hr className="my-3" style={{ borderColor: "var(--color-uplin-line)" }} />

                          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3">
                            <span style={{ fontWeight: 700, color: "var(--color-uplin-ink)" }}>Total estimado</span>
                            <span className="whitespace-normal sm:whitespace-nowrap" style={{ color: "var(--color-uplin-purple)", fontSize: "1.2rem", fontWeight: 800 }}>
                              {finalUSD !== null ? `USD $${finalUSD.toLocaleString()}` : "—"}
                            </span>
                          </div>

                          <p className="mt-2 break-words" style={{ color: "var(--color-uplin-ink-muted)", fontSize: "var(--text-uplin-xs)" }}>
                            Los créditos del paquete cubren solo vacantes. Los servicios adicionales se cobran aparte.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
