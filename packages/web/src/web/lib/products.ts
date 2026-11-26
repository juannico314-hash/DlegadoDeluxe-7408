export type Product = {
  slug: string;
  name: string;
  short: string;
  accessory: string;
  coffee: string;
  price: number;
  image: string;
  isNew: boolean;
  bestSeller: boolean;
  tag?: string;
  description: string;
  includes: string[];
};

const COFFEE = "Café Dlegado Deluxe 250 g";

export const products: Product[] = [
  {
    slug: "cafe-prensa-francesa",
    name: "Combo Café + Prensa Francesa",
    short: "Prensa Francesa 350 ml",
    accessory: "Prensa francesa de vidrio 350 ml",
    coffee: COFFEE,
    price: 65000,
    image: "/img/combo-2.webp",
    isNew: true,
    bestSeller: true,
    tag: "Best Seller",
    description:
      "El ritual completo para una taza con cuerpo y aroma. Nuestro café de origen junto a una prensa francesa de vidrio borosilicato, presentado en caja kraft ilustrada.",
    includes: [COFFEE, "Prensa francesa 350 ml", "Caja kraft Dlegado Deluxe"],
  },
  {
    slug: "cafe-molino-electrico",
    name: "Combo Café + Molino Eléctrico",
    short: "Molino Eléctrico",
    accessory: "Molino eléctrico en acero inoxidable",
    coffee: COFFEE,
    price: 85000,
    image: "/img/combo-3.webp",
    isNew: true,
    bestSeller: true,
    tag: "Best Seller",
    description:
      "Muele al instante y libera todo el aroma del grano. Molino eléctrico compacto en acero inoxidable más nuestro café en grano.",
    includes: [COFFEE, "Molino eléctrico", "Caja kraft Dlegado Deluxe"],
  },
  {
    slug: "cafe-molino-manual",
    name: "Combo Café + Molino Manual",
    short: "Molino Manual",
    accessory: "Molino manual de acero con muela cerámica",
    coffee: COFFEE,
    price: 90000,
    image: "/img/combo-4.webp",
    isNew: true,
    bestSeller: false,
    tag: "Premium",
    description:
      "Para quienes disfrutan el proceso. Molino manual de acero, ajustable, junto a nuestro café en grano: el regalo para el verdadero amante del café.",
    includes: [COFFEE, "Molino manual", "Caja kraft Dlegado Deluxe"],
  },
  {
    slug: "cafe-mug-termico",
    name: "Combo Café + Mug Térmico",
    short: "Mug Térmico",
    accessory: "Mug térmico negro con base en acero",
    coffee: COFFEE,
    price: 65000,
    image: "/img/combo-5.webp",
    isNew: false,
    bestSeller: true,
    tag: "Best Seller",
    description:
      "Café caliente donde vayas. Mug térmico de doble pared con acabado negro mate y nuestro café colombiano.",
    includes: [COFFEE, "Mug térmico", "Caja kraft Dlegado Deluxe"],
  },
  {
    slug: "cafe-mug-personalizado",
    name: "Combo Café + Mug con tu Logo",
    short: "Mug Personalizado",
    accessory: "Mug cerámico blanco personalizado con el logo de tu empresa",
    coffee: COFFEE,
    price: 60000,
    image: "/img/combo-6.webp",
    isNew: false,
    bestSeller: true,
    tag: "Personalizable",
    description:
      "Tu marca en cada sorbo. Mug cerámico blanco estampado con el logo de tu empresa, acompañado de nuestro café. Ideal para clientes y colaboradores.",
    includes: [COFFEE, "Mug cerámico con tu logo", "Caja kraft Dlegado Deluxe"],
  },
  {
    slug: "cafe-cuchara-medidora",
    name: "Combo Café + Cuchara Clip Medidora",
    short: "Cuchara Clip Medidora",
    accessory: "Cuchara medidora con clip para sellar la bolsa",
    coffee: COFFEE,
    price: 55000,
    image: "/img/combo-7.webp",
    isNew: true,
    bestSeller: false,
    tag: "Nuevo",
    description:
      "La medida exacta en cada preparación. Cuchara medidora con clip que mantiene tu café fresco, más nuestra bolsa de café de origen.",
    includes: [COFFEE, "Cuchara clip medidora", "Caja kraft Dlegado Deluxe"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatCOP = (n: number) => "$" + n.toLocaleString("es-CO", { maximumFractionDigits: 0 });
