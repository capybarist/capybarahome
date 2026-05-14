"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useState, useEffect, useRef } from "react";
import {
  CheckCircle2, ArrowRight, Copy, Search, Loader2,
  Shield, FileText, Globe, Network,
  Users, Code2, Leaf, ExternalLink,
} from "lucide-react";


// ── Types ─────────────────────────────────────────────────────────────────────
interface Fragment {
  id: string; title?: string; source: string; score: number;
  confidence: number; doi?: string; text: string; node_id?: string; arxiv_id?: string;
}
interface QueryResult { answer?: string; mode?: string; fragments?: Fragment[]; has_hive_data?: boolean; }
interface Stats { fragments?: number; bees?: number; topics?: number; }

// ── Try HIVE widget ───────────────────────────────────────────────────────────
function TryHive() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/hive/stats", { signal: AbortSignal.timeout(4000) })
      .then(r => r.ok ? r.json() : null)
      .then(d => d && !d.error && setStats(d))
      .catch(() => {});
  }, []);

  const ask = async () => {
    const q = query.trim();
    if (!q || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/hive/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, top_k: 5, use_llm: true }),
        signal: AbortSignal.timeout(30_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setResult(await res.json());
    } catch {
      setError(t("try_offline"));
    } finally {
      setLoading(false);
    }
  };

  const sourceUrl = (f: Fragment) => {
    if (f.arxiv_id) return `https://arxiv.org/abs/${f.arxiv_id}`;
    const m = f.source?.match(/arXiv:(\S+)/i);
    if (m) return `https://arxiv.org/abs/${m[1]}`;
    if (f.doi) return `https://doi.org/${f.doi}`;
    return null;
  };


  return (
    <div className="flex flex-col gap-6">
      {/* Stats bar */}
      {stats && (
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { val: stats.fragments?.toLocaleString() ?? "—", label: t("try_stat_fragments") },
            { val: stats.bees ?? "—", label: t("try_stat_bees") },
            { val: stats.topics ?? "—", label: t("try_stat_topics") },
          ].map(({ val, label }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg)] border border-[var(--border)] text-sm">
              <span className="font-bold text-[var(--text)]">{val}</span>
              <span className="text-[var(--muted)]">{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs text-green-600 bg-green-50 border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            live
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white px-4 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_rgba(139,92,246,.1)] transition-all">
          <Search size={16} className="text-[var(--muted)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && ask()}
            placeholder={t("try_placeholder")}
            className="flex-1 py-3.5 text-sm outline-none bg-transparent text-[var(--text)] placeholder:text-[var(--muted)]"
          />
        </div>
        <button
          onClick={ask}
          disabled={loading || !query.trim()}
          className="flex items-center gap-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-dark)] disabled:opacity-40 text-white font-semibold text-sm px-5 py-3.5 transition-colors shrink-0"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          {loading ? t("try_loading") : t("try_btn")}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      {/* Results */}
      {result && (
        <div className="flex flex-col gap-5">
          {/* Mode badge */}
          <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full w-fit ${
            result.has_hive_data
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}>
            {result.has_hive_data ? t("try_verified") : t("try_llm_fallback")}
          </div>

          {/* Answer */}
          {result.answer && (
            <div className="rounded-xl border border-[var(--border)] bg-white p-6">
              <p className="text-sm text-[var(--text)] leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: result.answer
                  .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
                  .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
                  .replace(/\*(.+?)\*/g,"<em>$1</em>")
                }} />
            </div>
          )}

          {/* Sources */}
          {(result.fragments ?? []).length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-3">{t("try_sources")}</p>
              <div className="flex flex-col gap-2">
                {(result.fragments ?? []).slice(0, 4).map(f => {
                  const url = sourceUrl(f);
                  return (
                    <div key={f.id} className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border)] bg-white text-sm">
                      <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[var(--text)] truncate">{f.title ?? f.source}</p>
                        <p className="text-xs text-[var(--muted)]">{f.source}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-[var(--muted)]">{Math.round(f.score * 100)}%</span>
                        {url && (
                          <a href={url} target="_blank" rel="noopener"
                            className="text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors">
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No results CTA */}
          {!result.has_hive_data && (
            <Link href="#run-bee"
              className="text-sm text-[var(--accent)] hover:underline inline-flex items-center gap-1">
              {t("try_run_bee")} <ArrowRight size={13} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

const techStack = [
  { name: "Hypercore", desc: "Append-only cryptographic log (same tech as Keet)", href: "https://github.com/holepunchto/hypercore" },
  { name: "Hyperswarm", desc: "P2P DHT for node discovery and NAT hole-punching", href: "https://github.com/holepunchto/hyperswarm" },
  { name: "sentence-transformers", desc: "Local semantic embeddings (all-MiniLM-L6-v2, ~80MB, runs on CPU)", href: "https://github.com/UKPLab/sentence-transformers" },
  { name: "Qdrant", desc: "Vector database for the aggregator node — scalable search across the full network", href: "https://qdrant.tech" },
  { name: "Ollama / Groq / Gemini / Claude / OpenAI", desc: "Autonomous extraction agent — any LLM with function calling. Ollama runs fully local, no API key needed.", href: "https://ollama.com" },
];

const installSteps = [
  { num: "1", label: "Clone", cmd: "git clone https://github.com/capybarist/hive.git && cd hive" },
  { num: "2", label: "Install", cmd: "npm install && pip install -r packages/embeddings/requirements.txt" },
  { num: "3", label: "Configure", cmd: "# Ollama (free, local — default):\necho 'LLM_PROVIDER=ollama' > .env\n# Or cloud (faster):\necho 'LLM_PROVIDER=groq\\nLLM_API_KEY=your_key' > .env" },
  { num: "4", label: "Run", cmd: "bash hive.sh" },
];

function InstallStep({ num, label, cmd }: { num: string; label: string; cmd: string }) {
  const copy = () => navigator.clipboard.writeText(cmd);
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-800/60 border-b border-slate-700">
        <span className="w-5 h-5 rounded-full bg-slate-700 text-xs font-bold text-slate-300 flex items-center justify-center shrink-0">{num}</span>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span className="text-sky-400 font-mono text-sm shrink-0">$</span>
        <code className="font-mono text-sm text-slate-200 flex-1 overflow-x-auto whitespace-nowrap">{cmd}</code>
        <button onClick={copy} className="ml-2 shrink-0 text-slate-600 hover:text-slate-300 transition-colors" title="Copy">
          <Copy size={14} />
        </button>
      </div>
    </div>
  );
}

export default function HivePage() {
  const { t } = useI18n();

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#06090f] overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-violet-800/15 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            {t("hive_badge_tagline")}
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-5 g-accent">HIVE</h1>
          <p className="text-xl text-slate-300 mb-3 max-w-2xl mx-auto">{t("hive_hero_sub")}</p>
          <p className="text-base text-slate-500 italic mb-10">&ldquo;{t("hive_hero_tagline")}&rdquo;</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://github.com/capybarist/hive" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm px-7 py-3.5 transition-colors">
              {t("hive_github_cta")} <ArrowRight size={15} />
            </a>
            <a href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-sm px-7 py-3.5 transition-colors">
              {t("hive_hero_cta_secondary")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Try HIVE widget ──────────────────────────────────────────────── */}
      <section className="bg-[var(--bg-subtle)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">Live demo</p>
            <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mb-3">{t("try_title")}</h2>
            <p className="text-[var(--muted)] max-w-xl mx-auto text-sm leading-relaxed">{t("try_sub")}</p>
          </div>
          <TryHive />
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────────────── */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4">{t("hive_section_problem")}</p>
          <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mb-8">{t("hive_problem_title")}</h2>
          <div className="space-y-5">
            {t("hive_problem_desc").split("\n\n").map((p, i) => (
              <p key={i} className="text-[var(--muted)] leading-relaxed text-lg max-w-2xl">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is HIVE ─────────────────────────────────────────────────── */}
      <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4">{t("hive_section_what")}</p>
              <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mb-5">{t("hive_what_title")}</h2>
              <p className="text-[var(--muted)] leading-relaxed">{t("hive_what_desc")}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { Icon: CheckCircle2, tKey: "hive_props_signed" as const, dKey: "hive_props_signed_desc" as const, c: "text-green-600 bg-green-50" },
                { Icon: Shield,       tKey: "hive_props_crypto" as const, dKey: "hive_props_crypto_desc" as const, c: "text-blue-600 bg-blue-50" },
                { Icon: FileText,     tKey: "hive_props_append" as const, dKey: "hive_props_append_desc" as const, c: "text-violet-600 bg-violet-50" },
                { Icon: Globe,        tKey: "hive_props_p2p"    as const, dKey: "hive_props_p2p_desc"    as const, c: "text-sky-600 bg-sky-50" },
              ].map(({ Icon, tKey, dKey, c }) => (
                <div key={tKey} className="p-5 rounded-xl border border-[var(--border)] bg-white">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${c.split(" ")[1]}`}>
                    <Icon size={17} className={c.split(" ")[0]} />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text)] mb-1">{t(tKey)}</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{t(dKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4">{t("hive_section_how")}</p>
          <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mb-4">{t("hive_how_title")}</h2>
          <p className="text-[var(--muted)] leading-relaxed mb-10 max-w-xl">{t("hive_how_desc")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {([
              { key: "hive_how_1" as const, n: "01" },
              { key: "hive_how_2" as const, n: "02" },
              { key: "hive_how_3" as const, n: "03" },
              { key: "hive_how_4" as const, n: "04" },
            ]).map(({ key, n }) => (
              <div key={key} className="flex gap-4 p-5 rounded-xl border border-[var(--border)] bg-white">
                <span className="font-black text-sm text-[var(--accent)]/40 w-7 shrink-0 mt-0.5">{n}</span>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{t(key)}</p>
              </div>
            ))}
          </div>

          {/* Flow snippet */}
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 font-mono text-xs text-slate-400 leading-7">
            <div className="text-sky-400 font-semibold mb-1">BEE starts</div>
            <div className="pl-4 space-y-1 text-slate-500">
              <p>→ Reads <span className="text-slate-300">topic_tree.json</span> (95 topics, 9 domains)</p>
              <p>→ Scans peers: which topics are covered</p>
              <p>→ Claims 3 uncovered topics (or least-covered ones)</p>
              <p>→ <span className="text-slate-300">wikipedia_fetch</span>: indexes all sections of each article</p>
              <p>→ Loop ~continuous: extract → sign → store → sync</p>
              <p>→ TTL dedup: skips fresh content (wiki 7d · rss 24h · arXiv 30d)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why it matters ───────────────────────────────────────────────── */}
      <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4">{t("hive_section_why")}</p>
          <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mb-10">{t("hive_why_title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { Icon: Users,  tKey: "hive_why_users" as const, dKey: "hive_why_users_desc" as const, c: "bg-sky-50 text-sky-600" },
              { Icon: Code2,  tKey: "hive_why_devs"  as const, dKey: "hive_why_devs_desc"  as const, c: "bg-violet-50 text-violet-600" },
              { Icon: Leaf,   tKey: "hive_why_web"   as const, dKey: "hive_why_web_desc"   as const, c: "bg-green-50 text-green-600" },
            ].map(({ Icon, tKey, dKey, c }) => (
              <div key={tKey} className="p-7 rounded-2xl border border-[var(--border)] bg-white card-hover">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${c.split(" ")[0]}`}>
                  <Icon size={20} className={c.split(" ")[1]} />
                </div>
                <h3 className="font-bold text-[var(--text)] mb-2">{t(tKey)}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{t(dKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technology ───────────────────────────────────────────────────── */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)] mb-4">{t("hive_section_tech")}</p>
          <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mb-3">{t("hive_tech_title")}</h2>
          <p className="text-[var(--muted)] mb-10">{t("hive_tech_desc")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {techStack.map(({ name, desc, href }) => (
              href ? (
                <a key={name} href={href} target="_blank" rel="noopener"
                  className="flex items-start gap-4 p-5 rounded-xl border border-[var(--border)] bg-white card-hover group">
                  <span className="text-[var(--accent)] group-hover:text-[var(--accent-dark)] font-bold mt-0.5 text-lg leading-none">→</span>
                  <div>
                    <div className="font-semibold text-[var(--text)] mb-1 text-sm">{name}</div>
                    <div className="text-xs text-[var(--muted)]">{desc}</div>
                  </div>
                </a>
              ) : (
                <div key={name} className="flex items-start gap-4 p-5 rounded-xl border border-[var(--border)] bg-white">
                  <span className="text-[var(--accent)] font-bold mt-0.5 text-lg leading-none">→</span>
                  <div>
                    <div className="font-semibold text-[var(--text)] mb-1 text-sm">{name}</div>
                    <div className="text-xs text-[var(--muted)]">{desc}</div>
                  </div>
                </div>
              )
            ))}
          </div>
          <p className="text-sm text-[var(--muted)] italic">{t("hive_no_blockchain")}</p>
        </div>
      </section>

      {/* ── Status ───────────────────────────────────────────────────────── */}
      <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-baseline gap-3 mb-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand)]">{t("hive_section_status")}</p>
            <span className="text-xs font-bold text-white bg-[var(--green)] rounded-full px-2.5 py-0.5">{t("hive_status_badge")}</span>
          </div>
          <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mb-3">{t("hive_status_title")}</h2>
          <p className="text-[var(--muted)] mb-8">{t("hive_status_desc")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {([
              "hive_status_m1","hive_status_m2","hive_status_m3","hive_status_m4",
              "hive_status_m5","hive_status_m6","hive_status_m7",
            ] as const).map((k) => (
              <div key={k} className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border)] bg-white">
                <CheckCircle2 size={16} className="text-[var(--green)] shrink-0" />
                <span className="text-sm text-[var(--text-2)]">{t(k)}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-white p-5">
            <h4 className="text-sm font-bold text-[var(--text)] mb-3">{t("hive_planned_title")}</h4>
            <div className="flex flex-wrap gap-2">
              {["LLM-free verbatim extraction", "Signature verification on receive", "Replication factor ≥3", "Multi-agent consensus", "BulkImporter (Wikipedia-scale)", "QVAC local inference", "WDK payments"].map(f => (
                <span key={f} className="text-xs text-[var(--muted)] border border-[var(--border)] rounded-full px-3 py-1">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Install ──────────────────────────────────────────────────────── */}
      <section id="run-bee" className="bg-[#06090f] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-4">{t("hive_section_run")}</p>
          <h2 className="text-3xl font-black g-hero mb-4 tracking-tight">{t("hive_install_title")}</h2>
          <p className="text-slate-400 mb-10">{t("hive_install_desc")}</p>
          <div className="flex flex-col gap-3 mb-8">
            {installSteps.map((s) => <InstallStep key={s.num} {...s} />)}
          </div>
          <p className="text-xs text-slate-600 mb-10">{t("hive_license")}</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/capybarist/hive" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm px-7 py-3.5 transition-colors">
              {t("hive_github_cta")} <ArrowRight size={15} />
            </a>
            <Link href="/#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white font-semibold text-sm px-7 py-3.5 transition-colors">
              {t("contact_cta")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
