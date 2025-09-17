import CountriesView from "@/views/countriesView";

const countriesMaterLider = [
  { name: "Argentina", code: "ar", href: "https://app.uplinhr.com/certificacion-neurohabilidades" },
  { name: "Brasil", code: "br", href: "https://app.uplinhr.com/certificacion-neurohabilidades" },
  { name: "Chile", code: "cl", href: "https://app.uplinhr.com/certificacion-neurohabilidades" },
  { name: "Colombia", code: "co", href: "https://app.uplinhr.com/certificacion-neurohabilidades" },
  { name: "Ecuador", code: "ec", href: "https://app.uplinhr.com/certificacion-en-neurohabilidades" },
  { name: "España", code: "es", href: "https://app.uplinhr.com/certificacion-en-neurohabilidades" },
  { name: "Estados Unidos", code: "us", href: "https://app.uplinhr.com/certificacion-en-neurohabilidades" },
  { name: "México", code: "mx", href: "https://app.uplinhr.com/certificacion-neurohabilidades" },
];

const otherCountriesMaterLider = {
  name: "Otro país",
  icon: "/rdmIcon.svg",
  href: "https://app.uplinhr.com/certificacion-en-neurohabilidades",
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
