"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t, lang } = useI18n();
  const en = lang === "en";
  const path = usePathname();
  const [open, setOpen] = useState(false);

  // Home (/) is the corporate landing; each published product gets its own entry.
  // cAPY and pixel stay hidden until their alpha is demo-ready (pages still
  // reachable by direct URL).
  const navLinks: { label: string; href: string; external?: boolean }[] = [
    { label: en ? "Projects" : "Proyectos", href: "/#projects" },
    { label: t("nav_hive"), href: "/hive" },
    { label: t("nav_reagentlab"), href: "/reagentlab" },
    { label: t("nav_tribu"), href: "/tribu" },
    { label: t("nav_acquis"), href: "https://acquislaw.com", external: true },
    { label: t("nav_services"), href: "/services" },
  ];

  const linkClass = (href: string) =>
    `text-sm transition-colors ${
      path === href ? "text-[var(--ink)] font-medium" : "text-[var(--muted)] hover:text-[var(--ink)]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity" aria-label="Capybara Labs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/CapybaraMark.png" alt="" className="h-8 w-auto" />
          <span className="font-display text-xl text-[var(--ink)] leading-none">Capybara Labs</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(({ label, href, external }) =>
            external ? (
              <a key={href} href={href} target="_blank" rel="noopener" className={`${linkClass(href)} inline-flex items-center gap-0.5`}>
                {label} <ArrowUpRight size={13} className="opacity-60" />
              </a>
            ) : (
              <Link key={href} href={href} className={linkClass(href)}>{label}</Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language is auto-detected from the browser (default English); no manual switcher. */}
          <Link href="/#contact"
            className="hidden sm:inline-flex items-center rounded-full bg-[var(--ink)] text-[var(--bg)] text-sm font-medium px-4 py-2 hover:bg-[var(--plum)] transition-colors">
            {en ? "Let's talk" : "Hablemos"}
          </Link>
          <button type="button" onClick={() => setOpen((o) => !o)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] text-[var(--ink)]"
            aria-expanded={open} aria-label={open ? (en ? "Close menu" : "Cerrar menú") : (en ? "Open menu" : "Abrir menú")}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-[var(--border)] bg-[var(--bg)]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex flex-col">
            {navLinks.map(({ label, href, external }) => {
              const cls = "flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0 text-[var(--ink)]";
              return external ? (
                <a key={href} href={href} target="_blank" rel="noopener" onClick={() => setOpen(false)} className={cls}>
                  <span className="font-display text-2xl">{label}</span>
                  <ArrowUpRight size={16} className="text-[var(--muted)]" />
                </a>
              ) : (
                <Link key={href} href={href} onClick={() => setOpen(false)} className={cls}>
                  <span className="font-display text-2xl">{label}</span>
                </Link>
              );
            })}
            <Link href="/#contact" onClick={() => setOpen(false)}
              className="sm:hidden mt-3 mb-2 inline-flex justify-center rounded-full bg-[var(--ink)] text-[var(--bg)] text-sm font-medium px-4 py-3">
              {en ? "Let's talk" : "Hablemos"}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
