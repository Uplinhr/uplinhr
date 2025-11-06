import StepCard from './StepCard';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-2">
          ¿Cómo <span className="text-[#502B7D]">funciona</span>?
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          Un proceso simple y eficiente para conectarte con el talento que necesitas.
        </p>
        <div className="flex flex-col items-center">
          <StepCard
            stepNumber={1}
            title="Define tu necesidad"
            description="Cuéntanos qué proyectos o tareas necesitas resolver. Por ejemplo: optimizar procesos de onboarding, implementar un sistema de gestión del desempeño, o picos altos de vacantes activas."
          />
          <StepCard
            stepNumber={2}
            title="Seleccionamos a tu People Partner"
            description="Te asignamos a un experto que se alinea perfectamente con tus objetivos y la cultura de tu empresa."
          />
          <StepCard
            stepNumber={3}
            title="Manos a la obra"
            description="El profesional se integra a tu equipo, con acceso a nuestras herramientas y al soporte de toda la red de UPLIN."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;