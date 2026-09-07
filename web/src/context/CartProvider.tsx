import { notifications } from "@mantine/notifications";
import { useEffect, useState, type ReactNode } from "react";
import type { CartItem, Product } from "@shared/types";
import { CartContext, type CartContextValue } from "./cart-context";

const STORAGE_KEY = "webshop-cart";

function loadCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function sum(items: CartItem[], value: (item: CartItem) => number) {
  return items.reduce((total, item) => total + value(item), 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(product: Product, quantity = 1) {
    setItems((prev) =>
      prev.some((item) => item.product.id === product.id)
        ? prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...prev, { product, quantity }],
    );

    notifications.show({
      title: "Tillagd i kundvagnen",
      message: product.title,
      color: "teal",
    });
  }

  function updateQuantity(productId: number, quantity: number) {
    setItems((prev) =>
      quantity < 1
        ? prev.filter((item) => item.product.id !== productId)
        : prev.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
    );
  }

  function removeFromCart(productId: number) {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }

  const value: CartContextValue = {
    items,
    totalItems: sum(items, (item) => item.quantity),
    totalPrice: sum(items, (item) => item.product.price * item.quantity),
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart: () => setItems([]),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
