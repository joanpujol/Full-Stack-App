import React, { Component } from 'react';

export default class Header extends Component {
	render() {
        const { context } = this.props;
		const authUser = context ? context.authenticatedUser: "";
		return(
            <div className="header">
                <div className="bounds">
                     <h1 className="header--logo">Courses</h1>
                     {authUser ? 
                        <nav>
                            <span>Welcome, {authUser.firstName}!</span>
                            <a className="signout" to="/signout">Sign Out</a>
                        </nav>
                        :
                        <nav>
                            <a className="signup" to="/signup">Sign Up</a> 
					    	<a className="signin" to="/signin">Sign In</a>
					    </nav>
				    }
			  </div>
			</div>
		)
	}
}
