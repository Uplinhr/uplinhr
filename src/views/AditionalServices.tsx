const AditionalServices = () => {
  return (
    <div className="px-4 md:px-8"> 
      <h1 className="text-[28px] font-semibold mb-8 text-center">
        Servicios adicionales para escalar tu equipo con flexibilidad
      </h1>
      <div className="flex flex-wrap gap-6 justify-center font-poppins">
        
        <div className="transform transition-transform duration-200 hover:scale-[1.03] border border-[#502B7D] rounded-[25px] w-full max-w-[400px]">
          <div className="bg-[#6C4099] text-white min-h-[140px] py-4 px-6 rounded-t-[25px] flex flex-col justify-center">
            <h3 className="text-[20px] font-semibold">HR Manager externo</h3>
            <p className="text-[16px] text-white text-opacity-50 mt-2">
              ¿Neceitás sumar a alguien de RRHH sin agrandar tu nómina?  </p>
          </div>
          <div className="px-6 py-4 rounded-b-[25px]">
            <p className="text-[18px] my-4">
              👉Desde Uplin te ofrecemos un HR Manager externo, con dedicación por proyecto o por tiempo definido, que se integra a tu equipo y acelera los resultados.</p>
            
            <p className="text-[18px] mb-6 md:mb-12"> 
              🔷 Acompañamiento operativo y estratégico <br />
              🔷 Reuniones semanales y seguimiento personalizado <br />
              🔷 Acceso a recursos, herramientas y soporte de la red Uplin
            </p>
          </div>
        </div>

        <div className="transform transition-transform duration-200 hover:scale-[1.03] border border-[#502B7D] rounded-[25px] w-full max-w-[440px]">
          <div className="bg-[#CDBADA] min-h-[140px] py-4 px-6 rounded-t-[25px] flex flex-col justify-center">
            <h3 className="text-[20px] font-semibold leading-7">
              ¿Necesitás contratar más perfiles de los que incluye tu plan
              mensual?
            </h3>
            <p className="mt-1 text-[16px]">
              Compra de créditos adicionales para búsqueda de talento
            </p>
          </div>
          <div className="px-6 py-4">
            <p className="text-[18px] my-4">
              Sumá créditos según la complejidad del perfil.
            </p>
            <p className="text-[18px] my-4">
              💡 Cada crédito representa una búsqueda.
            </p>
            <p className="text-[18px] mb-6 md:mb-8">
              Podés usarlos cuando quieras, <br />
              según tus necesidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AditionalServices;