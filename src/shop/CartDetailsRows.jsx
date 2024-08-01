import React, {useContext} from 'react';
import CartContext from "./CartContext";

function CartDetailsRows() {

    const {cartItems, setCartItems} = useContext(CartContext)

    const handleChange = (product, event) => {
        let quantity = event.target.valueAsNumber;

        if (quantity <= 0) {
            // do sanity check
        }

        if (!cartItems.find(item => item.product.id === product.id)) {
            return;
        }

        setCartItems(cartItems.map(item => item.product.id === product.id ? {
            ...item,
            quantity: quantity
        } : item));
    }

    const removeFromCart = (product) => {
        setCartItems(cartItems.filter(item => item.product.id !== product.id));
    }


    if (!cartItems || cartItems.length === 0) {
        return <tr>
            <td colSpan="5">Your cart is empty</td>
        </tr>
    }

    return (
        <>
            {cartItems.map(item =>
                <tr key={item.product.id}>
                    <td>
                        <input type="number" value={item.quantity} min="1"
                               onChange={(ev) =>
                                   handleChange(item.product, ev)}/>
                    </td>
                    <td>{item.product.name}</td>
                    <td>${item.product.price.toFixed(2)}</td>
                    <td>${(item.quantity * item.product.price).toFixed(2)}</td>
                    <td>
                        <button className="btn btn-sm btn-danger"
                                onClick={() => removeFromCart(item.product)}>
                            Remove
                        </button>
                    </td>
                </tr>
            )}
            <tr>
                <th colSpan="3" className="text-right">Total:</th>
                <th colSpan="2">
                    ${cartItems.reduce((total, item) => { return total + item.quantity * item.product.price}, 0).toFixed(2) }</th>
            </tr>
        </>
    );
}

export default CartDetailsRows;