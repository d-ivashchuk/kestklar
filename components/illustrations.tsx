// Hand-crafted SVG spot illustrations — matches the black/white/border aesthetic.
// All use currentColor so they inherit text color from parent.

export function IllustrationUpload({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Document body */}
      <rect x="12" y="8" width="32" height="40" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Folded corner */}
      <path d="M36 8 L44 16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M36 8 L36 16 L44 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Lines on document */}
      <line x1="18" y1="24" x2="34" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="30" x2="38" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="36" x2="30" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Upload arrow */}
      <line x1="46" y1="56" x2="56" y2="56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="51" y1="44" x2="51" y2="56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M46 50 L51 44 L56 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function IllustrationCalculate({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main calculator body */}
      <rect x="14" y="10" width="36" height="44" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Display */}
      <rect x="19" y="16" width="26" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.25" fill="none" />
      {/* Display text — right-aligned number */}
      <line x1="30" y1="21" x2="40" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Buttons — 3×4 grid */}
      {[0, 1, 2].map((col) =>
        [0, 1, 2, 3].map((row) => (
          <rect
            key={`${col}-${row}`}
            x={19 + col * 9}
            y={32 + row * 8}
            width="6"
            height="5"
            rx="0.5"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        ))
      )}
      {/* Equals highlighted */}
      <rect x="37" y="48" width="6" height="5" rx="0.5" fill="currentColor" />
    </svg>
  );
}

export function IllustrationForm({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Form document */}
      <rect x="10" y="8" width="34" height="44" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Form rows */}
      <line x1="16" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
      <line x1="16" y1="28" x2="38" y2="28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
      <line x1="16" y1="36" x2="38" y2="36" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
      {/* Labels */}
      <line x1="16" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="16" y1="24" x2="24" y2="24" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="16" y1="32" x2="28" y2="32" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      {/* Values filled in */}
      <line x1="30" y1="16" x2="38" y2="16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="28" y1="24" x2="38" y2="24" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="32" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      {/* Checkmark circle — success indicator */}
      <circle cx="47" cy="47" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M42 47 L45.5 51 L52 43" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   Feature card glyphs — 24×24, line-only, currentColor
   ──────────────────────────────────────────────────────────── */

type GlyphProps = { className?: string };

export function GlyphMultiBroker({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="11" height="14" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
      <rect x="7" y="6" width="11" height="14" rx="0.5" stroke="currentColor" strokeWidth="1.25" fill="hsl(var(--background))" />
      <rect x="10" y="9" width="11" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.25" fill="hsl(var(--background))" />
      <line x1="12" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="12" y1="16" x2="17" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function GlyphDatabase({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <ellipse cx="12" cy="5" rx="7.5" ry="2.2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4.5 5 V12 C4.5 13.2 7.9 14.2 12 14.2 C16.1 14.2 19.5 13.2 19.5 12 V5"
        stroke="currentColor" strokeWidth="1.25" fill="none" />
      <path d="M4.5 12 V19 C4.5 20.2 7.9 21.2 12 21.2 C16.1 21.2 19.5 20.2 19.5 19 V12"
        stroke="currentColor" strokeWidth="1.25" fill="none" />
      <line x1="9" y1="9.5" x2="15" y2="9.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
      <line x1="9" y1="16.5" x2="15" y2="16.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function GlyphFormLine({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="14" height="18" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
      <line x1="6" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
      <line x1="6" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
      <rect x="5.5" y="13.5" width="9" height="3" stroke="currentColor" strokeWidth="1.25" fill="none" />
      <line x1="7" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M17 15 L21 15 M19 13 L21 15 L19 17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function GlyphWarning({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3 L21.5 19 L2.5 19 Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <line x1="12" y1="9" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function GlyphAiCheck({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 4 C5 4 3.5 6.5 4.5 9 C3 11 4 14 6 14.5 C6.2 17 9 18.5 11 17.5 L11 4 C10.2 3.7 9 4 8 4 Z"
        stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" fill="none" />
      <path d="M16 4 C19 4 20.5 6.5 19.5 9 C21 11 20 14 18 14.5 C17.8 17 15 18.5 13 17.5 L13 4 C13.8 3.7 15 4 16 4 Z"
        stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" fill="none" />
      <path d="M9 11 L11.2 13 L15 9" stroke="hsl(152 69% 45%)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="17.5" x2="12" y2="20.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function GlyphPdfExport({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 3 H14 L19 8 V21 H5 Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M14 3 V8 H19" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <text x="7.5" y="16.5" fontFamily="ui-monospace, monospace" fontSize="4.2" fontWeight="700" fill="currentColor">PDF</text>
      <path d="M16.5 19.5 L20.5 19.5 M18.5 17.5 L20.5 19.5 L18.5 21.5"
        stroke="hsl(152 69% 45%)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   Larger spot illustrations — for FAQ, CTA, EU
   ──────────────────────────────────────────────────────────── */

export function IllustrationQuestion({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="32" cy="28" r="20" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M24 22 C24 16 32 14 36 18 C40 22 36 26 32 28 L32 34"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="40" r="1.5" fill="currentColor" />
      {/* hand-drawn squiggle underline */}
      <path
        d="M14 56 Q 22 51, 30 56 T 46 56 T 54 55"
        stroke="hsl(152 69% 45%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function IllustrationPaperPlane({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* Trail — dashed */}
      <path
        d="M6 50 Q 18 44, 30 38"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeDasharray="2 3"
        opacity="0.5"
        fill="none"
      />
      {/* Plane body */}
      <path d="M12 38 L56 12 L40 56 L32 40 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M12 38 L32 40 L56 12" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" fill="none" />
      <path d="M32 40 L40 56" stroke="currentColor" strokeWidth="1.25" fill="none" />
    </svg>
  );
}

export function IllustrationEuServer({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* Server stack */}
      <rect x="14" y="12" width="36" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="14" y="26" width="36" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="14" y="40" width="36" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Lights */}
      <circle cx="20" cy="17.5" r="1.4" fill="hsl(152 69% 45%)" />
      <circle cx="20" cy="31.5" r="1.4" fill="hsl(152 69% 45%)" />
      <circle cx="20" cy="45.5" r="1.4" fill="currentColor" />
      <line x1="26" y1="17.5" x2="44" y2="17.5" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="26" y1="31.5" x2="44" y2="31.5" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="26" y1="45.5" x2="44" y2="45.5" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      {/* EU star pin */}
      <circle cx="50" cy="14" r="6" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M50 10.5 L50.8 12.4 L52.8 12.5 L51.2 13.7 L51.8 15.6 L50 14.5 L48.2 15.6 L48.8 13.7 L47.2 12.5 L49.2 12.4 Z"
        fill="hsl(152 69% 45%)"
      />
    </svg>
  );
}

export function IllustrationShield({ className = "" }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Shield */}
      <path
        d="M32 8 L52 16 L52 34 C52 44 43 52 32 56 C21 52 12 44 12 34 L12 16 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
      {/* EU stars — simplified 5-star ring */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * 72 - 90) * (Math.PI / 180);
        const cx = 32 + 11 * Math.cos(angle);
        const cy = 32 + 11 * Math.sin(angle);
        return <circle key={i} cx={cx} cy={cy} r="1.5" fill="currentColor" />;
      })}
      {/* Lock body */}
      <rect x="26" y="32" width="12" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.25" fill="none" />
      <path d="M28 32 L28 29 C28 26.2 36 26.2 36 29 L36 32" stroke="currentColor" strokeWidth="1.25" fill="none" />
      <circle cx="32" cy="36.5" r="1.5" fill="currentColor" />
    </svg>
  );
}
