import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
// Editorial serif for headings, in line with the other sites of the ecosystem.
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display" });

export const metadata: Metadata = {
  title: { default: "Capybara Labs — AI, Software & Open Source", template: "%s | Capybara Labs" },
  description: "An independent studio that builds and runs its own AI products (Acquis, Tribu, HIVE, Reagent Lab) and builds software for others: AI automation, custom development and system integration.",
  metadataBase: new URL("https://www.capybaralabs.tech"),
  openGraph: {
    type: "website",
    url: "https://www.capybaralabs.tech",
    title: "Capybara Labs — AI, Software & Open Source",
    description: "AI automation, custom software and open-source AI infrastructure.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", creator: "@capybaraitech" },
};

export const viewport = { themeColor: "#17140f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable} ${display.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
