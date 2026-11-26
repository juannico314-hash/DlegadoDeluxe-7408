import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "../lib/cart";

const NAV = [
  { href: "/tienda", label: "Tienda" },
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/#historia", label: "Historia" },
  { href: "/cotizar", label: "Cotizar" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [loc] = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    setMenu(false);
  }, [loc]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "border-b border-gold/10 bg-espresso/80 py-2 backdrop-blur-xl" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <img src="/img/logo.png" alt="Dlegado Deluxe" className={`transition-all duration-500 ${scrolled ? "h-10" : "h-12"}`} />
          <span className="hidden font-display text-lg font-bold tracking-tight text-cream sm:block">
            Dlegado <span className="text-gold">Deluxe</span>
          </span>
        </Link>
        <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map(({ href, label }) => {
            const NavLink = href.includes("#") ? "a" : Link;
            return (
              <NavLink key={href} href={href} aria-current={loc === href ? "page" : undefined} className={`group relative text-sm transition-colors hover:text-gold ${href === "/cotizar" || loc === href ? "text-gold" : "text-cream/80"}`}>
                {label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 group-hover:w-full ${loc === href ? "w-full" : "w-0"}`} />
              </NavLink>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-sm text-cream transition-colors hover:bg-gold hover:text-espresso"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Carrito</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.7rem] font-bold text-espresso">
              {count}
            </span>
          </button>
          <button className="rounded-full p-2 text-cream lg:hidden" onClick={() => setMenu((m) => !m)} aria-label="Menú" aria-expanded={menu}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {menu && (
        <nav aria-label="Navegación principal" className="mx-5 mt-3 flex flex-col gap-1 rounded-3xl border border-gold/20 bg-roast-2 p-4 lg:hidden">
          {NAV.map(({ href, label }) => {
            const NavLink = href.includes("#") ? "a" : Link;
            return (
              <NavLink key={href} href={href} aria-current={loc === href ? "page" : undefined} onClick={() => setMenu(false)} className={`rounded-xl px-3 py-3 font-display text-xl hover:bg-roast ${href === "/cotizar" || loc === href ? "text-gold" : "text-cream"}`}>
                {label}
              </NavLink>
            );
          })}
        </nav>
      )}
    </header>
  );
}
