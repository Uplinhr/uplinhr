import { Paquete } from "@/interfaces";
import { fetchSheetRows, SheetRow } from "./googleSheets/sheets.utils";

const PAQUETES_GID = "1039397621";
const CONFIG_GID = "0";
const FEATURE_SEPARATOR = "|";

function parseCreditPrice(rows: SheetRow[]): number {
  const raw = rows[0]?.c?.[0]?.v;
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function parsePaqueteRow(row: SheetRow, creditPriceUsd: number): Paquete | null {
  const nombre = row.c[0]?.v?.toString().trim() ?? "";
  const credits = Number(row.c[1]?.v);
  const descuento = Number(row.c[2]?.v) || 0;
  const idealPara = row.c[3]?.v?.toString().trim() ?? "";
  const descripcionRaw = row.c[4]?.v?.toString() ?? "";
  const link = row.c[5]?.v?.toString().trim() ?? "";

  if (!nombre || !Number.isFinite(credits) || credits <= 0) return null;

  const features = descripcionRaw
    .split(FEATURE_SEPARATOR)
    .map((f) => f.trim())
    .filter(Boolean);

  const basePrice = credits * creditPriceUsd;
  const hasDiscount = descuento > 0;
  const price = Math.round(hasDiscount ? basePrice * (1 - descuento / 100) : basePrice);

  return {
    title: nombre,
    description: idealPara,
    price,
    oldPrice: hasDiscount ? Math.round(basePrice) : undefined,
    discount: hasDiscount ? `${descuento}% OFF` : undefined,
    buttonText: `Comprar ${nombre}`,
    buttonLink: link,
    features,
    credits,
  };
}

export async function fetchPaquetes(): Promise<Paquete[]> {
  const base = process.env.NEXT_PUBLIC_SIMULATOR_SHEET_URL;
  if (!base) throw new Error("NEXT_PUBLIC_SIMULATOR_SHEET_URL no está configurada");

  const [configRows, paqueteRows] = await Promise.all([
    fetchSheetRows(`${base}&gid=${CONFIG_GID}`),
    fetchSheetRows(`${base}&gid=${PAQUETES_GID}`),
  ]);

  const creditPriceUsd = parseCreditPrice(configRows);

  return paqueteRows
    .map((row) => parsePaqueteRow(row, creditPriceUsd))
    .filter((p): p is Paquete => p !== null);
}
