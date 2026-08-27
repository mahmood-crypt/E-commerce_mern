import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./cartContext";
import type { CartItem } from "../types/CartItem";

const CartProvidor : FC<PropsWithChildren> = ({children}) => {
    const [cartItems , setCartItems] = useState<CartItem[]>([]);
    const [totalAmount , setTotalAmount] = useState<number>(0);
    const addItemToCart = (productId : string) => {
        console.log(productId);
    }


    return(
        <CartContext.Provider value = {{cartItems,totalAmount,addItemToCart}}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvidor