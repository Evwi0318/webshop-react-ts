import { Router } from "express";
import type { Order, OrderItem, Product } from "../../../shared/types.ts";
import { db } from "../db.ts";
import { parseCustomer, parseOrderLines } from "../validation.ts";

export const ordersRouter = Router();

interface OrderRow {
  id: number;
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  zipCode: string;
  city: string;
  totalPrice: number;
  createdAt: string;
}

const selectByNumber = db.prepare("SELECT * FROM orders WHERE orderNumber = ?");
const selectById = db.prepare("SELECT * FROM orders WHERE id = ?");
const selectItems = db.prepare(
  "SELECT productId, title, price, quantity FROM order_items WHERE orderId = ?",
);
const selectProduct = db.prepare("SELECT * FROM products WHERE id = ?");

function toOrder(row: OrderRow): Order {
  const { id, orderNumber, totalPrice, createdAt, ...customer } = row;
  return {
    id,
    orderNumber,
    totalPrice,
    createdAt,
    customer,
    items: selectItems.all(id) as unknown as OrderItem[],
  };
}

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function createOrderNumber(): string {
  for (let attempt = 0; attempt < 20; attempt++) {
    const suffix = Array.from(
      { length: 6 },
      () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)],
    ).join("");
    const orderNumber = `ORD-${new Date().getFullYear()}-${suffix}`;
    if (!selectByNumber.get(orderNumber)) return orderNumber;
  }
  throw new Error("Kunde inte generera ett unikt ordernummer.");
}

ordersRouter.get("/:orderNumber", (req, res) => {
  const row = selectByNumber.get(String(req.params.orderNumber)) as OrderRow | undefined;
  if (!row) {
    res.status(404).json({ error: "Ordern hittades inte." });
    return;
  }
  res.json(toOrder(row));
});

ordersRouter.post("/", (req, res) => {
  const body = req.body as { customer?: unknown; items?: unknown };
  const customer = parseCustomer(body.customer);
  const lines = parseOrderLines(body.items);

  if (!customer.ok || !lines.ok) {
    const errors = [...(customer.ok ? [] : customer.errors), ...(lines.ok ? [] : lines.errors)];
    res.status(400).json({ errors });
    return;
  }

  const items: OrderItem[] = [];
  for (const line of lines.value) {
    const product = selectProduct.get(line.productId) as Product | undefined;
    if (!product) {
      res.status(400).json({ errors: [`Produkt med id ${line.productId} finns inte.`] });
      return;
    }
    items.push({
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: line.quantity,
    });
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { name, email, phone, street, zipCode, city } = customer.value;

  db.exec("BEGIN");
  try {
    const { lastInsertRowid } = db
      .prepare(
        `INSERT INTO orders (orderNumber, name, email, phone, street, zipCode, city, totalPrice, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        createOrderNumber(),
        name,
        email,
        phone,
        street,
        zipCode,
        city,
        totalPrice,
        new Date().toISOString(),
      );

    const orderId = Number(lastInsertRowid);
    const insertItem = db.prepare(
      "INSERT INTO order_items (orderId, productId, title, price, quantity) VALUES (?, ?, ?, ?, ?)",
    );
    for (const item of items) {
      insertItem.run(orderId, item.productId, item.title, item.price, item.quantity);
    }

    db.exec("COMMIT");
    res.status(201).json(toOrder(selectById.get(orderId) as unknown as OrderRow));
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
});
