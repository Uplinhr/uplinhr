import { AdditionalService, SimulatorData, SimulatorLevel } from "@/interfaces";
import { fetchSheetRows, SheetRow } from "./googleSheets/sheets.utils";

// Actualizar estos gids con los valores reales del spreadsheet
const SHEETS = {
  CONFIG: "0",
  SENIORITIES: "593866563",
  SERVICES: "1907090897",
} as const;

function sheetUrl(base: string, gid: string): string {
  return `${base}&gid=${gid}`;
}

function parseCreditPrice(rows: SheetRow[]): number {
  const raw = rows[0]?.c?.[0]?.v;
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function parseSeniorityRow(row: SheetRow): SimulatorLevel | null {
  const name = row.c[0]?.v?.toString().trim() ?? "";
  const credits = Number(row.c[1]?.v);
  if (!name || !Number.isFinite(credits) || credits <= 0) return null;
  return { name, credits };
}

function parseServiceRow(row: SheetRow): AdditionalService | null {
  const name = row.c[0]?.v?.toString().trim() ?? "";
  const creditsPerUnit = Number(row.c[1]?.v);
  if (!name || !Number.isFinite(creditsPerUnit) || creditsPerUnit <= 0) return null;
  return { name, creditsPerUnit };
}

export async function getSimulatorData(): Promise<SimulatorData> {
  const base = process.env.NEXT_PUBLIC_SIMULATOR_SHEET_URL;
  if (!base) throw new Error("NEXT_PUBLIC_SIMULATOR_SHEET_URL no está configurada");

  const [configRows, seniorityRows, serviceRows] = await Promise.all([
    fetchSheetRows(sheetUrl(base, SHEETS.CONFIG)),
    fetchSheetRows(sheetUrl(base, SHEETS.SENIORITIES)),
    fetchSheetRows(sheetUrl(base, SHEETS.SERVICES)),
  ]);

  const creditPriceUsd = parseCreditPrice(configRows);

  const levels = seniorityRows
    .slice(0)
    .map(parseSeniorityRow)
    .filter((l): l is SimulatorLevel => l !== null);

  const additionalServices = serviceRows
    .slice(0)
    .map(parseServiceRow)
    .filter((s): s is AdditionalService => s !== null);

  return { creditPriceUsd, levels, additionalServices };
}
