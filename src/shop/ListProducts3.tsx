
import ProductTable from "./ProductTable";
import {ChangeEvent, useDeferredValue, useEffect, useState} from "react";
import wrapPromise from "../utils/wrapPromise";


let isFullfilled = false;
function getProductData(url: string) {
    console.log('getProductData')
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error('CanNot fetch data from this resource')
            }
            return response.json();
        })  .then((result) => {
            isFullfilled = true;
            console.log('After setting data')
            return result;
        })

}

const dataPromise = wrapPromise(getProductData(`${process.env.REACT_APP_BASE_URL}/products`));


function ListProducts3() {

    const [filteredTerm, setFilteredTerm] = useState('');

    const data = dataPromise.read();

    const handleFilteredTerm = (event: ChangeEvent<HTMLInputElement>) => {
        setFilteredTerm(event.target.value)
    }

    return (
        <div>
            <br/>
            <div className="row">
                <div className="col-9 border border-1 border-black rounded-1">
                    <input type="text" className="form-control my-3"
                           placeholder="Search product by Name"
                           value={filteredTerm} onChange={handleFilteredTerm}/>
                    <br/>
                        <ProductTable products={data} filteredTerm={filteredTerm}/>
                </div>
                <div className="col-3 border border-1 border-black rounded-1">

                </div>
            </div>
        </div>
    );
}


export default ListProducts3;