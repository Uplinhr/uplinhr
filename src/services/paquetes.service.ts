import { Paquete } from "@/interfaces";
import { fetchSheetRows, SheetRow } from "./googleSheets/sheets.utils";

// Reemplazar con el GID real de la pestaña de paquetes en el spreadsheet
const PAQUETES_GID = "1039397621";

const FEATURE_SEPARATOR = "|";

function parsePaqueteRow(row: SheetRow): Paquete | null {
  const nombre = row.c[0]?.v?.toString().trim() ?? "";
  const precio = Number(row.c[1]?.v);
  const descuento = Number(row.c[2]?.v) || 0;
  const idealPara = row.c[3]?.v?.toString().trim() ?? "";
  const descripcionRaw = row.c[4]?.v?.toString() ?? "";
  const link = row.c[5]?.v?.toString().trim() ?? "";

  if (!nombre || !Number.isFinite(precio) || precio <= 0) return null;

  const features = descripcionRaw
    .split(FEATURE_SEPARATOR)
    .map((f) => f.trim())
    .filter(Boolean);

  const hasDiscount = descuento > 0;
  const precioFinal = hasDiscount
    ? Math.round(precio * (1 - descuento / 100))
    : precio;

  return {
    title: nombre,
    description: idealPara,
    price: precioFinal,
    oldPrice: hasDiscount ? precio : undefined,
    discount: hasDiscount ? `${descuento}% OFF` : undefined,
    buttonText: `Comprar ${nombre}`,
    buttonLink: link,
    features,
  };
}

export async function fetchPaquetes(): Promise<Paquete[]> {
  const base = process.env.NEXT_PUBLIC_SIMULATOR_SHEET_URL;
  if (!base) throw new Error("NEXT_PUBLIC_SIMULATOR_SHEET_URL no está configurada");

  const rows = await fetchSheetRows(`${base}&gid=${PAQUETES_GID}`);

  return rows
    .slice(0)
    .map(parsePaqueteRow)
    .filter((p): p is Paquete => p !== null);
}
