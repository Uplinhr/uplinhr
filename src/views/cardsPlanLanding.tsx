import PlanCard from "@/components/planCard/PlanCard";
import { PLANS_DATA } from "@/utils/plans";
import Image from "next/image";
import Link from "next/link";

const CardsPlanLanding = () => {
  const nonCustomPlans = PLANS_DATA.filter((plan) => !plan.isCustom);

  return (
    <div>
      <div className="text-center font-poppins mb-2 px-4 md:px-0">
        <h1 className="text-[28px] font-semibold mb-3">
          Crecé tu equipo con Uplin
        </h1>
        <p className="text-[16px] max-w-200 mx-auto mb-5">
          Todos nuestros planes incluyen acompañamiento estratégico, recursos
          listos para usar, acceso a plataforma y un sistema de créditos para
          búsquedas de talento.
        </p>
      </div>
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-16 lg:gap-8">
          {" "}
          {nonCustomPlans.map((plan) => (
            <PlanCard
              key={plan.plan}
              {...plan}
              className="hover:shadow-lg transition-all"
            />
          ))}
        </div>
      </section>

      <div className="bg-[#6C4099] mx-4 md:mx-14 py-16 rounded-[25px] mb-16">
        <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-center items-center font-poppins">
          <Image
            className="md:mr-12 mb-6 md:mb-0 rounded-lg"
            src={"/imgPlanCustom.png"}
            alt={"Imagen plan custom"}
            width={512}
            height={256}
            priority
            style={{ maxWidth: "100%", height: "auto" }}
          />

          <div className="text-start text-white max-w-lg px-4 md:px-0">
            <h4 className="text-[20px] font-medium mb-2">
              ¿Ninguno de los planes se ajusta a lo que necesitás?
            </h4>
            <p className="text-[16px] max-w-106 mb-2">
              Diseñamos una propuesta a medida para acompañarte en ese desafío
              puntual.
            </p>
            <p className="font-light text-[15px]">
              <span className="text-white mr-2">✓</span> Diagnóstico sin costo
              <br />
              <span className="text-white mr-2">✓</span> Soluciones
              personalizadas según el contexto
              <br />
              <span className="text-white mr-2">✓</span> Entregables claros,
              tiempos definidos
              <br />
              <span className="text-white mr-2">✓</span> Acompañamiento experto
              <br />
              <Link href={"https://www.uplinhr.com/contacto"}>
                <button
                  className={`min-w-50 min-h-4 mt-4 hover:cursor-pointer rounded-[6px] border border-white 
                    text-center font-[600] text-[16px] leading-[48px] transform transition-transform 
                    duration-200 hover:scale-[1.03]`}
                >
                  Contáctanos
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsPlanLanding;
