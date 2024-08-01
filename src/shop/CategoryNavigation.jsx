import React from 'react';
import {Link, NavLink} from "react-router-dom";

function CategoryNavigation(props) {

    return (
        <>
            <Link className="btn btn-outline-primary btn-block" to={props.baseUrl}>All</Link>

            {props.categories && props.categories.map(cat =>
                <NavLink className="btn btn-primary btn-block" key={cat}
                      to={`${props.baseUrl}/${cat.toLowerCase()}`}
                         activeclassname="active">
                    {cat}
                </NavLink>
            )}
        </>
    );
}

export default CategoryNavigation;