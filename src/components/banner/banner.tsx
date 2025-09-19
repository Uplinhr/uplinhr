import Image from "next/image"
import Button from "../Button/Button"

export function Banner() {
  return (
    <div className="bg-gradient-to-r from-[#BB9ECA] to-[#f4e4ff] rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto text-white">
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
    <div className="bg-gradient-to-r from-[#BB9ECA] to-[#f4e4ff] rounded-lg p-6 mb-6 flex flex-col max-w-6xl mx-auto text-white space-y-6">
      
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
