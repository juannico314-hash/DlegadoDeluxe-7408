import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { company } from "../lib/company";
import "./scroll-film.css";

const FRAME_COUNT = 121;
const FRAMES_PER_SHEET = 6;

// Scroll position [0–1] → frame. Adjust these marks to retime the three chapters.
const CUES = [[0, 0], [.27, 34], [.43, 52], [.61, 77], [.76, 94], [1, 120]] as const;
const clamp = (n: number) => Math.max(0, Math.min(1, n));

function frameAt(progress: number) {
  for (let i = 1; i < CUES.length; i++) {
    const [a, start] = CUES[i - 1];
    const [b, end] = CUES[i];
    if (progress <= b) return Math.round(start + ((progress - a) / (b - a)) * (end - start));
  }
  return FRAME_COUNT - 1;
}

function Plate({ scene, eager = false }: { scene: number; eager?: boolean }) {
  return (
    <picture>
      <source media="(max-width: 700px)" srcSet={`/cinema/sm-scene-${scene}.webp`} />
      <img src={`/cinema/lg-scene-${scene}.webp`} alt="" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} />
    </picture>
  );
}

export function ScrollFilm() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const film = root.current;
    const surface = canvas.current;
    const ctx = surface?.getContext("2d", { alpha: false });
    if (!film || !surface || !ctx) return;
    const mobile = window.matchMedia("(max-width: 700px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sheets = new Map<number, { image: HTMLImageElement; ready: boolean }>();
    let raf = 0;
    let drawn = -1;
    let previous = 0;
    let visible = false;
    const scenePanels = Array.from(film.querySelectorAll<HTMLElement>(".film-panel"));
    const totalSheets = Math.ceil(FRAME_COUNT / FRAMES_PER_SHEET);

    function queue() {
      if (!raf) raf = requestAnimationFrame(render);
    }

    function load(index: number) {
      if (index < 0 || index >= totalSheets || sheets.has(index)) return;
      const image = new Image();
      const sheet = { image, ready: false };
      sheets.set(index, sheet);
      image.src = `/cinema/${mobile.matches ? "sm" : "lg"}-${String(index).padStart(2, "0")}.webp`;
      image.decode().then(() => {
        if (sheets.get(index) !== sheet) return;
        sheet.ready = true;
        queue();
      }).catch(() => { /* Keep the previous frame or poster if decoding fails. */ });
    }

    function render() {
      raf = 0;
      if (!visible || reduce.matches || !film || !surface || !ctx) return;
      const bounds = film.getBoundingClientRect();
      const viewport = surface.closest(".film-stage")?.clientHeight || window.innerHeight;
      const p = clamp(-bounds.top / Math.max(1, bounds.height - viewport));
      const frame = frameAt(p);
      const index = Math.floor(frame / FRAMES_PER_SHEET);
      const direction = p >= previous ? 1 : -1;
      previous = p;
      film.style.setProperty("--film-progress", String(p));
      film.style.setProperty("--history-shade", String(clamp((p - .2) / .14) * clamp((.8 - p) / .16)));
      for (const panel of scenePanels.slice(1)) {
        const top = panel.getBoundingClientRect().top;
        const entrance = clamp((viewport * .85 - top) / (viewport * .37));
        panel.style.setProperty("--entrance", String(entrance));
      }
      // Fetch the target first, then its neighbors. Keep decoded memory bounded.
      load(index);
      for (const offset of [direction, -direction, 2 * direction, 3 * direction]) load(index + offset);
      for (const key of sheets.keys()) if (Math.abs(key - index) > 4) sheets.delete(key);
      const sheet = sheets.get(index);
      if (!sheet?.ready || frame === drawn) return;
      const w = sheet.image.naturalWidth / 3;
      const h = sheet.image.naturalHeight / 2;
      if (surface.width !== w || surface.height !== h) { surface.width = w; surface.height = h; }
      const cell = frame % FRAMES_PER_SHEET;
      ctx.drawImage(sheet.image, (cell % 3) * w, Math.floor(cell / 3) * h, w, h, 0, 0, w, h);
      drawn = frame;
      surface.dataset.ready = "true";
      surface.dataset.frame = String(frame);
    }

    function reset() {
      sheets = new Map();
      drawn = -1;
      if (surface) delete surface.dataset.ready;
      queue();
    }
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; queue(); });
    io.observe(film);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    mobile.addEventListener("change", reset);
    reduce.addEventListener("change", reset);
    return () => {
      sheets.clear();
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      mobile.removeEventListener("change", reset);
      reduce.removeEventListener("change", reset);
    };
  }, []);

  // Edit the scene copy here. Product names and prices live in lib/products.ts.
  return (
    <div className="scroll-film" ref={root}>
      <div className="film-stage" aria-hidden="true">
        <div className="film-media">
          <Plate scene={1} eager />
          <canvas ref={canvas} aria-label="Secuencia decorativa del grano a la taza" />
        </div>
        <div className="film-shade" />
        <div className="film-shade-history" />
        <div className="film-track"><span /></div>
      </div>
      <section className="film-panel film-intro" aria-labelledby="film-title">
        <div className="film-copy">
          <p className="label">Del grano</p>
          <h1 id="film-title">El sabor de <em>la historia.</em></h1>
          <a className="film-scroll-link" href="#historia"><ArrowDown size={15} /> Desliza para descubrir</a>
        </div>
      </section>
      <section className="film-panel film-history" id="historia" aria-labelledby="film-history-title">
        <div className="film-static"><Plate scene={2} /></div>
        <div className="film-copy film-story">
          <div className="film-story-masthead">
            <img src="/img/logo.png" alt="Dlegado Deluxe" width="80" height="90" loading="lazy" />
            <div>
              <p className="label">Quiénes somos</p>
              <p className="film-story-origin">{company.city}</p>
            </div>
          </div>
          <h2 id="film-history-title">Un café <em>de abuelo <span>a nieto.</span></em></h2>
          <div className="film-story-body">
            <p className="film-description">Dlegado Deluxe nace de un gesto sencillo: compartir una taza de café. Hoy llevamos ese gesto a las empresas con anchetas de café colombiano, accesorios de barismo y cajas ilustradas.</p>
            <dl className="film-facts">
              <div><dt>Más de <strong>100</strong> unidades</dt><dd>Caja con el logo de tu empresa</dd></div>
              <div><dt>Aprox. <strong>30</strong> días</dt><dd>Para elaborar tu pedido</dd></div>
            </dl>
            <p className="film-note">Según la cantidad, también puedes personalizar los accesorios o el café.</p>
          </div>
        </div>
      </section>
      <section className="film-panel film-action" aria-labelledby="film-action-title">
        <div className="film-static"><Plate scene={3} /></div>
        <div className="film-copy">
          <p className="label">A la taza</p>
          <h2 id="film-action-title">Un café para <em>compartir.</em></h2>
          <div className="film-actions">
            <a href="#historia">Conócenos <ArrowUpRight size={15} /></a>
            <a href="#catalogo">Mira nuestro catálogo <ArrowDown size={15} /></a>
            <Link href="/cotizar" className="film-quote btn-pour">Cotiza <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
