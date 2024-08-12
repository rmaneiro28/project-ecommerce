import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => {
  const context = useContext(CartContext);

  if (useContext(CartContext) === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
