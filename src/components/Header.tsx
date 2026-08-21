"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t } = useI18n();
  const path = usePathname();

  // Home (/) is the corporate Capybara Labs landing; HIVE is a product at /hive.
  // Both get their own explicit nav item. nav_capy / nav_pixel stay hidden until
  // their alpha is demo-ready (pages still reachable by direct URL).
  const navLinks = [
    { key: "nav_home" as const, href: "/" },
    { key: "nav_hive" as const, href: "/hive" },
    { key: "nav_acquis" as const, href: "https://acquislaw.com" },
    { key: "nav_services" as const, href: "/services" },
    { key: "nav_community" as const, href: "/#community" },
    { key: "nav_contact" as const, href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/CapybaraLogo.png" alt="Capybara Labs" className="h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ key, href }) => (
            <Link key={href} href={href}
              className={`text-sm font-medium transition-colors ${
                path === href ? "text-[var(--brand)]" : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}>
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language is auto-detected from the browser (default English); no manual switcher. */}
          <a href="/#contact"
            className="hidden md:inline-flex items-center rounded-lg bg-[var(--text)] text-white text-sm font-medium px-4 py-2 hover:bg-[var(--brand)] transition-colors">
            {t("contact_cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
