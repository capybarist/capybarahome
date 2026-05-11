"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[#06090f] border-t border-slate-800 text-slate-400">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🦫</span>
              <span className="font-bold text-white text-sm">Capybara Labs</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              {t("foot_tagline")}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{t("foot_projects")}</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/hive" className="hover:text-white transition-colors">HIVE</Link>
              <a href="https://github.com/capybarist" target="_blank" rel="noopener" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Legal</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">{t("foot_privacy")}</Link>
              <Link href="/legal" className="hover:text-white transition-colors">{t("foot_legal")}</Link>
              <a href="mailto:info@capybaralabs.tech" className="hover:text-white transition-colors">info@capybaralabs.tech</a>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between gap-3 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} Capybara Labs LLC. {t("foot_rights")}</span>
          <div className="flex gap-5">
            <a href="https://www.youtube.com/@capybara-labs" target="_blank" rel="noopener" className="hover:text-slate-400 transition-colors">YouTube</a>
            <a href="https://www.linkedin.com/company/capybara-labsllc" target="_blank" rel="noopener" className="hover:text-slate-400 transition-colors">LinkedIn</a>
            <a href="https://github.com/capybarist" target="_blank" rel="noopener" className="hover:text-slate-400 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
