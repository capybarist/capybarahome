"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-[var(--border)] py-10 mt-auto">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xl" aria-hidden>🦫</span>
          <span className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} Capybara Labs LLC
          </span>
        </div>
        <p className="text-xs text-[var(--muted)] hidden md:block">{t("foot_tagline")}</p>
        <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
          <Link href="/privacy" className="hover:text-[var(--text)] transition-colors">{t("foot_privacy")}</Link>
          <Link href="/legal" className="hover:text-[var(--text)] transition-colors">{t("foot_legal")}</Link>
          <a href="https://github.com/capybarist" target="_blank" rel="noopener" className="hover:text-[var(--text)] transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
