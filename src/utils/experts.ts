
export type Expert = {
  id: string;
  name: string;
  //role: string;
  tags: string[];
  bio: string;
  imageUrl: string;
};

export const experts: Expert[] = [
  {
    id: "people-analytics",
    name: "People Analytics e Inteligencia de Talento",
    tags: ["People Analytics", "Performance", "Analítica de Datos", "Dashboards de Talento"],
    bio: "Transforma datos de RR.HH. en decisiones estratégicas. Optimiza rendimiento, retención y gestión de talento con base en el análisis de información y la ciencia del comportamiento.",
    imageUrl: "/CO_1.png",
  },

  {
    id: "liderazgo",
    name: "Liderazgo, Coaching y Desarrollo de Equipos",
    tags: ["Liderazgo de Equipos", "Coaching", "Formación y Desarrollo", "Performance Management"],
    bio: "Fortalece las habilidades de liderazgo y maximiza el potencial de tus equipos. Implementamos programas de coaching, mentoría y desarrollo para líderes en todos los niveles.",
    imageUrl: "/CO_2.png",
  },
  {
    id: "talent-acquisition",
    name: "Talent Acquisition Estratégico",
    tags: ["Talent Acquisition", "Estrategias de Atracción", "Employer Branding", "Entrevistas Basadas en Competencias"],
    bio: "Diseña y ejecuta procesos de selección que atraen y retienen el mejor talento. Incluye el diseño de la experiencia del candidato y el uso de tecnologías para la captación.",
    imageUrl: "/CO_3.png",
  },
  {
    id: "diversidad-inclusion",
    name: "Diversidad, Inclusión y Cultura Organizacional",
    tags: ["Gestión de Personas", "Diversidad e Inclusión (D&I)", "Cultura y Cambio Organizacional", "Sostenibilidad"],
    bio: "Crea y promueve entornos de trabajo inclusivos y equitativos que impulsan el compromiso y el desarrollo sostenible.",
    imageUrl: "/CO_4.png",
  },
  {
    id: "automatizacion-ia",
    name: "Automatización e Inteligencia Artificial en RR.HH.",
    tags: ["Digitalización", "Automatización", "IA en Selección", "Sistemas de Gestión de Talento (HRIS)"],
    bio: "Digitaliza y automatiza procesos clave de selección y gestión de personas para liberar tiempo y aumentar la eficiencia operativa.",
    imageUrl: "/CO_5.png",
  },
  {
    id: "transformacion-cambio-organizacional",
    name: "Transformación y Cambio Organizacional",
    tags: ["Transformación Tecnológica", "Gestión del Cambio", "Diseño Organizacional"],
    bio: "Prepara tu organización para el futuro. Impulsa cambios tecnológicos y estructurales con un enfoque centrado en el cliente y en lo que mueve el negocio.",
    imageUrl: "/CO_6.png",
  },
  {
    id: "desarrollo-competencias",
    name: "Formación y Desarrollo de Competencias",
    tags: ["Planes de Carrera", "Upskilling", "Evaluación de Competencias", "Medición de Impacto de Formación"],
    bio: "Diseña rutas de aprendizaje efectivas y programas de capacitación basados en analítica para medir el impacto real en el desarrollo profesional y la empleabilidad.",
    imageUrl: "/CO_7.png",
  },
  {
    id: "legales-nomina-compensaciones",
    name: "Legales, Nómina y Compensaciones & Beneficios",
    tags: ["Nómina", "Legales Laborales", "Contrataciones Internacionales", "Compensaciones y Beneficios (C&B)"],
    bio: "Asegura el cumplimiento legal y la competitividad salarial. Asesoría en normativas laborales, estructuras de compensación y gestión de nómina eficiente.",
    imageUrl: "/CO_8.png",
  },
  {
    id: "estrategia-comercial",
    name: "Estrategia Comercial y Crecimiento de Negocio",
    tags: ["Liderazgo Comercial", "Escalado de Equipos de Ventas", "Retención de Clientes", "Performance Comercial"],
    bio: "Acelera el crecimiento de startups y equipos comerciales. Maximiza la retención de clientes y transforma las operaciones de ventas en unidades de crecimiento sostenido.",
    imageUrl: "/CO_9.png",
  },
  {
    id: "gestion-politicas-rrhh",
    name: "Gestión de Personas y Políticas de RR.HH.",
    tags: ["Gestión de Personas", "Políticas de RR.HH.", "Onboarding/Offboarding", "Manuales de Empleado"],
    bio: "Diseña e implementa políticas y procesos de RR.HH. que aseguran el buen funcionamiento de la gestión de personal y el cumplimiento interno.",
    imageUrl: "/CO_10.png",
  },
];
