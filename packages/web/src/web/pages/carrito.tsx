import { useState } from "react";
import { Link } from "wouter";
import { Mail, MessageCircle, Trash2 } from "lucide-react";
import { useCart } from "../lib/cart";
import { formatCOP } from "../lib/products";
import { company } from "../lib/company";
import { QtyControl } from "../components/cart-drawer";

const field = "w-full rounded-2xl border border-gold/20 bg-espresso px-4 py-3 text-sm text-cream placeholder:text-cream/35 outline-none focus:border-gold";

export default function Carrito() {
  const { items, subtotal, count, setQty, remove } = useCart();
  const [form, setForm] = useState({ nombre: "", empresa: "", nit: "", email: "", telefono: "", fecha: "", notas: "" });
  const [consent, setConsent] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const message = () =>
    [
      `Hola ${company.brand}, quiero cotizar el siguiente pedido:`,
      "",
      ...items.map((l) => `• ${l.qty} x ${l.product.name} (café ${l.grind}) — ${formatCOP(l.total)}`),
      "",
      `Total unidades: ${count}`,
      `Subtotal estimado: ${formatCOP(subtotal)}`,
      "",
      `Nombre: ${form.nombre}`,
      `Empresa: ${form.empresa}`,
      form.nit && `NIT: ${form.nit}`,
      `Correo: ${form.email}`,
      `Teléfono: ${form.telefono}`,
      form.fecha && `Fecha deseada de entrega: ${form.fecha}`,
      form.notas && `Notas: ${form.notas}`,
    ]
      .filter((x) => x !== false && x !== "")
      .join("\n");

  const validate = () => {
    if (!form.nombre || !form.empresa || !form.email || !form.telefono) return "Completa nombre, empresa, correo y teléfono.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "El correo no es válido.";
    if (!consent) return "Debes autorizar el tratamiento de tus datos personales.";
    if (!terms) return "Debes aceptar los Términos y Condiciones.";
    return "";
  };

  const send = (via: "wa" | "mail") => {
    const err = validate();
    setError(err);
    if (err) return;
    const text = encodeURIComponent(message());
    const url =
      via === "wa"
        ? `https://wa.me/${company.whatsapp}?text=${text}`
        : `mailto:${company.emailHref}?subject=${encodeURIComponent("Cotización Anchetas Empresariales — " + form.empresa)}&body=${text}`;
    window.open(url, "_blank");
    setSent(true);
  };

  return (
    <section className="mx-auto min-h-[80vh] max-w-[1400px] px-5 pt-32 pb-24 md:px-10">
      <p className="label rise mb-3">Tu pedido</p>
      <h1 className="rise font-display text-6xl leading-[0.9] font-extrabold tracking-tight text-cream md:text-8xl">
        Carrito<span className="text-gold">.</span>
      </h1>

      {items.length === 0 ? (
        <div className="mt-16 rounded-[32px] border border-gold/15 bg-roast-2 p-12 text-center">
          <p className="font-display text-3xl text-cream">Aún no has agregado productos</p>
          <Link href="/tienda" className="btn-pour mt-6 inline-block rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-espresso">Ir a la tienda</Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-4">
            {items.map((l) => (
              <div key={l.slug + l.grind} className="flex flex-col gap-4 rounded-[28px] border border-gold/15 bg-roast-2 p-5 sm:flex-row sm:items-center">
                <Link href={`/producto/${l.slug}`} className="shrink-0">
                  <img src={l.product.image} alt="" className="h-28 w-28 object-contain" />
                </Link>
                <div className="flex-1">
                  <p className="font-display text-2xl font-bold text-cream">{l.product.name}</p>
                  <p className="text-sm text-muted-foreground">Café {l.grind === "grano" ? "en grano" : "molido"} · {formatCOP(l.product.price)} c/u</p>
                </div>
                <QtyControl value={l.qty} onChange={(n) => setQty(l.slug, l.grind, n)} />
                <p className="w-32 text-right font-display text-xl font-semibold text-gold">{formatCOP(l.total)}</p>
                <button onClick={() => remove(l.slug, l.grind)} className="p-2 text-muted-foreground hover:text-destructive" aria-label="Eliminar">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            <div className="rounded-[28px] border border-gold/15 p-6">
              <div className="flex justify-between text-sm text-cream/75"><span>Unidades</span><span>{count}</span></div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-cream">Subtotal estimado</span>
                <span className="font-display text-4xl font-bold text-gold">{formatCOP(subtotal)}</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Valor de referencia. El precio final, envío e impuestos aplicables se confirman en la cotización formal.
                {count >= 100 ? " Tu pedido incluye caja con el logo de tu empresa." : ` Desde 100 unidades la caja lleva tu logo (te faltan ${100 - count}).`}
              </p>
            </div>
          </div>

          <div className="h-fit rounded-[32px] border border-gold/20 bg-roast-2 p-6 md:p-8 lg:sticky lg:top-28">
            <p className="label mb-2">Solicitar cotización</p>
            <h2 className="font-display text-3xl font-bold text-cream">Datos de tu empresa</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <input className={field} aria-label="Nombre y apellido *" placeholder="Nombre y apellido *" value={form.nombre} onChange={set("nombre")} />
              <input className={field} aria-label="Empresa *" placeholder="Empresa *" value={form.empresa} onChange={set("empresa")} />
              <input className={field} aria-label="NIT (opcional)" placeholder="NIT (opcional)" value={form.nit} onChange={set("nit")} />
              <input className={field} aria-label="Teléfono *" placeholder="Teléfono *" value={form.telefono} onChange={set("telefono")} />
              <input className={`${field} sm:col-span-2`} aria-label="Correo electrónico" placeholder="Correo electrónico *" type="email" value={form.email} onChange={set("email")} />
              <label className="text-xs text-cream/60 sm:col-span-2">
                Fecha deseada de entrega (recuerda: aprox. 30 días de elaboración)
                <input className={`${field} mt-1`} aria-label="Fecha deseada de entrega" type="date" value={form.fecha} onChange={set("fecha")} />
              </label>
              <textarea aria-label="Notas" className={`${field} min-h-24 sm:col-span-2`} placeholder="Personalización, logo, notas…" value={form.notas} onChange={set("notas")} />
            </div>
            <label className="mt-5 flex gap-3 text-xs leading-relaxed text-cream/75">
              <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#e2c47e]" aria-label="Autorizo el tratamiento de datos" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span>
                Autorizo de manera previa, expresa e informada a {company.brand} para tratar mis datos personales con el fin de gestionar esta
                cotización, conforme a la Ley 1581 de 2012 y la{" "}
                <Link href="/legal/privacidad" className="text-gold underline">Política de Tratamiento de Datos</Link>.
              </span>
            </label>
            <label className="mt-3 flex gap-3 text-xs leading-relaxed text-cream/75">
              <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#e2c47e]" aria-label="Acepto términos" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
              <span>
                Acepto los <Link href="/legal/terminos" className="text-gold underline">Términos y Condiciones</Link> y la política de{" "}
                <Link href="/legal/devoluciones" className="text-gold underline">Retracto y Devoluciones</Link>.
              </span>
            </label>
            {error && <p className="mt-4 rounded-xl bg-destructive/20 px-3 py-2 text-sm text-cream">{error}</p>}
            {sent && !error && <p className="mt-4 rounded-xl bg-olive/40 px-3 py-2 text-sm text-cream">¡Listo! Abrimos tu solicitud. Te responderemos lo antes posible.</p>}
            <div className="mt-6 grid gap-3">
              <button onClick={() => send("wa")} className="btn-pour flex items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-semibold text-espresso">
                <MessageCircle className="h-4 w-4" /> Cotizar por WhatsApp
              </button>
              <button onClick={() => send("mail")} className="flex items-center justify-center gap-2 rounded-full border border-gold/30 py-4 text-sm text-cream hover:border-gold">
                <Mail className="h-4 w-4" /> Cotizar por correo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
