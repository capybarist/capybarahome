"use client";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { GAMES, type Game } from "@/lib/games";
import { GamesLockup } from "@/components/GamesMark";
import { CapybaraMark } from "@/components/CapybaraMark";

const MAIN_SITE = "https://www.capybaralabs.tech";

export function GamesLanding() {
  const { lang } = useI18n();
  const en = lang === "en";
  const [featured, ...rest] = GAMES;

  return (
    <div id="top" className="games-bg flex-1 flex flex-col text-[var(--g-cream)]">
      {/* ── Way back to the parent brand ── */}
      <a href={MAIN_SITE}
        className="group block border-b border-white/10 bg-black/25 text-[var(--g-cream-2)] hover:text-white transition-colors">
        <span className="mx-auto max-w-6xl px-4 sm:px-6 h-10 flex items-center gap-2 text-sm">
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          <CapybaraMark className="h-4 w-auto text-[#c4a9ec]" />
          <span>{en ? "Back to" : "Volver a"} <span className="font-semibold text-white">capybara <span className="text-[#c4a9ec]">labs</span></span></span>
        </span>
      </a>

      {/* ── Top bar ── */}
      <header className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 h-20 flex items-center justify-between">
        <a href="#top" className="hover:scale-[1.03] transition-transform" aria-label="Capybara Game Labs">
          <GamesLockup />
        </a>
        <a href={MAIN_SITE} className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-[var(--g-cream-2)] hover:text-white hover:border-white/40 transition-colors">
          by Capybara Labs <ArrowUpRight size={14} />
        </a>
      </header>

      {/* ── Hero ── */}
      <section className="relative -mt-20 pt-20">
        <HeroBackdrop />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-10 pb-56 sm:pt-14 sm:pb-72 text-center">
        <Confetti />
        <div className="relative">
          <h1 className="font-games mt-10 sm:mt-16 text-5xl sm:text-7xl leading-[0.95] tracking-tight">
            {en ? <>Small games,<br /><span className="games-wiggle-text text-[var(--g-sun)]">big smiles.</span></>
                : <>Juegos pequeños,<br /><span className="games-wiggle-text text-[var(--g-sun)]">sonrisas grandes.</span></>}
          </h1>
          <p className="mt-6 mx-auto max-w-xl text-lg text-[var(--g-cream-2)] leading-relaxed">
            {en
              ? "The games corner of Capybara Labs. Casual mobile games for a quick break, made with care and zero nonsense."
              : "El rincón de juegos de Capybara Labs. Juegos móviles para echar un rato, hechos con mimo y sin complicaciones."}
          </p>
          <a href="#games"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--g-sun)] text-[var(--g-night)] font-games text-lg px-7 py-3 shadow-[0_6px_0_#c9922a] hover:translate-y-[2px] hover:shadow-[0_4px_0_#c9922a] active:translate-y-[6px] active:shadow-none transition-all">
            {en ? "See the games" : "Ver los juegos"} <Sparkles size={18} />
          </a>
        </div>
      </div>
      </section>

      {/* ── Games ── */}
      <section id="games" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 -mt-10 sm:-mt-16 pb-24 scroll-mt-6">
        {featured && <FeaturedGame game={featured} en={en} />}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {rest.map((g) => <GameCard key={g.slug} game={g} en={en} />)}
          <MoreSoon en={en} />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-sm text-[var(--g-cream-2)]">
          <a href={MAIN_SITE} className="flex items-center gap-2.5 hover:text-white transition-colors">
            <span>by</span>
            <CapybaraMark className="h-5 w-auto text-[#c4a9ec]" />
            <span className="font-semibold text-white">capybara <span className="text-[#c4a9ec]">labs</span></span>
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <a href="mailto:info@capybaralabs.tech" className="hover:text-white transition-colors">info@capybaralabs.tech</a>
            <span className="text-[var(--g-cream-3)]">© {new Date().getFullYear()} Capybara Labs LLC</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Featured game: big card with the trailer in a phone frame ─────────────────
function FeaturedGame({ game, en }: { game: Game; en: boolean }) {
  const soon = game.status === "coming-soon";
  return (
    <article className="games-card relative rounded-[2rem] p-6 sm:p-10 grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] items-center"
      style={{ "--c1": game.color, "--c2": game.color2 } as React.CSSProperties}>
      <div className="flex justify-center">
        <PhoneVideo game={game} en={en} />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-pixel text-xs tracking-[0.16em] text-[var(--g-cream-2)]">{en ? "FEATURED GAME" : "JUEGO DESTACADO"}</span>
          {soon && <SoonSticker en={en} />}
          {soon && game.launch && <span className="text-sm text-[var(--g-cream-2)]">{en ? game.launch.en : game.launch.es}</span>}
        </div>
        <div className="mt-4 flex items-center gap-4">
          {game.icon && <img src={game.icon} alt="" className="h-16 w-16 rounded-2xl shadow-lg" />}
          <h2 className="font-games text-5xl sm:text-6xl leading-none" style={{ color: game.color }}>{game.name}</h2>
        </div>
        <p className="mt-4 font-games text-2xl text-white">{en ? game.pitch.en : game.pitch.es}</p>
        <p className="mt-3 text-[var(--g-cream-2)] leading-relaxed max-w-xl">{en ? game.body.en : game.body.es}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {game.tags.map((t) => (
            <span key={t.en} className="rounded-full bg-white/10 px-3 py-1 text-sm">{en ? t.en : t.es}</span>
          ))}
        </div>
        <StoreButtons game={game} en={en} />
        {(game.privacy || game.support) && (
          <p className="mt-6 flex gap-4 text-xs text-[var(--g-cream-3)]">
            {game.support && <a href={game.support} className="hover:text-white underline-offset-4 hover:underline">{en ? "Support" : "Soporte"}</a>}
            {game.privacy && <a href={game.privacy} className="hover:text-white underline-offset-4 hover:underline">{en ? "Privacy" : "Privacidad"}</a>}
          </p>
        )}
      </div>
    </article>
  );
}

// ── Regular game card (used once there is more than one game) ─────────────────
function GameCard({ game, en }: { game: Game; en: boolean }) {
  return (
    <article className="games-card rounded-[2rem] p-6 flex flex-col gap-5"
      style={{ "--c1": game.color, "--c2": game.color2 } as React.CSSProperties}>
      <div className="aspect-video rounded-2xl overflow-hidden bg-black/30">
        {game.video
          ? <video key={en ? "en" : "es"} src={en ? game.video.en : game.video.es} poster={game.poster && (en ? game.poster.en : game.poster.es)} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
          : <LightPlaceholder color={game.color} />}
      </div>
      <div className="flex items-center gap-3">
        <h3 className="font-games text-3xl" style={{ color: game.color }}>{game.name}</h3>
        {game.status === "coming-soon" && <SoonSticker en={en} small />}
      </div>
      <p className="font-games text-xl text-white">{en ? game.pitch.en : game.pitch.es}</p>
      <p className="text-[var(--g-cream-2)] leading-relaxed">{en ? game.body.en : game.body.es}</p>
      <StoreButtons game={game} en={en} />
    </article>
  );
}

function MoreSoon({ en }: { en: boolean }) {
  return (
    <div className="rounded-[2rem] border-2 border-dashed border-white/15 p-8 flex flex-col items-center justify-center text-center gap-3 min-h-56 md:col-span-2">
      <span className="text-4xl games-bob" aria-hidden>🎮</span>
      <p className="font-games text-2xl">{en ? "More games on the way" : "Más juegos en camino"}</p>
      <p className="text-[var(--g-cream-2)] max-w-md">
        {en ? "We're cooking up the next ones. Want to know first? Drop us a line." : "Estamos cocinando los siguientes. ¿Quieres enterarte el primero? Escríbenos."}
      </p>
      <a href="mailto:info@capybaralabs.tech?subject=Capybara%20Game%20Labs" className="mt-1 text-[var(--g-mint)] font-semibold hover:underline underline-offset-4">
        info@capybaralabs.tech
      </a>
    </div>
  );
}

function SoonSticker({ en, small }: { en: boolean; small?: boolean }) {
  return (
    <span className={`games-sticker inline-block -rotate-3 rounded-xl bg-[var(--g-coral)] text-white font-games uppercase tracking-wide shadow-[0_4px_0_#b84a32] ${small ? "text-xs px-2.5 py-1" : "text-sm px-3.5 py-1.5"}`}>
      {en ? "Coming soon" : "Próximamente"}
    </span>
  );
}

// ── Trailer: a looping, muted video inside a phone frame ──────────────────────
function PhoneVideo({ game, en }: { game: Game; en: boolean }) {
  return (
    <div className="games-tilt relative w-[240px] sm:w-[280px] rounded-[2.6rem] bg-[#0d0a1f] p-2.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,.6),0_0_0_3px_rgba(255,255,255,.08)]">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[2.1rem] bg-black">
        {game.video
          ? <video key={en ? "en" : "es"} src={en ? game.video.en : game.video.es} poster={game.poster && (en ? game.poster.en : game.poster.es)} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover" aria-label={`${game.name} trailer`} />
          : <LightPlaceholder color={game.color} label={en ? "Trailer coming soon" : "Tráiler muy pronto"} />}
      </div>
    </div>
  );
}

/** Animated stand-in until the real trailer is in: orbs of light rising. */
function LightPlaceholder({ color, label }: { color: string; label?: string }) {
  const orbs = [
    { l: 18, s: 14, d: 0, t: 6 }, { l: 42, s: 22, d: 1.6, t: 7 }, { l: 70, s: 12, d: 0.8, t: 5.5 },
    { l: 30, s: 9, d: 3.1, t: 6.5 }, { l: 58, s: 16, d: 4.2, t: 7.5 }, { l: 82, s: 10, d: 2.4, t: 6 },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `radial-gradient(120% 80% at 50% 110%, ${color}55, transparent 60%), linear-gradient(#1a1240, #0b0820)` }}>
      {orbs.map((o, i) => (
        <span key={i} className="games-orb absolute bottom-[-30px] rounded-full"
          style={{ left: `${o.l}%`, width: o.s, height: o.s, background: color, boxShadow: `0 0 ${o.s * 1.6}px ${o.s / 2}px ${color}aa`, animationDelay: `${o.d}s`, animationDuration: `${o.t}s` }} />
      ))}
      {label && (
        <span className="absolute inset-x-0 bottom-10 text-center font-games text-white/80 text-sm">{label}</span>
      )}
    </div>
  );
}

// ── Store buttons. Disabled ("coming soon") until the store URL exists. ───────
// When the game is live, swap these for the official badge artwork from
// Apple (developer.apple.com/app-store/marketing/guidelines) and Google Play.
function StoreButtons({ game, en }: { game: Game; en: boolean }) {
  const stores = [
    { key: "ios", href: game.appStore, top: en ? "Download on the" : "Descárgalo en el", name: "App Store", icon: <AppleIcon /> },
    { key: "android", href: game.googlePlay, top: en ? "Get it on" : "Disponible en", name: "Google Play", icon: <PlayIcon /> },
  ];
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {stores.map((s) => {
        const inner = (
          <>
            {s.icon}
            <span className="text-left leading-tight">
              <span className="block text-[10px] opacity-80">{s.href ? s.top : (en ? "Soon on" : "Pronto en")}</span>
              <span className="block text-lg font-semibold -mt-0.5">{s.name}</span>
            </span>
          </>
        );
        const cls = "inline-flex items-center gap-2.5 rounded-xl bg-black text-white border border-white/25 pl-3 pr-4 py-2 min-w-[160px]";
        return s.href
          ? <a key={s.key} href={s.href} target="_blank" rel="noopener" className={`${cls} hover:-translate-y-0.5 hover:border-white/60 transition-all`}>{inner}</a>
          : <span key={s.key} aria-disabled className={`${cls} opacity-55 cursor-not-allowed`} title={en ? "Coming soon" : "Próximamente"}>{inner}</span>;
      })}
    </div>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.72-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.31-.89-2.33-3.55zM14.18 6.13c.61-.74 1.02-1.76.91-2.78-.88.04-1.94.59-2.57 1.32-.56.65-1.06 1.69-.93 2.69.98.08 1.98-.5 2.59-1.23z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <path d="M3.6 2.3c-.2.2-.3.6-.3 1v17.4c0 .4.1.8.3 1l9.5-9.7-9.5-9.7z" fill="#32bbff" />
      <path d="M16.3 8.8 5 2.4c-.5-.3-1-.3-1.4-.1l9.5 9.7 3.2-3.2z" fill="#3ad29f" />
      <path d="M16.3 15.2 13.1 12l-9.5 9.7c.4.2.9.2 1.4-.1l11.3-6.4z" fill="#f43249" />
      <path d="m20.2 10.9-3.9-2.1-3.2 3.2 3.2 3.2 3.9-2.2c1.1-.6 1.1-1.5 0-2.1z" fill="#ffd400" />
    </svg>
  );
}

/**
 * Arcade night behind the hero: drifting aurora glows, a twinkling starfield,
 * and a neon perspective grid scrolling towards the viewer.
 */
function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="games-aurora games-aurora-a" />
      <div className="games-aurora games-aurora-b" />
      <div className="games-aurora games-aurora-c" />
      <div className="games-stars" />
      <div className="games-stars games-stars-2" />
      <div className="games-horizon" />
      <div className="games-grid-wrap"><div className="games-grid" /></div>
    </div>
  );
}

/** Scattered playful shapes (dots, squares, rings, plus signs) floating over the hero. */
function Confetti() {
  const bits: { x: string; y: string; c: string; r: number; k: "circle" | "square" | "ring" | "plus" | "tri" }[] = [
    { x: "8%", y: "18%", c: "var(--g-sun)", r: 12, k: "circle" }, { x: "88%", y: "12%", c: "var(--g-mint)", r: 16, k: "square" },
    { x: "14%", y: "62%", c: "var(--g-sky)", r: 18, k: "ring" }, { x: "82%", y: "58%", c: "var(--g-coral)", r: 18, k: "plus" },
    { x: "28%", y: "8%", c: "var(--g-coral)", r: 9, k: "circle" }, { x: "72%", y: "30%", c: "var(--g-sun)", r: 14, k: "tri" },
    { x: "4%", y: "40%", c: "var(--g-mint)", r: 14, k: "plus" }, { x: "94%", y: "38%", c: "var(--g-sky)", r: 9, k: "circle" },
    { x: "22%", y: "36%", c: "var(--g-sun)", r: 8, k: "square" }, { x: "64%", y: "6%", c: "var(--g-sky)", r: 14, k: "ring" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {bits.map((b, i) => (
        <span key={i} className="games-float absolute" style={{ left: b.x, top: b.y, width: b.r, height: b.r, animationDelay: `${i * 0.6}s`, color: b.c }}>
          {b.k === "circle" && <span className="block h-full w-full rounded-full bg-current" />}
          {b.k === "square" && <span className="block h-full w-full rounded-[3px] bg-current" />}
          {b.k === "ring" && <span className="block h-full w-full rounded-full border-[3px] border-current" />}
          {b.k === "plus" && (
            <svg viewBox="0 0 10 10" className="h-full w-full"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
          )}
          {b.k === "tri" && (
            <svg viewBox="0 0 10 10" className="h-full w-full"><path d="M5 1.2 9 8.6H1z" fill="currentColor" strokeLinejoin="round" /></svg>
          )}
        </span>
      ))}
    </div>
  );
}
