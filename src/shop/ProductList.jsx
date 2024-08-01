import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import CartContext from "./CartContext";

function ProductList(props) {

    const params = useParams();
    const {cartItems, setCartItems} = useContext(CartContext)

    const addToCard = (product) => {
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

    if (props.products == null || props.products.length === 0) {
        return <h5 className="p-2">No Products</h5>;
    }

    return (
        <div>
            {props.products.filter(p => params === undefined ||
                                        params.category === undefined ||
                                        p.category.toLowerCase() === params?.category?.toLowerCase())
                .map(p =>
                <div className="card m-1 p-1 bg-light" key={p.id}>
                    <h4>
                        {p.name}
                        <span className="badge badge-pill badge-primary text-primary float-end">
                                    ${p.price.toFixed(2)}
                        </span>
                    </h4>
                    <div className="card-text bg-white p-1">
                        {p.description}
                        <button className="btn btn-success btn-sm float-end"
                                onClick={() => addToCard(p)}>
                            Add To Cart
                        </button>
                    </div>
                </div>)
            }

        </div>
    )
        ;
}

export default ProductList;