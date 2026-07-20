import { Vacante } from "@/interfaces";
import { fetchSheetRows, SheetRow } from "./googleSheets/sheets.utils";

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
  const url =
    "https://docs.google.com/spreadsheets/d/1fAEiXSCTge9b19EV613Jjh6hAZ-uf4PafACQ8TTFPjQ/gviz/tq?tqx=out:json";

  const rows = await fetchSheetRows(url);
  const vacantes = rows.slice(1).map(parseRow);
  const areas = Array.from(
    new Set(vacantes.map((v) => v.area).filter((a) => a !== ""))
  );

  return { vacantes, areas };
}
