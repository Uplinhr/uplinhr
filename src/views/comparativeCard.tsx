import Button from "@/components/Button/Button";
const ComparativeCard = () => {
  return (
    <div className="pt-16 mb-14 font-poppins">
      <h1 className="mb-[30px] text-center font-semibold text-[28px]">
        Compará nuestro modelo flexible con el esquema tradicional de
        consultoría.
      </h1>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch px-4">
       
        <div className="transform transition-transform duration-200 hover:scale-[1.03] bg-[#F5F5F5] rounded-xl p-6 max-w-[520px] md:w-1/2 shadow-sm mx-auto md:mx-0 md:self-start">
          <h3 className="text-[20px] font-semibold text-black mb-2">
            Esquema tradicional
          </h3>
          <div className="border-b border-gray-400 mb-4 w-full" />
          <ul className="space-y-5">
            <li className="text-[16px] font-500 text-[rgba(0,0,0,0.8)]">
              Pago de un sueldo completo por búsqueda
            </li>
            <li className="text-[16px] font-500 text-[rgba(0,0,0,0.8)]">
              Costo elevado por cada perfil
            </li>
            <li className="text-[16px] font-500 text-[rgba(0,0,0,0.8)]">
              Sin acompañamiento estratégico
            </li>
            <li className="text-[16px] font-normal text-[rgba(0,0,0,0.8)]">
              Costo fijo por cada contratación
            </li>
          </ul>
        </div>

        <div className="transform transition-transform duration-200 hover:scale-[1.03] bg-[#FFFF] rounded-xl p-6 max-w-[520px] md:w-1/2 shadow-md border border-purple-200 mx-auto md:ml-[-30px] md:mr-0 md:self-end relative md:-mt-16 z-10">
          <h3 className="text-[20px] font-semibold text-[#502B7D] mb-2">
            Uplin con créditos
          </h3>
          <div className="border-b border-[#502B7D] mb-4 w-full" />
          <ul className="space-y-5">
            <li className="text-[16px] font-500 text-[#502B7D]">
              Desde USD 149/mes con búsquedas incluidas
            </li>
            <li className="text-[16px] font-500 text-[#502B7D]">
              Modelo escalable y transparente
            </li>
            <li className="text-[16px] font-500 text-[#502B7D]">
              Asesorías, recursos y soporte incluidos
            </li>
            <li className="text-[16px] font-500 text-[#502B7D]">
              Flexibilidad total con créditos
            </li>
          </ul>
        </div>
      </div>

      <div className="my-8 flex justify-center">
        <Button
          link="https://outlook.office365.com/book/ConectconUplin1@uplinhr.com/?ismsaljsauthenabled=true"
          tag="Agenda una llamada"
          mode={0}
          height={50}
          width={200}
        />
      </div>
    </div>
  );
};

export default ComparativeCard;
