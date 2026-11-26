import { Link } from "wouter";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "../lib/cart";
import { formatCOP } from "../lib/products";

export function QtyControl({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-gold/25">
      <button className="p-2 text-cream/80 hover:text-gold" onClick={() => onChange(value - 1)} aria-label="Restar">
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        value={value}
        onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, "")) || 1)}
        className="w-12 bg-transparent text-center text-sm text-cream outline-none"
        inputMode="numeric"
        aria-label="Cantidad"
      />
      <button className="p-2 text-cream/80 hover:text-gold" onClick={() => onChange(value + 1)} aria-label="Sumar">
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { items, open, setOpen, subtotal, count, setQty, remove } = useCart();
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <button
        type="button"
        aria-label="Cerrar carrito"
        tabIndex={open ? 0 : -1}
        className={`absolute inset-0 w-full cursor-default bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-gold/20 bg-espresso transition-transform duration-700 [transition-timing-function:var(--ease-pour)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gold/15 p-6">
          <div>
            <p className="label">Tu pedido</p>
            <h2 className="font-display text-3xl font-extrabold text-cream">Carrito ({count})</h2>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-full border border-gold/25 p-2 text-cream hover:bg-gold hover:text-espresso" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {items.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-display text-2xl text-cream">Tu carrito está vacío</p>
              <p className="mt-2 text-sm text-muted-foreground">Descubre nuestras anchetas empresariales.</p>
              <Link href="/tienda" onClick={() => setOpen(false)} className="btn-pour mt-6 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-espresso">
                Ver tienda
              </Link>
            </div>
          )}
          {items.map((l) => (
            <div key={l.slug + l.grind} className="flex gap-4 rounded-2xl border border-gold/10 bg-roast-2 p-3">
              <img src={l.product.image} alt="" className="h-20 w-20 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display font-bold text-cream">{l.product.short}</p>
                <p className="text-xs text-muted-foreground">Café {l.grind === "grano" ? "en grano" : "molido"}</p>
                <div className="mt-2 flex items-center justify-between">
                  <QtyControl value={l.qty} onChange={(n) => setQty(l.slug, l.grind, n)} />
                  <p className="font-display font-semibold text-gold">{formatCOP(l.total)}</p>
                </div>
              </div>
              <button onClick={() => remove(l.slug, l.grind)} className="self-start p-1 text-muted-foreground hover:text-destructive" aria-label="Eliminar">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="space-y-4 border-t border-gold/15 p-6">
            {count < 100 && (
              <p className="rounded-xl bg-olive/30 px-3 py-2 text-xs text-cream/90">
                Agrega {100 - count} unidades más y tu caja llevará el <strong>logo de tu empresa</strong>.
              </p>
            )}
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl font-bold text-gold">{formatCOP(subtotal)}</span>
            </div>
            <Link
              href="/carrito"
              onClick={() => setOpen(false)}
              className="btn-pour block rounded-full bg-gold py-4 text-center text-sm font-semibold tracking-wide text-espresso"
            >
              Ir al carrito y cotizar
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
