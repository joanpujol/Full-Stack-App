import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {
    /*
    This component renders a form allowing the user to sign in using their existing account information,
    there is a "Sign In" button that when clicked signs in the user,
    and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
    */

    state = {
        email: "",
        password: "",
        errors: []
    };

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { context } = this.props;
        const previousPage = this.props.context.previousPage
        const { email, password } = this.state;

        context.actions.signIn(email, password)
          .then((user) => {
            if (user === null) {
                this.setState({ errors: [{message: 'An error occurred while signing, wrong email and/or password'}] });
            } else {
                // Redirects users back to the previous screen after successfully signing in.
                this.props.history.push(previousPage);
            }
          })
          .catch((error) => {
              console.error(error);
              this.props.history.push('/error');
          });
    }

    handleCancelClick = () => {
        this.props.history.push('/');
    }

    displayValidationErrors = (errors) => {
        console.log(errors)
        return (
            errors.length ?
                <div>
                    <h2 className="validation--errors--label">Validation errors</h2>
                    <div className="validation-errors">
                        <ul>
                            {errors.map((error, i) => {
                                return <li key={i}> {error.message} </li>
                            })}
                        </ul>
                    </div>
                </div> : null
        )
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        {this.displayValidationErrors(errors)}
                        <form>
                            <div>
                                <input 
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    className=""
                                    placeholder="Email Address"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange} />
                            </div>
                            <div>
                                <input 
                                    id="password"
                                    name="password"
                                    type="password"
                                    className=""
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange} />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" onClick={(e) => this.handleSubmit(e)}>Sign In</button>
                                <button className="button button-secondary" onClick={this.handleCancelClick}>Cancel</button>
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
