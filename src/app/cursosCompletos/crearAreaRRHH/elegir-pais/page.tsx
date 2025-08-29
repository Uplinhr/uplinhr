import CountriesView from "@/views/countriesView";

const countriesMaterLider = [
  { name: "Argentina", code: "ar", href: "https://app.uplinhr.com/certificacion-herramientas-area-recursos-humanos" },
  { name: "Brasil", code: "br", href: "https://app.uplinhr.com/certificacion-herramientas-area-recursos-humanos" },
  { name: "Chile", code: "cl", href: "https://app.uplinhr.com/certificacion-herramientas-area-recursos-humanos" },
  { name: "Colombia", code: "co", href: "https://app.uplinhr.com/certificacion-herramientas-area-recursos-humanos" },
  { name: "Ecuador", code: "ec", href: "https://app.uplinhr.com/certificacion-herramientas-area-rrhh" },
  { name: "España", code: "es", href: "https://app.uplinhr.com/certificacion-herramientas-area-rrhh" },
  { name: "Estados Unidos", code: "us", href: "https://app.uplinhr.com/certificacion-herramientas-area-rrhh" },
  { name: "México", code: "mx", href: "https://app.uplinhr.com/certificacion-herramientas-area-recursos-humanos" },
];

const otherCountriesMaterLider = {
  name: "Otro país",
  icon: "/rdmIcon.svg",
  href: "https://app.uplinhr.com/certificacion-herramientas-area-rrhh",
};

const Page = () => {
  return (
    <CountriesView 
      countries={countriesMaterLider} 
      otherCountries={otherCountriesMaterLider} 
    />
  );
};

export default Page;
