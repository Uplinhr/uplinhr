"use client";
import { useState } from "react";
import { useVacantes } from "@/hooks/useVacantes";
import CardVacante from "@/components/careers/CardVacante";
import FilterDropdown from "@/components/careers/FilterDropdown";
import EmptyVacantes from "@/components/careers/EmptyVacantes";
import { TbLoader2 } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import { motion } from "framer-motion";

const VacantesView = () => {
  const { vacantes, areas, loading, error, selectedArea, setSelectedArea, refresh } =
    useVacantes();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          onClick={refresh}
        >
          <FiRefreshCw className="animate-spin-on-hover hover:animate-spin" />
          Actualizar
        </motion.div>

        <FilterDropdown
          areas={areas}
          selectedArea={selectedArea}
          open={dropdownOpen}
          onToggle={() => setDropdownOpen((o) => !o)}
          onSelect={(area) => {
            setSelectedArea(area);
            setDropdownOpen(false);
          }}
        />
      </section>

      <section className="min-h-[60vh] flex justify-center p-6 font-poppins">
        <div className="w-full">
          {vacantes.length > 0 && (
            <h2 className="text-2xl font-bold mb-6 text-[#6C4099] text-center">
              Vacantes disponibles
            </h2>
          )}

          {error && (
            <p className="text-red-500 text-center py-10">{error}</p>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <TbLoader2 className="animate-spin text-[#6C4099] text-4xl" />
            </div>
          ) : (
            <div className="grid gap-6 mb-8">
              {vacantes.length > 0 ? (
                vacantes.map((v, i) => <CardVacante key={i} vacante={v} />)
              ) : (
                <EmptyVacantes />
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default VacantesView;
