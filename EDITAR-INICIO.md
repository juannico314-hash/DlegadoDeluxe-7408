# Editar el inicio de Dlegado Deluxe

En `packages/web/src/web/`:

- **Textos y botones:** `components/scroll-film.tsx`. Las tres escenas se editan al final de ese archivo. `CUES` vincula el avance del scroll (entre 0 y 1) al número de fotograma (0 a 120).
- **Colores, tipografía y contraste:** los colores y fuentes de marca se definen en `styles.css`; las capas de contraste y el encuadre por tamaño están en `components/scroll-film.css`.
- **Catálogo:** `lib/products.ts` contiene nombres, precios e imágenes. `pages/index.tsx` organiza el catálogo al final de la portada y `components/product-card.tsx` dibuja cada producto.
- **Navegación y contactos:** `components/header.tsx` define el menú. `lib/company.ts` contiene los datos de contacto que usa el carrito para cotizar.

La secuencia se carga en grupos de 6 cuadros WebP (`packages/web/public/cinema/`), con versiones `sm` y `lg` y tres imágenes fijas para movimiento reducido. Para editar la app, usa `bun install` y `bun run dev` desde la raíz. Para publicar en Netlify, el zip contiene únicamente la compilación estática, no los archivos editables.
