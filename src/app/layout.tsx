import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: { default: "Capybara Labs — AI, Software & Open Source", template: "%s | Capybara Labs" },
  description: "End-to-end IT solutions: AI automation, custom software development, and system integration. Creators of HIVE, the decentralized knowledge base for LLMs.",
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

export const viewport = { themeColor: "#09090f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
