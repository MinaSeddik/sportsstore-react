import React from 'react';
import CartSummary from "./CartSummary";
import {Link} from "react-router-dom";

function NavigationBar(props) {

    return (
        <div className="row">
            <div className="col bg-dark text-white">
                <div className="navbar-brand text-center">
                    <Link to="/shop/products">SPORTS STORE (React.JS)</Link>
                    </div>
                <CartSummary/>
            </div>
        </div>
    );
}

export default NavigationBar;