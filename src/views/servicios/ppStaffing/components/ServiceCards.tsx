import ServiceCard from './ServiceCard';

const serviceData = [
  {
    iconSrc: "/PPS-optimizacion.png", 
    title: "Optimización de Procesos",
    description: "Mejoramos tus procesos de onboarding, gestión del desempeño y experiencia del empleado.",
    altText: "Icono de optimización"
  },
  {
    iconSrc: "/PPS-gestion.png",
    title: "Gestión de Alto Volumen",
    description: "Manejamos picos altos de vacantes activas y procesos de selección masivos.",
    altText: "Icono de gestión de alto volumen"
  },
  {
    iconSrc: "/PPS-proyectos.png",
    title: "Proyectos Estratégicos",
    description: "Implementamos sistemas de gestión, políticas de RR.HH. y transformación cultural.",
    altText: "Icono de proyectos estratégicos"
  }
];

const ServiceCards = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold">
         Tu solución: <span className="text-[#502B7D]">People Partner Staffing </span>de Uplin
        </h2>
   
        <h3 className="mt-8 text-xl font-semibold text-gray-800">
         Nuestro servicio es simple:
        </h3>

        <p className="mt-2 text-gray-600">
          Te conectamos con el talento que necesitas, por el tiempo exacto que lo necesitas.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <ServiceCard
              key={index}
              iconSrc={service.iconSrc}
              title={service.title}
              description={service.description}
              altText={service.altText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;