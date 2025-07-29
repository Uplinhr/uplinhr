import Image from "next/image";
import Button from "@/components/Button/Button";

const Presentation = () => {
  return (
    <div className="bg-gradient-to-r from-[#6C4099] to-[#502B7D]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-26 flex flex-col md:flex-row items-center gap-8 md:gap-12">
      
        <div className="order-2 md:order-1 w-full md:w-1/2 lg:max-w-[600px] pt-0 md:pt-18">
          <p className="font-poppins text-[16px] text-white font-bold text-left md:text-left tracking-wider">
            RRHH FLEXIBLE <br className="hidden md:block" />
            PARA TU EMPRESA
          </p>
          <h1 className="font-poppins text-[32px] sm:text-[36px] md:text-[40px] text-white font-bold text-left md:text-left mb-2 leading-tight md:leading-11 mt-3">
            La Primera Membresía <br className="hidden md:block" />
            Flexible en Latam
          </h1>
          <p className="font-poppins text-[18px] md:text-[20px] text-white font-normal text-left md:text-left mb-6">
            Accedé a soluciones de talento y gestión de personal{" "}
            <br className="hidden md:block" />
            cuando y como las necesites, sin contratos rígidos.
          </p>
          <div className="flex justify-center md:justify-start">
            <Button
              link="/planes"
              tag="Quiero conocer los planes"
              mode={2}
              height={46}
              width={300}
            />
          </div>
        </div>

       
        <div className="order-1 md:order-2 w-full md:w-1/2 min-w-[300px] max-w-[750px] mx-auto md:mx-0">
          <Image
            alt="Logo Membresia flexible"
            src="/imgReunionUplin.png"
            width={750}
            height={450}
            className="w-full h-auto drop-shadow-[-14px_14px_0_#502B7D]"
          />
        </div>
      </div>
    </div>
  );
};

export default Presentation;