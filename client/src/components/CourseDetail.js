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

    displayDescription = (description) => {
        if(description) {
            const descriptionParagraphs = description.split('\n\n').map( (paragrpah, index) => {
                return <p key={index}> {paragrpah} </p>
            });
            return descriptionParagraphs
        }
    }

    displayMaterialsNeeded = (materialsNeeded) => {
        if(materialsNeeded) {
            const materialsList = materialsNeeded.substring(1).split('\n*').map( (material, index) => {
                return <li key={index}> {material} </li>
            });
            return (
                <ul>
                    {materialsList}
                </ul>
            )
        }
    }

    render() {
        const {title, description, estimatedTime, materialsNeeded} = this.state.courseData;
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
                            <h3 className="course--title">{title}</h3>
                        </div>
                        <div className="course--description">
                            {this.displayDescription(description)}
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
                                    {this.displayMaterialsNeeded(materialsNeeded)}
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
