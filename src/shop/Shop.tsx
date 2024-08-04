import React, {useMemo} from 'react';
import CategoryNavigation from "./CategoryNavigation";
import ProductList from "./ProductList";
import {IProduct} from "../@types/sportstore";
import useFetch from "../hooks/useFetch";

type ProductsData = {
    data?: IProduct[] | null;
    isLoading: boolean;
    error?: Error | null | string;
}

function Shop() {

    // const [products, setProducts] = useState<IProduct[]>(data.products);
    // const [categories, setCategories] = useState<string[]>(data.categories);
    //
    // useEffect(() => {
    //
    //     const url: string = 'http://localhost:3600/api/products';
    //     console.log(`URL = ${url}`)
    //
    //     // let unSubscribed = false;
    //     const controller: AbortController = new AbortController();
    //     const signal: AbortSignal = controller.signal;
    //
    //
    //     fetch(url, {signal})
    //         .then((response) => response.json())
    //         .then((result) => {
    //             setProducts(result);
    //             setCategories(result.map((product: IProduct) => product.category)
    //                 .filter((value: IProduct, index: number, array: IProduct[]) => array.indexOf(value) === index));
    //         })
    //         .catch(error => {
    //             if (error.name === 'AbortError') {
    //                 console.error(error)
    //             } else {
    //                 // todo: handle error
    //             }
    //         });
    //
    //     // clean up function, to cancel the previous run of useEffect
    //     return () => {
    //         controller.abort();
    //     }
    // }, []);

    const {data, isLoading, error}: ProductsData = useFetch('http://localhost:3600/api/products');

    const categories = useMemo(() => {
        return data ? data.map((product: IProduct) => product.category)
            .filter((value: string, index: number, array: string[]) => array.indexOf(value) === index): [];
    }, [data])

    return (
        <div className="row">
            <div className="col-3 p-2">
                <div className="d-grid gap-2">
                    <CategoryNavigation baseUrl="/shop/products" categories={categories}/>
                </div>
            </div>
            <div className="col-9 p-2">
                <ProductList products={data}/>
            </div>
        </div>
    );
}

export default Shop;