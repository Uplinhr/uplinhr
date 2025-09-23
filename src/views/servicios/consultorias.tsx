import Image from "next/image";
import ExpertCard from "@/components/ExpertCard/ExpertCard";
import { experts } from "@/utils/experts";
import { Banner } from "@/components/banner/banner";

export const metadata = {
  title: "Membresías | Uplin",
  description:
    "Descubre a las expertas de Uplin y elige una membresía para impulsar tu negocio.",
};

export default function ConsultoriasPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFB]">
      {/* Hero */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100">
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/7] md:aspect-[16/5]">
            <Image
              src="/CS-landing.png"
              alt="Equipo trabajando en pizarra con indicadores"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>

          <div className="px-5 sm:px-8 md:px-10 pt-6 sm:pt-8 pb-8 sm:pb-10">
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#5C2D91] drop-shadow-sm">
              Descubre a las expertas que impulsarán tu negocio
            </h1>

            <p className="max-w-3xl mx-auto mt-4 sm:mt-5 text-center text-gray-700 leading-relaxed text-base sm:text-lg">
              En Uplin, creemos que el talento es la clave para el crecimiento.
              Hemos reunido a un equipo de consultoras excepcionales, listas
              para ofrecer soluciones estratégicas y personalizadas. Conecta
              directamente con la experta que tu empresa necesita.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Cards (responsive) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {experts.map((e) => (
            <ExpertCard key={e.id} expert={e} />
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <Banner />
      </section>
    </main>
  );
}

