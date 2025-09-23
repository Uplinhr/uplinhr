import Button from "@/components/Button/Button";
import Needs from "@/views/Needs";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sandra Benitez",
      role: "Co-founder de Uplin",
      image: "/imgSandra.png",
      linkedin: "https://www.linkedin.com/in/sandra-ben%C3%ADtez-441370185/", // Reemplaza con el link real
    },
    {
      name: "Marisol Lopez",
      role: "Co-founder de Uplin",
      image: "/imgSol.png",
      linkedin:
        "https://www.linkedin.com/in/marisol-l%C3%B3pez-gonz%C3%A1lez92/", // Reemplaza con el link real
    },
  ];

  return (
    <div className="font-[Poppins]">
    
      <div className="px-4 sm:px-6 lg:px-10 mx-auto max-w-7xl">
        <section className="bg-[#502B7D] rounded-2xl p-6 sm:p-8 md:p-12 my-6 sm:my-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="w-full">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                Cuidá a las personas de tu equipo y ellos van a cuidar de tu
                negocio.
              </h1>
              <p className="text-white mt-4 sm:mt-6 text-base sm:text-lg font-light">
                La empatía, la escucha activa y la adaptabilidad son claves para
                una gestión de personas real y con impacto. En Uplin, las
                ponemos en el centro.
              </p>
            </div>

          
            <div className="aspect-video rounded-lg overflow-hidden mt-6 md:mt-0">
              <iframe
                src="https://www.youtube.com/embed/PJmeRJxUJQc?autoplay=0&mute=1&controls=1"
                className="w-full h-full"
                title="Video de Uplin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </div>

      <section className="py-5 px-4 sm:px-6 lg:px-10 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="relative flex justify-center order-2 md:order-1 px-0 md:pl-10 lg:pl-20">
            <Image
              alt="Decorative flower"
              height={80}
              width={476}
              src="/elementoGráfico.png"
              className="w-full max-w-md md:max-w-full"
            />
          </div>
          <div className="order-1 md:order-2 pr-0 md:pr-10 lg:pr-20">
            <p className="text-gray-800 mb-4 sm:mb-6">
              Uplin es una consejera que acompaña en la toma de decisiones,
              mostrando las mejores opciones con sus ventajas y desventajas.
            </p>
            <p className="text-gray-800 mb-4 sm:mb-6">
              Sabe que todo proceso requiere tomar decisiones, todas las
              decisiones requieren tiempo y toda vivencia genera experiencia y
              nos hace crecer.
            </p>
            <p className="text-gray-800 mb-4 sm:mb-6">
              Nosotras también hemos pasado por procesos que nos enseñaron y nos
              hicieron crecer y florecer como profesionales.
            </p>
            <p className="text-gray-800">
              Hoy nuestra experiencia y conocimiento nos permite poder acompañar
              a otros/as junto a emprendedores, ya que Uplin siempre apunta a
              que sus clientes nunca se sientan solos.
            </p>
          </div>
        </div>
      </section>

    
      <section className="py-12 sm:py-20 text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 sm:mb-12">
          Conocé nuestro equipo
        </h2>

        <div className=" grid md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4 sm:px-8 lg:px-16">
          {teamMembers.map((person, index) => (
            <div
              key={index}
              className="transform transition-transform duration-200 hover:scale-[1.03] bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative h-64 sm:h-96 w-full">
                {" "}
              
                <Image
                  alt={`${person.name}, ${person.role}`}
                  src={person.image}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 sm:p-6 flex justify-between items-end">
                <div>
                  <p className="font-bold text-base sm:text-lg text-gray-800">
                    {person.name}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {person.role}
                  </p>
                </div>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#502B7D] hover:text-[#6b4699] transition-colors"
                  aria-label={`Perfil de LinkedIn de ${person.name}`}
                >
                  <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <section className="py-10 px-4 sm:px-6">
        <Needs />
      </section>

      <section className="flex items-center justify-center my-10 sm:my-14 px-4">
        <div className="bg-white p-6 sm:p-10 md:p-16 rounded-xl shadow-lg max-w-4xl w-full text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            ¿Querés saber más?
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-10 mx-auto text-sm sm:text-[15px] max-w-2xl">
            Si estás liderando una startup, escalando tu equipo o buscando una
            forma más humana de gestionar el talento, estamos acá para
            acompañarte.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Button
              link="/servicios/membresias"
              tag="Descubrí nuestras membresías"
              mode={3}
              height={50}
              width={180}
            />

            <Button
              link="https://outlook.office.com/book/ConectconUplin1@uplinhr.com/?ismsaljsauthenabled"
              tag="Agenda una llamada inicial"
              mode={0}
              height={50}
              width={180}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
