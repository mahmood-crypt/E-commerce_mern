import {
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { CartContext } from "./cartContext";
import type { CartItem } from "../types/CartItem";
import { BASE_URL } from "../constants/BaseUrl";
import { useAuth } from "./AuthContext";

interface ApiProduct {
  _id: string;
  title: string;
  image: string;
}

interface ApiCartItem {
  product: ApiProduct;
  quantity: number;
  unitPrice: number;
}

interface ApiCart {
  items: ApiCartItem[];
  totalAmount: number;
}

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const updateCartState = (cart: ApiCart) => {
    const cartItemsMapped: CartItem[] = cart.items.map(
      ({ product, quantity, unitPrice }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        unitPrice,
        quantity,
      }),
    );

    setCartItems(cartItemsMapped);
    setTotalAmount(cart.totalAmount);
  };

  useEffect(() => {
    if (!token) {
      setCartItems([]);
      setTotalAmount(0);
      return;
    }

    const fetchCart = async () => {
      try {
        setError("");

        const response = await fetch(`${BASE_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user cart");
        }

        const cart: ApiCart = await response.json();

        updateCartState(cart);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch user cart");
      }
    };

    fetchCart();
  }, [token]);

  const addItemToCart = async (productId: string): Promise<void> => {
    try {
      setError("");

      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      const cart: ApiCart = await response.json();

      updateCartState(cart);
    } catch (error) {
      console.error(error);
      setError("Failed to add to cart");
    }
  };

  const updateItemInCart = async (
    productId: string,
    quantity: number,
  ): Promise<void> => {
    if (quantity <= 0) {
      await deleteItem(productId);
      return;
    }

    try {
      setError("");

      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }

      const cart: ApiCart = await response.json();

      updateCartState(cart);
    } catch (error) {
      console.error(error);
      setError("Failed to update cart");
    }
  };

  const deleteItem = async (productId: string): Promise<void> => {
    try {
      setError("");

      const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      /*
       * Remove only the deleted item from the existing state.
       * This preserves the image/title/etc. of the remaining items.
       */
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId),
      );

      /*
       * If your DELETE endpoint returns the updated cart,
       * use its totalAmount.
       */
      const cart: ApiCart = await response.json();

      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
      setError("Failed to delete item");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        updateItemInCart,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
