"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { isDarkRoute } from "@/lib/theme";

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

  // The landing and /services run fully dark; the rest are light. The header
  // follows the page under it instead of dropping a white bar on a dark hero.
  const dark = isDarkRoute(path);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b ${
        dark ? "bg-[#06090f]/85 border-slate-800/70" : "bg-white/90 border-[var(--border)]"
      }`}>
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dark ? "/CapybaraLogo-light.png" : "/CapybaraLogo.png"} alt="Capybara Labs" className="h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ key, href }) => {
            const active = path === href;
            return (
              <Link key={href} href={href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? dark ? "text-sky-400" : "text-[var(--brand)]"
                    : dark ? "text-slate-400 hover:text-white" : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}>
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language is auto-detected from the browser (default English); no manual switcher. */}
          <Link href="/#contact"
            className={`hidden md:inline-flex items-center rounded-lg text-sm font-medium px-4 py-2 transition-colors ${
              dark
                ? "bg-sky-500 text-white hover:bg-sky-400"
                : "bg-[var(--text)] text-white hover:bg-[var(--brand)]"
            }`}>
            {t("contact_cta")}
          </Link>
        </div>
      </div>
    </header>
  );
}
