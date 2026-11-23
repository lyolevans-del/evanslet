export function RootsGraphic({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 460"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="canopy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a94e" />
          <stop offset="100%" stopColor="#9a7429" />
        </linearGradient>
        <linearGradient id="trunk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8813d" />
          <stop offset="100%" stopColor="#6e4f22" />
        </linearGradient>
      </defs>

      {/* canopy — six organic leaf shapes */}
      <g className="animate-roots" opacity="0.95">
        <ellipse cx="200" cy="70" rx="62" ry="44" fill="url(#canopy)" opacity="0.9" />
        <ellipse cx="120" cy="105" rx="52" ry="38" fill="url(#canopy)" opacity="0.7" />
        <ellipse cx="280" cy="105" rx="52" ry="38" fill="url(#canopy)" opacity="0.7" />
        <ellipse cx="75" cy="150" rx="40" ry="30" fill="url(#canopy)" opacity="0.5" />
        <ellipse cx="325" cy="150" rx="40" ry="30" fill="url(#canopy)" opacity="0.5" />
        <ellipse cx="200" cy="135" rx="55" ry="40" fill="url(#canopy)" opacity="0.8" />
      </g>

      {/* trunk and branches */}
      <path
        d="M200 160 L200 235"
        stroke="url(#trunk)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M200 190 C 170 200, 150 210, 135 235"
        stroke="url(#trunk)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M200 190 C 230 200, 250 210, 265 235"
        stroke="url(#trunk)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* ground line */}
      <path
        d="M110 240 H290"
        stroke="#d4a94e"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* roots — reaching deep and wide */}
      <g stroke="#d4a94e" strokeLinecap="round" fill="none">
        <path d="M200 240 L200 330" strokeWidth="7" opacity="0.85" />
        <path d="M200 265 C 165 285, 130 300, 95 340" strokeWidth="5" opacity="0.65" />
        <path d="M200 265 C 235 285, 270 300, 305 340" strokeWidth="5" opacity="0.65" />
        <path d="M200 300 C 175 330, 155 355, 140 400" strokeWidth="4" opacity="0.45" />
        <path d="M200 300 C 225 330, 245 355, 260 400" strokeWidth="4" opacity="0.45" />
        <path d="M200 330 C 195 360, 193 390, 195 430" strokeWidth="3.5" opacity="0.35" />
        <path d="M200 240 L172 258" strokeWidth="4" opacity="0.5" />
        <path d="M200 240 L228 258" strokeWidth="4" opacity="0.5" />
      </g>

      {/* root tips */}
      <g fill="#d4a94e">
        <circle cx="95" cy="340" r="4" opacity="0.6" />
        <circle cx="305" cy="340" r="4" opacity="0.6" />
        <circle cx="140" cy="400" r="3.5" opacity="0.4" />
        <circle cx="260" cy="400" r="3.5" opacity="0.4" />
        <circle cx="195" cy="430" r="3" opacity="0.3" />
        <circle cx="172" cy="258" r="3" opacity="0.45" />
        <circle cx="228" cy="258" r="3" opacity="0.45" />
      </g>
    </svg>
  );
}
