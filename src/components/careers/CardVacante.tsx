'use client';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineHomeWork } from 'react-icons/md';
import { Vacante } from '@/interfaces';

interface CardVacanteProps {
  vacante: Vacante;
}

const CardVacante = ({ vacante }: CardVacanteProps) => {
  return (
    <a
      href={vacante.enlace_formulario}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg border border-[#C2C2C8] shadow-md cursor-pointer transition-transform hover:scale-[1.02] max-w-[80%] mx-auto"
    >
      <div className="flex flex-col md:flex-row">
       
        <div className="p-6 md:w-[75%] border-b md:border-b-0 md:border-r border-[#c2c2c2] break-words">
          <h3 className="text-[#6C4099] font-bold text-lg md:text-xl">
            {vacante.nombre_puesto}
          </h3>
          {!vacante.es_anonimo && (
            <p className="text-[#6C4099] font-bold text-sm mt-1">
              {vacante.nombre_empresa}
            </p>
          )}
          <div
            className="text-black text-sm mt-2 break-words"
            style={{
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          >
            {vacante.descripcion_empleo}
          </div>
        </div>

        <div className="p-6 md:w-[25%] flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2">
            <FaLocationDot className="text-[#6C4099] flex-shrink-0" />
            <span className="text-sm">{vacante.ubicacion_empleo}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineHomeWork className="text-[#6C4099] flex-shrink-0" />
            <span className="text-sm">{vacante.modalidad_trabajo}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CardVacante;
