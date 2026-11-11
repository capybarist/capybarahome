import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acquis — Verified EU law for your AI assistant",
  description: "Acquis, by Capybara Labs: verbatim EU law with exact citations and EUR-Lex links, in a web app and inside Claude, ChatGPT and VS Code. Live at acquislaw.com.",
};

export default function AcquisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
