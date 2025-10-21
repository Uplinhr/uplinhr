"use client";
import { useEffect, useState } from "react";
import { Vacante } from "@/interfaces";
import CardVacante from "@/components/careers/CardVacante";
import { TbLoader2 } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiRefreshCw, FiChevronDown } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const VacantesView = () => {
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

        const capitalize = (s: string) =>
          s.replace(/\b\w/g, (c) => c.toUpperCase());

        const data: Vacante[] = rows.slice(1).map(
          (row: { c: Array<{ v: string | boolean | number | null }> }) => ({
            nombre_empresa: row.c[0]?.v?.toString() || "",
            es_anonimo: row.c[1]?.v?.toString() === "Si",
            nombre_puesto: row.c[2]?.v?.toString() || "",
            modalidad_trabajo: row.c[3]?.v?.toString() || "",
            descripcion_empleo: row.c[4]?.v?.toString() || "",
            ubicacion_empleo: row.c[5]?.v?.toString() || "",
            enlace_formulario: row.c[6]?.v?.toString() || "",
            area: row.c[7]?.v ? capitalize(row.c[7]?.v.toString().trim()) : "",
          })
        );

        setVacantes(data);

        const uniqueAreas = Array.from(
          new Set(data.map((v) => v.area).filter((a) => a !== ""))
        );
        setAreas(uniqueAreas);
      } catch (err) {
        console.error("Error al cargar vacantes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const vacantesFiltradas =
    selectedArea && selectedArea !== "Todas"
      ? vacantes.filter((v) => v.area === selectedArea)
      : vacantes;

  return (
    <>
      <section className="font-poppins text-white bg-[radial-gradient(50%_50%_at_50%_50%,#8F68AC_0%,#6C4099_100%)] text-center h-auto min-h-[30vh] md:min-h-[60vh] w-full flex flex-col justify-center items-center p-5 box-border">
        <h1 className="text-3xl md:text-4xl font-normal text-center mb-3 md:mb-4">
          Uplin Careers
        </h1>
        <h3 className="text-base md:text-lg font-normal">
          Conecta con oportunidades que te impulsen a crecer
        </h3>
      </section>

      <section className="w-full flex flex-col md:flex-row items-center justify-center gap-6 py-8 px-5">
        <div className="order-1 md:order-2 w-full md:w-4/12 bg-white shadow-lg rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 flex justify-center items-center h-56 md:h-64 cursor-pointer">
          <Image
            src="/careersImg2.jpg"
            alt="Careers"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="order-2 md:order-1 w-full md:w-4/12 bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-center items-center text-center transform transition-transform duration-300 hover:scale-105 h-56 md:h-64 cursor-pointer">
          <h3 className="font-poppins text-[#502B7D] font-semibold text-center text-sm md:text-base">
            Te conectamos con las mejores oportunidades en startups líderes y
            empresas de tecnología de Latam. Compañías con culturas centradas en
            las personas, donde el desarrollo profesional y personal van de la
            mano.
          </h3>
        </div>
      </section>

      <section className="w-full flex flex-wrap justify-center gap-4 py-4 px-5 mt-6">
        <Link href="/careers">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-[#6C4099] text-white px-4 py-2 rounded-[10px] w-fit cursor-pointer"
          >
            <FiArrowLeft />
            Atrás
          </motion.div>
        </Link>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 bg-[#6C4099] text-white px-4 py-2 rounded-[10px] w-fit cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <FiRefreshCw className="animate-spin-on-hover hover:animate-spin" />
          Actualizar
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 bg-[#6C4099] text-white px-4 py-2 rounded-[10px] w-fit cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FaFilter />
          <span>{selectedArea || "Filtrar por área"}</span>
          <motion.div
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiChevronDown />
          </motion.div>
          <AnimatePresence>
            {dropdownOpen && areas.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 left-0 bg-white text-[#6C4099] shadow-lg rounded-xl py-2 px-4 flex flex-col min-w-[200px] z-10 font-poppins"
              >
                <div
                  className="cursor-pointer py-1 hover:bg-[#6C4099] hover:text-white px-2 rounded-md"
                  onClick={() => {
                    setSelectedArea("Todas");
                    setDropdownOpen(false);
                  }}
                >
                  Todas
                </div>
                {areas.map((area, i) => (
                  <div
                    key={i}
                    className="cursor-pointer py-1 hover:bg-[#6C4099] hover:text-white px-2 rounded-md"
                    onClick={() => {
                      setSelectedArea(area);
                      setDropdownOpen(false);
                    }}
                  >
                    {area}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {areas.length === 0 && !dropdownOpen && (
            <span className="text-white text-sm italic ml-2">
              No hay áreas disponibles
            </span>
          )}
        </motion.div>
      </section>

      <section className="min-h-[60vh] flex justify-center p-6 font-poppins">
        <div className="w-full">
          {vacantesFiltradas.length > 0 && (
            <h2 className="text-2xl font-bold mb-6 text-[#6C4099] text-center">
              Vacantes disponibles
            </h2>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <TbLoader2 className="animate-spin text-[#6C4099] text-4xl" />
            </div>
          ) : (
            <div className="grid gap-6 mb-8">
              {vacantesFiltradas.length > 0 ? (
                vacantesFiltradas.map((v, i) => (
                  <CardVacante key={i} vacante={v} />
                ))
              ) : (
                <section className="flex flex-col items-center gap-6 px-4 py-8">
                  <p className="text-[#6C4099] text-lg font-semibold text-center">
                    Hoy no tenemos vacantes disponibles
                  </p>

                  <div className="font-poppins text-center max-w-xl w-full bg-white/5 rounded-lg shadow-lg flex flex-col items-center gap-6 p-6">
                    <h3 className="text-base md:text-lg font-normal text-[#6C4099] leading-relaxed">
                      Déjanos tu CV y se parte de nuestra base de talentos.
                    </h3>

                    <ul className="space-y-4 text-left w-full max-w-md text-[#6C4099]">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#502B7D] rounded-full mr-3"></span>
                        Te consideraremos para futuras oportunidades
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#502B7D] rounded-full mr-3"></span>
                        Recibí novedades y vacantes relacionadas a tu perfil
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#502B7D] rounded-full mr-3"></span>
                        Accede a invitaciones de eventos exclusivos de Uplin.
                      </li>
                    </ul>

                    <motion.a
                      href="https://forms.gle/xoXqjr1dWizknQQTA"
                      target="_blank"
                      className="bg-[#502B7D] border-2 border-[#502B7D] text-white rounded-full px-4 py-2 md:px-6 md:py-3 no-underline font-bold cursor-pointer"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#6C4099",
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Quiero unirme a la base de talentos
                    </motion.a>
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default VacantesView;
