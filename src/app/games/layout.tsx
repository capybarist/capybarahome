import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import { GAMES_URL } from "@/lib/games";

// Rounded display face: the games sub-brand is deliberately less serious
// than the corporate site.
const fredoka = Fredoka({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-fredoka" });

export const metadata: Metadata = {
  title: { absolute: "Capybara Game Labs — Small games, big smiles" },
  description: "Casual mobile games made by Capybara Labs. Lumen Rise is coming soon to the App Store and Google Play.",
  alternates: { canonical: GAMES_URL },
  openGraph: {
    type: "website",
    url: GAMES_URL,
    siteName: "Capybara Game Labs",
    title: "Capybara Game Labs — Small games, big smiles",
    description: "Casual mobile games made by Capybara Labs.",
  },
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${fredoka.variable} games-root flex-1 flex flex-col`}>{children}</div>;
}
