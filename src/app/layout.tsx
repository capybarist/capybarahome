import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: { default: "Capybara Labs — Custom software & applied AI", template: "%s | Capybara Labs" },
  description: "Custom software and applied AI for companies: AI automation, custom agents, software development and system integration. Makers of Acquis, Tribu, HIVE and Reagent Lab.",
  metadataBase: new URL("https://www.capybaralabs.tech"),
  openGraph: {
    type: "website",
    url: "https://www.capybaralabs.tech",
    title: "Capybara Labs — Custom software & applied AI",
    description: "Custom software and applied AI for companies.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", creator: "@capybaraitech" },
};

export const viewport = { themeColor: "#17140f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          {/* The corporate header/footer live in (site)/layout.tsx; the games
              landing (/games, served at games.capybaralabs.tech) has its own shell. */}
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
