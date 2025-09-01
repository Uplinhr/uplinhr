import CountriesView from "@/views/countriesView";

const countriesMaterLider = [
  { name: "Argentina", code: "ar", href: "https://app.uplinhr.com/certificacion-offboarding-humano-y-estrategico" },
  { name: "Brasil", code: "br", href: "https://app.uplinhr.com/certificacion-offboarding-humano-y-estrategico" },
  { name: "Chile", code: "cl", href: "https://app.uplinhr.com/certificacion-offboarding-humano-y-estrategico" },
  { name: "Colombia", code: "co", href: "https://app.uplinhr.com/certificacion-offboarding-humano-y-estrategico" },
  { name: "Ecuador", code: "ec", href: "https://app.uplinhr.com/certificacion-offboarding-humano-estrategico" },
  { name: "España", code: "es", href: "https://app.uplinhr.com/certificacion-offboarding-humano-estrategico" },
  { name: "Estados Unidos", code: "us", href: "https://app.uplinhr.com/certificacion-offboarding-humano-estrategico" },
  { name: "México", code: "mx", href: "https://app.uplinhr.com/certificacion-offboarding-humano-y-estrategico" },
];

const otherCountriesMaterLider = {
  name: "Otro país",
  icon: "/rdmIcon.svg",
  href: "https://app.uplinhr.com/certificacion-offboarding-humano-estrategico",
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
