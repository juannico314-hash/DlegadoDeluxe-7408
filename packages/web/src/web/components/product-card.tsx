import { Link } from "wouter";
import { Plus } from "lucide-react";
import { formatCOP, type Product } from "../lib/products";
import { useCart } from "../lib/cart";

export function ProductRow({ p, i = 0 }: { p: Product; i?: number }) {
  const { add } = useCart();
  return (
    <Link
      href={`/producto/${p.slug}`}
      className="pcard reveal group relative flex items-center gap-4 overflow-hidden rounded-[28px] border border-gold/15 bg-roast-2/80 p-4 transition-colors hover:border-gold/40"
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      <div className="relative h-32 w-32 shrink-0">
        <div className="pcard-glow absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(226,196,126,.35),transparent_70%)]" />
        <img src={p.image} alt={p.name} className="pcard-img relative h-full w-full object-contain" loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="label mb-1 !text-[0.62rem]">{p.tag}</p>
        <h3 className="font-display text-xl font-bold leading-tight text-cream">{p.short}</h3>
        <p className="mt-1 text-sm text-muted-foreground">+ Café 250 g</p>
        <p className="mt-3 font-display text-lg font-semibold text-gold">{formatCOP(p.price)}</p>
      </div>
      <button
        type="button"
        aria-label={`Agregar ${p.name} al carrito`}
        onClick={(e) => {
          e.preventDefault();
          add(p.slug);
        }}
        className="absolute right-4 bottom-4 grid h-10 w-10 place-items-center rounded-full bg-gold text-espresso transition-transform hover:scale-110"
      >
        <Plus className="h-5 w-5" />
      </button>
    </Link>
  );
}

export function ProductTall({ p, i = 0 }: { p: Product; i?: number }) {
  const { add } = useCart();
  return (
    <Link
      href={`/producto/${p.slug}`}
      className="pcard reveal group relative flex flex-col overflow-hidden rounded-[28px] bg-gradient-to-b from-roast to-espresso"
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="pcard-glow absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(226,196,126,.45),transparent_60%)]" />
        <span className="absolute top-4 left-4 z-10 rounded-full bg-olive px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-cream uppercase">
          {p.tag}
        </span>
        <img src={p.image} alt={p.name} className="pcard-img relative h-full w-full object-contain p-6" loading="lazy" />
      </div>
      <div className="flex items-end justify-between gap-3 border-t border-gold/15 p-5">
        <div>
          <h3 className="font-display text-xl leading-tight font-bold text-cream">{p.short}</h3>
          <p className="mt-1 font-display text-lg font-semibold text-gold">{formatCOP(p.price)}</p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            add(p.slug);
          }}
          className="btn-pour shrink-0 rounded-full bg-gold px-4 py-2 text-xs font-semibold tracking-wide text-espresso"
        >
          Agregar
        </button>
      </div>
    </Link>
  );
}
