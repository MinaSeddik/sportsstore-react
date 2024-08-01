import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import Shop from "./shop/Shop";
import CartDetails from "./shop/CartDetails";
import ShopRootLayout from "./shop/ShopRootLayout";
import NoMatch from "./shop/NoMatch";


const router_old = createBrowserRouter([
    // {path: '/', element: <App />, errorElement: <NotFoundPage />},
    {path: '/', element: <Navigate to="/shop/products"/>},
    // {path: '/shop/products/:category?', element: <Shop/>},
    // {path: '/shop/cart', element: <CartDetails/>},

    {
        path: '/shop',
        element: <ShopRootLayout/>,
        children: [
            {path: '/shop/products', element: <Shop/>},
            {path: 'cart', element: <CartDetails/>},

        ]
    },
    // {path: '*', element: <Navigate to="/"/>},
]);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" >
            <Route path="/shop" element={<ShopRootLayout/>}>
                <Route path="/shop" element={<Navigate to="/shop/products"/>}> </Route>
                <Route path="products" element={<Shop/>}> </Route>
                <Route path="products/:category" element={<Shop/>}> </Route>
                <Route path="cart" element={<CartDetails/>}> </Route>


                <Route path="*" element={<NoMatch/>}> </Route>
            </Route>

            <Route path="/" element={<Navigate to="/shop/products"/>}> </Route>
            <Route path="*" element={<NoMatch/>}> </Route>
        </Route>
    )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         <RouterProvider router={router_old}></RouterProvider>
//     </React.StrictMode>
// );


root.render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
