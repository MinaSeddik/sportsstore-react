import React from 'react';
import NavigationBar from "./NavigationBar";
import {Outlet} from "react-router-dom";
import CartContextProvider from "../context/CartContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

// Reference: https://blog.logrocket.com/how-to-use-react-context-typescript/
function ShopRootLayout() {

    // const [cartItems, setCartItems] = useState([]);
    //
    // const cartItemsValue = {cartItems, setCartItems}

    const queryClient = new QueryClient();

    return (
        <div className="container-fluid">
            {/*<CartContext.Provider value={cartItemsValue}>*/}
            {/*    <NavigationBar/>*/}
            {/*    <Outlet/>*/}
            {/*</CartContext.Provider>*/}
            <QueryClientProvider client={queryClient}>
                <CartContextProvider>
                    <NavigationBar/>
                    <Outlet/>
                </CartContextProvider>
                <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right"/>
            </QueryClientProvider>

        </div>
    );
}

export default ShopRootLayout;