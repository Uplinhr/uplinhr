import CountriesView from "@/views/countriesView";

const countriesMaterLider = [
  { name: "Argentina", code: "ar", href: "https://app.uplinhr.com/certificacion-liderar-con-proposito" },
  { name: "Brasil", code: "br", href: "https://app.uplinhr.com/certificacion-liderar-con-proposito" },
  { name: "Chile", code: "cl", href: "https://app.uplinhr.com/certificacion-liderar-con-proposito" },
  { name: "Colombia", code: "co", href: "https://app.uplinhr.com/certificacion-liderar-con-proposito" },
  { name: "Ecuador", code: "ec", href: "https://app.uplinhr.com/certificacion-liderar-c-proposito" },
  { name: "España", code: "es", href: "https://app.uplinhr.com/certificacion-liderar-c-proposito" },
  { name: "Estados Unidos", code: "us", href: "https://app.uplinhr.com/certificacion-liderar-c-proposito" },
  { name: "México", code: "mx", href: "https://app.uplinhr.com/certificacion-liderar-con-proposito" },
];

const otherCountriesMaterLider = {
  name: "Otro país",
  icon: "/rdmIcon.svg",
  href: "https://app.uplinhr.com/certificacion-liderar-c-proposito",
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
