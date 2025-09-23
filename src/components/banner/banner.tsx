import Image from "next/image"
import Button from "../Button/Button"

export function Banner() {
  return (
    <div className="bg-gradient-to-r from-[#8F68AC] to-[#CDBADA] rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto text-white">
      {/* Text Section */}
      <div className="flex items-center gap-4">
        {/* Imagen */}
        <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/llamada.jpg" 
            alt="Asesor especialista"
            fill
            className="object-cover"
          />
        </div>

        {/* Texts */}
        <div>
          <h2 className="text-lg font-semibold">
            ¿Necesitás ayuda antes de iniciar?
          </h2>
          <p className="text-sm text-white/90">
            Comunicate gratis con nuestro equipo especializado.  
            ¡Te están esperando!
          </p>
        </div>
      </div>

      {/* Button */}
      <Button
            link="https://outlook.office365.com/book/ConectconUplin1@uplinhr.com/?ismsaljsauthenabled=true"
            tag="Agendá una llamada"
            mode={3}
            height={50}
            width={250}
          />
    </div>
  )
}

export function Banner2() {
  return (
    <div className="bg-gradient-to-r from-[#8F68AC] to-[#CDBADA] rounded-lg p-6 mb-6 flex flex-col max-w-6xl mx-auto text-white space-y-6">
      
      {/* Fila con imagen, textos y botón */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
        {/* Imagen + textos */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/llamada.jpg" 
              alt="Asesor especialista"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              ¿Necesitás ayuda antes de iniciar?
            </h2>
            <p className="text-sm text-white/90">
              Comunicate gratis con nuestro equipo especializado.  
              ¡Te están esperando!
            </p>
          </div>
        </div>

        {/* Botón */}
        <Button
          link="https://outlook.office365.com/book/ConectconUplin1@uplinhr.com/?ismsaljsauthenabled=true"
          tag="Agendá una llamada"
          mode={3}
          height={50}
          width={250}
        />
      </div>

      {/* Texto inferior */}
      <div className="text-center">
        <h3 className="text-base md:text-sm font-medium">
          “Transformá tu forma de reclutar. Con Uplin pagás solo por lo que necesitás y hacés crecer tu equipo de manera inteligente.”
        </h3>
      </div>
    </div>
  );
}

export function Banner3() {
  return (
    <div className="bg-gradient-to-r from-[#8F68AC] to-[#CDBADA] rounded-lg p-6 mb-6 flex flex-col max-w-6xl mx-auto text-white space-y-6">
      <h2 className="text-center text-[20px] font-semibold text-[#502B7D]">El futuro del trabajo es flexible</h2>
      <h1 className="font-poppins text-[28px] font-semibold text-center">
          <span className="text-[#ffffff]">Lidera con agilidad.</span>
          <br />
          <span className="text-[#ffffff]">Gestiona con</span>{" "}
          <span className="text-[#502B7D]">UPLIN</span>
      </h1>
      <p className="text-base text-center md:text-sm font-regular">No dejes que la rigidez de los modelos tradicionales detenga tu crecimiento. Conecta con el talento que necesitas, cuando lo necesitas.</p>
      <h2 className="text-lg text-center text-[#502B7D] font-medium">
              ¿Necesitás ayuda antes de iniciar?
            </h2>
      {/* Botón */}
        <Button
          link="https://outlook.office365.com/book/ConectconUplin1@uplinhr.com/?ismsaljsauthenabled=true"
          tag="Agendá una llamada"
          mode={3}
          height={50}
          width={250}
        />
    </div>
  );
}