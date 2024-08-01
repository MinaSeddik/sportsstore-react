import { createContext, useState} from "react";
import {CartContextType, ContextProviderProps, ICartItem, IProduct} from "../@types/sportstore";


export const CartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({children}: ContextProviderProps) {
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);

    const addToCard = (product: IProduct): void => {
        // console.log(`addToCard product = ${JSON.stringify(product)}`)

        if (!cartItems.find(item => item.product.id === product.id)) {
            // console.log('item NOT found')
            cartItems.push({product: product, quantity: 0})
            // console.log(`Added to card .. ${JSON.stringify(cartItems)}`)
        }

        setCartItems(cartItems.map(item => item.product.id === product.id ? {
            ...item,
            quantity: item.quantity + 1
        } : item));
        // console.log(`addToCard cart = ${JSON.stringify(cartItems)}`)
    }

    const removeFromCart = (product: IProduct) => {
        setCartItems(cartItems.filter(item => item.product.id !== product.id));
    }

    const cartContextValue: CartContextType = {cartItems, setCartItems, addToCard, removeFromCart}

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
// export default CartContext;