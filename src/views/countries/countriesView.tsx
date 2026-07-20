"use client";

import React from "react";
import "flag-icons/css/flag-icons.min.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CountriesViewProps } from "@/interfaces/index";

export default function CountriesView({ countries, otherCountries }: CountriesViewProps) {
  return (
    <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-[#502B7D] to-[#6C4099]">
      <div className="w-full max-w-[1100px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <h1 className="text-center mb-8 text-white font-poppins text-[36px] font-normal">
          Selecciona tu país
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {countries.map((country) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              key={country.code || country.name}
            >
              <Link
                href={country.href}
                className="bg-white flex flex-col items-center justify-center p-4 rounded-[30px] border border-[#CDBADA] shadow-[0_2px_3px_0_rgba(0,0,0,0.25)] hover:bg-[#F5EFF9] transition-colors"
              >
                {country.code && (
                  <span className={`fi fi-${country.code} text-3xl mb-2`}></span>
                )}
                {!country.code && country.icon && (
                  <div className="w-8 h-8 mb-2 relative">
                    <Image
                      src={country.icon!}
                      alt={country.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                <span className="text-[#502B7D] font-poppins text-base font-normal text-center">
                  {country.name}
                </span>
              </Link>
            </motion.div>
          ))}

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full flex justify-center col-span-full"
          >
            <Link
              href={otherCountries.href}
              className="bg-white flex flex-col items-center justify-center p-4 rounded-[30px] border border-[#CDBADA] shadow-[0_2px_3px_0_rgba(0,0,0,0.25)] hover:bg-[#F5EFF9] transition-colors w-full md:max-w-[250px]"
            >
              <div className="w-8 h-8 mb-2 relative">
                <Image
                  src={otherCountries.icon!}
                  alt={otherCountries.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[#502B7D] font-poppins text-base font-normal text-center">
                {otherCountries.name}
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
