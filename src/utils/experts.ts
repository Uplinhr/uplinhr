
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
    name: "People analytics e inteligencia de talento",
    tags: ["People analytics", "Performance", "Analítica de datos", "Dashboards de talento"],
    bio: "Transforma datos de RR.HH. en decisiones estratégicas. Optimiza rendimiento, retención y gestión de talento con base en el análisis de información y la ciencia del comportamiento.",
    imageUrl: "/CO_1.png",
  },

  {
    id: "liderazgo",
    name: "Liderazgo, coaching y desarrollo de equipos",
    tags: ["Liderazgo de equipos", "Coaching", "Formación y desarrollo", "Performance management"],
    bio: "Fortalece las habilidades de liderazgo y maximiza el potencial de tus equipos. Implementamos programas de coaching, mentoría y desarrollo para líderes en todos los niveles.",
    imageUrl: "/CO_2.png",
  },
  {
    id: "talent-acquisition",
    name: "Talent acquisition estratégico",
    tags: ["Talent acquisition", "Estrategias de atracción", "Employer branding", "Entrevistas basadas en competencias"],
    bio: "Diseña y ejecuta procesos de selección que atraen y retienen el mejor talento. Incluye el diseño de la experiencia del candidato y el uso de tecnologías para la captación.",
    imageUrl: "/CO_3.png",
  },
  {
    id: "diversidad-inclusion",
    name: "Diversidad, inclusión y cultura organizacional",
    tags: ["Gestión de personas", "Diversidad e inclusión (D&I)", "Cultura y cambio organizacional", "Sostenibilidad"],
    bio: "Crea y promueve entornos de trabajo inclusivos y equitativos que impulsan el compromiso y el desarrollo sostenible.",
    imageUrl: "/CO_4.png",
  },
  {
    id: "automatizacion-ia",
    name: "Automatización e inteligencia artificial en RR.HH.",
    tags: ["Digitalización", "Automatización", "IA en selección", "Sistemas de gestión de talento (HRIS)"],
    bio: "Digitaliza y automatiza procesos clave de selección y gestión de personas para liberar tiempo y aumentar la eficiencia operativa.",
    imageUrl: "/CO_5.png",
  },
  {
    id: "transformacion-cambio-organizacional",
    name: "Transformación y cambio organizacional",
    tags: ["Transformación tecnológica", "Gestión del cambio", "Diseño organizacional"],
    bio: "Prepara tu organización para el futuro. Impulsa cambios tecnológicos y estructurales con un enfoque centrado en el cliente y en lo que mueve el negocio.",
    imageUrl: "/CO_6.png",
  },
  {
    id: "desarrollo-competencias",
    name: "Formación y desarrollo de competencias",
    tags: ["Planes de carrera", "Upskilling", "Evaluación de competencias", "Medición de impacto de formación"],
    bio: "Diseña rutas de aprendizaje efectivas y programas de capacitación basados en analítica para medir el impacto real en el desarrollo profesional y la empleabilidad.",
    imageUrl: "/CO_7.png",
  },
  {
    id: "legales-nomina-compensaciones",
    name: "Legales, nómina y compensaciones & beneficios",
    tags: ["Nómina", "Legales laborales", "Contrataciones internacionales", "Compensaciones y beneficios (C&B)"],
    bio: "Asegura el cumplimiento legal y la competitividad salarial. Asesoría en normativas laborales, estructuras de compensación y gestión de nómina eficiente.",
    imageUrl: "/CO_8.png",
  },
  {
    id: "estrategia-comercial",
    name: "Estrategia comercial y crecimiento de negocio",
    tags: ["Liderazgo comercial", "Escalado de equipos de ventas", "Retención de clientes", "Performance comercial"],
    bio: "Acelera el crecimiento de startups y equipos comerciales. Maximiza la retención de clientes y transforma las operaciones de ventas en unidades de crecimiento sostenido.",
    imageUrl: "/CO_9.png",
  },
  {
    id: "gestion-politicas-rrhh",
    name: "Gestión de personas y políticas de RR.HH.",
    tags: ["Gestión de personas", "Políticas de RR.HH.", "Onboarding/offboarding", "Manuales de empleado"],
    bio: "Diseña e implementa políticas y procesos de RR.HH. que aseguran el buen funcionamiento de la gestión de personal y el cumplimiento interno.",
    imageUrl: "/CO_10.png",
  },
];
