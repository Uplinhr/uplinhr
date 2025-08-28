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


export interface CardCursoProps {
  bannerImg: string;
  titulo: string;
  descripcion: string;
  direccion: string;
  imgPersona: string;
  link: string;
}

export interface Vacante {
  nombre_empresa: string;
  es_anonimo: boolean;
  nombre_puesto: string;
  modalidad_trabajo: string;
  descripcion_empleo: string;
  ubicacion_empleo: string;
  enlace_formulario: string;
  area: string
}
export interface Plan {
  id?: number;
  nombre: string;
  creditos_mes: number;
  meses_cred: number;
  horas_cons: number;
  precio: string;
  custom: boolean;
  active?: boolean;
  fecha_alta?: string;
  ultima_mod?: string;
}

export interface Creditos {
  id: number | null;
  vencimiento: string | null;
  tipo_credito: string | null;
  cantidad: number | null;
  fecha_alta: string | null;
  id_usuario: number | null;
}

export interface Consultorias {
  id: number | null;
  fecha_alta?: string | null;
  horas_totales: number | null;
  horas_restantes: number | null;
  vencimiento: string | null;
  id_usuario?: number | null;
}
export interface Busqueda {
  id: number;
  fecha_alta: string | null;
  ultima_mod: string | null;
  info_busqueda: string | null;
  creditos_usados: number | null;
  observaciones: string | null;
  estado: string | null;
  id_cred: number | null;
  id_tipo: number | null;
  id_proceso: number | null;
}

export interface Empresa {
  id: number | null;
  nombre: string | null;
  email: string | null;
  active: boolean;        
  fecha_alta: string | null;
  ultima_mod: string | null;
  id_usuario: number | null;
}

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  active?: boolean;
  fecha_alta?: string;
  id_plan?: number | null;
  plan?: Plan;
  creditos?: Creditos[];
  consultorias?: Consultorias;
  empresas?: Empresa;
  num_celular?: string;
}

export interface LoginRequest {
  email: string;
  contrasenia: string;
}

export interface LoginData {
  user: User;
  token: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}
