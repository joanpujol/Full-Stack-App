import React,{Component} from 'react';
import { Link } from 'react-router-dom';

class UserSignUp extends Component {

    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        passwordConfirmation: "",
        errors: [],
    };

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
          return {
            [name]: value
          };
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {firstName, lastName, emailAddress, password, passwordConfirmation} = this.state;

        if (password !== passwordConfirmation) {
            this.setState({
                errors: [{message: "Confirmation password does not match password."}]
            });
        } else {
            const newUser = {firstName, lastName, emailAddress, password};
            this.props.context.data.createUser(newUser)
                .then((errors) => {
                    if (errors.length) {
                        this.setState({errors});
                    } else {
                        this.props.context.actions.signIn(emailAddress, password)
                        .then( () => {
                            this.props.history.push("/")
                        });
                    }
                })
                .catch( (error) => {
                    console.error(error);
                    this.props.history.push('/error');
                });
        }
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    }

    displayValidationErrors = (errors) => {
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
                    <h1>Sign Up</h1>
                    <div>
                        {this.displayValidationErrors(errors)}
                        <form>
                            <div>
                                <input 
                                    id="firstName"
                                    name="firstName"
                                    className=""
                                    placeholder="First Name"
                                    onChange={this.change} />
                            </div>
                            <div>
                                <input 
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    className=""
                                    placeholder="Last Name"
                                    onChange={this.change} />
                            </div>
                            <div>
                                <input 
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    className=""
                                    placeholder="Email Address"
                                    onChange={this.change} />
                            </div>
                            <div>
                                <input 
                                    id="password"
                                    name="password"
                                    type="password"
                                    className=""
                                    placeholder="Password"
                                    onChange={this.change} />
                            </div>
                            <div>
                                <input 
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className=""
                                    placeholder="Confirm Password"
                                    onChange={this.change} />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit" onClick={(e) => this.handleSubmit(e)}>Sign Up</button>
                                <button className="button button-secondary" onClick={(e) => this.handleCancelClick(e)}>Cancel</button></div>
                        </form>
                    </div>
                <p>&nbsp;</p>
                <p>Already have a user account?&nbsp;
                    <Link to="/signin">Click here</Link> to sign in!
                </p>
                </div>
            </div>
        );
    }
}

export default UserSignUp;
