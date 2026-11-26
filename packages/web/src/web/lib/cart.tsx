import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "./products";

export type Grind = "molido" | "grano";
export type CartItem = { slug: string; qty: number; grind: Grind };
export type CartLine = CartItem & { product: Product; total: number };

type CartCtx = {
  items: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (slug: string, qty?: number, grind?: Grind) => void;
  setQty: (slug: string, grind: Grind, qty: number) => void;
  remove: (slug: string, grind: Grind) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "dd-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(raw));
  }, [raw]);

  const value = useMemo<CartCtx>(() => {
    const items = raw
      .map((i) => {
        const product = getProduct(i.slug);
        return product ? { ...i, product, total: product.price * i.qty } : null;
      })
      .filter(Boolean) as CartLine[];
    return {
      items,
      count: items.reduce((a, b) => a + b.qty, 0),
      subtotal: items.reduce((a, b) => a + b.total, 0),
      open,
      setOpen,
      add: (slug, qty = 1, grind = "molido") => {
        setRaw((prev) => {
          const ex = prev.find((p) => p.slug === slug && p.grind === grind);
          if (ex) return prev.map((p) => (p === ex ? { ...p, qty: p.qty + qty } : p));
          return [...prev, { slug, qty, grind }];
        });
        setOpen(true);
      },
      setQty: (slug, grind, qty) =>
        setRaw((prev) =>
          prev.map((p) => (p.slug === slug && p.grind === grind ? { ...p, qty: Math.max(1, qty) } : p)),
        ),
      remove: (slug, grind) => setRaw((prev) => prev.filter((p) => !(p.slug === slug && p.grind === grind))),
      clear: () => setRaw([]),
    };
  }, [raw, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
