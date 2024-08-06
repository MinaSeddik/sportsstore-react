import React, {ChangeEvent, useState, useTransition} from 'react';
import useFetch from "../hooks/useFetch";
import {IProduct, ProductsData} from "../@types/sportstore";

function ListProducts() {

    const [isPending, startTransition] = useTransition()
    const [filteredTerm, setFilteredTerm] = useState('');

    const {data}: ProductsData = useFetch(`${process.env.REACT_APP_BASE_URL}/products`);

    const handleFilteredTerm = (event: ChangeEvent<HTMLInputElement>) => {

        // let x = []
        // for (let i: number = 0; i < 10000000; i++) {
        //     x[i] = i;
        // }
        // setFilteredTerm(event.target.value)

        startTransition(() => {
            setFilteredTerm(event.target.value)
        })
    }

    const filteredProducts = data &&
                            data.filter((item: IProduct) => item.name.toLowerCase()
                                .includes(filteredTerm.toLowerCase()));

    console.log('Call Re-render ...');

    return (
        <div>
            <br/>
            <input type="text" className="form-control" placeholder="Search product by Name"
                   value={filteredTerm} onChange={handleFilteredTerm}/>
            <br/>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>

                {(
                    filteredProducts?.map(item => <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                    </tr>)
                )}

                </tbody>
            </table>
        </div>
    );
}

export default ListProducts;