import { Paquetes } from "@/utils/paquetes";
import { IoIosCheckmark } from "react-icons/io";

type Props = {
  paquetes: Paquetes
}

export function CardCreditos({ paquetes }: Props) {
  return (
    <div className="flex flex-col h-full rounded-lg shadow-md shadow-[#6C4099] p-6">
      {/* Discount Badge */}
      {paquetes.discount && (
        <span className="text-xs font-bold bg-[#F89A1C] text-white px-2 py-1 rounded self-center mb-2">
          {paquetes.discount}
        </span>
      )}

      {/* Bloque centrado */}
      <div className="flex flex-col items-center text-center flex-grow">
        <h2 className="text-xl font-semibold text-gray-800">{paquetes.title}</h2>
        <p className="text-sm text-gray-600 mb-4">{paquetes.description}</p>

        <div className="mb-4">
          {paquetes.oldPrice && (
            <p className="text-sm text-gray-400 line-through">
              USD {paquetes.oldPrice.toLocaleString()}
            </p>
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

      {/* Lista alineada a la izquierda */}
      <ul className="space-y-2 text-sm text-gray-700 text-left mt-auto">
        {paquetes.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <IoIosCheckmark className="w-4 h-4 text-purple-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}