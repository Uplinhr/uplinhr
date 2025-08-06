import CountriesView from "@/views/countriesView";

const countriesMaterLider = [
  { name: "Argentina", code: "ar", href: "https://app.uplinhr.com/certificacion-maternidad-y-liderazgo" },
  { name: "Brasil", code: "br", href: "https://app.uplinhr.com/certificacion-maternidad-y-liderazgo" },
  { name: "Chile", code: "cl", href: "https://app.uplinhr.com/certificacion-maternidad-y-liderazgo" },
  { name: "Colombia", code: "co", href: "https://app.uplinhr.com/certificacion-maternidad-y-liderazgo" },
  { name: "Ecuador", code: "ec", href: "https://app.uplinhr.com/certificacion-maternidad-liderazgo" },
  { name: "España", code: "es", href: "https://app.uplinhr.com/certificacion-maternidad-liderazgo" },
  { name: "Estados Unidos", code: "us", href: "https://app.uplinhr.com/certificacion-maternidad-liderazgo" },
  { name: "México", code: "mx", href: "https://app.uplinhr.com/certificacion-maternidad-y-liderazgo" },
];

const otherCountriesMaterLider = {
  name: "Otro país",
  icon: "/rdmIcon.svg",
  href: "https://app.uplinhr.com/certificacion-maternidad-liderazgo",
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
