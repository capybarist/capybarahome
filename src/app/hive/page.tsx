"use client";
import type { Metadata } from "next";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const techStack = [
  { name: "Hypercore", desc: "Append-only cryptographic log", link: "https://github.com/holepunchto/hypercore" },
  { name: "Hyperswarm", desc: "P2P DHT node discovery", link: "https://github.com/holepunchto/hyperswarm" },
  { name: "all-MiniLM-L6-v2", desc: "Local semantic embeddings, ~80MB CPU", link: "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2" },
  { name: "HNSW", desc: "Approximate nearest-neighbor vector search", link: "https://github.com/nmslib/hnswlib" },
];

const installSteps = [
  { label: "Clone", cmd: "git clone https://github.com/capybarist/hive.git && cd hive" },
  { label: "Install", cmd: "npm install && pip install -r packages/embeddings/requirements.txt" },
  { label: "Configure", cmd: 'echo "LLM_PROVIDER=gemini\\nLLM_API_KEY=your_key" > .env' },
  { label: "Run", cmd: "bash hive.sh" },
];

function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="ml-auto shrink-0 text-xs text-[var(--muted)] hover:text-[var(--brand)] transition-colors px-2 py-1 rounded border border-[var(--border)] hover:border-[var(--brand)]/40"
    >
      copy
    </button>
  );
}

export default function HivePage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative grid-bg overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[var(--accent)]/8 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/8 px-4 py-1.5 text-xs text-[var(--accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Open Source · P2P · Verified Knowledge
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4 gradient-text-hive">
            {t("hive_hero_title")}
          </h1>
          <p className="text-xl text-[var(--muted)] mb-3">{t("hive_hero_sub")}</p>
          <p className="text-base italic text-[var(--muted)]/70 mb-10">&ldquo;{t("hive_hero_tagline")}&rdquo;</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://github.com/capybarist/hive"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3 font-semibold text-sm text-white hover:opacity-90 transition-opacity"
            >
              🐙 {t("hive_hero_cta_primary")}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-7 py-3 font-semibold text-sm text-[var(--text)] hover:border-[var(--accent)]/40 transition-colors"
            >
              {t("hive_hero_cta_secondary")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="mx-auto max-w-4xl px-6 py-20 w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">The problem</p>
        <h2 className="text-3xl font-bold text-[var(--text)] mb-6">{t("hive_problem_title")}</h2>
        <div className="space-y-4">
          {t("hive_problem_desc").split("\n\n").map((p, i) => (
            <p key={i} className="text-[var(--muted)] leading-relaxed text-lg">{p}</p>
          ))}
        </div>
      </section>

      {/* ── What is HIVE ── */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 py-20 w-full">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">What</p>
          <h2 className="text-3xl font-bold text-[var(--text)] mb-6">{t("hive_what_title")}</h2>
          <p className="text-lg text-[var(--muted)] leading-relaxed mb-12">{t("hive_what_desc")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: "✅", tKey: "hive_props_signed" as const, dKey: "hive_props_signed_desc" as const },
              { icon: "🔐", tKey: "hive_props_crypto" as const, dKey: "hive_props_crypto_desc" as const },
              { icon: "📜", tKey: "hive_props_append" as const, dKey: "hive_props_append_desc" as const },
              { icon: "🌐", tKey: "hive_props_p2p" as const, dKey: "hive_props_p2p_desc" as const },
            ].map(({ icon, tKey, dKey }) => (
              <div key={tKey} className="p-6 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5">
                <span className="text-2xl mb-3 block">{icon}</span>
                <h3 className="font-semibold text-[var(--text)] mb-1">{t(tKey)}</h3>
                <p className="text-sm text-[var(--muted)]">{t(dKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="mx-auto max-w-4xl px-6 py-20 w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">How</p>
        <h2 className="text-3xl font-bold text-[var(--text)] mb-4">{t("hive_how_title")}</h2>
        <p className="text-[var(--muted)] leading-relaxed mb-10">{t("hive_how_desc")}</p>
        <div className="flex flex-col gap-4">
          {([
            { num: "01", key: "hive_how_1" as const },
            { num: "02", key: "hive_how_2" as const },
            { num: "03", key: "hive_how_3" as const },
            { num: "04", key: "hive_how_4" as const },
          ]).map(({ num, key }) => (
            <div key={key} className="flex gap-5 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] items-start">
              <span className="font-black text-sm text-[var(--accent)]/50 w-7 shrink-0 mt-0.5">{num}</span>
              <p className="text-[var(--muted)]">{t(key)}</p>
            </div>
          ))}
        </div>
        {/* Flow diagram */}
        <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-6 font-mono text-xs text-[var(--muted)] leading-7">
          <p className="text-[var(--brand)]">BEE starts</p>
          <p className="pl-4">→ Reads data/topic_tree.json <span className="text-[var(--muted)]/50">(95 topics)</span></p>
          <p className="pl-4">→ Scans peers: which topics are covered</p>
          <p className="pl-4">→ Claims 3 uncovered topics</p>
          <p className="pl-4">→ Loop every 5 min: extract → sign → store → replicate</p>
          <p className="pl-4">→ Renews claims (TTL 30min)</p>
        </div>
      </section>

      {/* ── Why it matters ── */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 py-20 w-full">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">Why</p>
          <h2 className="text-3xl font-bold text-[var(--text)] mb-10">{t("hive_why_title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🧑‍💻", tKey: "hive_why_users" as const, dKey: "hive_why_users_desc" as const },
              { icon: "⚙️", tKey: "hive_why_devs" as const, dKey: "hive_why_devs_desc" as const },
              { icon: "🌍", tKey: "hive_why_web" as const, dKey: "hive_why_web_desc" as const },
            ].map(({ icon, tKey, dKey }) => (
              <div key={tKey} className="p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)]/30 transition-colors">
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-semibold text-[var(--text)] mb-2">{t(tKey)}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{t(dKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technology ── */}
      <section className="mx-auto max-w-4xl px-6 py-20 w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">Technology</p>
        <h2 className="text-3xl font-bold text-[var(--text)] mb-3">{t("hive_tech_title")}</h2>
        <p className="text-[var(--muted)] mb-10">{t("hive_tech_desc")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techStack.map(({ name, desc, link }) => (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noopener"
              className="flex items-start gap-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/40 transition-colors group"
            >
              <span className="text-[var(--accent)] group-hover:text-[var(--accent)] font-mono text-sm mt-0.5">→</span>
              <div>
                <div className="font-semibold text-[var(--text)] mb-1">{name}</div>
                <div className="text-xs text-[var(--muted)]">{desc}</div>
              </div>
            </a>
          ))}
        </div>
        <p className="text-sm text-[var(--muted)] mt-6 italic">No blockchain. No tokens yet. No central server.</p>
      </section>

      {/* ── Status ── */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 py-20 w-full">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)] mb-4">v0.2</p>
          <h2 className="text-3xl font-bold text-[var(--text)] mb-3">{t("hive_status_title")}</h2>
          <p className="text-[var(--muted)] mb-8">{t("hive_status_desc")}</p>
          <div className="flex flex-col gap-3 mb-10">
            {([
              "hive_status_m1", "hive_status_m2", "hive_status_m3",
              "hive_status_m4", "hive_status_m5", "hive_status_m6", "hive_status_m7",
            ] as const).map((k) => (
              <div key={k} className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg)]">
                <span className="text-[var(--brand)] shrink-0">✓</span>
                <span className="text-sm text-[var(--muted)]">{t(k)}</span>
                <span className="ml-auto text-xs text-[var(--brand)] border border-[var(--brand)]/30 bg-[var(--brand)]/5 rounded-full px-2 py-0.5 shrink-0">
                  {t("hive_status_done")}
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
            <h4 className="font-semibold text-[var(--text)] mb-3 text-sm">Planned for v0.3</h4>
            <div className="flex flex-wrap gap-2">
              {["Replication factor ≥3", "Semantic routing (VecDHT)", "Token incentives", "Sybil resistance"].map(f => (
                <span key={f} className="text-xs text-[var(--muted)] border border-[var(--border)] rounded-full px-3 py-1">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Install ── */}
      <section className="mx-auto max-w-4xl px-6 py-20 w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)] mb-4">Run a BEE</p>
        <h2 className="text-3xl font-bold text-[var(--text)] mb-3">{t("hive_install_title")}</h2>
        <p className="text-[var(--muted)] mb-8">{t("hive_install_desc")}</p>
        <div className="flex flex-col gap-3 mb-8">
          {installSteps.map(({ label, cmd }) => (
            <div key={label} className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border)]">
                <span className="text-xs text-[var(--muted)] font-medium w-16">{label}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="text-[var(--brand)] font-mono text-xs">$</span>
                <code className="font-mono text-sm text-[var(--text)] flex-1 overflow-x-auto">{cmd}</code>
                <CopyButton text={cmd} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)] mb-10">{t("hive_license")}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/capybarist/hive"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3 font-semibold text-sm text-white hover:opacity-90 transition-opacity"
          >
            🐙 View on GitHub
          </a>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-7 py-3 font-semibold text-sm text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--brand)]/40 transition-colors"
          >
            {t("contact_cta")}
          </Link>
        </div>
      </section>

    </div>
  );
}
