import { Vacante } from "@/interfaces";

type SheetRow = { c: Array<{ v: string | boolean | number | null }> };

const SHEETS_RESPONSE_REGEX =
  /google\.visualization\.Query\.setResponse\(([\s\S]+)\);/;

const capitalize = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

const parseRow = (row: SheetRow): Vacante => ({
  nombre_empresa: row.c[0]?.v?.toString() ?? "",
  es_anonimo: row.c[1]?.v?.toString() === "Si",
  nombre_puesto: row.c[2]?.v?.toString() ?? "",
  modalidad_trabajo: row.c[3]?.v?.toString() ?? "",
  descripcion_empleo: row.c[4]?.v?.toString() ?? "",
  ubicacion_empleo: row.c[5]?.v?.toString() ?? "",
  enlace_formulario: row.c[6]?.v?.toString() ?? "",
  area: row.c[7]?.v ? capitalize(row.c[7].v.toString().trim()) : "",
});

export type FetchVacantesResult = {
  vacantes: Vacante[];
  areas: string[];
};

export async function fetchVacantes(): Promise<FetchVacantesResult> {
  const url = process.env.NEXT_PUBLIC_VACANTES_SHEET_URL;
  if (!url) throw new Error("NEXT_PUBLIC_VACANTES_SHEET_URL no está configurada");

  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`Error al conectar con la fuente de vacantes (${res.status})`);

  const text = await res.text();
  const jsonStr = text.match(SHEETS_RESPONSE_REGEX)?.[1];
  if (!jsonStr)
    throw new Error("La respuesta de la hoja de cálculo tiene un formato inesperado");

  const json = JSON.parse(jsonStr);
  const rows: SheetRow[] = json.table?.rows ?? [];
  const vacantes = rows.slice(1).map(parseRow);
  const areas = Array.from(
    new Set(vacantes.map((v) => v.area).filter((a) => a !== ""))
  );

  return { vacantes, areas };
}
