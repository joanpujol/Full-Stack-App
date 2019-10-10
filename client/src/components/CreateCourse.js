import React, {Component} from 'react';

class CreateCourse extends Component {

    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: [],
    };

    change = (event) => {
        // This function handles all user input to set it as component state
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
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        const { emailAddress, id: userId, password } = this.props.context.authenticatedUser;
        const courseData = { userId, title, description, estimatedTime, materialsNeeded };

        // When all the necessary information the make the POST request is gathered, the function is called
        // and then the user is redirected to the home page.
        this.props.context.data.createCourse(courseData, emailAddress, password)
            .then( (errors) => {
                if (errors.length) {
                    // If any errors are returned from the api they will be displayed
                    this.setState({errors});
                } else {
                    this.props.history.push("/");
                }
            })
            .catch( (error) => {
                console.error(error);
                // If anything fails in all this process, the user will be redirected to the error page
                this.props.history.push('/error');
            });
    }

    handleCancelClick = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    }

    displayValidationErrors = (errors) => {
        // All validation errors will be shown through this function, which returns a list of JSX div elements
        // displaying the errors
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
        const { firstName, lastName } = this.props.context.authenticatedUser;
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {this.displayValidationErrors(errors)}
                    <form>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                        id="title" 
                                        name="title"
                                        type="text"
                                        className="input-title course--title--input"
                                        placeholder="Course title"
                                        onChange={this.change}  />
                                </div>
                                <p>By {`${firstName} ${lastName}`}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea 
                                        id="description"
                                        name="description"
                                        className=""
                                        placeholder="Course description"
                                        onChange={this.change}  >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input 
                                                id="estimatedTime"
                                                name="estimatedTime"
                                                type="text"
                                                className="course--time--input"
                                                placeholder="Time, oh time"
                                                onChange={this.change} />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea 
                                                id="materialsNeeded"
                                                name="materialsNeeded"
                                                className=""
                                                placeholder="Materials needed"
                                                onChange={this.change} >
                                            </textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit" onClick={(e) => this.handleSubmit(e)}>Create Course</button>
                            <button className="button button-secondary" onClick={(e) => this.handleCancelClick(e)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateCourse;
