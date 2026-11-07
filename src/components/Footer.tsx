"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { PROJECTS, projectHref } from "@/lib/projects";

export function Footer() {
  const { t, lang } = useI18n();
  const en = lang === "en";
  const linkCls = "hover:text-white transition-colors";

  return (
    <footer className="on-dark bg-[var(--ink)] text-[#b9b0a1]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 mb-14">
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/CapybaraMark.png" alt="" className="h-8 w-auto brightness-0 invert opacity-90" />
              <span className="font-display text-xl text-white">Capybara Labs</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-[#9a907f]">
              {en
                ? "Custom software and applied AI for companies, from a studio that also ships and runs its own products."
                : "Software a medida e IA aplicada para empresas, de un estudio que también lanza y opera sus propios productos."}
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow !text-[#7d7465] mb-4"><Link href="/products" className="hover:text-white transition-colors">{en ? "Products" : "Productos"}</Link></p>
            <div className="flex flex-col gap-2.5 text-sm">
              {PROJECTS.map((p) => {
                const href = projectHref(p);
                return href.startsWith("/")
                  ? <Link key={p.slug} href={href} className={linkCls}>{p.name}</Link>
                  : <a key={p.slug} href={href} target="_blank" rel="noopener" className={linkCls}>{p.name}</a>;
              })}
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow !text-[#7d7465] mb-4">{en ? "Studio" : "Estudio"}</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/#services" className={linkCls}>{t("nav_services")}</Link>
              <Link href="/#contact" className={linkCls}>{t("nav_contact")}</Link>
              <a href="https://github.com/capybarist" target="_blank" rel="noopener" className={linkCls}>GitHub</a>
              <a href="https://www.linkedin.com/company/capybara-labsllc" target="_blank" rel="noopener" className={linkCls}>LinkedIn</a>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow !text-[#7d7465] mb-4">Legal</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/privacy" className={linkCls}>{t("foot_privacy")}</Link>
              <Link href="/legal" className={linkCls}>{t("foot_legal")}</Link>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-[#7d7465]">
          <span>© {new Date().getFullYear()} Capybara Labs LLC. {t("foot_rights")}</span>
          <a href="mailto:info@capybaralabs.tech" className={linkCls}>info@capybaralabs.tech</a>
        </div>
      </div>
    </footer>
  );
}
