import React, {ChangeEvent, useDeferredValue, useState, useTransition} from 'react';
import useFetch from "../hooks/useFetch";
import {IProduct, ProductsData} from "../@types/sportstore";

function ListProducts() {

    const [filteredTerm, setFilteredTerm] = useState('');

    const [items, setItems] = useState<number[]>([]);

    const [isPending, startTransition] = useTransition()
    const deferredFilteredTerm = useDeferredValue(filteredTerm)



    const {data}: ProductsData = useFetch(`${process.env.REACT_APP_BASE_URL}/products`);

    const handleFilteredTerm = (event: ChangeEvent<HTMLInputElement>) => {

        // Urgent update
        setFilteredTerm(event.target.value)


        // transition update
        startTransition(() => {

            let index: number = 1
            // const myArray: number[] = Array(5000)
            //     .fill(1).map((e, i) => count + 5000 - i)

            // const myArray: number[] = Array.from({length: 5000}, (e, i)=> i)
            const myArray: number[] = [...Array(10000).keys()]

            setItems(myArray)
        })
    }

    const filteredProducts = data &&
        data.filter((item: IProduct) => item.name.toLowerCase()
            .includes(filteredTerm.toLowerCase()));

    // console.log(`Call Re-render ... for filteredTerm = ${filteredTerm}`);

    return (
        <div>
            <br/>
            <div className="row">
                <div className="col-9 border border-1 border-black rounded-1">
                    <input type="text" className="form-control my-3"
                           placeholder="Search product by Name"
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
                <div className="col-3 border border-1 border-black rounded-1">
                    <h4>Test useTransition Hook</h4>
                    <hr/>
                    Filter By: {deferredFilteredTerm}
                    <hr/>
                    {isPending ? <div>Loading ... </div> :
                        items.map(item => <div key={item}>
                            <h4>{item}</h4>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default ListProducts;