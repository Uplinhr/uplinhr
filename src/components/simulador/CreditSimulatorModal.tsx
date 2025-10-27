"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import Button from "../Button/Button";
import {
  ADDITIONAL_SERVICES,
  LEVELS,
  PACKAGES,
  PRICE_PER_INDIVIDUAL_CREDIT,
} from "@/utils/infocreditos";

const DISCOUNT_BY_NAME: Record<string, number> = {
  Pro: 0.05,
  Premium: 0.1,
  Platinum: 0.15,
};

type PkgShape = {
  name: string;
  credits: number;
  price: number;
  msrp?: number;
  discountPct?: number;
  features?: string[];
  link?: string;
};

function getDiscountInfo(pkg?: PkgShape) {
  if (!pkg) return { pct: 0, msrp: null as number | null, savingsVsUnit: 0 };
  const pct = pkg.discountPct ?? DISCOUNT_BY_NAME[pkg.name] ?? 0;
  const msrp =
    typeof pkg.msrp === "number"
      ? pkg.msrp
      : pct > 0
      ? Math.round(pkg.price / (1 - pct))
      : null;

  const unitCost = Number(pkg.credits) * PRICE_PER_INDIVIDUAL_CREDIT;
  const savingsVsUnit = Math.max(0, unitCost - Number(pkg.price));
  return { pct, msrp, savingsVsUnit };
}

export default function CreditSimulatorModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const [qty, setQty] = useState<number[]>(() => Array(LEVELS.length).fill(0));
  const [svcQty, setSvcQty] = useState<number[]>(() =>
    Array(ADDITIONAL_SERVICES.length).fill(0)
  );

  const totalCreditsVacancies = useMemo(
    () =>
      qty.reduce(
        (acc, n, i) => acc + (Number(n) || 0) * Number(LEVELS[i].credits),
        0
      ),
    [qty]
  );
  const totalVacanciesUSD = totalCreditsVacancies * PRICE_PER_INDIVIDUAL_CREDIT;

  const totalCreditsServices = useMemo(
    () =>
      svcQty.reduce(
        (acc, n, i) =>
          acc +
          (Number(n) || 0) * Number(ADDITIONAL_SERVICES[i].creditsPerUnit),
        0
      ),
    [svcQty]
  );
  const totalServicesUSD = totalCreditsServices * PRICE_PER_INDIVIDUAL_CREDIT;

  const combinedCredits = totalCreditsVacancies + totalCreditsServices;
  const combinedUSD = combinedCredits * PRICE_PER_INDIVIDUAL_CREDIT;

  const recommended = useMemo(() => {
    if (totalCreditsVacancies <= 0) return null;
    const list = [...(PACKAGES as PkgShape[])].sort(
      (a, b) => Number(a.credits) - Number(b.credits)
    );
    const match = list.find(
      (p) => Number(p.credits) >= Number(totalCreditsVacancies)
    );
    return match ?? list[list.length - 1];
  }, [totalCreditsVacancies]);

  const {
    pct: pkgDiscountPct,
    msrp: pkgMSRP,
    savingsVsUnit,
  } = getDiscountInfo(recommended || undefined);

  const chosenPkg = recommended || null;
  const pkgCredits = Number(chosenPkg?.credits ?? 0);
  const packageUSD = Number(chosenPkg?.price ?? 0);

  const extraVacancyCreditsNeeded = Math.max(
    0,
    totalCreditsVacancies - pkgCredits
  );
  const extraCreditsUSD =
    extraVacancyCreditsNeeded * PRICE_PER_INDIVIDUAL_CREDIT;

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
    setQty(Array(LEVELS.length).fill(0));
    setSvcQty(Array(ADDITIONAL_SERVICES.length).fill(0));
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
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative w-[96vw] sm:w-[95vw] max-w-3xl lg:max-w-5xl max-h-[92vh] overflow-y-auto overscroll-contain bg-white rounded-3xl shadow-2xl m-3 p-4 pb-20 md:p-6">
            <button
              ref={closeBtnRef}
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute top-3 right-3 p-2 rounded-full text-white bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#502B7D]"
            >
              <X className="w-5 h-5" />
            </button>

            <h2
              id="simulador-title"
              className="text-center text-2xl md:text-4xl font-extrabold text-[#5C2D91] mb-2"
            >
              Simulador de créditos
            </h2>
            <p className="text-black text-base md:text-lg text-center leading-relaxed mb-6">
              Cada crédito equivale a USD ${PRICE_PER_INDIVIDUAL_CREDIT}.
            </p>

            {/* VACANTES */}
            <section className="space-y-4">
              <details open className="group rounded-2xl border-2 border-[#5C2D91]">
                <summary className="list-none w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#f6f5fb]">
                  <div className="text-left">
                    <h3 className="text-lg md:text-xl font-bold text-[#3b2b57]">Vacantes por seniority</h3>
                    <p className="text-sm text-gray-600">{totalCreditsVacancies} créditos • Estimado USD ${totalVacanciesUSD.toLocaleString()}</p>
                  </div>
                </summary>

                <div className="p-4 space-y-4">
                  {LEVELS.map((level, i) => (
                    <div key={level.name} className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] rounded-2xl px-4 py-3">
                      <div className="sm:col-span-7 min-w-0">
                        <p className="font-semibold text-[#3b2b57] text-base">{level.name}</p>
                        <p className="text-xs text-gray-500">{level.credits} créditos / vacante</p>
                      </div>
                      <div className="sm:col-span-5 flex items-center justify-between sm:justify-end gap-3">
                        <input type="number" min={0} step={1} inputMode="numeric" className="w-20 sm:w-24 md:w-28 rounded-xl border-2 border-[#6D4098] bg-white px-3 py-1.5 text-center font-semibold text-[#3b2b57] focus:outline-none focus:ring-2 focus:ring-[#6D4098]" value={qty[i]} onChange={(e) => { const next = [...qty]; next[i] = Number(e.target.value ?? 0); setQty(next); }} />
                        <div className="text-right font-bold text-[#5C2D91]">{(Number(qty[i]) || 0) * Number(level.credits)} créditos</div>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </section>

            {/* SERVICIOS */}
            <section className="mt-8">
              <details className="group rounded-2xl border-2 border-[#5C2D91]">
                <summary className="list-none w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#f6f5fb]">
                  <div className="text-left">
                    <h3 className="text-lg md:text-xl font-bold text-[#3b2b57]">Servicios adicionales</h3>
                    <p className="text-sm text-gray-600">{totalCreditsServices} créditos • Estimado USD ${totalServicesUSD.toLocaleString()}</p>
                  </div>
                </summary>

                <div className="p-4 space-y-4">
                  <div className="space-y-3">
                    {ADDITIONAL_SERVICES.map((svc, i) => {
                      const credits = (Number(svcQty[i]) || 0) * Number(svc.creditsPerUnit);
                      return (
                        <div key={svc.name} className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] rounded-2xl px-4 py-3">
                          <div className="sm:col-span-6 font-semibold text-[#3b2b57] text-base break-words">{svc.name}</div>
                          <div className="sm:col-span-3 text-sm text-gray-500">{svc.creditsPerUnit} créditos / unidad</div>
                          <div className="sm:col-span-3">
                            <input type="number" min={0} step={1} inputMode="numeric" className="w-20 sm:w-24 md:w-28 rounded-xl border-2 border-[#6D4098] bg-white px-3 py-1.5 text-center font-semibold text-[#3b2b57] focus:outline-none focus:ring-2 focus:ring-[#6D4098]" value={svcQty[i]} onChange={(e) => { const next = [...svcQty]; next[i] = Number(e.target.value ?? 0); setSvcQty(next); }} />
                          </div>
                          <div className="sm:col-span-12 md:col-span-2 text-right font-bold text-[#5C2D91]">{credits} créditos</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </details>
            </section>

            {/* TOTALES / CTA */}
            <div className="mt-8 space-y-3 text-center">
              <hr className="border-t-2 border-[#5C2D91]/30" />
              <div className="text-[18px] text-[#5C2D91] break-words">
                Estimación total: {combinedCredits} créditos x USD {PRICE_PER_INDIVIDUAL_CREDIT} = <strong className="text-[20px]">USD ${combinedUSD.toLocaleString()}</strong>
              </div>
              <div className="flex flex-col items-center sm:flex-row gap-3 sm:items-center sm:justify-center">
                <button onClick={reset} className="text-sm text-gray-600 underline decoration-gray-400 hover:text-gray-800">Limpiar simulador</button>
                <div className="w-full sm:w-auto">
                  <Button link="https://meetings.hubspot.com/llopez-ramirez" tag="Agendá una llamada" mode={2} height={46} className="w-full sm:w-auto" />
                </div>
              </div>
            </div>

            {/* RECOMENDACIÓN + DESGLOSE */}
            <div className="mt-10">
              <h3 className="text-2xl font-extrabold text-[#5C2D91] mb-1">Hay un paquete para vos</h3>
              <p className="text-sm text-[#6f61a8] mb-4">Recomendación basada en créditos de vacantes. Los servicios adicionales se cobran por separado.</p>

              <div className="rounded-3xl p-6 md:p-7 bg-[radial-gradient(120%_120%_at_100%_0%,#E9D7FF_0%,#F7F2Ff_40%,#FFFFFF_100%)] border border-[#E4D8FF] shadow-[0_6px_24px_rgba(80,43,125,0.12)]">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    {pkgDiscountPct > 0 && (
                      <span className="inline-block mb-2 rounded-md bg-[#FFEFD6] text-[#A65E00] text-xs font-bold px-2 py-1">{Math.round(pkgDiscountPct * 100)}% OFF</span>
                    )}
                    <p className="text-sm text-[#6f61a8]">Precio total:</p>
                    <p className="text-2xl font-extrabold text-[#3b2b57]">
                      {recommended ? `USD $${Number(recommended.price).toLocaleString()}` : "—"}
                      <span className="block text-xs font-normal text-[#6f61a8]">+ impuestos</span>
                    </p>
                    {pkgMSRP && <p className="text-sm text-gray-500 line-through">USD ${Number(pkgMSRP).toLocaleString()}</p>}
                    {recommended && savingsVsUnit > 0 && (
                      <p className="mt-1 text-sm text-[#2F855A] font-semibold">Ahorrás aprox. USD ${savingsVsUnit.toLocaleString()} vs comprar {Number(recommended.credits).toLocaleString()} créditos sueltos</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-[#6f61a8]">Créditos incluidos:</p>
                    <p className="text-2xl font-extrabold text-[#5C2D91]">{recommended ? `${Number(recommended.credits).toLocaleString()} créditos` : "—"}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-y-2 gap-x-6 mt-4 text-sm text-[#3b2b57]">
                  {(recommended?.features ?? []).map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#5C2D91]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
                  <div className="flex items-center gap-4">
                    <a href={recommended?.link ?? "/servicios/creditos"} className="rounded-xl bg-[#5C2D91] px-5 py-2 text-white font-semibold hover:opacity-90">{recommended ? `Comprar ${recommended.name}` : "Ver paquetes"}</a>
                    <a href="/servicios/creditos" className="text-[#5C2D91] underline underline-offset-4">Ver todos los paquetes</a>
                  </div>

                  {chosenPkg && (
                    <div className="w-full md:max-w-[560px] rounded-2xl border-2 border-[#5C2D91] p-4 bg-white/70 text-[#3b2b57] shadow-sm overflow-hidden">
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2">
                        <div className="min-w-0 break-words text-sm md:text-base">Paquete {chosenPkg.name} — {pkgCredits.toLocaleString()} créditos</div>
                        <div className="text-right whitespace-normal sm:whitespace-nowrap font-semibold">USD ${packageUSD.toLocaleString()}</div>

                        <div className="min-w-0 break-words text-sm md:text-base">Servicios adicionales
                          <span className="block">({totalCreditsServices.toLocaleString()} créditos × USD {Number(PRICE_PER_INDIVIDUAL_CREDIT).toLocaleString()})</span>
                        </div>
                        <div className="text-right whitespace-normal sm:whitespace-nowrap font-semibold">USD ${servicesUSD.toLocaleString()}</div>

                        <div className="min-w-0 break-words text-sm md:text-base">Créditos extra por VACANTES
                          <span className="block">({extraVacancyCreditsNeeded.toLocaleString()} créditos × USD {Number(PRICE_PER_INDIVIDUAL_CREDIT).toLocaleString()})</span>
                        </div>
                        <div className="text-right whitespace-normal sm:whitespace-nowrap font-semibold">USD ${extraCreditsUSD.toLocaleString()}</div>
                      </div>

                      <hr className="my-3 border-[#5C2D91]/30" />

                      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3">
                        <span className="font-bold">Total estimado</span>
                        <span className="text-lg md:text-xl font-extrabold text-[#5C2D91] whitespace-normal sm:whitespace-nowrap">{finalUSD !== null ? `USD $${finalUSD.toLocaleString()}` : "—"}</span>
                      </div>

                      <p className="text-xs text-gray-600 mt-2 break-words">Los créditos del paquete cubren solo vacantes. Los servicios adicionales se cobran aparte.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


