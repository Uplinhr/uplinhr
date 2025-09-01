import Image from "next/image";
import { CardCursoProps } from "@/interfaces/index";

export const CardCurso = ({
  bannerImg,
  titulo,
  descripcion,
  direccion,
  imgPersona,
  link,
}: CardCursoProps) => {
  return (
    <div className="font-poppins max-w-[280px] mx-auto hover:scale-[1.02] transition-transform duration-300 h-full">
      <div className="rounded-[16px] border border-[#6C4099] text-white relative bg-gradient-to-b from-[#502B7D] to-[#9971EA] hover:shadow-lg hover:shadow-[#9971EA]/30 transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative w-full h-[120px] flex-shrink-0">
          <Image
            src={bannerImg}
            alt={titulo}
            fill
            className="object-cover w-full"
            quality={100}
            priority
            style={{ objectPosition: "top" }}
          />
        </div>

        <div className="p-3 md:p-4 flex flex-col flex-grow">
          <div className="flex flex-col flex-grow space-y-2">
            <h2 className="text-lg md:text-xl font-bold break-words">
              {titulo}
            </h2>
            <p className="text-xs italic md:text-sm flex-grow overflow-y-auto">
              {descripcion}
            </p>
            <p className="text-xs md:text-sm font-semibold">{direccion}</p>
          </div>

          <div className="flex items-center gap-2 mb-3 mt-4">
            {imgPersona.map((img, index) => (
              <div
                key={index}
                className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white flex-shrink-0"
              >
                <Image
                  src={img}
                  alt={`${direccion}-${index}`}
                  fill
                  className="object-cover bg-white"
                />
              </div>
            ))}
          </div>

          <a href={link} className="block w-full mt-auto">
            <button className="cursor-pointer w-full py-1.5 md:py-2 rounded-[8px] border border-[white] font-medium bg-gradient-to-r from-[#FF2828] to-[#F89A1C] text-[white] text-xs md:text-sm hover:bg-gradient-to-r hover:from-[#F89A1C] hover:to-[#FF2828] hover:shadow-[0_0_10px_2px_rgba(255,200,0,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              Descubrir más
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
