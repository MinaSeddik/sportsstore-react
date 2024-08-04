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
        </>
    );
}

export default CategoryNavigation;