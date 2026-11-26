import { useEffect, useState } from "react";
import { Link } from "wouter";

const KEY = "dd-cookie-consent";
type Consent = { necessary: true; analytics: boolean; marketing: boolean; date: string };

export function openCookieSettings() {
  window.dispatchEvent(new Event("dd-open-cookies"));
}

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [config, setConfig] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (!saved) setTimeout(() => setShow(true), 1200);
    else {
      const c = JSON.parse(saved) as Consent;
      setAnalytics(c.analytics);
      setMarketing(c.marketing);
    }
    const open = () => {
      setShow(true);
      setConfig(true);
    };
    window.addEventListener("dd-open-cookies", open);
    return () => window.removeEventListener("dd-open-cookies", open);
  }, []);

  const save = (a: boolean, m: boolean) => {
    const c: Consent = { necessary: true, analytics: a, marketing: m, date: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(c));
    setAnalytics(a);
    setMarketing(m);
    setShow(false);
    setConfig(false);
  };

  if (!show) return null;
  return (
    <section className="fade-in fixed inset-x-3 bottom-3 z-[45] mx-auto max-w-3xl rounded-3xl border border-gold/25 bg-roast-2/95 p-5 shadow-2xl backdrop-blur-xl md:p-6" aria-label="Preferencias de cookies">
      <p className="label mb-2">Cookies</p>
      <p className="text-sm leading-relaxed text-cream/85">
        Usamos cookies propias necesarias para que la tienda funcione (carrito, preferencias) y, solo con tu autorización, cookies de
        analítica y marketing. Puedes aceptarlas, rechazarlas o configurarlas. Más información en nuestra{" "}
        <Link href="/legal/cookies" className="text-gold underline">Política de Cookies</Link>.
      </p>
      {config && (
        <div className="mt-4 space-y-2 text-sm">
          <Toggle label="Necesarias" desc="Imprescindibles para el carrito y la seguridad." checked disabled />
          <Toggle label="Analítica" desc="Nos ayudan a entender cómo se usa el sitio." checked={analytics} onChange={setAnalytics} />
          <Toggle label="Marketing" desc="Permiten mostrar publicidad relevante." checked={marketing} onChange={setMarketing} />
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => save(true, true)} className="btn-pour rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-espresso">
          Aceptar todas
        </button>
        <button onClick={() => save(false, false)} className="rounded-full border border-gold/30 px-5 py-2.5 text-sm text-cream hover:bg-roast">
          Rechazar
        </button>
        {config ? (
          <button onClick={() => save(analytics, marketing)} className="rounded-full border border-gold/30 px-5 py-2.5 text-sm text-cream hover:bg-roast">
            Guardar selección
          </button>
        ) : (
          <button onClick={() => setConfig(true)} className="px-3 py-2.5 text-sm text-cream/70 underline hover:text-cream">
            Configurar
          </button>
        )}
      </div>
    </section>
  );
}

function Toggle({ label, desc, checked, disabled, onChange }: { label: string; desc: string; checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl bg-espresso/60 px-4 py-3">
      <span>
        <span className="block font-semibold text-cream">{label}</span>
        <span className="block text-xs text-muted-foreground">{desc}</span>
      </span>
      <input type="checkbox" aria-label={label} className="h-5 w-5 accent-[#e2c47e]" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} />
    </label>
  );
}
