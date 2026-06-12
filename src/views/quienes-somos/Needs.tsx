import Card from "@/components/Card/Card"

const Needs = () => {
  return (
    <div>
      <h1 className="font-poppins text-[24px] text-black font-medium text-center mb-5">
        Todo lo que necesitás para hacer crecer tu equipo, en un solo lugar
      </h1>
      <div className="flex flex-wrap gap-6 justify-center mb-10">
        <Card
          icon={<img src="/iconPersonalizacion.svg" alt="" className="w-8 h-8" />}
          title="Personalización"
          description="Consultoría flexible y a medida"
        />
        <Card
          icon={<img src="/iconHiring.svg" alt="" className="w-8 h-8" />}
          title="Hiring a tu ritmo"
          description="Créditos para búsquedas de talento"
        />
        <Card
          icon={<img src="/iconAcomp.svg" alt="" className="w-8 h-8" />}
          title="Acompañamiento"
          description="Apoyo profesional de expertos"
        />
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        <Card
          icon={<img src="/iconComunidad.svg" alt="" className="w-8 h-8" />}
          title="Comunidad"
          description="Networking y contacto"
        />
        <Card
          icon={<img src="/iconHerramientas.svg" alt="" className="w-8 h-8" />}
          title="Herramientas y Formación"
          description="Recursos prácticos, Workshops y webinars en vivo"
        />
        <Card
          icon={<img src="/iconSoporte.svg" alt="" className="w-8 h-8" />}
          title="Soporte"
          description="Email y reuniones online"
        />
      </div>
    </div>
  )
}

export default Needs
