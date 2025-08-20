import CountriesView from "@/views/countriesView";

const countriesMaterLider = [
  { name: "Argentina", code: "ar", href: "https://app.uplinhr.com/certificacion-people-analytics" },
  { name: "Brasil", code: "br", href: "https://app.uplinhr.com/certificacion-people-analytics" },
  { name: "Chile", code: "cl", href: "https://app.uplinhr.com/certificacion-people-analytics" },
  { name: "Colombia", code: "co", href: "https://app.uplinhr.com/certificacion-people-analytics" },
  { name: "Ecuador", code: "ec", href: "https://app.uplinhr.com/certificacion-en-people-analytics" },
  { name: "España", code: "es", href: "https://app.uplinhr.com/certificacion-en-people-analytics" },
  { name: "Estados Unidos", code: "us", href: "https://app.uplinhr.com/certificacion-en-people-analytics" },
  { name: "México", code: "mx", href: "https://app.uplinhr.com/certificacion-people-analytics" },
];

const otherCountriesMaterLider = {
  name: "Otro país",
  icon: "/rdmIcon.svg",
  href: "https://app.uplinhr.com/certificacion-en-people-analytics",
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
