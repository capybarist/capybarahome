import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "The products Capybara Labs builds and runs: Acquis, Tribu, HIVE and Reagent Lab.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
