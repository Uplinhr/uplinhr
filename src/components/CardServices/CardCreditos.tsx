import { Paquetes } from "@/utils/paquetes";
import { IoIosCheckmark } from "react-icons/io";

type Props = {
  paquetes: Paquetes;
};

export function CardCreditos({ paquetes }: Props) {
  return (
    <div className="relative flex flex-col h-full rounded-lg shadow-md shadow-[#6C4099] p-6">
      {/* Discount Badge */}
      {paquetes.discount ? (
        <span className="absolute top-2 right-2 text-xs font-bold bg-[#F89A1C] text-white px-2 py-1 rounded">
          {paquetes.discount}
        </span>
      ) : (
        <div className="absolute top-2 right-2 w-[40px] h-[20px]" />
      )}

      {/* Bloque centrado */}
      <div className="flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold text-gray-800">{paquetes.title}</h2>
        <p className="text-sm text-gray-600 mb-4">{paquetes.description}</p>

        <div className="mb-4">
          {paquetes.oldPrice ? (
            <p className="text-sm text-gray-400 line-through min-h-[20px]">
              USD {paquetes.oldPrice.toLocaleString()}
            </p>
          ) : (
            <div className="min-h-[20px]" />
          )}

          <p className="text-2xl font-bold text-gray-800">
            USD {paquetes.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">+ impuestos</p>
        </div>

        <a
          href={paquetes.buttonLink}
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded mb-6 text-center"
        >
          {paquetes.buttonText}
        </a>
      </div>

      {/* Lista alineada y balanceada */}
      <ul className="flex-1 flex flex-col justify-start space-y-2 text-sm text-gray-700 text-left">
        {paquetes.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <IoIosCheckmark className="w-4 h-4 text-purple-600 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
