import { Membresia } from "@/interfaces";
import { fetchSheetRows, SheetRow } from "./googleSheets/sheets.utils";

const SIMULATOR_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1Fc5EpffsCCUiVlAiXjT6HRCTJrCCqVS7AC7tn4zgNjY/gviz/tq?tqx=out:json";
const MEMBRESIAS_GID = "828750238";
const CONFIG_GID = "0";
const ITEM_SEPARATOR = "|";

function parseCreditPrice(rows: SheetRow[]): number {
  const raw = rows[0]?.c?.[0]?.v;
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function parseMembresiaRow(row: SheetRow, creditPriceUsd: number): Membresia | null {
  const tipo       = row.c[0]?.v?.toString().trim() ?? "";
  const title      = row.c[1]?.v?.toString().trim() ?? "";
  const credits    = Number(row.c[2]?.v);
  const descuento  = Number(row.c[3]?.v) || 0;
  const idealPara  = row.c[4]?.v?.toString().trim() ?? "";
  const incluyeRaw = row.c[5]?.v?.toString() ?? "";
  const noIncluyeRaw = row.c[6]?.v?.toString().trim() ?? "";
  const buttonLink = row.c[7]?.v?.toString().trim() ?? "";

  if (!title || !Number.isFinite(credits) || credits <= 0) return null;

  const includes = incluyeRaw
    .split(ITEM_SEPARATOR)
    .map((f) => f.trim())
    .filter(Boolean);

  const excludes = noIncluyeRaw
    ? noIncluyeRaw.split(ITEM_SEPARATOR).map((f) => f.trim()).filter(Boolean)
    : [];

  const basePrice = credits * creditPriceUsd;
  const hasDiscount = descuento > 0;
  const price = Math.round(hasDiscount ? basePrice * (1 - descuento / 100) : basePrice);

  return {
    tipo,
    title,
    credits,
    discount: hasDiscount ? `${descuento}% OFF` : undefined,
    idealPara,
    includes,
    excludes,
    price,
    oldPrice: hasDiscount ? Math.round(basePrice) : undefined,
    buttonLink,
  };
}

export async function fetchMembresias(): Promise<Membresia[]> {
  const [configRows, membresiaRows] = await Promise.all([
    fetchSheetRows(`${SIMULATOR_SHEET_URL}&gid=${CONFIG_GID}`),
    fetchSheetRows(`${SIMULATOR_SHEET_URL}&gid=${MEMBRESIAS_GID}`),
  ]);

  const creditPriceUsd = parseCreditPrice(configRows);

  return membresiaRows
    .map((row) => parseMembresiaRow(row, creditPriceUsd))
    .filter((m): m is Membresia => m !== null);
}
