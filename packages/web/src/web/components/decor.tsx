export function Bean({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 56" className={className} style={style} aria-hidden>
      <defs>
        <radialGradient id="bg" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#7a4a2e" />
          <stop offset="60%" stopColor="#3b1f17" />
          <stop offset="100%" stopColor="#1c0f0a" />
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="28" rx="18" ry="26" fill="url(#bg)" />
      <path d="M20 4 C 10 18, 30 36, 20 52" stroke="#140b07" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="13" cy="16" rx="4" ry="7" fill="#fff" opacity=".08" />
    </svg>
  );
}

export function Steam({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 220" className={`steam ${className}`} aria-hidden fill="none">
      {[20, 55, 90].map((x, i) => (
        <path
          key={i}
          d={`M${x} 210 C ${x - 20} 170, ${x + 20} 140, ${x} 100 S ${x - 15} 40, ${x + 5} 10`}
          stroke="rgba(239,230,210,.5)"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ filter: "blur(4px)" }}
        />
      ))}
    </svg>
  );
}

const WORDS = ["ANCHETAS EMPRESARIALES", "CAFÉ COLOMBIANO DE ORIGEN", "EL SABOR DE LA HISTORIA", "REGALO CORPORATIVO PERFECTO"];

export function Marquee({ reverse = false, tone = "gold" }: { reverse?: boolean; tone?: "gold" | "dark" }) {
  const cls = tone === "gold" ? "bg-gold text-espresso" : "bg-espresso text-gold border-y border-gold/20";
  const row = (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <span key={w} className="flex shrink-0 items-center whitespace-nowrap">
          <span className="px-6 font-display text-2xl leading-none font-extrabold tracking-tight whitespace-nowrap md:text-4xl">{w}</span>
          <Star />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden py-3 md:py-4 ${cls}`}>
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {row}
        {row}
      </div>
    </div>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-8 md:w-8" aria-hidden>
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
    </svg>
  );
}
