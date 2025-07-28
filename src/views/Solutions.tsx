import CardSolution from "@/components/CardSolution/CardSolution";

const Solutions = () => {
  return (
    <div className="mb-16">
      <h1 className="font-poppins text-[28px] text-black font-semibold text-center mb-8 mt-8">
        Soluciones de talento flexibles, con el acompañamiento que necesitás
      </h1>
      <div className="flex flex-wrap gap-6 justify-center">
        <CardSolution
          icon={"/iconFlexibilidad.svg"}
          title={"Flexibilidad"}
          description="Adaptabilidad a las necesidades cambiantes de la empresa."
        />
        <CardSolution
          icon={"/iconAhorroCostos.svg"}
          title={"Ahorro de costos"}
          description="Más valor, menos costos asociados a consultorías tradicionales."
        />
        <CardSolution
          icon={"/iconAccesoExpertos.svg"}
          title={"Acceso a expertos"}
          description="Disponibilidad de un equipo de RRHH especializado."
        />
        <CardSolution
          icon={"/iconEscalabilidad.svg"}
          title={"Escalabilidad"}
          description="Ajuste de servicios según el crecimiento o la necesidad."
        />
      </div>
    </div>
  );
};

export default Solutions;
