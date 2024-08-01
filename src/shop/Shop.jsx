import React, {useEffect, useState} from 'react';
import CategoryNavigation from "./CategoryNavigation";
import ProductList from "./ProductList";
import {data} from "../data/placeholderData";

function Shop() {

    const [products, setProducts] = useState(data.products);
    const [categories, setCategories] = useState(data.categories);

    useEffect(() => {

        const url = 'http://localhost:3600/api/products';
        console.log(`URL = ${url}`)

        // let unSubscribed = false;
        const controller = new AbortController();
        const signal = controller.signal;


        fetch(url, {signal})
            .then((response) => response.json())
            .then((result) => {
                setProducts(result);
                setCategories(result.map(product => product.category)
                    .filter((value, index, array) => array.indexOf(value) === index));
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.error(error)
                } else {
                    // todo: handle error
                }
            });

        // clean up function, to cancel the previous run of useEffect
        return () => {
            // unSubscribed = true;
            controller.abort();
        }
    }, []);

    return (
        <div className="row">
            <div className="col-3 p-2">
                <div className="d-grid gap-2">
                    <CategoryNavigation baseUrl="/shop/products" categories={categories}/>
                </div>
            </div>
            <div className="col-9 p-2">
                <ProductList products={products}/>
            </div>
        </div>
    );
}

export default Shop;