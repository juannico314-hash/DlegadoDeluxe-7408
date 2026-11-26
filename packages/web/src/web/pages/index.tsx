import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { CatalogBeans } from "../components/catalog-beans";
import { ScrollFilm } from "../components/scroll-film";
import { ProductTall } from "../components/product-card";
import { products } from "../lib/products";

function Index() {
  return (
    <>
      <ScrollFilm />
      <section id="catalogo" aria-labelledby="catalogo-title" className="grain relative isolate scroll-mt-16 overflow-clip border-t border-gold/20 bg-espresso">
        <CatalogBeans />
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
            <div>
              <p className="label mb-3">Colección empresarial · 2026</p>
              <h2 id="catalogo-title" className="font-display text-5xl leading-none font-extrabold tracking-tight text-cream md:text-7xl">Catálogo de <em className="text-gold">anchetas.</em></h2>
              <p className="mt-4 max-w-md text-cream/75">Seis formas de regalar café colombiano. Elige el combo para tu equipo, clientes o colaboradores.</p>
            </div>
            <Link href="/tienda" className="inline-flex items-center gap-2 rounded-full border border-gold/35 px-5 py-3 text-sm text-cream hover:border-gold">
              Ir a la tienda <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="cinema-catalog-grid grid items-start gap-5 sm:grid-cols-2">
            {products.map((p, i) => <ProductTall key={p.slug} p={p} i={i % 3} />)}
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;
