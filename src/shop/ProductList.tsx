import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import {CartContext} from "../context/CartContext";
import {CartContextType, IProduct} from "../@types/sportstore";

type ProductListProps = {
    products: IProduct[];
}

function ProductList({products}: ProductListProps) {

    const params = useParams();
    const {addToCard} = useContext(CartContext) as CartContextType;


    if (!products || products.length === 0) {
        return <h5 className="p-2">No Products</h5>;
    }

    return (
        <div>
            {products.filter(p => params.category === undefined ||
                p.category.toLowerCase() === params.category?.toLowerCase())
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