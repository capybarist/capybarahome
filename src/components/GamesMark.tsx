import { useId } from "react";

const BODY =
  "M18 88 C14 64 17 44 30 33 C36 28 44 26.5 52 27 L74 29.5 C85 31 91 38 91 47.5 L91 55.5 C91 63 85.5 68 78 68 L66 68.5 C58 69 54 75 54 88 Z";

/**
 * The Capybara Game Labs mark: the Capybara Labs capybara inside an app-icon
 * tile with a sunset gradient and a little sparkle. Same capybara as the
 * corporate mark, so it reads as the same family.
 */
export function GamesMark({ className, title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 100" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} focusable="false">
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc93c" />
          <stop offset="1" stopColor="#ff6b5b" />
        </linearGradient>
        <clipPath id={`c-${id}`}><rect width="100" height="100" rx="26" /></clipPath>
        <mask id={`m-${id}`}>
          <rect width="100" height="100" fill="#fff" />
          <ellipse cx="31.5" cy="26.5" rx="2.4" ry="3.6" transform="rotate(-25 31.5 26.5)" fill="#000" />
          <ellipse cx="62" cy="41.5" rx="3.6" ry="3" fill="#000" />
          <path d="M84 44.5 v3.5" stroke="#000" strokeWidth="2.8" strokeLinecap="round" />
        </mask>
      </defs>
      <rect width="100" height="100" rx="26" fill={`url(#g-${id})`} />
      <g clipPath={`url(#c-${id})`}>
        <g transform="translate(6 26) scale(.86)">
          <g mask={`url(#m-${id})`} fill="#1d1442">
            <path d={BODY} />
            <ellipse cx="32" cy="27" rx="7" ry="8" transform="rotate(-25 32 27)" />
          </g>
        </g>
      </g>
      <path d="M80 9 l2.6 6.4 6.4 2.6 -6.4 2.6 -2.6 6.4 -2.6 -6.4 -6.4 -2.6 6.4 -2.6z" fill="#fff7e8" />
    </svg>
  );
}

/** Mark + wordmark ("capybara" / "GAME LABS"). */
export function GamesLockup({ className, markClass = "h-11 w-11" }: { className?: string; markClass?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <GamesMark className={`${markClass} drop-shadow-[0_6px_18px_rgba(255,122,89,.35)]`} />
      <span className="leading-none">
        <span className="font-games block text-2xl text-[var(--g-cream)]">capybara</span>
        <span className="font-pixel block mt-1 text-[0.72rem] tracking-[0.18em] text-[var(--g-sun)]">GAME LABS</span>
      </span>
    </span>
  );
}
