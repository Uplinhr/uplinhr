import Image from "next/image";
import Link from "next/link";
import { Webinar } from "@/interfaces/index";

interface Props {
  data: Webinar;
}

export default function UpcomingWebinarCard({ data }: Props) {
  return (
    <div className="p-4 rounded-[16px] shadow flex flex-col justify-between bg-gradient-to-b from-purple-400 to-purple-900 min-h-[380px] text-white  transition  duration-300  ease-in-out  hover:shadow-xl  hover:scale-105">
      <div className="flex flex-col gap-2 min-h-[120px]">
        <span className="text-xs font-bold uppercase px-2 py-1 rounded-[8px] bg-gradient-to-r from-yellow-400 to-orange-500 w-fit min-h-[24px]">
          {data.tipo}
        </span>
        <h3 className="font-semibold text-[16px] md:text-[18px] line-clamp-3 whitespace-pre-line min-h-[90px]">
          {data.titulo}
        </h3>
      </div>

      <div className="flex flex-col gap-2 min-h-[100px] justify-between">
        <p className="text-[16px] md:text-[18px] font-semibold min-h-[25px]">
          Dirigido por: {data.dirigidoPor}
        </p>
        <div className="flex gap-2 min-h-[40px]">
          {data.imagenes.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`speaker-${idx}`}
              width={40}
              height={40}
              className="rounded-full object-cover bg-white border-2 border-white"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 min-h-[80px] justify-end mt-2">
        <p className="text-[14px] md:text-[15px] font-normal min-h-[24px]">
          {data.fecha}
        </p>
        <Link href={data.link}>
          <button className="w-full h-[40px] px-4 rounded-[8px] border border-[#667085] bg-[#F5F5F5] font-semibold text-black text-sm text-center cursor-pointer transition-colors duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-white">
            Ver en vivo
          </button>
        </Link>
      </div>
    </div>
  );
}
