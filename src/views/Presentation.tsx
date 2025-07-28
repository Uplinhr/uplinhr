import Image from "next/image";
import Button from "@/components/Button/Button";

const Presentation = () => {
  return (
    <div className="bg-gradient-to-r from-[#6C4099] to-[#502B7D] flex flex-wrap items-center gap-3 justify-between pl-8 py-26">
      <div className="pt-18 max-w-[600px]">
        <p className="font-poppins text-[16px] text-white font-bold text-left tracking-wider">
          RRHH FLEXIBLE <br />
          PARA TU EMPRESA
        </p>
        <h1 className="font-poppins text-[40px] text-white font-bold text-left mb-2 leading-11 mt-3">
          La Primera Membresía <br />
          Flexible en Latam
        </h1>
        <p className="font-poppins text-[20px] text-white font-normal text-left mb-6">
          Accedé a soluciones de talento y gestión de personal <br />
          cuando y como las necesites, sin contratos rígidos.
        </p>
        <div className="flex justify-start">
          <Button
            link="/planes"
            tag="Quiero conocer los planes"
            mode={2}
            height={46}
            width={300}
          />
        </div>
      </div>
      <div className="flex-1 min-w-[300px] max-w-[750px]">
        <Image
          alt="Logo Membresia flexible"
          src="/imgReunionUplin.png"
          width={750}
          height={450}
          className="drop-shadow-[-14px_14px_0_#502B7D]"
        />
      </div>
    </div>
  );
};

export default Presentation;
