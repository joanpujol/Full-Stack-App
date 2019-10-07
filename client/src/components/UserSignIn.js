import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {

    state = {
        email: "",
        password: ""
    };

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleSubmit = (e) => {
        // TODO Properly handle submit
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input 
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    className=""
                                    placeholder="Email Address"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                />
                            </div>
                            <div>
                                <input 
                                    id="password"
                                    name="password"
                                    type="password"
                                    className=""
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <button className="button button-secondary" >Cancel</button>
                            </div>
                        </form>
                    </div>
                <p>&nbsp;</p>
                <p>
                    Don't have a user account?&nbsp;
                    <Link to="/signup">Click here</Link> to sign up!
                </p>
                </div>
            </div>
        );
    }
}

export default UserSignIn;
