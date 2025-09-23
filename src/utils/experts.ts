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
    id: "kelly",
    name: "Kelly Gómez",
    role: "Estrategia de Recursos Humanos",
    tags: ["Coaching", "Liderazgo de equipos", "Talent Acquisition", "Performance", "People Analytics"],
    bio: "Líder en RR.HH. con experiencia en gestión de talento y cumplimiento laboral. Su enfoque se centra en construir equipos de alto rendimiento y fomentar culturas inclusivas basadas en datos.",
    imageUrl: "/con-kelly.png",
    linkedinUrl: "https://www.linkedin.com/in/kelly-g%C3%B3mez-a13973148/",
  },
  {
    id: "karry",
    name: "Karry Marmolejo",
    role: "People Analytics e Inteligencia de Talento",
    tags: ["Digitalización y automatización", "Performance", "People Analytics"],
    bio: "Apasionada por los datos y la tecnología, optimiza el rendimiento y la gestión del talento con un enfoque analítico y humano.",
    imageUrl: "/con-karry.png",
    linkedinUrl: "https://www.linkedin.com/in/karry-marmolejo-people-analytics/",
  },
  {
    id: "cecilia",
    name: "Cecilia Prado",
    role: "Transformación Organizacional y Tecnológica",
    tags: ["Contrataciones internacionales", "Performance", "Coaching", "Liderazgo de equipos", "Legales"],
    bio: "Profesional dinámica que impulsa transformaciones tecnológicas y organizacionales con foco en lo que mueve el negocio con un enfoque pragmático y centrado en el cliente.",
    imageUrl: "/con-ceci.png",
    linkedinUrl: "https://www.linkedin.com/in/ceciliaprado/",
  },
  {
    id: "adriana",
    name: "Adriana López Galvis",
    role: "Formación y Desarrollo de Talento",
    tags: ["Coaching", "Formación y desarrollo", "Talent Acquisition", "Liderazgo de equipos", "People Analytics"],
    bio: "Más de 12 años de experiencia acelerando el crecimiento de startups, maximizando la retención de clientes y escalando equipos.",
    imageUrl: "/con-adri.png",
    linkedinUrl: "https://www.linkedin.com/in/adrianalopezgalvis/",
  },
];
