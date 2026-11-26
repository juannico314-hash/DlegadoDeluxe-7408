import { useEffect } from "react";
import { useLocation } from "wouter";

// Reveal both the initial cards and cards inserted by a catalog filter.
export function useReveal() {
  const [loc] = useLocation();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    const inserts = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches(".reveal:not(.in)")) io.observe(node);
          node.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => io.observe(el));
        }
        for (const node of record.removedNodes) {
          if (!(node instanceof HTMLElement) || node.isConnected) continue;
          if (node.matches(".reveal")) io.unobserve(node);
          node.querySelectorAll<HTMLElement>(".reveal").forEach((el) => io.unobserve(el));
        }
      }
    });
    const main = document.querySelector("main");
    if (main) inserts.observe(main, { childList: true, subtree: true });
    return () => { inserts.disconnect(); io.disconnect(); };
  }, [loc]);
}
