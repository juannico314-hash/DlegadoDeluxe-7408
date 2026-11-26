import { Link } from "wouter";
import { company } from "../lib/company";
import { openCookieSettings } from "./cookie-banner";

const LEGAL = [
  { href: "/legal/privacidad", label: "Política de Privacidad y Tratamiento de Datos" },
  { href: "/legal/cookies", label: "Política de Cookies" },
  { href: "/legal/terminos", label: "Términos y Condiciones" },
  { href: "/legal/devoluciones", label: "Retracto, Devoluciones y Garantías" },
  { href: "/legal/aviso-legal", label: "Aviso Legal" },
  { href: "/legal/pqrs", label: "PQRS" },
];

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden border-t border-gold/15 bg-espresso">
      <div className="pointer-events-none absolute -bottom-10 left-0 w-full select-none text-center font-display text-[18vw] leading-none font-extrabold text-roast/60">
        DLEGADO
      </div>
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 pt-20 pb-40 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <img src="/img/logo.png" alt="Dlegado Deluxe" className="h-28" />
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            Café colombiano y anchetas empresariales. El sabor de la historia, servido en cada taza.
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="label mb-4">Tienda</p>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link href="/tienda" className="hover:text-gold">Todos los combos</Link></li>
            <li><a href="/#catalogo" className="hover:text-gold">Catálogo</a></li>
            <li><a href="/#historia" className="hover:text-gold">Historia</a></li>
            <li><Link href="/carrito" className="hover:text-gold">Carrito</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="label mb-4">Legal</p>
          <ul className="space-y-2 text-sm text-cream/80">
            {LEGAL.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-gold">{l.label}</Link></li>
            ))}
            <li><button onClick={openCookieSettings} className="text-left hover:text-gold">Configurar cookies</button></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="label mb-4">Contacto</p>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>{company.city}</li>
            <li><a href={company.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">Instagram · @dlegado_deluxe</a></li>
          </ul>
          <a
            href="https://www.sic.gov.co"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gold/25 px-4 py-3 text-xs text-cream/80 hover:border-gold"
          >
            Superintendencia de Industria y Comercio — www.sic.gov.co
          </a>
        </div>
      </div>
      <div className="relative border-t border-gold/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-5 text-xs text-muted-foreground md:flex-row md:justify-between md:px-10">
          <p>© 2026 {company.brand}</p>
          <p>Precios en pesos colombianos (COP), IVA incluido según aplique.</p>
        </div>
      </div>
    </footer>
  );
}
