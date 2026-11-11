import { GamesLanding } from "./GamesLanding";

// Served at games.capybaralabs.tech (next.config.ts rewrites that host's / to
// /games) and, as a fallback, at capybaralabs.tech/games.
export default function GamesPage() {
  return <GamesLanding />;
}
