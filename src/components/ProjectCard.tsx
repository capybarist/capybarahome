"use client";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { STATUS_LABEL, projectHref, type Project } from "@/lib/projects";
import { ProductTile } from "@/components/ProductLogos";

export function SmartLink({ href, className, onClick, children }: {
  href: string; className?: string; onClick?: () => void; children: React.ReactNode;
}) {
  return href.startsWith("/")
    ? <Link href={href} className={className} onClick={onClick}>{children}</Link>
    : <a href={href} target="_blank" rel="noopener" className={className} onClick={onClick}>{children}</a>;
}

export function StatusPill({ p, en }: { p: Project; en: boolean }) {
  return (
    <span className="flex flex-wrap justify-end gap-1.5">
      {p.status.map((st) => {
        const s = STATUS_LABEL[st];
        return (
          <span key={st} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-2)]">
            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
            {en ? s.en : s.es}
          </span>
        );
      })}
    </span>
  );
}

export function ProjectMark({ p, size = "md" }: { p: Project; size?: "sm" | "md" }) {
  return <ProductTile slug={p.slug} className={size === "sm" ? "w-9 h-9 rounded-xl" : "w-12 h-12 rounded-2xl"} />;
}

/** Full product card, used on /products. */
export function ProjectCard({ p, en }: { p: Project; en: boolean }) {
  const href = projectHref(p);
  const internal = href.startsWith("/");
  return (
    <SmartLink href={href}
      className="lift group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 md:p-8 overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-1" style={{ background: p.swatch }} aria-hidden />
      <div className="flex items-start justify-between gap-4 mb-8">
        <ProjectMark p={p} />
        <StatusPill p={p} en={en} />
      </div>
      <p className="eyebrow mb-2">{en ? p.category.en : p.category.es}</p>
      <h3 className="font-display text-3xl text-[var(--ink)] mb-1">{p.name}</h3>
      <p className="font-medium text-[var(--text-2)] mb-3">{en ? p.tagline.en : p.tagline.es}</p>
      <p className="text-sm text-[var(--muted)] leading-relaxed mb-8 flex-1">{en ? p.body.en : p.body.es}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ink)]">
        {internal ? (en ? `About ${p.name}` : `Conoce ${p.name}`) : p.siteLabel}
        {internal
          ? <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          : <ArrowUpRight size={15} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />}
      </span>
    </SmartLink>
  );
}
