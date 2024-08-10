import React, {ChangeEvent, useDeferredValue, useState} from 'react';
import {ProductsData} from "../@types/sportstore";
import useFetch2 from "../hooks/useFetch2";
import ProductTable from "./ProductTable";

function ListProducts2() {

    const [filteredTerm, setFilteredTerm] = useState('');


    // const [isPending, startTransition] = useTransition();
    const deferredFilteredTerm = useDeferredValue(filteredTerm)


    const {data, isLoading}: ProductsData = useFetch2(`${process.env.REACT_APP_BASE_URL}/products`);

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

                    {isLoading ? <div>Loading ...</div> :
                        <ProductTable products={data ? data : []} filteredTerm={deferredFilteredTerm}/>

                    }
                </div>
                <div className="col-3 border border-1 border-black rounded-1">

                </div>
            </div>
        </div>
    );
}

export default ListProducts2;