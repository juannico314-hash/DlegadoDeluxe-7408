import { useEffect } from "react";
import { Route, Switch, useLocation, Link } from "wouter";
import Index from "./pages/index";
import Tienda from "./pages/tienda";
import Producto from "./pages/producto";
import Carrito from "./pages/carrito";
import Cotizar from "./pages/cotizar";
import Legal from "./pages/legal";
import { Provider } from "./components/provider";
import { CartProvider } from "./lib/cart";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { CartDrawer } from "./components/cart-drawer";
import { CookieBanner } from "./components/cookie-banner";
import { useReveal } from "./hooks/use-reveal";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center pt-24 text-center">
      <p className="font-display text-9xl font-extrabold text-gold">404</p>
      <p className="mt-4 text-cream/70">Esta taza está vacía.</p>
      <Link href="/" className="mt-6 text-gold underline">Volver al inicio</Link>
    </div>
  );
}

function Shell() {
  const [loc] = useLocation();
  useReveal();
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    } else window.scrollTo(0, 0);
  }, [loc]);

  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/tienda" component={Tienda} />
          <Route path="/producto/:slug" component={Producto} />
          <Route path="/carrito" component={Carrito} />
          <Route path="/cotizar" component={Cotizar} />
          <Route path="/legal/:slug" component={Legal} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <CartDrawer />
      <CookieBanner />
    </>
  );
}

function App() {
  return (
    <Provider>
      <CartProvider>
        <Shell />
      </CartProvider>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
