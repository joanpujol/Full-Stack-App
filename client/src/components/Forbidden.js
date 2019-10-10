import React from 'react';

const Forbidden = (props) => {
    /*
    The component renders a message letting the user know that they can't access the requested page.
    */

    return(
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
        </div>
    );
}

export default Forbidden;
