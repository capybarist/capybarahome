// The games published under the Capybara Game Labs sub-brand
// (games.capybaralabs.tech). Kept apart from lib/projects.ts on purpose: the
// games live on their own, more playful landing, not next to the products.

export type GameStatus = "coming-soon" | "live";

export interface Game {
  slug: string;
  name: string;
  status: GameStatus;
  /** Main colour of the game's card and glow. */
  color: string;
  /** Second colour for gradients. */
  color2: string;
  pitch: { en: string; es: string };
  body: { en: string; es: string };
  /** Genre / platform chips. */
  tags: { en: string; es: string }[];
  /** Looping, silent trailer per language (mp4 under /public/games/<slug>/). Without one, the card shows an animated placeholder. */
  video?: { en: string; es: string };
  /** Poster frame for the video (its first frame, so there is no jump when it starts), per language. */
  poster?: { en: string; es: string };
  /** Planned launch, shown next to "coming soon". */
  launch?: { en: string; es: string };
  /** App icon (square PNG). */
  icon?: string;
  appStore?: string;
  googlePlay?: string;
  privacy?: string;
  support?: string;
}

export const GAMES: Game[] = [
  {
    slug: "lumen-rise",
    name: "Lumen Rise",
    status: "coming-soon",
    color: "#3ee8f2",
    color2: "#ffc94d",
    pitch: {
      en: "Match, ignite and launch light to the surface",
      es: "Alinea, enciende y lanza la luz hacia la superficie",
    },
    body: {
      en: "Glowing lumens keep sinking to the ocean floor. Line up three to ignite them and launch them upward, then match again mid-flight to chain combos. Eight depth zones, an endless mode and a daily challenge.",
      es: "Los lúmenes caen sin parar al fondo del mar. Alinea tres iguales para encenderlos y lanzarlos hacia arriba, y vuelve a alinear en pleno vuelo para encadenar. Ocho zonas de profundidad, modo infinito y reto diario.",
    },
    tags: [
      { en: "Puzzle", es: "Puzle" },
      { en: "Arcade", es: "Arcade" },
      { en: "iOS & Android", es: "iOS y Android" },
    ],
    video: { en: "/games/lumen-rise/trailer-en.mp4", es: "/games/lumen-rise/trailer-es.mp4" },
    poster: { en: "/games/lumen-rise/poster-en.jpg", es: "/games/lumen-rise/poster-es.jpg" },
    icon: "/games/lumen-rise/icon.png",
    launch: { en: "Planned for December 2026", es: "Previsto para diciembre de 2026" },
    // Not published yet. When live: Google Play
    // https://play.google.com/store/apps/details?id=tech.capybaralabs.lumenrise
    // and App Store https://apps.apple.com/app/id<APPLE_ID>.
    privacy: "https://www.capybaralabs.tech/lumen-rise/privacidad",
    support: "https://www.capybaralabs.tech/lumen-rise/soporte",
  },
];

export const GAMES_URL = "https://games.capybaralabs.tech";
