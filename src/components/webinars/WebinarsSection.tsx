"use client";
import { useState } from "react";
import UpcomingWebinars from "@/components/webinars/UpcomingWebinars";
import RecordedWebinars from "@/components/webinars/RecordedWebinars";

export default function WebinarsSection() {
  const [filter, setFilter] = useState<"todos" | "grabados" | "envivo">(
    "todos"
  );

  const renderTitle = () => {
    if (filter === "grabados") return "Webinars Grabados";
    if (filter === "envivo") return "Webinars en Vivo";
    return null;
  };

  const renderParagraph = () => {
    if (filter === "grabados")
      return "Si no pudiste asistir a alguno de nuestros webinars anteriores, aquí puedes ver las grabaciones gratis.";
    if (filter === "envivo")
      return "Conoce las charlas que comienzan pronto e inscríbete gratis para interactuar en vivo con los speakers.";
    return null;
  };

  return (
    <section className="w-full flex flex-col lg:flex-row min-h-screen mt-8 bg-white">
     <aside className="w-full lg:mb-10 lg:w-1/5 max-w-[250px] p-4 flex flex-col items-center gap-4 lg:border-r-2 lg:border-[#6C4099]">

  <button
    onClick={() => setFilter("grabados")}
    className={`w-full px-4 py-2 rounded-[6px] cursor-pointer border transition-colors duration-300
      ${
        filter === "grabados"
          ? "bg-[#6C4099] text-white border-[#6C4099]"
          : "bg-white text-[#6C4099] border-[#6C4099] hover:bg-[#6C4099] hover:text-white"
      }`}
  >
    Grabados
  </button>

  <button
    onClick={() => setFilter("envivo")}
    className={`w-full px-4 py-2 rounded-[6px] cursor-pointer border transition-colors duration-300
      ${
        filter === "envivo"
          ? "bg-[#6C4099] text-white border-[#6C4099]"
          : "bg-white text-[#6C4099] border-[#6C4099] hover:bg-[#6C4099] hover:text-white"
      }`}
  >
    En vivo
  </button>

  <a
    href="https://app.uplinhr.com/programa-madres-y-lideres"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full px-4 py-2 rounded-[6px] cursor-pointer border bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center transition  duration-300  ease-in-out  hover:shadow-xl  hover:scale-105"
  >
    Cursos completos
  </a>
</aside>


      <main className="flex-1 px-6 flex flex-col bg-white overflow-y-auto h-[calc(100vh-2rem)] mb-10">
        {filter !== "todos" && (
           <div className="w-full bg-white pb-0">
            <h2 className="text-2xl font-bold pt-0 pb-0">{renderTitle()}</h2>
            {renderParagraph() && (
              <p className="mt-2 text-sm mb-2">{renderParagraph()}</p>
            )}
          </div>
        )}

        <div className="mt-4 flex-1">
          {filter === "todos" && (
            <>
              <section>
                <h2 className="text-2xl font-bold">Webinars en Vivo</h2>
                <p className="mt-2 text-sm">
                  Conoce las charlas que comienzan pronto e inscríbete gratis
                  para interactuar en vivo con los speakers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <UpcomingWebinars />
                </div>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold">Webinars Grabados</h2>
                <p className="mt-2 text-sm">
                  Si no pudiste asistir a alguno de nuestros webinars
                  anteriores, aquí puedes ver las grabaciones gratis.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <RecordedWebinars />
                </div>
              </section>
            </>
          )}

          {filter === "envivo" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
              <UpcomingWebinars />
            </div>
          )}

          {filter === "grabados" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
              <RecordedWebinars />
            </div>
          )}
        </div>
      </main>
    </section>
  );
}
