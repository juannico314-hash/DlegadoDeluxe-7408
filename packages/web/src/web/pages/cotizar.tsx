import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Copy, MessageCircle, Pause, Play } from "lucide-react";
import { Link } from "wouter";
import { company } from "../lib/company";
import "./cotizar.css";

function CoffeeLandscape() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (!visible || reduced.matches || document.hidden || paused) {
        video.pause();
        return;
      }
      if (!video.hasAttribute("src")) video.src = "/videos/mountains.mp4";
      void video.play().catch(() => { /* Keep the poster if autoplay is blocked. */ });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(video);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, [paused]);

  return (
    <>
      <div className="quote-landscape" aria-hidden="true">
        <video ref={videoRef} poster="/videos/mountains.webp" muted loop playsInline preload="none" aria-label="Paisaje cafetero con neblina" />
      </div>
      <button type="button" className="quote-motion" onClick={() => setPaused((value) => !value)}>
        {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        {paused ? "Reanudar fondo" : "Pausar fondo"}
      </button>
    </>
  );
}

const FIELDS = [
  { name: "nombre", label: "Nombre", type: "text", autoComplete: "name", maxLength: 100 },
  { name: "empresa", label: "Nombre de empresa", type: "text", autoComplete: "organization", maxLength: 140 },
  { name: "correo", label: "Correo", type: "email", autoComplete: "email", maxLength: 254 },
  { name: "numero", label: "Número de teléfono", type: "tel", autoComplete: "tel", maxLength: 32 },
] as const;
const hasWhatsApp = /^[1-9]\d{7,14}$/.test(company.whatsapp);

export default function Cotizar() {
  const [draft, setDraft] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const previewRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (draft) previewRef.current?.focus();
  }, [draft]);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const details = String(data.get("necesidad") ?? "").trim();
    if (!details) {
      const textarea = event.currentTarget.elements.namedItem("necesidad") as HTMLTextAreaElement;
      textarea.setCustomValidity("Cuéntanos un poco sobre lo que necesitas.");
      textarea.reportValidity();
      return;
    }
    const message = [
      "Hola, Dlegado Deluxe. Quiero solicitar una cotización.",
      "",
      ...FIELDS.map(({ name, label }) => `${label}: ${String(data.get(name) ?? "").trim()}`),
      "",
      details,
    ].join("\n");

    if ((event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "whatsapp" && hasWhatsApp) {
      window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      return;
    }
    setCopyStatus("");
    if (draft === message) previewRef.current?.focus();
    else setDraft(message);
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopyStatus("Solicitud copiada.");
    } catch {
      previewRef.current?.focus();
      previewRef.current?.select();
      setCopyStatus("No se pudo copiar automáticamente. Puedes copiar el texto seleccionado.");
    }
  }

  return (
    <section className="quote-page" aria-labelledby="quote-title">
      <CoffeeLandscape />
      <div className="quote-layout">
        <div className="quote-intro">
          <p className="label quote-eyebrow">Contacta a {company.brand}</p>
          <h1 id="quote-title">Un detalle que <em>deja huella.</em></h1>
          <p className="quote-description">Cuéntanos qué regalo imaginas para tu equipo, tus clientes o tus aliados. Te ayudamos a convertirlo en una experiencia especial alrededor del café colombiano.</p>
        </div>
        <div className="quote-panel">
          <h2 id="quote-form-title">Solicita una cotización</h2>
          <form aria-labelledby="quote-form-title" aria-describedby="quote-privacy" onSubmit={prepare} onInput={() => { setDraft(""); setCopyStatus(""); }}>
            <div className="quote-fields">
              {FIELDS.map(({ name, label, type, autoComplete, maxLength }) => (
                <label key={name} className="quote-field">
                  <span id={`quote-label-${name}`}>{label}</span>
                  <input required aria-labelledby={`quote-label-${name}`} name={name} type={type} autoComplete={autoComplete} maxLength={maxLength}
                    pattern={type === "text" ? ".*\\S.*" : type === "tel" ? "(?:[^0-9]*[0-9]){7,}[^0-9]*" : undefined}
                    title={type === "tel" ? "Escribe un número con al menos 7 dígitos." : undefined} />
                </label>
              ))}
              <label className="quote-field quote-field-full">
                <span id="quote-details-label">Cuéntanos qué necesitas</span>
                <textarea required aria-labelledby="quote-details-label" name="necesidad" rows={4} maxLength={1500} placeholder="Por ejemplo: cuántas anchetas, para qué ocasión y cuándo las necesitas."
                  onInput={(event) => event.currentTarget.setCustomValidity("")} />
              </label>
            </div>
            <p id="quote-privacy" className="quote-note">Tus datos no se guardan ni se envían al preparar el borrador. <Link href="/legal/privacidad">Política de privacidad</Link>.</p>
            <div className="quote-actions">
              <button type="submit" className="quote-primary">Preparar cotización <ArrowRight size={16} aria-hidden="true" /></button>
              <button type="submit" value="whatsapp" className="quote-secondary" disabled={!hasWhatsApp} aria-describedby={hasWhatsApp ? undefined : "quote-whatsapp-note"}>
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp
              </button>
            </div>
            {!hasWhatsApp && <p id="quote-whatsapp-note" className="quote-note">WhatsApp aún no está disponible. También puedes escribirnos por <a href={company.instagram} target="_blank" rel="noreferrer">Instagram</a>.</p>}
          </form>
          {draft && (
            <div className="quote-preview">
              <label className="quote-field">
                <span id="quote-draft-label">Borrador de tu solicitud</span>
                <textarea ref={previewRef} readOnly value={draft} rows={6} aria-labelledby="quote-draft-label" aria-describedby="quote-draft-note" />
              </label>
              <p id="quote-draft-note" className="quote-note">No se ha enviado. Puedes copiarlo y compartirlo por el canal que prefieras.</p>
              <button type="button" onClick={copyDraft} className="quote-secondary"><Copy size={16} aria-hidden="true" /> Copiar solicitud</button>
              <output className="quote-note">{copyStatus}</output>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
