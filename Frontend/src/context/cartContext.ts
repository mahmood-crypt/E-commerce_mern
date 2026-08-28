import { createContext, useContext } from "react";
import type { CartItem } from "../types/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItemToCart: (productId: string) => Promise<void>;
  updateItemInCart: (productId: string, quantity: number) => Promise<void>;
  deleteItem: (productId: string) => Promise<void>;
  deleteCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: async () => {},
  updateItemInCart: async () => {},
  deleteItem: async () => {},
  deleteCart : async () => {}
});

export const useCart = () => useContext(CartContext);
