import { Router } from "express";
import type { Product } from "../../../shared/types.ts";
import { db } from "../db.ts";
import { parseNewProduct, parseProductUpdate } from "../validation.ts";

export const productsRouter = Router();

const selectAll = db.prepare("SELECT * FROM products ORDER BY id");
const selectOne = db.prepare("SELECT * FROM products WHERE id = ?");

const NOT_FOUND = { error: "Produkten hittades inte." };

function findProduct(id: string | undefined) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) return undefined;
  return selectOne.get(numericId) as Product | undefined;
}

productsRouter.get("/", (_req, res) => {
  res.json(selectAll.all());
});

productsRouter.get("/:id", (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) {
    res.status(404).json(NOT_FOUND);
    return;
  }
  res.json(product);
});

productsRouter.post("/", (req, res) => {
  const parsed = parseNewProduct(req.body);
  if (!parsed.ok) {
    res.status(400).json({ errors: parsed.errors });
    return;
  }

  const { title, description, price, image, category, stock } = parsed.value;
  const { lastInsertRowid } = db
    .prepare(
      "INSERT INTO products (title, description, price, image, category, stock) VALUES (?, ?, ?, ?, ?, ?)",
    )
    .run(title, description, price, image, category, stock);

  res.status(201).json(selectOne.get(Number(lastInsertRowid)));
});

productsRouter.put("/:id", (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) {
    res.status(404).json(NOT_FOUND);
    return;
  }

  const parsed = parseProductUpdate(req.body);
  if (!parsed.ok) {
    res.status(400).json({ errors: parsed.errors });
    return;
  }

  const entries = Object.entries(parsed.value);
  const columns = entries.map(([column]) => `${column} = ?`).join(", ");
  const values = entries.map(([, value]) => value as string | number);

  db.prepare(`UPDATE products SET ${columns} WHERE id = ?`).run(...values, product.id);

  res.json(selectOne.get(product.id));
});

productsRouter.delete("/:id", (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) {
    res.status(404).json(NOT_FOUND);
    return;
  }

  db.prepare("DELETE FROM products WHERE id = ?").run(product.id);
  res.status(204).end();
});
