"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFoundView() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#6C4099] to-[#502B7D] text-white px-6 text-center">
      <h1 className="text-7xl font-bold mb-4 tracking-tight">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        ¡Página no encontrada!
      </h2>
      <p className="text-sm md:text-base text-gray-300 max-w-md mb-6">
        Lo sentimos, la página que estás buscando no existe
        <br />
        Verificá la URL o volvé al inicio.
      </p>

      <button
        onClick={() => router.push("/")}
        className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-white text-[#5a3785] hover:bg-gray-100 transition-colors rounded-full font-medium"
      >
        <FiArrowLeft className="text-lg" />
        Volver al inicio
      </button>
    </div>
  );
}
