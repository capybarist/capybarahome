// The public projects of Capybara Labs, in one place so the home page, the
// header and the footer never drift apart. Only published projects belong
// here: anything still under wraps stays out until it launches.

export type ProjectStatus = "live" | "open-source" | "experiment";

export interface Project {
  slug: string;
  name: string;
  /** Internal summary page on this site, if the project has one. */
  page?: string;
  /** The project's own site. */
  site: string;
  siteLabel: string;
  status: ProjectStatus;
  /** Accent colour for the project's swatch on the shared pages. */
  swatch: string;
  mark: string;
  tagline: { en: string; es: string };
  body: { en: string; es: string };
}

export const PROJECTS: Project[] = [
  {
    slug: "acquis",
    name: "Acquis",
    site: "https://acquislaw.com",
    siteLabel: "acquislaw.com",
    status: "live",
    swatch: "#1e3a5f",
    mark: "§",
    tagline: { en: "Verified EU law for your AI assistant", es: "Derecho de la UE verificado para tu asistente de IA" },
    body: {
      en: "Ask in plain language and get the verbatim provision with its exact citation and EUR-Lex link, in a web app and inside Claude, ChatGPT and VS Code.",
      es: "Pregunta en lenguaje natural y obtén la disposición textual con su cita exacta y enlace a EUR-Lex, en una app web y dentro de Claude, ChatGPT y VS Code.",
    },
  },
  {
    slug: "tribu",
    name: "Tribu",
    page: "/tribu",
    site: "https://tribu.pet",
    siteLabel: "tribu.pet",
    status: "live",
    swatch: "#e0752d",
    mark: "🐾",
    tagline: { en: "The social network for pets", es: "La red social de las mascotas" },
    body: {
      en: "A profile of their own for every pet, walking buddies, lost-pet alerts for the whole neighbourhood and adoption from local shelters.",
      es: "Un perfil propio para cada mascota, compañeros de paseo, alertas de mascotas perdidas para todo el barrio y adopción en protectoras de tu ciudad.",
    },
  },
  {
    slug: "hive",
    name: "HIVE",
    page: "/hive",
    site: "https://github.com/capybarist/hive",
    siteLabel: "GitHub",
    status: "open-source",
    swatch: "#7c3aed",
    mark: "⬡",
    tagline: { en: "The verifiable knowledge engine", es: "El motor de conocimiento verificable" },
    body: {
      en: "A local-first, P2P RAG that signs every fragment it extracts, so an answer can be traced back to the text it came from. Acquis runs on it.",
      es: "Un RAG P2P local-first que firma cada fragmento que extrae, para que una respuesta se pueda rastrear hasta el texto del que salió. Acquis corre sobre él.",
    },
  },
  {
    slug: "reagentlab",
    name: "Reagent Lab",
    page: "/reagentlab",
    site: "https://reagentlab.capybaralabs.tech",
    siteLabel: "reagentlab.capybaralabs.tech",
    status: "experiment",
    swatch: "#047857",
    mark: "⚗",
    tagline: { en: "AI agents that debate until they agree", es: "Agentes de IA que debaten hasta concluir" },
    body: {
      en: "Agents from different people propose, refute, verify and vote in open labs. The server is the referee, and only what survives gets adopted.",
      es: "Agentes de distintas personas proponen, refutan, verifican y votan en salas abiertas. El servidor hace de árbitro y solo se adopta lo que resiste.",
    },
  },
];

export const STATUS_LABEL: Record<ProjectStatus, { en: string; es: string; dot: string }> = {
  live: { en: "Live", es: "En producción", dot: "bg-emerald-500" },
  "open-source": { en: "Open source", es: "Open source", dot: "bg-violet-500" },
  experiment: { en: "Experiment", es: "Experimento", dot: "bg-amber-500" },
};

/** Where a project card or link should send people: its page here, else its site. */
export function projectHref(p: Project) {
  return p.page ?? p.site;
}
