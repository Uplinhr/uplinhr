import CardSolution from "@/components/CardSolution/CardSolution";

const Needs = () => {
  return (
    <div>
      <h1 className="font-poppins text-[24px] text-black font-medium text-center mb-5">
        Todo lo que necesitás para hacer crecer tu equipo, en un solo lugar
      </h1>
      <div className="flex flex-wrap gap-6 justify-center mb-10">
        <CardSolution
          icon="/iconPersonalizacion.svg"
          title="Personalización"
          description="Consultoría flexible y a medida"
        />
        <CardSolution
          icon="/iconHiring.svg"
          title="Hiring a tu ritmo"
          description="Créditos para búsquedas de talento"
        />
        <CardSolution
          icon="/iconAcomp.svg"
          title="Acompañamiento"
          description="Apoyo profesional de expertos"
        />
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        <CardSolution
          icon="/iconComunidad.svg"
          title="Comunidad"
          description="Networking y contacto"
        />
        <CardSolution
          icon="/iconHerramientas.svg"
          title="Herramientas y Formación"
          description="Recursos prácticos, Workshops y webinars en vivo"
        />
        <CardSolution
          icon="/iconSoporte.svg"
          title="Soporte"
          description="Email y reuniones online"
        />
      </div>
    </div>
  );
};

export default Needs;
