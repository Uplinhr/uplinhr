"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="font-[Poppins] bg-white shadow-gray-300 shadow-md">
      <div className="container mx-auto px-10 py-3 ">
        
        <div className="flex justify-between items-center text-sm">
        
          <Link href="/" className="self-start">
            <Image
              src="/logoUplin.svg"
              alt="Logo Uplin"
              width={80}
              height={40}
              className="w-20 h-10 block"
            />
          </Link>

          <div className="hidden lg:flex gap-12 items-center">
            <a
              className="text-[#502B7D] hover:text-[#6b4699] transition-colors cursor-pointer"
              href="/quienes-somos"
            >
              Quienes Somos
            </a>
            <a
              className="text-[#502B7D] hover:text-[#6b4699] transition-colors cursor-pointer"
              href="/planes"
            >
              Planes
            </a>
            <a
              className="text-[#502B7D] hover:text-[#6b4699] transition-colors cursor-pointer"
              href="/academy"
            >
              Uplin Academy
            </a>
            
            <a href="https://www.app.uplinhr.com/contacto" className="border-[#502B7D] border-2 px-5 py-1 rounded-lg hover:bg-[#502B7D] hover:text-white transition-colors cursor-pointer">
              Contacto
            </a>
          </div>

         
          <button
            className="lg:hidden text-[#502B7D] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3">
            <a
              href="/quienes-somos"
              className="block text-[#502B7D] hover:text-[#6b4699] py-2 px-4 hover:bg-[#502B7D]/10 rounded transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Quienes Somos
            </a>
            <a
              href="/planes"
              className="block text-[#502B7D] hover:text-[#6b4699] py-2 px-4 hover:bg-[#502B7D]/10 rounded transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Planes
            </a>
            
            <a
              href="/academy"
              className="block text-[#502B7D] hover:text-[#6b4699] py-2 px-4 hover:bg-[#502B7D]/10 rounded transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Uplin Academy
            </a>

            <a
              href="https://www.app.uplinhr.com/contacto"
              className="inline-block border-[#502B7D] border-2 px-5 py-1 rounded-lg hover:bg-[#502B7D] hover:text-white transition-colors mt-2 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
