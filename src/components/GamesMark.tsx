import { useId } from "react";

/**
 * The Capybara Game Labs mark: the Capybara Labs capybara, in a playful pose,
 * with a little yuzu balanced on its head. Body takes the current text colour;
 * the yuzu has its own colours.
 */
export function GamesMark({ className, fruit = "#ffb020", leaf = "#3ccf91" }: { className?: string; fruit?: string; leaf?: string }) {
  const mask = `gm-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="12 4 81 86" className={className} aria-hidden focusable="false">
      <mask id={mask}>
        <rect x="0" y="0" width="100" height="100" fill="#fff" />
        {/* Happy closed eye instead of the round one. */}
        <path d="M58.4 42.6 q3.6 -4 7.2 0" stroke="#000" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M84 44.5 v3.5" stroke="#000" strokeWidth="2.8" strokeLinecap="round" />
        <ellipse cx="31.5" cy="26.5" rx="2.4" ry="3.6" transform="rotate(-25 31.5 26.5)" fill="#000" />
      </mask>
      <g mask={`url(#${mask})`} fill="currentColor">
        <path d="M18 88 C14 64 17 44 30 33 C36 28 44 26.5 52 27 L74 29.5 C85 31 91 38 91 47.5 L91 55.5 C91 63 85.5 68 78 68 L66 68.5 C58 69 54 75 54 88 Z" />
        <ellipse cx="32" cy="27" rx="7" ry="8" transform="rotate(-25 32 27)" />
      </g>
      {/* Blush */}
      <ellipse cx="71" cy="52" rx="4" ry="2.4" fill="#ff7a8a" opacity=".55" />
      {/* Yuzu */}
      <circle cx="60" cy="19.5" r="8.2" fill={fruit} />
      <circle cx="57.4" cy="16.8" r="2" fill="#fff" opacity=".45" />
      <path d="M60 11.6 c1.5 -4.2 5.6 -5.4 8.6 -4.4 c-1.2 3.4 -4.6 5.2 -8.6 4.4 Z" fill={leaf} />
    </svg>
  );
}
