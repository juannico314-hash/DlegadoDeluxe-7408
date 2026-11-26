import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { legalDocs } from "../lib/legal-content";
import { company } from "../lib/company";

const ORDER: [string, string][] = [
  ["privacidad", "Privacidad y datos"],
  ["cookies", "Cookies"],
  ["terminos", "Términos y condiciones"],
  ["devoluciones", "Retracto y garantías"],
  ["aviso-legal", "Aviso legal"],
  ["pqrs", "PQRS"],
];

export default function Legal() {
  const { slug } = useParams<{ slug: string }>();
  const doc = legalDocs[slug];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="legal min-h-screen">
      <div className="bg-espresso pt-32 pb-16">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <p className="label mb-4 !text-gold">Legal · {company.brand}</p>
          <h1 className="font-display text-4xl leading-[1] font-extrabold tracking-tight text-cream md:text-6xl">{doc?.title ?? "Documento no encontrado"}</h1>
          {doc && <p className="mt-5 max-w-2xl !text-cream/70">{doc.intro}</p>}
        </div>
      </div>
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-14 md:px-10 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit lg:sticky lg:top-28">
          <ul className="space-y-1 !list-none !p-0">
            {ORDER.map(([s, l]) => (
              <li key={s}>
                <Link
                  href={`/legal/${s}`}
                  className={`block rounded-xl px-4 py-2.5 text-sm !no-underline transition-colors ${s === slug ? "bg-roast !text-cream" : "!text-roast hover:bg-[#e6d9bf]"}`}
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <article className="max-w-3xl">
          {doc ? doc.body : <p>Selecciona un documento del menú.</p>}
          <p className="mt-12 border-t border-roast/15 pt-6 text-sm">Última actualización: {company.lastUpdate}</p>
        </article>
      </div>
    </div>
  );
}
