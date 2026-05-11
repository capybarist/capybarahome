"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n, Lang } from "@/lib/i18n";

export function Header() {
  const { lang, setLang, t } = useI18n();
  const path = usePathname();

  const navLinks = [
    { key: "nav_services" as const, href: "/services" },
    { key: "nav_hive" as const, href: "/hive" },
    { key: "nav_community" as const, href: "/#community" },
    { key: "nav_contact" as const, href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 font-semibold text-lg text-[var(--text)] hover:text-[var(--brand)] transition-colors">
          <span className="text-2xl" aria-hidden>🦫</span>
          <span>Capybara Labs</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ key, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                path === href
                  ? "text-[var(--brand)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Lang switcher */}
        <div className="flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-1">
          {(["es", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase transition-all ${
                lang === l
                  ? "bg-[var(--brand)] text-[var(--bg)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
