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

export function IllustrationShield({ className = "" }: { className?: string }) {
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
