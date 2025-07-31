import Image from "next/image";
import Button from "@/components/Button/Button";
function AcademyView() {
  return (
    <>
      <section className="w-full mt-4 py-8 md:py-10 px-4 sm:px-6 flex justify-center items-center">
        <div className="w-full md:w-[80%] lg:w-[80%] bg-[#6C4099] rounded-2xl p-6 md:p-8 text-center transition-transform duration-300 hover:scale-[1.02]">
          <h1 className="text-white font-poppins text-3xl md:text-4xl font-normal text-center mb-3 md:mb-4">
            🚀 Empezá tu recorrido en <br />
            <span className="font-semibold">UPLIN ACADEMY</span>
          </h1>
          <p className="text-white font-poppins text-base md:text-lg font-normal text-center">
            El espacio donde la estrategia en gestión de personas se transforma
            en acción
          </p>
        </div>
      </section>

      <section className="w-full px-4 py-10">
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10 max-w-6xl mx-auto">
          <div
            className="flex-1 w-full lg:max-w-[40%] rounded-[20px] p-[1.5px] transition-transform duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(180deg, #502b7d, rgba(80,43,125,0))",
            }}
          >
            <div className="bg-white rounded-[20px] h-full w-full flex items-center p-6">
              <p className="text-[18px] font-light text-black text-center w-full">
                Descubrí nuestras próximas sesiones diseñadas para ayudarte a
                escalar tu empresa, resolver desafíos reales y conectar con
                referentes del mundo HR.
              </p>
            </div>
          </div>

          <div
            className="flex-1 w-full lg:max-w-[40%] rounded-[20px] p-[1.5px] transition-transform duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(0deg, #502b7d, rgba(80,43,125,0))",
            }}
          >
            <div className="bg-white rounded-[20px] h-full w-full flex items-start p-6">
              <ul className="space-y-4 w-full">
                <li className="text-[14px] font-normal text-black pl-6 relative">
                  <span className="absolute left-0 text-[#6C4099]">✓</span>
                  Aprendé lo que realmente mueve la aguja en talento, cultura y
                  liderazgo.
                </li>
                <li className="text-[14px] font-normal text-black pl-6 relative">
                  <span className="absolute left-0 text-[#6C4099]">✓</span>
                  Participá en vivo y llevá tus preguntas directo a quienes
                  están en el campo de acción.
                </li>
                <li className="text-[14px] font-normal text-black pl-6 relative">
                  <span className="absolute left-0 text-[#6C4099]">✓</span>
                  Accedé a recursos exclusivos, pensados para quienes lideran el
                  cambio.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 w-full max-w-screen-md mx-auto flex flex-wrap items-start gap-y-2 mb-10 font-poppins px-4">
  <h1 className="text-black text-[clamp(24px,3vw,32px)] font-semibold leading-tight m-0 pr-2.5 shrink-0 w-full lg:w-auto">
    Ciclo de Charlas Uplin Academy
  </h1>

  <p className="font-poppins font-normal italic text-base mt-1.5 pl-2.5 w-full lg:w-auto">
    Liderazgo, datos, propósito y cultura para transformar tu forma de trabajar.
  </p>
</div>


      {/*ESTA SECCION LUEGO TENDRÁ QUE SER UN COMPONENTE PARA RENDERIZR... POR EL MOMENTO QUEDA ASI  */}
      <section
        className="w-full pb-14 min-h-screen bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/bgAcademy.png')" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#6C4099] rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-6 overflow-hidden">
            <div className="lg:w-[55%] space-y-4 text-white font-poppins py-4">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                Liderazgo humano en acción
              </h2>
              <h3 className="text-lg md:text-xl font-medium">
                Charlas que inspiran, herramientas que accionan
              </h3>

              <div className="space-y-3">
                <p className="text-sm md:text-base font-medium">
                  ✨ ¿Por qué asistir?:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span>✓</span>
                    <span>
                      Conectá con líderes que están transformando la gestión de
                      personas
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span>✓</span>
                    <span>Llevate herramientas prácticas y accionables</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span>✓</span>
                    <span>Accedé a descuentos exclusivos</span>
                  </li>
                </ul>
                <p className="text-sm">🎁 Material descargable de regalo</p>
                <p className="text-sm font-medium">
                  📍 Cupos limitados: Reservá tu lugar gratis y no te lo
                  pierdas.
                </p>
              </div>

              <div className="mt-6 flex justify-center lg:justify-start">
                <Button
                  link="https://app.uplinhr.com/inscripcion-webinar-madres-y-lideres"
                  tag="Anotarme a la charla"
                  mode={0}
                  height={45}
                  width={280}
                />
              </div>
            </div>

            <div className="lg:w-[45%] flex items-center justify-center">
              <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-[15px]">
                <Image
                  src="/imgKelly.png"
                  alt="Ciclo Uplin"
                  fill
                  className="object-contain object-center transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AcademyView;
