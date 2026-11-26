import { useState } from "react";
import { CatalogBeans } from "../components/catalog-beans";
import { ProductTall } from "../components/product-card";
import { Marquee } from "../components/decor";
import { products } from "../lib/products";

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "new", label: "Nuevos" },
  { id: "best", label: "Más vendidos" },
  { id: "custom", label: "Personalizables" },
] as const;

export default function Tienda() {
  const [f, setF] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [sort, setSort] = useState("relevancia");
  let list = products.filter((p) =>
    f === "all" ? true : f === "new" ? p.isNew : f === "best" ? p.bestSeller : p.tag === "Personalizable",
  );
  if (sort === "menor") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "mayor") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <div className="relative isolate overflow-clip bg-espresso">
      <CatalogBeans />
      <section className="grain relative overflow-hidden pt-36 pb-16">
        <div className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-gold/15 blur-[120px]" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <p className="label rise mb-4">Catálogo 2026</p>
          <h1 className="rise font-display text-6xl leading-[0.9] font-extrabold tracking-tight text-cream md:text-9xl">
            La <span className="text-gold italic">tienda</span>
          </h1>
          <p className="fade-in mt-6 max-w-lg text-cream/70">Seis combos de café colombiano con accesorios, listos para regalar. Precios empresariales por unidad.</p>
        </div>
      </section>
      <Marquee />
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((x) => (
              <button
                key={x.id}
                onClick={() => setF(x.id)}
                className={`rounded-full px-5 py-2.5 text-sm transition-colors ${f === x.id ? "bg-gold text-espresso" : "border border-gold/25 text-cream hover:border-gold"}`}
              >
                {x.label}
              </button>
            ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-gold/25 bg-espresso px-4 py-2.5 text-sm text-cream">
            <option value="relevancia">Relevancia</option>
            <option value="menor">Precio: menor a mayor</option>
            <option value="mayor">Precio: mayor a menor</option>
          </select>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => <ProductTall key={p.slug + f + sort} p={p} i={i} />)}
        </div>
      </section>
    </div>
  );
}
