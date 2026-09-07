import type {
  NewOrder,
  NewProduct,
  Order,
  Product,
  ProductUpdate,
} from "@shared/types";

const API = "/api";

async function fetchApi<T>(
  path: string,
  options: RequestInit,
  errorMsg: string,
): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(errorMsg);
  if (options.method === "DELETE") return null as T;
  return res.json();
}

export const getProducts = () =>
  fetchApi<Product[]>("/products", {}, "Kunde hämta produkterna");

export const getProduct = (id: number) =>
  fetchApi<Product>(`/products/${id}`, {}, "Kunde inte hämta produkten");

export const createProduct = (product: NewProduct) =>
  fetchApi<Product>(
    "/products",
    { method: "POST", body: JSON.stringify(product) },
    "Kunde inte skapa produkten",
  );

export const updateProduct = (id: number, changes: ProductUpdate) =>
  fetchApi<Product>(
    `/products/${id}`,
    { method: "PUT", body: JSON.stringify(changes) },
    "Kunde inte uppdatera",
  );

export const deleteProduct = (id: number) =>
  fetchApi<void>(`/products/${id}`, { method: "DELETE" }, "Kunde inte ta bort");

export const createOrder = (order: NewOrder) =>
  fetchApi<Order>(
    "/orders",
    { method: "POST", body: JSON.stringify(order) },
    "Kunde inte lägga ordern",
  );

export const getOrder = (orderNumber: string) =>
  fetchApi<Order>(`/orders/${orderNumber}`, {}, "Kunde inte hämta ordern");

export const formatPrice = (price: number) => `${price} kr`;
