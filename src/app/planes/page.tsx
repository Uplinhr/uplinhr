import CardsPlan from "@/views/cardsPlan";
import { QAViewP } from "@/views/qaPayments";
import Button from "@/components/Button/Button";

const Planes = () => {
  return (
    <section className="bg-white h-auto">
      <div className="pt-16 mb-14 font-poppins">
        <h1 className="mb-[30px] text-center font-semibold text-[28px]">
          Potenciá tu gestión de talento con los planes flexibles de Uplin
        </h1>
        <h3 className="text-center font-400 text-[20px]">
          La diferencia está en el nivel de profundidad, en la cantidad de
          asesorías,
          <br /> nivel de acompañamiento y búsquedas de talento que tenés a
          disposición.
        </h3>
      </div>

      <CardsPlan />

      <div className="pt-16 mb-14 font-poppins">
        <h1 className="mb-[30px] text-center font-semibold text-[28px]">
          Compará nuestro modelo flexible con el esquema tradicional de
          consultoría.
        </h1>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch px-4">
          <div className="bg-[#F5F5F5] rounded-xl p-6 max-w-[480px] md:w-1/2 shadow-sm mx-auto md:mx-0 md:self-start">
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

          <div className="bg-[#FFFF] rounded-xl p-6 max-w-[480px] md:w-1/2 shadow-md border border-purple-200 mx-auto md:ml-[-30px] md:mr-0 md:self-end relative md:-mt-16 z-10">
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

      <div className="mt-10 mb-14 font-poppins">
        <h1 className="mb-[20px] text-center font-semibold text-[28px]">
          Preguntas Frecuentes
        </h1>
        <QAViewP />
      </div>

      <div className="mx-auto mt-10 mb-14 font-poppins w-2/3 h-auto bg-[#FDE6C7] rounded-[20px] px-6 py-10 text-center">
        <h2 className="mb-4 text-black text-[28px] font-stretch-75% leading-10">
          ¿Tenés dudas sobre qué plan elegir?
        </h2>
        <h4 className="text-black text-[18px] font-normal leading-normal mb-2">
          Podés escribirnos con tus dudas o agendar una llamada.
        </h4>
        <a
          href="mailto:contacto@uplinhr.com"
          className="text-black underline font-medium hover:text-[#502B7D] transition-colors duration-200"
        >
          contacto@uplinhr.com
        </a>

        <div className="my-8 flex justify-center">
          <Button
            link="https://outlook.office365.com/book/ConectconUplin1@uplinhr.com/?ismsaljsauthenabled=true"
            tag="Agenda una llamada"
            mode={3}
            height={50}
            width={250}
          />
        </div>
      </div>
    </section>
  );
};

export default Planes;
