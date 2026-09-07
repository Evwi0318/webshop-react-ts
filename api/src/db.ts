import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import type { NewProduct } from "../../shared/types.ts";

const dataDir = join(dirname(fileURLToPath(import.meta.url)), "..", "data");
mkdirSync(dataDir, { recursive: true });

export const db = new DatabaseSync(join(dataDir, "webshop.db"));

db.exec("PRAGMA foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    description TEXT    NOT NULL,
    price       REAL    NOT NULL,
    image       TEXT    NOT NULL,
    category    TEXT    NOT NULL,
    stock       INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS orders (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    orderNumber TEXT    NOT NULL UNIQUE,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL,
    phone       TEXT    NOT NULL,
    street      TEXT    NOT NULL,
    zipCode     TEXT    NOT NULL,
    city        TEXT    NOT NULL,
    totalPrice  REAL    NOT NULL,
    createdAt   TEXT    NOT NULL
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId   INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    productId INTEGER NOT NULL,
    title     TEXT    NOT NULL,
    price     REAL    NOT NULL,
    quantity  INTEGER NOT NULL
  );
`);

const SEED: NewProduct[] = [
  {
    title: "Runner 90 Vit",
    description:
      "En låg sneaker i mjukt kalvskinn med perforerad tåhätta och gummisula med vaffelmönster. Fodrad med bomullscanvas och byggd på en dämpande mellansula i EVA. Tidlös vit modell som passar lika bra till jeans som till kostym.",
    price: 1299,
    image: "https://picsum.photos/seed/runner90/800/800",
    category: "Sneakers",
    stock: 34,
  },
  {
    title: "Court Low Marin",
    description:
      "Klassisk tennissko i marinblått mocka med kontrastsöm i vitt. Låg profil, smal läst och en vulkaniserad gummisula som ger bra grepp. Tillverkad i Portugal.",
    price: 1149,
    image: "https://picsum.photos/seed/courtlow/800/800",
    category: "Sneakers",
    stock: 28,
  },
  {
    title: "Trail Runner Olive",
    description:
      "Terrängsko med vattenavvisande ovandel i ripstop och kraftig grovmönstrad sula. Snabbsnörning och förstärkt häl gör den stabil på ojämnt underlag. Väger endast 310 gram.",
    price: 1599,
    image: "https://picsum.photos/seed/trailolive/800/800",
    category: "Sneakers",
    stock: 19,
  },
  {
    title: "Chelsea Boot Svart",
    description:
      "Chelseaboots i helläder med elastiska sidopaneler och draglapp i bakkappan. Goodyear-sydd konstruktion som gör att sulan kan bytas ut. Åldras vackert med tiden.",
    price: 2490,
    image: "https://picsum.photos/seed/chelseasvart/800/800",
    category: "Kängor",
    stock: 22,
  },
  {
    title: "Vinterkänga Ullfodrad",
    description:
      "Fodrad med äkta lammull och byggd på en isolerande gummisula med djupt mönster. Vattentät söm och dragkedja på insidan. Klarar temperaturer ner till minus tjugo grader.",
    price: 2190,
    image: "https://picsum.photos/seed/vinterkanga/800/800",
    category: "Kängor",
    stock: 16,
  },
  {
    title: "Arbetskänga Brun",
    description:
      "Robust känga i oljat nubuck med stålhätta och halkskyddad sula. Åtta par snörhål och en stötdämpande innersula för långa dagar på benen. Uppfyller EN ISO 20345.",
    price: 1890,
    image: "https://picsum.photos/seed/arbetskanga/800/800",
    category: "Kängor",
    stock: 25,
  },
  {
    title: "Oxford Svart",
    description:
      "Sluten snörning och ren linjeföring gör oxfordskon till den mest formella modellen. Ovandel i polerat boxcalf, läderfoder och lädersula med gummiklack. Levereras med skoblock i cederträ.",
    price: 3290,
    image: "https://picsum.photos/seed/oxfordsvart/800/800",
    category: "Finskor",
    stock: 12,
  },
  {
    title: "Derby Cognac",
    description:
      "Öppen snörning ger derbyn mer plats över vristen och en något ledigare känsla än oxforden. Handfärgat läder i cognac med subtil skuggning i tån.",
    price: 2890,
    image: "https://picsum.photos/seed/derbycognac/800/800",
    category: "Finskor",
    stock: 18,
  },
  {
    title: "Loafer Penny Mocka",
    description:
      "Oformell loafer i mjuk mocka med klassiskt pennyband över vristen. Flexibel gummisula och obefintlig inkörningstid. Bärs lika gärna utan strumpor på sommaren.",
    price: 2190,
    image: "https://picsum.photos/seed/loaferpenny/800/800",
    category: "Finskor",
    stock: 21,
  },
  {
    title: "Sandal Läder Natur",
    description:
      "Handsydd sandal i vegetabiliskt garvat läder med justerbara remmar och korkfotbädd som formar sig efter foten. Sulan är av naturgummi.",
    price: 999,
    image: "https://picsum.photos/seed/sandalnatur/800/800",
    category: "Sandaler",
    stock: 40,
  },
  {
    title: "Slide Svart",
    description:
      "Enkel slip-in med bred ovanrem i mjukt syntetmaterial och ergonomiskt formad fotbädd. Lätt att skölja av, perfekt till stranden eller gymmet.",
    price: 449,
    image: "https://picsum.photos/seed/slidesvart/800/800",
    category: "Sandaler",
    stock: 55,
  },
  {
    title: "Espadrill Beige",
    description:
      "Somrig espadrill med ovandel i tvättad bomullscanvas och flätad jutesula. Vulkaniserad gummikant för bättre slitstyrka. Vikbar och lätt att packa ner.",
    price: 699,
    image: "https://picsum.photos/seed/espadrill/800/800",
    category: "Sandaler",
    stock: 33,
  },
];

function seed() {
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM products").get() as {
    count: number;
  };
  if (count > 0) return;

  const insert = db.prepare(
    "INSERT INTO products (title, description, price, image, category, stock) VALUES (?, ?, ?, ?, ?, ?)",
  );

  for (const p of SEED) {
    insert.run(p.title, p.description, p.price, p.image, p.category, p.stock);
  }

  console.log(`Databasen seedad med ${SEED.length} produkter.`);
}

seed();
