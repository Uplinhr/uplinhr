import Image from "next/image";
import ExpertCard from "@/components/ExpertCard/ExpertCard";
import { experts } from "@/utils/experts";
import { Banner } from "@/components/banner/banner";
import Link from "next/link";

export const metadata = {
  title: "Membresías | Uplin",
  description:
    "Descubre a las personas expertas de Uplin y elige una membresía para impulsar tu negocio.",
};
export default function ConsultoriasPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFB]">
      {/* Hero */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100">
          <div className="relative w-full aspect-[16/6] md:aspect-[16/5]">
            <Image
              src="/CS-landing.png"
              alt="Equipo trabajando en pizarra con indicadores"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="px-6 md:px-10 pt-8 pb-10">
            <h1 className="text-center text-3xl md:text-4xl font-extrabold text-[#5C2D91] drop-shadow-sm">
              Descubre a las Expertas que Impulsarán tu Negocio
            </h1>
            <p className="max-w-3xl mx-auto mt-5 text-center text-gray-700 leading-relaxed">
              En Uplin, creemos que el talento es la clave para el crecimiento.
              Por eso, hemos reunido a un equipo de consultoras excepcionales,
              líderes en sus campos, listas para ofrecerte soluciones
              estratégicas y personalizadas. Conoce a las mentes detrás de
              nuestras soluciones y conecta directamente con la experta que tu
              empresa necesita.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Cards */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {experts.map((e) => (
          <ExpertCard key={e.id} expert={e} />
        ))}
      </section>
      <section className="flex justify-center p-10">
        <Link
          href="https://meetings.hubspot.com/llopez-ramirez?uuid=87181c91-1ae5-4ea8-bc0c-5e2ec80b9c36"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center
               px-6 py-3 rounded-lg
               border border-[#5C2D91] text-[#5C2D91]
               hover:bg-[#5C2D91] hover:text-white
               transition-colors"
        >
          Quiero esta consultoría
        </Link>
      </section>
      <Banner />
    </main>
  );
}
