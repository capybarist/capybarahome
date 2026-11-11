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
  /** Looping trailer (mp4/webm under /public/games/<slug>/). Without one, the card shows an animated placeholder. */
  video?: string;
  /** Poster frame for the video, and the image used while it loads. */
  poster?: string;
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
    color: "#ffc93c",
    color2: "#ff7a59",
    // TODO(Enrique): provisional copy, replace with the real pitch from the Lumen Rise store listing.
    pitch: {
      en: "Follow the light and climb as high as you can.",
      es: "Sigue la luz y sube todo lo alto que puedas.",
    },
    body: {
      en: "A bright little arcade game for quick sessions: clear levels, collect pearls and keep rising. No account, no fuss, just one more try.",
      es: "Un arcade luminoso para partidas rápidas: supera niveles, recoge perlas y no dejes de subir. Sin registro ni complicaciones, solo una partida más.",
    },
    tags: [
      { en: "Arcade", es: "Arcade" },
      { en: "iOS & Android", es: "iOS y Android" },
    ],
    privacy: "https://www.capybaralabs.tech/lumen-rise/privacidad",
    support: "https://www.capybaralabs.tech/lumen-rise/soporte",
  },
];

export const GAMES_URL = "https://games.capybaralabs.tech";
