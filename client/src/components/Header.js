import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    /*
    The component renders the top menu bar and buttons for signing in and signing up
    (if there's not an authenticated user) or the user's first and last name and a button for signing out (if there's an authenticated user).
    */

	render() {
        const { context } = this.props;
		const authUser = context ? context.authenticatedUser: "";
		return(
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">
                         <Link to="/">Courses</Link>
                    </h1>
                     {authUser ? 
                        <nav>
                            <span>Welcome, {authUser.firstName}!</span>
                            <Link className="signout" to="/signout">Sign Out</Link>
                        </nav>
                        :
                        <nav>
                            <Link className="signup" to="/signup">Sign Up</Link>
			                <Link className="signin" to="/signin">Sign In</Link>
					    </nav>
				    }
			  </div>
			</div>
		)
	}
}
