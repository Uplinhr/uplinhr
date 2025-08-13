"use client";
import { useEffect, useState } from "react";
import { Vacante } from "@/interfaces";
import CardVacante from "@/components/careers/CardVacante";
import { TbLoader2 } from "react-icons/tb";
import Link from "next/link";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";
const VacantesView = () => {
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://docs.google.com/spreadsheets/d/1fAEiXSCTge9b19EV613Jjh6hAZ-uf4PafACQ8TTFPjQ/gviz/tq?tqx=out:json"
        );
        const text = await res.text();
        const jsonStr = text.match(
          /google\.visualization\.Query\.setResponse\(([\s\S]+)\);/
        )?.[1];

        if (!jsonStr) throw new Error("Formato de respuesta inválido");

        const json = JSON.parse(jsonStr);
        const rows = json.table.rows || [];

        const data: Vacante[] = rows
          .slice(1)
          .map(
            (row: { c: Array<{ v: string | boolean | number | null }> }) => ({
              nombre_empresa: row.c[0]?.v?.toString() || "",
              es_anonimo: row.c[1]?.v?.toString() === "Si",
              nombre_puesto: row.c[2]?.v?.toString() || "",
              modalidad_trabajo: row.c[3]?.v?.toString() || "",
              descripcion_empleo: row.c[4]?.v?.toString() || "",
              ubicacion_empleo: row.c[5]?.v?.toString() || "",
              enlace_formulario: row.c[6]?.v?.toString() || "",
            })
          );

        setVacantes(data);
      } catch (err) {
        console.error("Error al cargar vacantes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="font-poppins text-white bg-[radial-gradient(50%_50%_at_50%_50%,#8F68AC_0%,#6C4099_100%)] text-center h-auto min-h-[30vh] md:min-h-[40vh] w-full flex flex-col justify-center items-center p-5 box-border">
        <h1 className="text-3xl md:text-4xl font-normal text-center mb-3 md:mb-4">
          Uplin Careers
        </h1>
        <h3 className="text-base md:text-lg font-normal">
          Si buscas trabajo ¡Uplin es tu mejor aliado!
        </h3>
      </section>

      <section className="flex gap-4 items-center justify-center w-full py-4 mt-2">
        <Link href="/careers" className="flex items-center justify-center gap-2 bg-[#6C4099] text-white px-4 py-2 rounded-[10px] w-fit hover:bg-[#5a3780] transition-colors">
            <FiArrowLeft />
            <span>Atrás</span>
        </Link>

        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-2 cursor-pointer bg-[#6C4099] text-white px-4 py-2 rounded-[10px] w-fit hover:bg-[#5a3780] transition-colors"
        >
          <FiRefreshCw className="animate-spin-on-hover hover:animate-spin" />
          <span>Actualizar</span>
        </button>
      </section>

      <section className="min-h-[60vh] flex justify-center p-6 font-poppins">
  <div className="w-full">
    <h2 className="text-2xl font-bold mb-6 text-[#6C4099] text-center">
      Vacantes disponibles
    </h2>

    {loading ? (
      <div className="flex justify-center items-center py-20">
        <TbLoader2 className="animate-spin text-[#6C4099] text-4xl" />
      </div>
    ) : (
      <div className="grid gap-6">
        {vacantes.length > 0 ? (
          vacantes.map((v, i) => (
            <CardVacante key={i} vacante={v} />
          ))
        ) : (
          <p className="text-center text-[#6C4099] text-lg">
            No hay vacantes disponibles en este momento
          </p>
        )}
      </div>
    )}
  </div>
</section>
    </>
  );
};

export default VacantesView;
