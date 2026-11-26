# Dlegado Deluxe — Design

Tienda web (es-CO) de café y Anchetas Empresariales 2026 de Dlegado Deluxe, Bogotá. Oscura, cálida, editorial y en movimiento — como vapor y café vertiéndose. Se basa en el sistema de diseño `dlegado-deluxe` (/home/user/dlegado-deluxe).

## Colores
| Token | Valor | Uso |
|---|---|---|
| espresso | #14100D | fondo base |
| roast-2 | #241712 | superficies |
| roast | #3B1F17 | superficies elevadas, texto en crema |
| gold | #E2C47E | CTA, precios, labels, marquee |
| gold-deep | #B8913F | acento sobre crema |
| olive | #5E6B2E | badges "personalizable" |
| cream | #EFE6D2 | texto sobre oscuro, fondo legal |
| lavender | #B48CD8 | máx. 1 detalle por vista |

## Tipografía
Fraunces 800 (display, enorme, interlineado 0.92) + Outfit (cuerpo/labels). Archivos en `public/fonts/`.

## Páginas
- `/` apertura cinematográfica: grano, historia y vertido en taza; el scroll controla el fotograma. La colección de seis anchetas aparece después, con entradas escalonadas.
- `/tienda` catálogo completo.
- `/producto/:slug` ficha: imagen, precio, molienda, cantidad, personalización.
- `/carrito` carrito + formulario de cotización (WhatsApp / correo) con autorización de datos.
- `/legal/:slug` privacidad, cookies, terminos, devoluciones, aviso-legal, pqrs (tema crema).
- Drawer de carrito global + banner de cookies.

## Movimiento
Secuencia responsive del video adjunto en WebP; un lienzo fijo durante tres escenas con texto en el flujo normal. El color del metraje se entibia y se difumina hacia espresso en los bordes. En movimiento reducido, cada escena usa un fotograma fijo. El catálogo mantiene las tarjetas y los acentos de marca originales.

La segunda escena se compone como una historia editorial: el emblema original junto a un titular en Fraunces, sin tarjeta; el grano queda visible al otro lado en escritorio y arriba en móvil. Las condiciones empresariales se leen en una línea de cifras y no compiten con el titular. Catálogo y tienda reutilizan el fondo de granos tostados en movimiento, con viñeta espresso y fotograma fijo para movimiento reducido.

## Cotizar
`/cotizar` abre con una ladera cafetera cubierta de neblina: video decorativo en escritorio y móvil, fotograma fijo con movimiento reducido y control para pausar. En escritorio, el titular Fraunces y el paisaje ocupan la izquierda y el formulario se enmarca en espresso a la derecha; en móvil se apilan. Los campos y las notas usan Outfit, con una acción dorada principal y WhatsApp como acción secundaria. La preparación solo genera un borrador en pantalla, sin guardarlo ni enviarlo.
