import React from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = (props) => {
    /*
    This component signs out the authenticated user and redirects the user to the default route (i.e. the list of courses).
    */

    props.context.actions.signOut();

    return(
        <Redirect to="/" />
    );
}

export default UserSignOut;
