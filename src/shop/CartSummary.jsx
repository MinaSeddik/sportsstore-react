import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import CartContext from "./CartContext";

function CartSummary(props) {

    const {cartItems} = useContext(CartContext)

    // console.log(`init CartSummary with ${JSON.stringify(cartItems)}`)

    const getSummary = () => {
        if (cartItems?.length > 0) {
            return <span>
                         {cartItems.length} item(s),
                         ${cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0).toFixed(2)}
                    </span>
        } else {
            return <span>Your cart: (empty) </span>
        }
    }

    const getLinkClasses = () => {
        return `btn btn-sm bg-dark text-white ${cartItems?.length === 0 ? "disabled" : ""}`;
    }

    return (
        <div className="float-end">
            <small>
                {getSummary()}
                <Link className={getLinkClasses()}
                      to="/shop/cart">
                    <i className="fa fa-shopping-cart"></i>
                </Link>
            </small>
        </div>
    );
}

export default CartSummary;