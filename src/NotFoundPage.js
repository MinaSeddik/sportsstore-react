import React from 'react';
import {Link} from "react-router-dom";

function NotFoundPage(props) {
    return (
        <div className="flex flex-column gap-2">
            <h2>404 Not Found</h2>
            <Link to="/">Go to Home page (Client side routing without refresh needed)</Link>
            <br />
            <a href="/">Go to Home page using href anchor tag (Full page refresh) </a>
        </div>
    );
}

export default NotFoundPage;