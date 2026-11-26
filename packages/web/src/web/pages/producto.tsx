import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Check, Clock, Package, Sparkles } from "lucide-react";
import { getProduct, formatCOP, products } from "../lib/products";
import { useCart, type Grind } from "../lib/cart";
import { QtyControl } from "../components/cart-drawer";
import { ProductRow } from "../components/product-card";
import { Steam } from "../components/decor";

export default function Producto() {
  const { slug } = useParams<{ slug: string }>();
  const p = getProduct(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [grind, setGrind] = useState<Grind>("molido");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setQty(1);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!p) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="font-display text-5xl text-cream">Producto no encontrado</h1>
        <Link href="/tienda" className="mt-6 text-gold underline">Volver a la tienda</Link>
      </div>
    );
  }
  const others = products.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pt-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Link href="/tienda" className="inline-flex items-center gap-2 text-sm text-cream/70 hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> Volver a la tienda
          </Link>
        </div>
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-10 md:px-10 lg:grid-cols-2 lg:gap-16">
          {/* image */}
          <div
            className="grain relative flex aspect-square items-center justify-center overflow-hidden rounded-[36px] bg-gradient-to-br from-roast to-espresso"
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
            }}
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(226,196,126,.4),transparent_60%)]" />
            <Steam className="absolute top-2 left-1/2 h-56 w-32 -translate-x-1/2 opacity-60" />
            <img
              key={p.slug}
              src={p.image}
              alt={p.name}
              className="fade-in relative w-[82%] drop-shadow-[0_50px_60px_rgba(0,0,0,.65)] transition-transform duration-300"
              style={{ transform: `perspective(900px) rotateY(${tilt.x * 12}deg) rotateX(${tilt.y * -12}deg) scale(1.02)` }}
            />
            <span className="absolute top-6 left-6 rounded-full bg-olive px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-cream uppercase">{p.tag}</span>
          </div>

          {/* info */}
          <div className="flex flex-col justify-center">
            <p className="label rise mb-4">Anchetas Empresariales 2026</p>
            <h1 className="rise font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-cream md:text-6xl">{p.name}</h1>
            <p className="fade-in mt-5 text-cream/75">{p.description}</p>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-5xl font-bold text-gold">{formatCOP(p.price)}</span>
              <span className="text-sm text-muted-foreground">precio empresarial / unidad</span>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm text-cream/80">Presentación del café</p>
              <div className="flex gap-2">
                {(["molido", "grano"] as Grind[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrind(g)}
                    className={`rounded-full px-5 py-2.5 text-sm transition-colors ${grind === g ? "bg-cream text-espresso" : "border border-gold/25 text-cream hover:border-gold"}`}
                  >
                    {g === "molido" ? "Molido" : "En grano"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <QtyControl value={qty} onChange={(n) => setQty(Math.max(1, n))} />
              <button onClick={() => add(p.slug, qty, grind)} className="btn-pour flex-1 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-espresso sm:flex-none">
                Agregar al carrito · {formatCOP(p.price * qty)}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[10, 50, 100].map((n) => (
                <button key={n} onClick={() => setQty(n)} className="rounded-full border border-gold/15 px-3 py-1 text-xs text-cream/70 hover:border-gold hover:text-gold">
                  {n} uds.
                </button>
              ))}
            </div>
            {qty >= 100 && (
              <p className="fade-in mt-4 flex items-center gap-2 rounded-2xl bg-olive/40 px-4 py-3 text-sm text-cream">
                <Sparkles className="h-4 w-4 text-gold" /> ¡Con {qty} unidades tu caja incluye el logo de tu empresa!
              </p>
            )}

            <div className="mt-10 grid gap-6 border-t border-gold/15 pt-8 sm:grid-cols-2">
              <div>
                <p className="label mb-3">Incluye</p>
                <ul className="space-y-2 text-sm text-cream/80">
                  {p.includes.map((x) => (
                    <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> {x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label mb-3">El café</p>
                <ul className="space-y-2 text-sm text-cream/80">
                  <li>Café colombiano 100%</li>
                  <li>Tostión media</li>
                  <li>Acidez media · notas cítricas</li>
                  <li>Molido o en grano</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-cream/75 sm:grid-cols-2">
              <p className="flex items-start gap-2"><Package className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> +100 uds: caja con tu logo y personalización.</p>
              <p className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Elaboración aprox. 30 días.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
        <h2 className="reveal mb-8 font-display text-4xl font-extrabold text-cream md:text-5xl">También te puede gustar</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {others.map((o, i) => <ProductRow key={o.slug} p={o} i={i} />)}
        </div>
      </section>
    </>
  );
}
