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
      "En låg sneaker i mjukt kalvskinn med perforerad tåhätta och gummisula med vaffelmönster. Fodrad med bomullscanvas och byggd på en dämpande mellansula i EVA. Tidlös vit modell som passar lika bra till jeans som till kavaj.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop",
    category: "Sneakers",
    stock: 34,
  },
  {
    title: "Court Low Marin",
    description:
      "Klassisk tennissko i marinblått mocka med kontrastsöm i vitt. Låg profil, smal läst och en vulkaniserad gummisula som ger bra grepp på asfalt. Tillverkad i Portugal.",
    price: 1149,
    image: "https://images.unsplash.com/photo-1552066344-2464c1135c32?w=800&h=800&fit=crop",
    category: "Sneakers",
    stock: 28,
  },
  {
    title: "Knit Runner Grå",
    description:
      "Stickad ovandel i återvunnen polyester som formar sig efter foten utan inkörning. Sömlös konstruktion, dämpande skummellansula och en vikt på endast 240 gram. Andas ovanligt bra varma dagar.",
    price: 1099,
    image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&h=800&fit=crop",
    category: "Sneakers",
    stock: 19,
  },
  {
    title: "High Top Canvas Röd",
    description:
      "Höghalsad canvassko i kraftig bomullsduk med gummitåhätta och vulkaniserad sula. Sju par snörhål och förstärkta metallöljetter i vristen. En modell som blivit snyggare ju mer den använts sedan femtiotalet.",
    price: 899,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&h=800&fit=crop",
    category: "Sneakers",
    stock: 52,
  },
  {
    title: "Court Sneaker Sand",
    description:
      "Avskalad sneaker i sandfärgat nubuck utan synliga logotyper. Ren gummisula, mjuk kant runt hälen och en fotbädd i minnesskum. Den sortens sko som fungerar till nästan allt i garderoben.",
    price: 1149,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&h=800&fit=crop",
    category: "Sneakers",
    stock: 33,
  },
  {
    title: "Läderkänga Svart",
    description:
      "Kraftig snörkänga i svart helläder med sex par öljetter och rejäl gummisula. Goodyear-sydd konstruktion, vilket betyder att sulan kan bytas ut i stället för att skon slängs. Åldras vackert och tål svenska vintrar.",
    price: 2490,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&h=800&fit=crop",
    category: "Kängor",
    stock: 22,
  },
  {
    title: "Vinterkänga Ullfodrad",
    description:
      "Fodrad med äkta lammull och byggd på en isolerande gummisula med djupt mönster. Vattenavvisande läder och tejpade sömmar håller fötterna torra i snöslask. Klarar temperaturer ner till minus tjugo grader.",
    price: 2190,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&h=800&fit=crop",
    category: "Kängor",
    stock: 16,
  },
  {
    title: "Arbetskänga Brun",
    description:
      "Robust känga i oljat nubuck med stålhätta och halkskyddad sula. Åtta par snörhål och en stötdämpande innersula för långa dagar på benen. Uppfyller skyddsklass EN ISO 20345.",
    price: 1890,
    image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800&h=800&fit=crop",
    category: "Kängor",
    stock: 25,
  },
  {
    title: "Oxford Brun",
    description:
      "Sluten snörning och ren linjeföring gör oxforden till den mest formella modellen. Ovandel i polerat boxcalf, läderfoder och lädersula med gummiklack. Levereras med skoblock i cederträ.",
    price: 3290,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&h=800&fit=crop",
    category: "Finskor",
    stock: 12,
  },
  {
    title: "Derby Cognac",
    description:
      "Öppen snörning ger derbyn mer plats över vristen och en något ledigare känsla än oxforden. Handfärgat läder i cognac med subtil skuggning i tån och en diskret gummiklack.",
    price: 2890,
    image: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&h=800&fit=crop",
    category: "Finskor",
    stock: 18,
  },
  {
    title: "Monk Strap Brun",
    description:
      "Dubbelspänd monk strap utan snörning, en modell som klär sig upp lika bra som ner. Ovandel i vegetabiliskt garvat kalvskinn med handsydd fram. Spännena är i borstad mässing.",
    price: 2690,
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&h=800&fit=crop",
    category: "Finskor",
    stock: 21,
  },
  {
    title: "Sandal Läder Natur",
    description:
      "Handsydd sandal i vegetabiliskt garvat läder med justerbara remmar och korkfotbädd som formar sig efter foten. Sulan är av naturgummi och går att sula om. Blir bekvämare för varje säsong.",
    price: 999,
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&h=800&fit=crop",
    category: "Sandaler",
    stock: 40,
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
