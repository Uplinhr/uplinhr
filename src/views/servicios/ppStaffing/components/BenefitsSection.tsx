const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
          Beneficios <span className="text-[#502B7D]">claves</span>
        </h2>
        <p className="mt-2 text-gray-600 mb-12">
          Descubre por qué las empresas eligen People Partner Staffing para sus necesidades de RR.HH.
        </p>

        <div className="mt-12 text-left max-w-2xl mx-auto">
          <ul className="list-none space-y-6">
            <li>
              <h3 className="text-lg font-semibold text-[#502B7D]">
                + Flexibilidad: <span className="text-gray-600 font-normal">escala tu equipo de RR.HH. según la demanda, sin contratos a largo plazo.</span>
              </h3>
            </li>
            <li>
              <h3 className="text-lg font-semibold text-[#502B7D]">
                + Ahorro de costos: <span className="text-gray-600 font-normal">olvídate de los gastos de nómina, beneficios y procesos de contratación.</span>
              </h3>
            </li>
            <li>
              <h3 className="text-lg font-semibold text-[#502B7D]">
                + Expertise Inmediata: <span className="text-gray-600 font-normal">accede al conocimiento especializado de profesionales de alto nivel, listos para empezar desde el primer día.</span>
              </h3>
            </li>
            <li>
              <h3 className="text-lg font-semibold text-[#502B7D]">
                + Enfoque Estratégico: <span className="text-gray-600 font-normal">dedica tu tiempo a lo importante, mientras un experto se encarga de los proyectos de People Ops que requieren atención.</span>
              </h3>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;