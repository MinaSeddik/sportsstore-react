// @types.todo.ts

import {ChangeEvent, Dispatch, ReactNode, SetStateAction} from "react";

export interface IProduct {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
}

export interface ICartItem {
    product: IProduct;
    quantity: number;
}

export type CartContextType = {
    cartItems: ICartItem[];
    // setCartItems: (cartItems: ICartItem[]) => void;
    // setCartItems: Dispatch<SetStateAction<ICartItem[]>>;
    setCartItems: (value: (((prevState: ICartItem[]) => ICartItem[]) | ICartItem[])) => void;
    addToCard: (product: IProduct) => void;
    removeFromCart: (product: IProduct) => void;
};