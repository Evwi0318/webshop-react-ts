import type { CustomerInfo, NewProduct, ProductUpdate } from "../../shared/types.ts";

export type Result<T> = { ok: true; value: T } | { ok: false; errors: string[] };

type Parse = (value: unknown) => unknown;
type Field = { parse: Parse; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") return Number(value);
  return Number.NaN;
}

const text = (min: number, max: number) => (value: unknown) => {
  const result = toText(value);
  return result.length >= min && result.length <= max ? result : null;
};

const matches = (regex: RegExp) => (value: unknown) => {
  const result = toText(value);
  return regex.test(result) ? result : null;
};

const number =
  (min: number, max: number, whole = false) =>
  (value: unknown) => {
    const result = toNumber(value);
    if (!Number.isFinite(result) || result < min || result > max) return null;
    if (whole && !Number.isInteger(result)) return null;
    return result;
  };

const PRODUCT_FIELDS: Record<string, Field> = {
  title: { parse: text(2, 100), message: "Titel måste vara 2-100 tecken." },
  description: { parse: text(10, 2000), message: "Beskrivning måste vara 10-2000 tecken." },
  price: { parse: number(0, 1000000), message: "Pris måste vara 0 eller större." },
  image: { parse: text(1, 500), message: "Bild-URL får inte vara tom." },
  category: { parse: text(1, 50), message: "Kategori får inte vara tom." },
  stock: { parse: number(0, 100000, true), message: "Lagersaldo måste vara ett heltal, 0 eller större." },
};

const CUSTOMER_FIELDS: Record<string, Field> = {
  name: { parse: text(2, 100), message: "Namn måste vara minst 2 tecken." },
  email: { parse: matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/), message: "Ogiltig e-postadress." },
  phone: { parse: matches(/^\+?[\d\s-]{7,20}$/), message: "Ogiltigt telefonnummer." },
  street: { parse: text(3, 100), message: "Gatuadress måste vara minst 3 tecken." },
  zipCode: { parse: matches(/^\d{3}\s?\d{2}$/), message: "Postnummer måste vara 5 siffror." },
  city: { parse: text(2, 60), message: "Ort måste vara minst 2 tecken." },
};

function validate<T>(fields: Record<string, Field>, body: unknown, partial = false): Result<T> {
  if (!isRecord(body)) return { ok: false, errors: ["Ogiltig data."] };

  const errors: string[] = [];
  const value: Record<string, unknown> = {};

  for (const [key, field] of Object.entries(fields)) {
    if (partial && !(key in body)) continue;

    const parsed = field.parse(body[key]);
    if (parsed === null) errors.push(field.message);
    else value[key] = parsed;
  }

  if (errors.length > 0) return { ok: false, errors };
  if (partial && Object.keys(value).length === 0) {
    return { ok: false, errors: ["Inga fält att uppdatera."] };
  }
  return { ok: true, value: value as T };
}

export function parseNewProduct(body: unknown) {
  return validate<NewProduct>(PRODUCT_FIELDS, body);
}

export function parseProductUpdate(body: unknown) {
  return validate<ProductUpdate>(PRODUCT_FIELDS, body, true);
}

export function parseCustomer(body: unknown) {
  return validate<CustomerInfo>(CUSTOMER_FIELDS, body);
}

export function parseOrderLines(body: unknown): Result<{ productId: number; quantity: number }[]> {
  if (!Array.isArray(body) || body.length === 0) {
    return { ok: false, errors: ["Ordern måste innehålla minst en produkt."] };
  }

  const errors: string[] = [];
  const lines: { productId: number; quantity: number }[] = [];

  body.forEach((row: unknown, index) => {
    const productId = isRecord(row) ? number(1, 1000000, true)(row["productId"]) : null;
    const quantity = isRecord(row) ? number(1, 99, true)(row["quantity"]) : null;

    if (productId === null || quantity === null) errors.push(`Rad ${index + 1} är ogiltig.`);
    else lines.push({ productId, quantity });
  });

  return errors.length > 0 ? { ok: false, errors } : { ok: true, value: lines };
}
