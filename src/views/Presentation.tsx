import Image from "next/image";
import Button from "@/components/Button/Button";

const Presentation = () => {
  return (
    <div className="bg-gradient-to-r from-[#6C4099] to-[#502B7D] flex flex-wrap gap-6 justify-center py-24">
      <div>
        <p className="font-poppins text-[16px] text-white font-bold text-left">
          RRHH Flexible para tu Empresa
        </p>
        <h1 className="font-poppins text-[40px] text-white font-bold text-left mb-2">
          La Primera Membresía <br />
          Flexible en Latam
        </h1>
        <p className="font-poppins text-[20px] text-white font-medium text-left mb-6">
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

 <Image
  alt="Logo Membresia flexible"
  src="/imgReunionUplin.png"
  width={650}
  height={350}
  className="drop-shadow-[-14px_14px_0_#502B7D]"
/>




    </div>
  );
};

export default Presentation;
