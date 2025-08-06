export interface IPlan {
  plan: string;
  description: string;
  price: string;
  includes: string[];
  excludes: string[];
  showTaxes?: boolean;
  isCustom?: boolean;
  link: string;
}
export interface IPlanCardProps extends IPlan {
  className?: string;
  onClick?: () => void;
}
export interface QaItem {
  question: string;
  answer: string | string[];
  initialExpanded?: boolean;
}
export interface SolutionProps{
  icon: string;
  title: string;
  description: string;
}

export interface IOption {
  id: string;
  text: string;
  response?: string;
  subOptions?: IOption[]; 
}

export interface Webinar {
  id: string;
  tipo: "en vivo" | "grabado";
  titulo: string;
  dirigidoPor: string;
  fecha: string;
  imagenes: string[];
  link: string;          
}
export interface Country {
  name: string;
  code?: string;
  href: string;
  icon?: string;
}

export interface CountriesViewProps {
  countries: Country[];
  otherCountries: Country;
}


