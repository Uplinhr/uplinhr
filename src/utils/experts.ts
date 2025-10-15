// data/experts.ts
export type Expert = {
  id: string;
  name: string;
  role: string;
  tags: string[];
  bio: string;
  imageUrl: string;
  linkedinUrl?: string;
};

export const experts: Expert[] = [
  {
    id: "melisa",
    name: "Melisa Restrepo",
    role: "Liderazgo Comercial y Crecimiento de Equipos",
    tags: ["Coaching", "Liderazgo de equipos", "Formación y desarrollo", "Performance"],
    bio: "Coach y mentora con más de 12 años de experiencia acelerando el crecimiento de startups. Melisa es especialista en escalar equipos de ventas y maximizar la retención de clientes, transformando operaciones comerciales en verdaderas unidades de crecimiento.",
    imageUrl: "/con-melisa.png",
    linkedinUrl: "https://www.linkedin.com/in/melisarestrepomesa/",
  },

  {
    id: "karry",
    name: "Karry Marmolejo",
    role: "People Analytics e Inteligencia de Talento",
    tags: ["Digitalización y automatización", "Performance", "People Analytics"],
    bio: "Apasionada por los datos y la tecnología, Karry utiliza su experiencia en People Analytics para optimizar el rendimiento y la gestión del talento. Su enfoque analítico, basado en ciencias del comportamiento, permite tomar decisiones estratégicas que impactan positivamente en las personas y el negocio.",
    imageUrl: "/con-karry.png",
    linkedinUrl: "https://www.linkedin.com/in/karry-marmolejo-people-analytics/",
  },
  {
    id: "cecilia",
    name: "Cecilia Prado",
    role: "Transformación Organizacional y Tecnológica",
    tags: ["Contrataciones internacionales", "Performance", "Coaching", "Liderazgo de equipos", "Legales"],
    bio: "Cecilia es una profesional dinámica que impulsa transformaciones tecnológicas y organizacionales en diversos sectores. Experta en construir alianzas en entornos globales y de alto crecimiento, se enfoca en lo que realmente mueve el negocio hacia adelante con un enfoque pragmático y centrado en el cliente.",
    imageUrl: "/con-ceci.png",
    linkedinUrl: "https://www.linkedin.com/in/ceciliaprado/",
  },
  {
    id: "adriana",
    name: "Adriana López Galvis",
    role: "Formación y Desarrollo de Talento",
    tags: ["Coaching", "Formación y desarrollo", "Talent Acquisition", "Seleccion", "Liderazgo de equipos", "People Analytics"],
    bio: "Profesional especializada en el desarrollo de competencias y la empleabilidad. Adriana integra la analítica de datos para diseñar rutas de aprendizaje efectivas y medir el impacto de la capacitación. Acompaña a personas y equipos en su crecimiento, acelerando la inserción laboral y el desarrollo profesional.",
    imageUrl: "/con-adri.png",
    linkedinUrl: "https://www.linkedin.com/in/adrianalopezgalvis/",
  },
];
