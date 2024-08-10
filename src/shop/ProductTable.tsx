import React, {memo} from 'react';
import {IProduct} from "../@types/sportstore";

function ProductTable({products, filteredTerm}: {products: IProduct[], filteredTerm: string}) {


    // console.log('ProductTable re-render .. ' + filteredTerm)

    return (
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
                products.filter((item: IProduct) => item.name.toLowerCase()
                    .includes(filteredTerm.toLowerCase())).map((item: IProduct) => <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                </tr>)
            )}

            </tbody>
        </table>
    );
}

export default memo(ProductTable);