import { useEffect, useRef } from "react";
import "./catalog-beans.css";

export function CatalogBeans() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    function update() {
      if (!video) return;
      if (!inView || reduced.matches || document.hidden) {
        video.pause();
        return;
      }
      if (!video.hasAttribute("src")) video.src = "/videos/beans.mp4";
      void video.play().catch(() => { /* The poster stays visible if autoplay is blocked. */ });
    }
    const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    io.observe(video);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, []);

  return (
    <div className="catalog-beans" aria-hidden="true">
      <div className="catalog-beans-window">
        <video ref={ref} poster="/videos/beans.webp" muted loop playsInline preload="none" aria-label="Granos de café en movimiento" />
      </div>
    </div>
  );
}
