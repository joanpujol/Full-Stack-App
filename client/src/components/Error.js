import React from 'react';

const ErrorComponent = (props) => {
    /*
    The component renders a message letting the user know that an unexpected error has occurred.
    */

    return(
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    );
}

export default ErrorComponent;
