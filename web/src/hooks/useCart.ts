import { useContext } from "react";
import { CartContext } from "../context/cart-context";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart måste användas inuti en CartProvider");
  return context;
}
