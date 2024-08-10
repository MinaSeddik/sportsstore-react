import React from 'react';
import {Link, NavLink} from "react-router-dom";

type CategoryNavigationProp = {
    baseUrl: string;
    categories?: string[];
}

function CategoryNavigation({baseUrl, categories} : CategoryNavigationProp) {

    return (
        <>
            <Link className="btn btn-outline-primary btn-block" to={baseUrl}>All</Link>

            {categories && categories.map(cat =>
                <NavLink className="btn btn-primary btn-block" key={cat}
                         to={`${baseUrl}/${cat.toLowerCase()}`}>
                    {cat}
                </NavLink>
            )}
            <hr/>
            <Link className="btn btn-secondary btn-block" to="/shop/list">list products with filter</Link>
            <Link className="btn btn-secondary btn-block" to="/shop/list2">list products with filter (2)</Link>
            <Link className="btn btn-secondary btn-block" to="/shop/list3">list products with filter using
                Suspense</Link>
            <hr/>
            <Link className="btn btn-primary btn-block" to="/shop/form-validation">Form Validation</Link>
            <Link className="btn btn-primary btn-block" to="/shop/form-validation2">Form Validation (using
                react-hook-form)</Link>
            <hr/>
            <Link className="btn btn-danger btn-block" to="/shop/react-query">React Query</Link>
        </>
    );
}

export default CategoryNavigation;