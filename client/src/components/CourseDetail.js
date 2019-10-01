import React, { Component } from 'react';      
import axios from 'axios';

class CourseDetail extends Component {  

    state = {
        courseData: []
    };

    componentDidMount() {
        axios.get(`http://localhost:5000/api/courses/2`)
            .then(response => {
                this.setState({
                    courseData: response.data
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {          
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                        <a className="button button-secondary" to="/" >Return to List</a></div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{this.state.courseData.title}</h3>
                        </div>
                        <div className="course--description">
                            This is the description
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>45h</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <li>A thing!</li>
                                    </ul>                   
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
