import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./cartContext";
import type { CartItem } from "../types/CartItem";
import { BASE_URL } from "../constants/BaseUrl";
import { useAuth } from "./AuthContext";

const CartProvidor: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!token) {
      return;
    }

    const FetchCart = async () => {
      const Response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!Response.ok) {
        setError("Failed to fetch user cart");
      }

      const cart = await Response.json();


      const cartItemsMapped = cart.items.map(
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          unitPrice: product.unitPrice,
        }),
      );



      setCartItems(cartItemsMapped);
    };
    FetchCart();
  }, [token]);


  const addItemToCart = async (productId: string) => {
    try {
      const Response = await fetch(`${BASE_URL}/cart/items`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!Response.ok) {
        setError("Failed to add to cart");
      }

      const cart = await Response.json();

      if (!cart) {
        console.error("failed to parse data");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cartItemsMapped = cart.items.map(
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          unitPrice: product.unitPrice,
        }),
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvidor;
