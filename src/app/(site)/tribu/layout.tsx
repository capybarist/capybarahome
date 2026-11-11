import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tribu — The social network for pets",
  description: "Tribu, by Capybara Labs: pet profiles, walking buddies, lost-pet alerts and adoption from local shelters. Live at tribu.pet.",
};

export default function TribuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
