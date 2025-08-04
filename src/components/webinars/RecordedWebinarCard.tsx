import Image from "next/image";
import Link from "next/link";
import { Webinar } from "@/interfaces";

interface Props {
  data: Webinar;
}

export default function RecordedWebinarCard({ data }: Props) {
  return (
    <div className="transform scale-[0.85] origin-top">
      <div className="p-4 rounded-[16px] shadow flex flex-col justify-between min-h-[380px] text-white bg-[linear-gradient(180deg,_#9B5FFF_0%,_#502B7D_99.99%)]  transition  duration-300  ease-in-out  hover:shadow-xl  hover:scale-105">
        <div className="flex flex-col gap-2 min-h-[120px]">
          <span className="text-xs font-bold uppercase px-2 py-1 w-fit rounded-[8px] bg-[linear-gradient(90deg,_#6941C6_0.96%,_#502B7D_100%)]">
            {data.tipo}
          </span>
          <h3 className="font-semibold text-[16px] md:text-[18px] line-clamp-3 whitespace-pre-line">
            {data.titulo}
          </h3>
        </div>

        <div className="flex flex-col gap-2 min-h-[100px] justify-between">
          <p className="text-[16px] md:text-[18px] font-semibold">
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

        <div className="flex flex-col gap-2 min-h-[80px] justify-end">
          <p className="text-[14px] md:text-[15px] font-normal">{data.fecha}</p>
          <Link href={data.link}>
            <button className="w-full h-[40px] px-4 rounded-[8px] border border-[#667085] bg-[#F5F5F5] font-semibold text-black text-sm text-center cursor-pointer transition-all duration-300 hover:text-white hover:bg-gradient-to-b hover:from-[#9B5FFF] hover:to-[#502B7D]">
              {" "}
              Ver gratis
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
