"use client";
import { useI18n } from "@/lib/i18n";
import { PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function ProductsPage() {
  const { lang } = useI18n();
  const en = lang === "en";

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 paper-grid pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-14 md:pt-24 md:pb-16">
          <p className="eyebrow mb-6">{en ? "Products" : "Productos"}</p>
          <h1 className="font-display text-4xl md:text-6xl text-[var(--ink)] leading-[1.02] mb-6 max-w-4xl">
            {en ? <>Our own products, <em>in production.</em></> : <>Productos propios, <em>en producción.</em></>}
          </h1>
          <p className="text-lg text-[var(--text-2)] max-w-2xl">
            {en
              ? "Besides building software for clients, we launch and run our own products. Each one has its own site; here is what each one is."
              : "Además de desarrollar software para clientes, lanzamos y operamos productos propios. Cada uno tiene su propia web; aquí te contamos qué es cada uno."}
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg-subtle)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.map((p) => <ProjectCard key={p.slug} p={p} en={en} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
