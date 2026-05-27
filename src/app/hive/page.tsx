"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useState, useEffect, useRef } from "react";
import {
  CheckCircle2, ArrowRight, Copy, Search, Loader2,
  Shield, FileText, Globe, Network,
  Users, Code2, Leaf, ExternalLink, Activity, Database, Clock,
  Lock, Cpu, Layers, Puzzle, GraduationCap, Building2,
} from "lucide-react";


// ── Types ─────────────────────────────────────────────────────────────────────
interface Fragment {
  id: string; title?: string; source: string; score: number;
  confidence: number; doi?: string; text: string; node_id?: string; arxiv_id?: string;
}
interface QueryResult { answer?: string; mode?: string; fragments?: Fragment[]; has_hive_data?: boolean; }
interface Stats { fragments?: number; bees?: number; topics?: number; }
interface CrawlState {
  queue_size?: number;
  visited_size?: number;
  next_in_queue?: string[];
  recent_visited?: string[];
  source_peer?: string;
  error?: string;
}

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
  { name: "ForagerSource", desc: "Source-driven extraction interface (v0.7.3) — Wikipedia, arXiv, RSS, web. Each BEE publishes a signed BeeManifest declaring its sources.", href: "https://github.com/capybarist/hive" },
  { name: "sentence-transformers", desc: "Local semantic embeddings (all-MiniLM-L6-v2, ~80MB, runs on CPU)", href: "https://github.com/UKPLab/sentence-transformers" },
  { name: "Qdrant", desc: "Vector database for the queen node — scalable search across the full network", href: "https://qdrant.tech" },
  { name: "Ollama / Groq / Gemini / Claude / OpenAI", desc: "Query synthesis only (v0.6+). Extraction is LLM-free — verbatim from source APIs, signed with ed25519.", href: "https://ollama.com" },
];

// A BEE is the lightest node — no LLM, no API key, no Python. This is the
// quickstart the "Run a BEE" section shows. Queen / full-stack instructions
// live in the README (linked from the section).
const installSteps = [
  { num: "1", label: "Clone", cmd: "git clone https://github.com/capybarist/hive.git && cd hive" },
  { num: "2", label: "Install", cmd: "npm install" },
  { num: "3", label: "Run a BEE", cmd: "bash hive.sh   # bee on :8080 — no key, no LLM, no Python" },
  { num: "4", label: "Or Docker", cmd: "docker compose up -d bee-1   # same bee, nothing to install but Docker" },
];

// ── Live production nodes ───────────────────────────────────────────────────
// Real queen + bee running on the Hetzner box. Plain HTTP dashboards — these
// are the actual nodes the Try-HIVE widget and Forager widget read from.
const LIVE_NODES = {
  queen: "http://178.105.140.134:8090/",
  bee: "http://178.105.140.134:8080/",
};

// ── Technical deep-dive ─────────────────────────────────────────────────────
// For readers who want the primitives. Bilingual; rendered by the deep-dive
// section. Kept here (not in i18n) because it's long-form, page-specific copy.
const techDetails: Record<"es" | "en", { name: string; sub: string; body: string; href?: string }[]> = {
  en: [
    { name: "Hypercore", sub: "Append-only signed log", href: "https://github.com/holepunchto/hypercore",
      body: "Each node owns a Hypercore: an append-only log where every block is hashed into a Merkle tree and signed by the node's key. Blocks are immutable and verifiable in isolation — a peer can prove block N belongs to the log without trusting anyone. This is the same core that powers Keet." },
    { name: "Hyperbee", sub: "B-tree over Hypercore", href: "https://github.com/holepunchto/hyperbee",
      body: "Fragments, claims and the bee manifest are stored in a Hyperbee — an ordered key-value B-tree layered on the Hypercore. It gives range queries and history streams while inheriting the log's append-only, signed guarantees. The queen's replication reads a Hyperbee history stream to ingest fragments in order." },
    { name: "ed25519 + SHA-256", sub: "Per-fragment provenance",
      body: "Every fragment is hashed (SHA-256) over its payload and signed (ed25519) by the producing bee. On receive, a queen recomputes the hash and verifies the signature against the bee's published public key before indexing — a tampered or unsigned fragment is dropped. Provenance survives replication and even cross-swarm merges." },
    { name: "Hyperswarm DHT", sub: "Discovery + NAT traversal", href: "https://github.com/holepunchto/hyperswarm",
      body: "Nodes find each other by joining a topic (a 32-byte key) on the Hyperswarm DHT — no central registry, no bootstrap server you have to run. The DHT introduces peers and hole-punches through NATs; from there native Hypercore replication takes over the connection." },
    { name: "Encryption & allowlists", sub: "Private swarms",
      body: "A public swarm is a known topic hash. A private one flips three knobs: a random 32-byte topic (2²⁵⁶ search space), Hypercore encryption keys so cores are ciphertext at rest and on the wire, and a pubkey allowlist that drops any unauthorized connection. Same protocol, sealed perimeter." },
    { name: "Qdrant + MiniLM", sub: "Query side", href: "https://qdrant.tech",
      body: "The queen embeds fragment text locally with all-MiniLM-L6-v2 (~80 MB, CPU) and indexes the vectors in Qdrant. A query embeds the question, pulls top-K by cosine similarity, gates them by score + keyword match, and passes the survivors to one LLM call for synthesis. The LLM is the only non-local, non-deterministic step — and the only place a key is used." },
  ],
  es: [
    { name: "Hypercore", sub: "Log firmado append-only", href: "https://github.com/holepunchto/hypercore",
      body: "Cada nodo posee un Hypercore: un log append-only donde cada bloque se hashea en un árbol de Merkle y se firma con la clave del nodo. Los bloques son inmutables y verificables de forma aislada — un peer puede probar que el bloque N pertenece al log sin confiar en nadie. Es el mismo core que mueve Keet." },
    { name: "Hyperbee", sub: "B-tree sobre Hypercore", href: "https://github.com/holepunchto/hyperbee",
      body: "Los fragmentos, claims y el manifiesto de la abeja se guardan en un Hyperbee — un árbol B clave-valor ordenado sobre el Hypercore. Da consultas por rango y streams de historial heredando las garantías firmadas y append-only del log. La replicación de la reina lee un stream de historial del Hyperbee para ingerir fragmentos en orden." },
    { name: "ed25519 + SHA-256", sub: "Procedencia por fragmento",
      body: "Cada fragmento se hashea (SHA-256) sobre su payload y se firma (ed25519) con la abeja que lo produjo. Al recibirlo, la reina recalcula el hash y verifica la firma contra la clave pública publicada de la abeja antes de indexar — un fragmento manipulado o sin firmar se descarta. La procedencia sobrevive a la replicación e incluso a fusiones entre swarms." },
    { name: "Hyperswarm DHT", sub: "Descubrimiento + NAT", href: "https://github.com/holepunchto/hyperswarm",
      body: "Los nodos se encuentran uniéndose a un topic (una clave de 32 bytes) en la DHT de Hyperswarm — sin registro central, sin servidor de bootstrap que tengas que correr. La DHT presenta a los peers y atraviesa NATs; a partir de ahí la replicación nativa de Hypercore toma la conexión." },
    { name: "Cifrado y allowlists", sub: "Swarms privados",
      body: "Un swarm público es un hash de topic conocido. Uno privado activa tres palancas: un topic aleatorio de 32 bytes (espacio de 2²⁵⁶), claves de cifrado Hypercore para que los cores sean texto cifrado en reposo y en tránsito, y una allowlist de claves públicas que rechaza cualquier conexión no autorizada. Mismo protocolo, perímetro sellado." },
    { name: "Qdrant + MiniLM", sub: "Lado de consulta", href: "https://qdrant.tech",
      body: "La reina embebe el texto del fragmento localmente con all-MiniLM-L6-v2 (~80 MB, CPU) e indexa los vectores en Qdrant. Una consulta embebe la pregunta, saca el top-K por similitud coseno, los filtra por score + coincidencia de palabras, y pasa los supervivientes a una sola llamada al LLM para sintetizar. El LLM es el único paso no local y no determinista — y el único sitio donde se usa una clave." },
  ],
};

// ── Use cases ───────────────────────────────────────────────────────────────
// The 7 deployment patterns. Bilingual, page-specific long-form copy.
const useCases: Record<"es" | "en", { n: string; tag: string; title: string; body: string; chips: string[] }[]> = {
  en: [
    { n: "01", tag: "Public", title: "Join the public swarm with one topic hash",
      body: "A queen joins the public HIVE by hashing a known string — sha256(\"hive-network-v0.1\") — and calling swarm.join(topic). Hyperswarm's DHT introduces it to every BEE on that topic; native Hypercore replication brings their signed fragments down with no central registry in between. Specialized public meshes are just a different string — \"hive-medical-v0.1\", \"hive-legal-v0.1\" — same protocol, narrower swarm.",
      chips: ["hyperswarm topic", "DHT discovery", "ed25519 fragments", "no registry"] },
    { n: "02", tag: "Private", title: "Run a private swarm for internal use",
      body: "Same BEEs and queens, three config knobs flip the network private: a random 32-byte swarm topic (2²⁵⁶ search space), Hypercore encryption keys so cores are ciphertext at rest and on the wire, and a peer allowlist by pubkey that drops any unauthorized connection on sight. Internal BEEs index company wikis, tickets, repos, contracts; a queen indexes them and serves /api/query — no traffic ever leaves the perimeter.",
      chips: ["random topic", "encrypted cores", "pubkey allowlist", "air-gapped"] },
    { n: "03", tag: "B2B", title: "Share private keys between companies",
      body: "Two organisations exchange three values out-of-band — swarm topic, Hypercore encryption key, and each side's queen pubkey for the allowlist. Both queens join the same private swarm and replicate only the BEEs the other party chose to expose. No copy, no third-party broker, no merge of hives: each company keeps its own queen, its own Qdrant index, its own audit trail. Revocation is a key roll or an allowlist edit.",
      chips: ["shared swarm", "encryption key", "selective exposure", "revocable"] },
    { n: "04", tag: "Hybrid", title: "One queen in many swarms — composed coverage",
      body: "Cases 01–03 compose at the queen layer. A single queen can join as many topics as it has credentials for — public mesh, its own private swarm, every partner swarm — and replicate BEEs from all of them into one Qdrant index. One query, one LLM synthesis, sources drawn from every swarm the queen belongs to. Every fragment keeps its origin pubkey and signature, so provenance survives the merge. Nothing crosses between swarms — the queen is the only place they meet.",
      chips: ["multi-swarm queen", "single index", "provenance preserved", "no cross-leak"] },
    { n: "05", tag: "Extensibility", title: "Custom connectors as ForagerSource plugins",
      body: "Anything not already covered — a legacy ERP, an in-house REST API, a proprietary archive — is wired in by implementing the ForagerSource interface (seed / fetch / normalize / owns), publishing it as an npm package and adding its id to the BEE's manifest. On next start the forager picks it up, drains its queue mechanically and signs every emitted fragment. No fork of HIVE core, no central registry to update — the connector lives in the customer's repo.",
      chips: ["ForagerSource", "npm package", "BeeManifest.sources", "no fork"] },
    { n: "06", tag: "Local AI", title: "Queen with a local LLM — full offline stack",
      body: "The queen's LLM client is pluggable; point it at Ollama (or any local runtime) and the entire stack runs on-prem — BEEs extracting, Qdrant indexing, embedder local, synthesis local. No API key, no traffic leaves the box. A small model has narrow parametric memory; the queen's retrieval gives it grounded, signed context at query time — the combination behaves like a much larger model on domain-bounded tasks while preserving privacy. The natural knowledge layer for QVAC-style local agents.",
      chips: ["ollama / local LLM", "on-prem", "zero cloud", "grounded small model"] },
    { n: "07", tag: "Training", title: "Training corpus with cryptographic provenance",
      body: "BEEs store extraction verbatim — no LLM in the loop, no paraphrase. Every fragment carries source URL, scope, timestamp and an ed25519 signature. That makes a HIVE an unusually clean training source: stream fragments straight off the queen's replicated Hypercores into a pre-training, SFT or distillation pipeline. Filter by source, scope, language or signing BEE to build a broad generalist corpus or a narrow specialist one. Provenance is per-fragment and verifiable — useful for licence propagation and dataset audit.",
      chips: ["verbatim · signed", "filter by scope", "pre-train / SFT", "distillation"] },
  ],
  es: [
    { n: "01", tag: "Público", title: "Únete al swarm público con un hash de topic",
      body: "Una reina se une al HIVE público hasheando una cadena conocida — sha256(\"hive-network-v0.1\") — y llamando a swarm.join(topic). La DHT de Hyperswarm la presenta a cada BEE en ese topic; la replicación nativa de Hypercore baja sus fragmentos firmados sin ningún registro central en medio. Las mallas públicas especializadas son solo otra cadena — \"hive-medical-v0.1\", \"hive-legal-v0.1\" — mismo protocolo, swarm más estrecho.",
      chips: ["topic hyperswarm", "descubrimiento DHT", "fragmentos ed25519", "sin registro"] },
    { n: "02", tag: "Privado", title: "Monta un swarm privado para uso interno",
      body: "Las mismas BEEs y reinas; tres ajustes vuelven la red privada: un topic aleatorio de 32 bytes (espacio de 2²⁵⁶), claves de cifrado Hypercore para que los cores sean texto cifrado en reposo y en tránsito, y una allowlist de peers por clave pública que rechaza cualquier conexión no autorizada. Las BEEs internas indexan wikis, tickets, repos y contratos de la empresa; una reina los indexa y sirve /api/query — ningún tráfico sale del perímetro.",
      chips: ["topic aleatorio", "cores cifrados", "allowlist de claves", "aislado"] },
    { n: "03", tag: "B2B", title: "Comparte claves privadas entre empresas",
      body: "Dos organizaciones intercambian tres valores fuera de banda — topic del swarm, clave de cifrado Hypercore y la clave pública de la reina de cada lado para la allowlist. Ambas reinas se unen al mismo swarm privado y replican solo las BEEs que la otra parte decidió exponer. Sin copia, sin broker externo, sin fusión de hives: cada empresa conserva su reina, su índice Qdrant y su rastro de auditoría. Revocar es rotar una clave o editar la allowlist.",
      chips: ["swarm compartido", "clave de cifrado", "exposición selectiva", "revocable"] },
    { n: "04", tag: "Híbrido", title: "Una reina en muchos swarms — cobertura compuesta",
      body: "Los casos 01–03 se componen en la capa de la reina. Una sola reina puede unirse a tantos topics como credenciales tenga — malla pública, su swarm privado, cada swarm de partner — y replicar BEEs de todos ellos en un único índice Qdrant. Una consulta, una síntesis del LLM, fuentes de cada swarm al que pertenece la reina. Cada fragmento mantiene su clave de origen y su firma, así que la procedencia sobrevive a la fusión. Nada cruza entre swarms — la reina es el único punto donde se encuentran.",
      chips: ["reina multi-swarm", "índice único", "procedencia intacta", "sin fugas"] },
    { n: "05", tag: "Extensibilidad", title: "Conectores a medida como plugins ForagerSource",
      body: "Cualquier cosa no cubierta — un ERP heredado, una API REST interna, un archivo propietario — se integra implementando la interfaz ForagerSource (seed / fetch / normalize / owns), publicándola como paquete npm y añadiendo su id al manifiesto de la BEE. En el siguiente arranque el forager la recoge, drena su cola mecánicamente y firma cada fragmento emitido. Sin forkear el core de HIVE, sin registro central que actualizar — el conector vive en el repo del cliente.",
      chips: ["ForagerSource", "paquete npm", "BeeManifest.sources", "sin fork"] },
    { n: "06", tag: "IA Local", title: "Reina con LLM local — stack offline completo",
      body: "El cliente LLM de la reina es enchufable; apúntalo a Ollama (o cualquier runtime local) y todo el stack corre on-prem — BEEs extrayendo, Qdrant indexando, embedder local, síntesis local. Sin API key, sin tráfico que salga de la máquina. Un modelo pequeño tiene memoria paramétrica estrecha; la recuperación de la reina le da contexto firmado y con fuentes en tiempo de consulta — la combinación se comporta como un modelo mucho mayor en tareas acotadas a un dominio, preservando la privacidad. La capa de conocimiento natural para agentes locales tipo QVAC.",
      chips: ["ollama / LLM local", "on-prem", "cero nube", "modelo pequeño con fuentes"] },
    { n: "07", tag: "Entrenamiento", title: "Corpus de entrenamiento con procedencia criptográfica",
      body: "Las BEEs guardan la extracción verbatim — sin LLM de por medio, sin parafraseo. Cada fragmento lleva URL de origen, scope, timestamp y firma ed25519. Eso hace de un HIVE una fuente de entrenamiento inusualmente limpia: streamea fragmentos directamente desde los Hypercores replicados de la reina hacia un pipeline de pre-training, SFT o destilación. Filtra por fuente, scope, idioma o BEE firmante para construir un corpus generalista amplio o uno especialista estrecho. La procedencia es por fragmento y verificable — útil para propagación de licencias y auditoría de datasets.",
      chips: ["verbatim · firmado", "filtra por scope", "pre-train / SFT", "destilación"] },
  ],
};

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

// ── Forager live widget ────────────────────────────────────────────────────────
// Polls /api/hive/crawl every 15s to surface what the bee crawler is doing
// right now: queue depth, what it has already visited, what it will fetch next.
function ForagerLive() {
  const { t } = useI18n();
  const [state, setState] = useState<CrawlState | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [lastTick, setLastTick] = useState<number>(Date.now());
  const [prevFragments, setPrevFragments] = useState<number | null>(null);
  const [growthPerMin, setGrowthPerMin] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const [cRes, sRes, stRes] = await Promise.all([
          fetch("/api/hive/crawl", { cache: "no-store" }),
          fetch("/api/hive/stats", { cache: "no-store" }),
          fetch("/api/hive/status", { cache: "no-store" }),
        ]);
        if (cancelled) return;
        if (cRes.ok) setState(await cRes.json());
        if (stRes.ok) {
          const st = await stRes.json() as { version?: string };
          if (st.version) setVersion(st.version);
        }
        if (sRes.ok) {
          const s = (await sRes.json()) as Stats;
          if (prevFragments != null && s.fragments != null) {
            const dt = (Date.now() - lastTick) / 1000 / 60; // minutes
            if (dt > 0) {
              const delta = s.fragments - prevFragments;
              setGrowthPerMin(Math.round((delta / dt) * 10) / 10);
            }
          }
          if (s.fragments != null) setPrevFragments(s.fragments);
          setLastTick(Date.now());
          setStats(s);
        }
      } catch {
        /* ignore network errors — keep last good state */
      }
    };
    void tick();
    const id = setInterval(tick, 15_000);
    return () => { cancelled = true; clearInterval(id); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state || state.error) return null;

  return (
    <section className="bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-2">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                {t("hive_forager_eyebrow")}
              </span>
            </p>
            <h2 className="text-2xl font-black text-[var(--text)] tracking-tight">
              {t("hive_forager_title")}
              {version && (
                <span
                  className="ml-3 align-middle inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--muted)] font-mono"
                  title="HIVE queen version"
                >
                  v{version}
                </span>
              )}
            </h2>
            <p className="text-xs text-[var(--muted)] mt-1">{t("hive_forager_sub")}</p>
          </div>
          <div className="text-xs text-[var(--muted)] font-mono">
            {t("hive_forager_updated")}: {new Date(lastTick).toLocaleTimeString()}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard
            Icon={Database}
            label={t("hive_forager_card_indexed")}
            value={stats?.fragments?.toLocaleString() ?? "—"}
            tone="violet"
          />
          <StatCard
            Icon={Clock}
            label={t("hive_forager_card_queue")}
            value={(state.queue_size ?? 0).toLocaleString()}
            tone="sky"
          />
          <StatCard
            Icon={CheckCircle2}
            label={t("hive_forager_card_visited")}
            value={(state.visited_size ?? 0).toLocaleString()}
            tone="green"
          />
          <StatCard
            Icon={Activity}
            label={t("hive_forager_card_rate")}
            value={growthPerMin != null ? `${growthPerMin >= 0 ? "+" : ""}${growthPerMin}/min` : "—"}
            tone="amber"
          />
        </div>

        {/* Live lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ArticleList
            title={t("hive_forager_recent_title")}
            subtitle={t("hive_forager_recent_sub")}
            items={state.recent_visited ?? []}
            empty={t("hive_forager_recent_empty")}
            kind="visited"
          />
          <ArticleList
            title={t("hive_forager_next_title")}
            subtitle={t("hive_forager_next_sub")}
            items={state.next_in_queue ?? []}
            empty={t("hive_forager_next_empty")}
            kind="queue"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  Icon,
  label,
  value,
  tone,
}: {
  Icon: typeof Database;
  label: string;
  value: string;
  tone: "violet" | "sky" | "green" | "amber";
}) {
  const colors = {
    violet: { bg: "bg-violet-50", text: "text-violet-700", icon: "text-violet-500" },
    sky:    { bg: "bg-sky-50",    text: "text-sky-700",    icon: "text-sky-500"    },
    green:  { bg: "bg-green-50",  text: "text-green-700",  icon: "text-green-500"  },
    amber:  { bg: "bg-amber-50",  text: "text-amber-700",  icon: "text-amber-500"  },
  }[tone];
  return (
    <div className={`rounded-xl border border-[var(--border)] ${colors.bg} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className={colors.icon} />
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{label}</span>
      </div>
      <div className={`text-2xl font-black tabular-nums ${colors.text}`}>{value}</div>
    </div>
  );
}

function ArticleList({
  title,
  subtitle,
  items,
  empty,
  kind,
}: {
  title: string;
  subtitle: string;
  items: string[];
  empty: string;
  kind: "visited" | "queue";
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <div className="mb-3">
        <h3 className="text-sm font-bold text-[var(--text)]">{title}</h3>
        <p className="text-xs text-[var(--muted)] mt-0.5">{subtitle}</p>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-[var(--muted)] italic py-4">{empty}</p>
      ) : (
        <ul className="space-y-1.5">
          {items.slice(0, 10).map((title, i) => {
            const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;
            return (
              <li key={`${kind}-${i}-${title}`} className="flex items-center gap-2 text-sm">
                <span className="text-xs text-[var(--muted)] font-mono w-6 text-right shrink-0">
                  {i + 1}
                </span>
                <a
                  href={wikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text)] hover:text-[var(--accent)] truncate flex items-center gap-1.5 group"
                >
                  <span className="truncate">{title}</span>
                  <ExternalLink size={11} className="text-[var(--muted)] opacity-0 group-hover:opacity-100 shrink-0" />
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// Icon per use-case tag, by index 0–6.
const USE_CASE_ICONS = [Globe, Lock, Building2, Layers, Puzzle, Cpu, GraduationCap];

export default function HivePage() {
  const { t, lang } = useI18n();
  const ucList = useCases[lang === "en" ? "en" : "es"];
  const techList = techDetails[lang === "en" ? "en" : "es"];

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
          <p className="text-base text-slate-500 italic mb-6">&ldquo;{t("hive_hero_tagline")}&rdquo;</p>
          <p className="text-lg md:text-xl font-semibold text-violet-200 max-w-2xl mx-auto mb-10 leading-snug">
            {lang === "en"
              ? "Build your own RAG — or share knowledge with anyone — with no servers in between."
              : "Crea tu propio RAG — o comparte conocimiento con cualquiera — sin servidores de por medio."}
          </p>
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

      {/* ── Forager live status ───────────────────────────────────────────── */}
      <ForagerLive />

      {/* ── Live production nodes ─────────────────────────────────────────── */}
      <section className="bg-[var(--bg-subtle)] border-b border-[var(--border)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {lang === "en" ? "Live nodes" : "Nodos en vivo"}
              </span>
            </p>
            <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mb-3">
              {lang === "en" ? "A queen and a bee, running right now" : "Una reina y una abeja, ahora mismo"}
            </h2>
            <p className="text-[var(--muted)] max-w-xl mx-auto text-sm leading-relaxed">
              {lang === "en"
                ? "Not a canned demo — two real nodes in production. Open their dashboards and watch them work."
                : "No es una demo enlatada — dos nodos reales en producción. Abre sus paneles y míralos trabajar."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { Icon: Database, href: LIVE_NODES.queen, port: ":8090",
                title: lang === "en" ? "Queen dashboard" : "Panel de la reina",
                desc: lang === "en"
                  ? "Queries the Qdrant index, answers /api/query with verified sources."
                  : "Consulta el índice Qdrant, responde /api/query con fuentes verificadas." },
              { Icon: Activity, href: LIVE_NODES.bee, port: ":8080",
                title: lang === "en" ? "Bee dashboard" : "Panel de la abeja",
                desc: lang === "en"
                  ? "Extracts from Wikipedia live, signs and publishes fragments to its Hypercore."
                  : "Extrae de Wikipedia en vivo, firma y publica fragmentos en su Hypercore." },
            ].map(({ Icon, href, port, title, desc }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-4 p-6 rounded-2xl border border-[var(--border)] bg-white card-hover">
                <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-violet-600" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[var(--text)]">{title}</h3>
                    <span className="text-[10px] font-mono text-[var(--muted)] border border-[var(--border)] rounded px-1.5 py-0.5">{port}</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-2">{desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] group-hover:gap-2 transition-all">
                    {lang === "en" ? "Open dashboard" : "Abrir panel"} <ExternalLink size={12} />
                  </span>
                </div>
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-[var(--muted)] mt-4">
            {lang === "en"
              ? "Plain HTTP, no TLS — your browser may warn. These are the same nodes the live demo above reads from."
              : "HTTP plano, sin TLS — tu navegador puede avisar. Son los mismos nodos que lee la demo de arriba."}
          </p>
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

      {/* ── Use cases ────────────────────────────────────────────────────── */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4">
            {lang === "en" ? "Use cases" : "Casos de uso"}
          </p>
          <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mb-4">
            {lang === "en" ? "What it's for" : "Para qué sirve"}
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-10 max-w-2xl">
            {lang === "en"
              ? "Distributed RAG — public and private, specialized and general, for local or cloud LLMs. Run your own knowledge base, or share it peer-to-peer with no server in the middle. The same protocol composes into seven deployment patterns."
              : "RAG distribuido — público y privado, especializado y general, para LLMs locales o en la nube. Monta tu propia base de conocimiento, o compártela peer-to-peer sin ningún servidor de por medio. El mismo protocolo se compone en siete patrones de despliegue."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ucList.map((uc, i) => {
              const Icon = USE_CASE_ICONS[i] ?? Globe;
              return (
                <div key={uc.n} className="flex flex-col p-6 rounded-2xl border border-[var(--border)] bg-white card-hover">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-black text-sm text-[var(--accent)]/40 tabular-nums">{uc.n}</span>
                    <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                      <Icon size={15} className="text-violet-600" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 bg-violet-50 rounded-full px-2.5 py-1">{uc.tag}</span>
                  </div>
                  <h3 className="font-bold text-[var(--text)] mb-2 leading-snug">{uc.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 flex-1">{uc.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {uc.chips.map((c) => (
                      <span key={c} className="text-[11px] font-mono text-[var(--text-2)] bg-[var(--bg-subtle)] border border-[var(--border)] rounded px-2 py-0.5">{c}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Technology ───────────────────────────────────────────────────── */}
      <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)] py-20">
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

      {/* ── Technical deep-dive ──────────────────────────────────────────── */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4">
            {lang === "en" ? "Under the hood" : "Por dentro"}
          </p>
          <h2 className="text-3xl font-black text-[var(--text)] tracking-tight mb-4">
            {lang === "en" ? "How it works underneath" : "Cómo funciona por dentro"}
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-10 max-w-2xl">
            {lang === "en"
              ? "For readers who want the detail — the cryptographic and P2P primitives HIVE is built on."
              : "Para quien quiera el detalle — las primitivas criptográficas y P2P sobre las que se construye HIVE."}
          </p>

          <div className="space-y-3">
            {techList.map(({ name, sub, body, href }) => (
              <div key={name} className="p-6 rounded-2xl border border-[var(--border)] bg-white">
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <h3 className="font-bold text-[var(--text)]">
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="hover:text-[var(--accent)] inline-flex items-center gap-1.5">
                        {name} <ExternalLink size={12} className="text-[var(--muted)]" />
                      </a>
                    ) : name}
                  </h3>
                  <span className="text-xs font-mono text-[var(--muted)]">{sub}</span>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
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
