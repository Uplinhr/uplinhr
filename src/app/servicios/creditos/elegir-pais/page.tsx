import CountriesView from "@/views/countriesView";

const countriesMaterLider = [
  { name: "Argentina", code: "ar", href: "https://app.uplinhr.com/adquirir-creditos-busqueda" },
  { name: "Brasil", code: "br", href: "https://app.uplinhr.com/adquirir-creditos-busqueda" },
  { name: "Chile", code: "cl", href: "https://app.uplinhr.com/adquirir-creditos-busqueda" },
  { name: "Colombia", code: "co", href: "https://app.uplinhr.com/adquirir-creditos-busqueda" },
  { name: "Ecuador", code: "ec", href: "https://app.uplinhr.com/adquiere-creditos-busqueda" },
  { name: "España", code: "es", href: "https://app.uplinhr.com/adquiere-creditos-busqueda" },
  { name: "Estados Unidos", code: "us", href: "https://app.uplinhr.com/adquiere-creditos-busqueda" },
  { name: "México", code: "mx", href: "https://app.uplinhr.com/certificacion-herramientas-area-recursos-humanos" },
];

const otherCountriesMaterLider = {
  name: "Otro país",
  icon: "/rdmIcon.svg",
  href: "https://app.uplinhr.com/adquiere-creditos-busqueda",
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