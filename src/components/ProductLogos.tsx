// The products' own marks, copied from their repos so this site shows the
// same icon people see on each product:
// - Acquis: capybarist/acquis packages/web/app/brandmark.tsx (+ public/icon.png tile)
// - Tribu: capybarist/pawfy src/components/Logo.tsx (PawMark, + src/app/icon.svg tile)
// - HIVE: capybarist/hive docs/assets/HiveLogo.png (hexagons cropped)
// - Reagent Lab: capybarist/reagentlab apps/web/src/app/layout.tsx (Flask)

export function AcquisMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <polygon points="32,3 57,17.5 57,46.5 32,61 7,46.5 7,17.5"
        fill="rgba(139,92,246,.14)" stroke="#8b5cf6" strokeWidth="3.5" strokeLinejoin="round" />
      <text x="32" y="30.5" textAnchor="middle" dominantBaseline="central"
        fontFamily="Georgia, serif" fontWeight="700" fontSize="34" fill="#c4b5fd">§</text>
    </svg>
  );
}

export function TribuPaw({ className, color = "#fff" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g fill={color}>
        <ellipse cx="14.5" cy="25" rx="4.6" ry="6" transform="rotate(-22 14.5 25)" />
        <ellipse cx="25.5" cy="15.5" rx="4.6" ry="6.2" transform="rotate(-8 25.5 15.5)" />
        <ellipse cx="38.5" cy="15.5" rx="4.6" ry="6.2" transform="rotate(8 38.5 15.5)" />
        <ellipse cx="49.5" cy="25" rx="4.6" ry="6" transform="rotate(22 49.5 25)" />
      </g>
      <path d="M19.5 39Q32 55 44.5 39" fill="none" stroke={color} strokeWidth="7.5" strokeLinecap="round" />
    </svg>
  );
}

export function ReagentFlask({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M9 3h6M10 3v6.2L4.6 18.4A1.7 1.7 0 0 0 6.1 21h11.8a1.7 1.7 0 0 0 1.5-2.6L14 9.2V3"
        stroke="#1d1d1b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.2 15h9.6" stroke="#2f5d50" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** A product's app-style tile: its real mark on its own background. */
export function ProductTile({ slug, className = "w-12 h-12 rounded-2xl" }: { slug: string; className?: string }) {
  const base = `${className} shrink-0 flex items-center justify-center overflow-hidden`;
  switch (slug) {
    case "acquis":
      return <span className={`${base} bg-[#070a12]`} aria-hidden><AcquisMark className="w-[72%] h-[72%]" /></span>;
    case "tribu":
      return <span className={`${base} bg-[#fb6220]`} aria-hidden><TribuPaw className="w-[70%] h-[70%]" /></span>;
    case "hive":
      return (
        <span className={`${base} bg-white border border-[var(--border)]`} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/hive-mark.png" alt="" className="w-[88%] h-[88%] object-contain" />
        </span>
      );
    case "reagentlab":
      return <span className={`${base} bg-[#faf8f3] border border-[var(--border)]`} aria-hidden><ReagentFlask className="w-[62%] h-[62%]" /></span>;
    default:
      return <span className={`${base} bg-[var(--bg-muted)]`} aria-hidden />;
  }
}
