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
  imgPersona: string[];
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
  id?: string;
  nombre: string;
  creditos_mes: number;
  meses_cred: number;
  horas_cons: number;
  precio: string;
  custom: boolean;
  active?: boolean;
  features?: any;
  fecha_alta?: string;
  ultima_mod?: string;
}

export interface Creditos {
  id: string | null;
  vencimiento: string | null;
  tipo_credito: string | null;
  cantidad: number | null;
  fecha_alta: string | null;
  id_usuario: string | null;
  busquedas?: Busqueda[];
}

export interface Consultoria {
  id: string;
  fecha_alta: string;       
  horas_totales: number;
  horas_restantes: number;
  vencimiento: string;      
  id_usuario: string;
  consultas: Consulta[];
}
export interface Consulta {
  id: string;
  fecha_alta: string;    
  ultima_mod: string;       
  cantidad_horas: number;
  id_consultoria: string;
  estado: string;
  comentarios: string;
  observaciones: string | null;
  usuario?: User;
}
export interface Busqueda {
  id: string;
  fecha_alta: string | null;
  ultima_mod: string | null;
  info_busqueda: string | null;
  creditos_usados: number | null;
  observaciones: string | null;
  estado: string | null;
  id_cred: string | null;
  id_tipo: string | null;
  id_proceso: string | null;
  usuario?: User;
}

export interface Empresa {
  id: string | null;
  nombre: string;
  nombre_fantasia: string;
  cuit: string;
  condicion_iva: string;
  tipo_societario: string;
  actividad_principal: string;
  domicilio_legal_calle_numero: string;
  domicilio_legal_ciudad: string;
  domicilio_legal_pais: string;
  codigo_postal: string;
  email: string;
  active: boolean;
  fecha_alta: string | null;
  ultima_mod: string | null;
  id_usuario: string;
}


export interface UserProfile {
  id?: string;
  userId?: string;
  linkedinUrl?: string;
  country?: string;
}

export interface CompanyProfile {
  id?: string;
  userId?: string;
  companyName?: string;
  website?: string;
  companyEmail?: string;
  companyPhone?: string;
  address?: string;
  taxId?: string;
  country?: string;
}

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  emailVerified?: boolean;
  rol: string;
  active?: boolean;
  fecha_alta?: string;
  id_plan?: string | null;
  plan?: Plan;
  creditos?: Creditos[];
  consultorias?: Consultoria;
  empresas?: Empresa;
  profile?: UserProfile;
  company?: CompanyProfile;
  num_celular?: string;
  pictureUrl?: string | null;
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

export interface ValidateTokenResponse {
  message: string;
  statusCode: number;
}
export interface ResetPasswordResponse {
  message: string;
  statusCode: number;
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
  resetPassword: (token: string, password: string) => Promise<ResetPasswordResponse>;
  validateToken: (token: string) => Promise<ValidateTokenResponse>;
  forgotPassword: (email: string) => Promise<void>;
}

export interface RenovarPlan {
  id_plan: string,
  id_usuario: string
}
export interface compraCreditos{
  medio_pago:string,
  costo: number,
  observaciones:string,
  cantidad:number,
  vencimiento:string,
  id_usuario:string
}

export interface MembershipPlan {
  id: string;
  code: string;
  name: string;
  priceMonthly: number;
  currency: string;
  creditsPerMonth: number;
  rolloverMonths: number;
  benefits: any;
  isActive: boolean;
  mpProductId?: string;
  paypalPlanId?: string;
  createdAt?: string;
  updatedAt?: string;
}