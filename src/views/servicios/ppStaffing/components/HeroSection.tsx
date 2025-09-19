import Image from 'next/image';
import { BiPhoneCall } from 'react-icons/bi'; 

const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 lg:flex items-center">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold">
            <span className="text-[#AF93CC]">
              People Partner
            </span> 
            <br /> 
            <span className="text-gray-800">
              Staffing
            </span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-lg">
            ¿Necesitas un experto para tu equipo de People pero no quieres sumar a alguien a nómina?
            Imagina tener a un profesional de Recursos Humanos 100% dedicado a tu equipo, con el conocimiento y la experiencia para impulsar tus proyectos estratégicos. Todo esto, sin el compromiso ni los costos de una contratación a largo plazo.
            El desafío de muchas empresas hoy no es solo encontrar talento, sino gestionarlo de forma eficiente y flexible. Los proyectos de alta prioridad, los picos de trabajo o la falta de un rol específico a tiempo completo, pueden detener el crecimiento y la innovación.
          </p>
          <div className="mt-6">
            <a 
              href="https://outlook.office365.com/book/ConectconUplin1@uplinhr.com/?ismsaljsauthenabled=true" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#502B7D] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white hover:text-[#502B7D] transition-colors"
            >
              <BiPhoneCall className="text-xl" />
              <span>Agendá una llamada</span>
            </a>
          </div>
        </div>
        
        <div className="lg:w-1/2 flex justify-center">
          
          <div className="relative w-[500px] h-[300px] rounded-lg shadow-xl border-4 border-[#AF93CC] overflow-hidden">
            <Image
              src="/PPS-landing.png"
              alt="People Partner Staffing"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


