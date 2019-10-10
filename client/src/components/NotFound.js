import React from 'react';

const NotFound = (props) => {
    /*
    This component renders a message letting the user know that the requested page can't be found.
    */

    return(
        <div className="bounds">
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
        </div>
    );
}

export default NotFound;
