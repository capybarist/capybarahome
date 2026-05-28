"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n, Lang } from "@/lib/i18n";

export function Header() {
  const { lang, setLang, t } = useI18n();
  const path = usePathname();

  const navLinks = [
    { key: "nav_hive" as const, href: "/hive" },
    // nav_capy and nav_pixel removed from menu until their alpha is mature
    // enough to demo. The /capy and /pixel pages remain reachable by direct URL
    // (capybaralabs.tech/pixel still works) but are intentionally not surfaced
    // in the nav until they pass a "this is shippable" gate.
    { key: "nav_services" as const, href: "/services" },
    { key: "nav_community" as const, href: "/#community" },
    { key: "nav_contact" as const, href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/CapybaraLogo.png" alt="Capybara Labs" className="h-9 w-auto" />
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
          <div className="flex items-center rounded-lg border border-[var(--border)] overflow-hidden">
            {(["es", "en"] as Lang[]).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-xs font-bold uppercase transition-all ${
                  lang === l ? "bg-[var(--text)] text-white" : "text-[var(--muted)] hover:bg-[var(--bg-muted)]"
                }`}>
                {l}
              </button>
            ))}
          </div>
          <a href="#contact"
            className="hidden md:inline-flex items-center rounded-lg bg-[var(--text)] text-white text-sm font-medium px-4 py-2 hover:bg-[var(--brand)] transition-colors">
            {t("contact_cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
