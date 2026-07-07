import { CategoriaBiblioteca } from "@/interfaces";

// ============================================================================
//  BIBLIOTECA UPLIN — Datos estáticos
//  Los recursos no viven en una BD: se editan a mano acá.
//
//  Para agregar un recurso nuevo:
//   1. Ubicá su categoría en el array `categorias`.
//   2. Agregá un objeto al array `recursos` de esa categoría.
//   3. Si está disponible → poné `href` (y `descarga`/`externo` según el caso).
//      Si todavía no → poné `locked: true` y omití el `href`.
//
//  🔧 Los href de PDFs son placeholders: reemplazá por el link real
//     (archivo en /public o link de Google Drive) cuando lo tengas.
// ============================================================================

export const categorias: CategoriaBiblioteca[] = [
  {
    slug: "reportes",
    titulo: "Reportes estratégicos",
    subtitulo: "1 recurso",
    recursos: [
      {
        id: "tendencias-reclutamiento-2026",
        titulo: "Tendencias de Reclutamiento 2026",
        descripcion:
          "Datos verificados, benchmarks reales y señales críticas para founders y líderes de RR.HH. en Latinoamérica.",
        tipo: "pdf",
        meta: "14 págs · 2.4 MB",
        href: "/biblioteca/tendencias-reclutamiento-2026.pdf", // 🔧 reemplazar
        descarga: true,
      },
    ],
  },
  {
    slug: "webinars",
    titulo: "Webinars grabados",
    subtitulo: "2 recursos",
    recursos: [
      {
        id: "startups-liderazgo-femenino",
        titulo: "Startups más fuertes: liderazgo femenino desde el inicio",
        descripcion:
          "Marisol López y Sandra Benítez, fundadoras de Uplin, analizan la brecha de liderazgo en early stage y las acciones concretas para construir organizaciones más diversas.",
        tipo: "video",
        meta: "45 min",
        href: "https://youtu.be/Iee70ZJ1cXw",
        externo: true,
      },
      {
        id: "reforma-laboral-colombia-2466",
        titulo: "Reforma Laboral Colombia: estrategias de adaptación a la Ley 2466",
        descripcion:
          "Sandra Benítez y Santiago Beltrán analizan las implicaciones de la Ley 2466 para empresas con más de 100 empleados y las acciones concretas para cumplir antes de junio 2026.",
        tipo: "video",
        meta: "60 min",
        href: "https://youtu.be/D7iyKy5OP4Y",
        externo: true,
      },
    ],
  },
  {
    slug: "plantillas",
    titulo: "Plantillas accionables",
    subtitulo: "4 próximos lanzamientos",
    recursos: [
      {
        id: "evaluacion-desempeno-360",
        titulo: "Evaluación de desempeño 360°",
        descripcion:
          "Matriz lista para usar con criterios, escalas y guía de feedback. Adaptable a equipos de cualquier tamaño.",
        tipo: "xlsx",
        locked: true,
      },
      {
        id: "checklist-onboarding",
        titulo: "Checklist completo de onboarding",
        descripcion:
          "35 puntos críticos para los primeros 90 días. Desde el día -1 hasta el ramp-up completo del nuevo hire.",
        tipo: "pdf",
        locked: true,
      },
      {
        id: "plan-carrera-growth-path",
        titulo: "Plan de carrera y growth path",
        descripcion:
          "Template Notion para mapear el crecimiento de cada miembro del equipo con hitos, skills y proyectos clave.",
        tipo: "doc",
        locked: true,
      },
      {
        id: "sistema-okrs-trimestrales",
        titulo: "Sistema de OKRs trimestrales",
        descripcion:
          "Framework completo para definir, trackear y revisar OKRs. Incluye plantilla, ejemplos por área y guía de cadencia.",
        tipo: "xlsx",
        locked: true,
      },
    ],
  },
  {
    slug: "guias",
    titulo: "Guías descargables",
    subtitulo: "4 recursos · 1 disponible",
    recursos: [
      {
        id: "guia-entrevistas-inclusivas",
        titulo:
          "Preguntas inclusivas y buenas prácticas para entrevistas a personas con discapacidad",
        descripcion:
          "Guía práctica para conducir entrevistas inclusivas: qué preguntar, qué evitar y cómo crear un proceso de selección verdaderamente accesible. Alineado con la Ley 2466 de Colombia.",
        tipo: "pdf",
        meta: "Guía práctica",
        href: "/biblioteca/guia-entrevistas-inclusivas.pdf", // 🔧 reemplazar
        descarga: true,
      },
      {
        id: "guia-hiring-startups",
        titulo: "Guía de hiring para startups",
        descripcion:
          "El playbook completo: desde definir el rol hasta cerrar la oferta. Incluye scorecards, scripts y red flags.",
        tipo: "pdf",
        locked: true,
      },
      {
        id: "retencion-talento-clave",
        titulo: "Retención de talento clave",
        descripcion:
          "Por qué se va la gente buena (no es solo plata) y los 7 movimientos que reducen rotación en equipos en crecimiento.",
        tipo: "pdf",
        locked: true,
      },
      {
        id: "frameworks-cultura-organizacional",
        titulo: "Frameworks de cultura organizacional",
        descripcion:
          "Cómo diseñar, comunicar y mantener una cultura coherente cuando el equipo pasa de 10 a 50 personas.",
        tipo: "doc",
        locked: true,
      },
    ],
  },
];

export const totalRecursos = categorias.reduce(
  (acc, c) => acc + c.recursos.length,
  0,
);

export const conteoPorCategoria = categorias.map((c) => ({
  slug: c.slug,
  titulo: c.titulo.split(" ")[0],
  count: c.recursos.length,
}));
