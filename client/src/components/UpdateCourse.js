import React, { Component } from 'react';
import axios from 'axios';

class UpdateCourse extends Component {

    state = {
        id: "",
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: []
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

    componentDidMount() {
        const courseId = this.props.match.params.id;
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(response => {
                const {title, description, estimatedTime, materialsNeeded, userId} = response.data;
                const { id: authUserId, } = this.props.context.authenticatedUser;

                // Redirects users to the /forbidden path if the requested course isn't owned by the authenticated user.
                if(userId !== authUserId) {
                    this.props.history.push("/forbidden");
                } else {
                    this.setState({
                        id: courseId,
                        title,
                        description,
                        estimatedTime,
                        materialsNeeded
                    });
                }
            })
            .catch(error => {
                console.error(error);
                const errorPath = (error.message === "Request failed with status code 404") ? "/notfound" : "/error";
                this.props.history.push(errorPath);
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { id, title, description, estimatedTime, materialsNeeded } = this.state;
        const { emailAddress, id: userId, password } = this.props.context.authenticatedUser;
        const courseData = { userId, title, description, estimatedTime, materialsNeeded };

        this.props.context.data.updateCourse(id, courseData, emailAddress, password)
            .then( (errors) => {
                if (errors.length) {
                    this.setState({errors});
                } else {
                    this.props.history.push("/");
                }
            })
            .catch( (error) => {
                console.error(error);
                this.props.history.push("/error");
            });
    }

    handleCancelClick = (e) => {
        e.preventDefault();
        const courseId = this.props.match.params.id;
        this.props.history.push(`/courses/${courseId}`);
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

    render () {
        const { title, description, estimatedTime, materialsNeeded, errors} = this.state;
        const { firstName, lastName } = this.props.context.authenticatedUser;
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
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
                                        placeholder={title}
                                        onChange={this.change} />
                                </div>
                                <p>By {`${firstName} ${lastName}`}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        className="" 
                                        placeholder={description}
                                        onChange={this.change} >
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
                                                placeholder={estimatedTime}
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
                                                placeholder={materialsNeeded}
                                                onChange={this.change} >
                                            </textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit" onClick={(e) => this.handleSubmit(e)}>Update Course</button>
                            <button className="button button-secondary" onClick={(e) => this.handleCancelClick(e)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateCourse;
