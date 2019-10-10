import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const ReactMarkdown = require('react-markdown/with-html');

class CourseDetail extends Component {  

    state = {
        courseData: []
    };

    componentDidMount() {
        const courseId = this.props.match.params.id;
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(response => {
                this.setState({
                    courseData: response.data
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    deleteCourse = () => {
        const { id: courseId } = this.state.courseData;
        const { emailAddress, password } = this.props.context.authenticatedUser;
        this.props.context.data.deleteCourse(courseId, emailAddress, password)
            .then( (errors) => {
                console.log(errors)
                if (errors.length) {
                    this.setState({errors});
                } else {
                    this.props.history.push("/");
                }
            })
            .catch( (error) => {
                console.error(error);
                const errorPath = (error.name === "notFound") ? "/notfound" : "/error";
                this.props.history.push(errorPath);
            });
    }

    displayActionButtons = (userId, courseId) => {
        const doesUserOwnCourse = this.props.context.authenticatedUser && this.props.context.authenticatedUser.id === userId;
        return (doesUserOwnCourse ? <>
                <Link className="button" to={`/courses/${courseId}/update`}>Update Course</Link>
                <Link className="button" onClick={this.deleteCourse} to="/">Delete Course</Link>
            </> : null )
    }

    render() {
        const courseId = this.props.match.params.id;
        const {title, description, estimatedTime, materialsNeeded, userId} = this.state.courseData;
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            {this.displayActionButtons(userId, courseId)}
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{title}</h3>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={description} />
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown source={materialsNeeded} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> 
          </div>
        )
    };
}

export default CourseDetail
