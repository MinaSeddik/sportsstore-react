import React from 'react';
import NavigationBar from "./NavigationBar";
import {Outlet} from "react-router-dom";
import CartContextProvider from "../context/CartContext";

// Reference: https://blog.logrocket.com/how-to-use-react-context-typescript/
function ShopRootLayout() {

    // const [cartItems, setCartItems] = useState([]);
    //
    // const cartItemsValue = {cartItems, setCartItems}

    return (
        <div className="container-fluid">
            {/*<CartContext.Provider value={cartItemsValue}>*/}
            {/*    <NavigationBar/>*/}
            {/*    <Outlet/>*/}
            {/*</CartContext.Provider>*/}

            <CartContextProvider>
                <NavigationBar/>
                <Outlet/>
            </CartContextProvider>

        </div>
    );
}

export default ShopRootLayout;