import React, {useState} from 'react';
import NavigationBar from "./NavigationBar";
import {Outlet} from "react-router-dom";
import CartContext from "./CartContext";

function ShopRootLayout(props) {

    const [cartItems, setCartItems] = useState([]);

    const cartItemsValue = {cartItems, setCartItems}

    return (
        <div className="container-fluid">
            <CartContext.Provider value={cartItemsValue}>
                <NavigationBar/>
                <Outlet/>
            </CartContext.Provider>
        </div>
    );
}

export default ShopRootLayout;