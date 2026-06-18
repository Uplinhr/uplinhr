"use client";
import { useState } from "react";
import { useVacantes } from "@/hooks/useVacantes";
import CardVacante from "@/components/careers/CardVacante";
import FilterDropdown from "@/components/careers/FilterDropdown";
import EmptyVacantes from "@/components/careers/EmptyVacantes";
import Link from "next/link";
import { ArrowLeft, RefreshCw, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import ServiceHero from "@/components/ServiceHero/ServiceHero";
import { speakText } from "@/utils/textToSpeech";
import SectionTag from "@/components/SectionTag/SectionTag";
import Title from "@/components/Title/Title";

const VacantesView = () => {
  const { vacantes, areas, loading, error, selectedArea, setSelectedArea, refresh } =
    useVacantes();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleHeaderTTS = () => {
      const text = "Conecta con oportunidades que te impulsen a crecer.Te conectamos con las mejores oportunidades en startups líderes y empresas de tecnología de Latam. Compañías con culturas centradas en las personas, donde el desarrollo profesional y personal van de la mano.";
      speakText(text);
    };

  return (
    <main className="min-h-screen">
      <ServiceHero
        tag="Uplin Careers"
        title={{
          before: "Uplin",
          gradient: "Careers",
        }}
        description={
          <>
            <p className="lead-intro" style={{ margin: "0 0 0.5rem" }}>
              Conecta con oportunidades que te impulsen a crecer
            </p>
              Te conectamos con las mejores oportunidades en startups líderes y empresas de tecnología de Latam. Compañías con culturas centradas en las personas, donde el desarrollo profesional y personal van de la mano.
          </>
        }
        primaryBtn={{ text: "Ver vacantes →", href: "/careers/jobOpenings" }}
        secondaryBtn={{ text: "Atras", href: "/careers" }}
        image={{ src: "/Vacantes_jobOpening.jpg", alt: "Vacantes Abiertas" }}
        onTTS={handleHeaderTTS}
      />

      <section className="flex flex-col items-center">
        <SectionTag text="OPORTUNIDADES" />
        <Title before="Vacantes " gradient="Abiertas" />
        <div
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: "var(--color-uplin-ink-soft)",
            maxWidth: 700,
            margin: "0 0 2rem",
          }}
        >
          Explorá las oportunidades disponibles y filtrá por área para encontrar la posición ideal para ti.
        </div>
        <Link href="/careers">
          <motion.div
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center gap-[0.45rem] font-semibold text-[0.95rem] px-[0.9rem] py-[0.55rem] rounded-full cursor-pointer transition-all"
            style={{
              color: "var(--color-uplin-purple)",
              transition: "background var(--transition-uplin-fast)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-uplin-purple-8)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <ArrowLeft size={14} />
            Atrás
          </motion.div>
        </Link>
        
        <div className="flex flex-row justify-center items-center gap-4 mt-6">
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

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center gap-[0.45rem] font-semibold text-[0.95rem] text-white px-[1.2rem] py-[0.62rem] rounded-full cursor-pointer"
            style={{
              background: "linear-gradient(135deg, var(--color-uplin-purple), var(--color-uplin-purple-2))",
              boxShadow: "0 6px 18px -6px rgba(109,64,152,0.5)",
              border: "none",
              transition: "all var(--transition-uplin-fast)",
            }}
            onClick={refresh}
          >
            <RefreshCw size={16} />
            Actualizar
          </motion.button>

        </div>
      </section>

      <section className="flex justify-center p-6">
        <div className="w-full" style={{ maxWidth: "980px", margin: "0 auto" }}>

          {error && (
            <p className="text-red-500 text-center py-10">{error}</p>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                className="w-8 h-8 rounded-full border-2 border-t-transparent"
                style={{ borderColor: "var(--color-uplin-purple)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
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
    </main>
  );
};

export default VacantesView;
