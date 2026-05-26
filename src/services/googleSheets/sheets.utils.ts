export type SheetRow = { c: Array<{ v: string | boolean | number | null }> };

const SHEETS_RESPONSE_REGEX =
  /google\.visualization\.Query\.setResponse\(([\s\S]+)\);/;

export function parseSheetText(text: string): SheetRow[] {
  const jsonStr = text.match(SHEETS_RESPONSE_REGEX)?.[1];
  if (!jsonStr)
    throw new Error("Formato de respuesta inesperado de Google Sheets");
  const json = JSON.parse(jsonStr);
  return (json.table?.rows as SheetRow[]) ?? [];
}

export async function fetchSheetRows(url: string): Promise<SheetRow[]> {
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`Error al conectar con Google Sheets (${res.status})`);
  const text = await res.text();
  return parseSheetText(text);
}
