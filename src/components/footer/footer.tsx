import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#502B7D] to-[#6C4099] text-white py-12 px-4 sm:px-6 lg:px-8 font-[Poppins] ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            alt="Uplin logo"
            src="/logoUplinFooter.svg"
            width={50}
            height={50}
          />
          <p className="text-xs tracking-wide font-medium">
            La Primera Membresía de HR flexible en Latinoamérica
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-sm">Enlaces Esenciales</h3>
          <ul className="space-y-2 text-xs tracking-wider">
            <li>
              <a className="hover:underline" href="/politicas-privacidad">
                Política de privacidad
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/terminos-condiciones">
                Términos y condiciones
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/preguntas-frecuentes">
                Preguntas frecuentes (FAQ)
              </a>
            </li>
            <li>
              <a className="hover:underline" href="https://www.uplinhr.com/fgsdf3254h">
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-sm">Síguenos</h3>
          <div className="flex space-x-4">
            <a
              className="text-white hover:text-gray-300"
              href="https://www.linkedin.com/company/uplin/posts/?feedView=all"
            >
              <i className="fab fa-linkedin-in text-xl">
                <FaLinkedinIn />{" "}
              </i>
            </a>
            <a className="text-white hover:text-gray-300" href="#">
              <i className="fab fa-facebook-f text-xl">
                <FaFacebookF />{" "}
              </i>
            </a>
            <a
              className="text-white hover:text-gray-300"
              href="https://www.instagram.com/uplinhr/"
            >
              <i className="fab fa-instagram text-xl">
                <FaInstagram />{" "}
              </i>
            </a>
            <div>
              <p className="text-sm">
                <a
                  className="hover:underline"
                  href="mailto:contacto@uplinhr.com"
                >
                  contacto@uplinhr.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white">
        <p className="text-center text-xs font-semibold">
          © 2025 Uplin. Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
