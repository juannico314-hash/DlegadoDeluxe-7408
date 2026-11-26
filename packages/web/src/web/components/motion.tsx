import { useEffect, useRef, useState } from "react";

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(mq.matches);
    const on = () => setR(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return r;
}

/** Plays only while on screen — saves battery / CPU. */
function useInViewPlay(reduced: boolean) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);
  return ref;
}

/** Looping muted background video with poster fallback + readable overlay. */
export function VideoBg({ name, overlay, className = "" }: { name: string; overlay?: string; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useInViewPlay(reduced);
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {reduced ? (
        <img src={`/videos/${name}.webp`} alt="" className="h-full w-full object-cover" />
      ) : (
        <video
          ref={ref}
          className="h-full w-full scale-105 object-cover"
          src={`/videos/${name}.mp4`}
          poster={`/videos/${name}.webp`}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label="Video decorativo de fondo"
        />
      )}
      <div className={`absolute inset-0 ${overlay ?? "bg-espresso/70"}`} />
    </div>
  );
}

type B = { left: string; top: string; size: number; img: number; r: number; d: number; blur?: boolean; o?: number };

/** Real photographed coffee beans drifting & tumbling. */
export function FloatingBeans({ beans, parallax }: { beans: B[]; parallax?: { x: number; y: number } }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {beans.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: b.left,
            top: b.top,
            transform: parallax ? `translate3d(${parallax.x * b.size * 0.5}px, ${parallax.y * b.size * 0.5}px, 0)` : undefined,
          }}
        >
          <img
            src={`/img/bean-${b.img}.webp`}
            alt=""
            className="bean3d drop-shadow-[0_18px_22px_rgba(0,0,0,.55)]"
            style={
              {
                width: b.size,
                opacity: b.o ?? 1,
                filter: b.blur ? "blur(3px)" : undefined,
                ["--r" as string]: `${b.r}deg`,
                ["--d" as string]: `${b.d}s`,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  );
}

/** Logo with the abuelo + nieto subtly alive. Static ribbon on top keeps text crisp. */
export function AnimatedLogo({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useInViewPlay(reduced);
  return (
    <div className={`relative aspect-square mix-blend-lighten ${className}`}>
      {/* soft circular mask hides the square dark background */}
      <div className="absolute inset-0 [mask-image:radial-gradient(circle,#000_62%,transparent_71%)]">
        {reduced ? (
          <img src="/videos/logo-static.webp" alt="Dlegado Deluxe" className="h-full w-full" />
        ) : (
          <video ref={ref} className="h-full w-full" src="/videos/logo.mp4" poster="/videos/logo.webp" muted loop playsInline autoPlay preload="metadata" aria-label="Dlegado Deluxe" />
        )}
      </div>
      <img
        src="/videos/logo-static.webp"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full [clip-path:inset(57%_0_0_0)] [mask-image:radial-gradient(circle,#000_62%,transparent_71%)]"
      />
    </div>
  );
}
