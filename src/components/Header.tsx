"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PROJECTS, projectHref } from "@/lib/projects";
import { ProjectMark, SmartLink } from "@/components/ProjectCard";
import { CapybaraMark } from "@/components/CapybaraMark";
import { GAMES_URL } from "@/lib/games";

export function Header() {
  const { t, lang } = useI18n();
  const en = lang === "en";
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  // Home (/) is the studio and its services; the products live under the
  // Products menu and /products. cAPY and pixel stay hidden until their alpha
  // is demo-ready (pages still reachable by direct URL).
  const navLinks: { label: string; href: string }[] = [
    { label: t("nav_services"), href: "/#services" },
    { label: en ? "How we work" : "Cómo trabajamos", href: "/#process" },
    { label: t("nav_contact"), href: "/#contact" },
    // The games have their own, playful sub-brand on games.capybaralabs.tech.
    { label: "Games", href: GAMES_URL },
  ];

  const productActive = path === "/products" || PROJECTS.some((p) => p.page === path);
  const linkClass = "text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity" aria-label="Capybara Labs">
          <CapybaraMark className="h-7 w-auto text-[var(--plum)]" />
          <span className="font-display text-lg text-[var(--ink)] leading-none">capybara <span className="text-[var(--plum)]">labs</span></span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {/* Products dropdown: opens on hover and on click (keyboard / touch). */}
          <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
            <button type="button" onClick={() => setProductsOpen((o) => !o)} aria-expanded={productsOpen}
              className={`inline-flex items-center gap-1 text-sm transition-colors ${
                productActive ? "text-[var(--ink)] font-medium" : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}>
              {en ? "Products" : "Productos"}
              <ChevronDown size={14} className={`transition-transform ${productsOpen ? "rotate-180" : ""}`} />
            </button>
            {productsOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                <div className="w-[420px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_50px_-20px_rgba(23,20,15,.35)] p-2">
                  {PROJECTS.map((p) => (
                    <SmartLink key={p.slug} href={projectHref(p)} onClick={() => setProductsOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-[var(--bg-subtle)] transition-colors">
                      <ProjectMark p={p} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-[var(--ink)]">{p.name}</span>
                        <span className="block text-xs text-[var(--muted)] truncate">{en ? p.tagline.en : p.tagline.es}</span>
                      </span>
                      {!p.page && <ArrowUpRight size={14} className="text-[var(--muted-light)]" />}
                    </SmartLink>
                  ))}
                  <Link href="/products" onClick={() => setProductsOpen(false)}
                    className="mt-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--ink)] border-t border-[var(--border)] hover:bg-[var(--bg-subtle)]">
                    {en ? "All products" : "Todos los productos"} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className={linkClass}>{label}</Link>
          ))}
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
        <nav className="lg:hidden border-t border-[var(--border)] bg-[var(--bg)] max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex flex-col">
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className="py-3 border-b border-[var(--border)] text-[var(--ink)] font-display text-xl">
                {label}
              </Link>
            ))}
            <p className="eyebrow mt-5 mb-2">{en ? "Products" : "Productos"}</p>
            {PROJECTS.map((p) => (
              <SmartLink key={p.slug} href={projectHref(p)} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2.5">
                <ProjectMark p={p} size="sm" />
                <span className="flex-1">
                  <span className="block font-semibold text-[var(--ink)]">{p.name}</span>
                  <span className="block text-xs text-[var(--muted)]">{en ? p.tagline.en : p.tagline.es}</span>
                </span>
              </SmartLink>
            ))}
            <Link href="/products" onClick={() => setOpen(false)} className="py-2.5 text-sm font-medium text-[var(--ink)] inline-flex items-center gap-1.5">
              {en ? "All products" : "Todos los productos"} <ArrowRight size={14} />
            </Link>
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
