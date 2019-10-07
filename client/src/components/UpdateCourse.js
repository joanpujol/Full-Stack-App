import React, {Component} from 'react';

class UpdateCourse extends Component {

    handleSubmit = (e) => {
        // TODO Properly handle submit
    }

    handleCancelClick = (e) => {
        // TODO Properly handle cancel click
    }

    render () {
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                        id="title"
                                        name="title"
                                        type="text"
                                        className="input-title course--title--input"
                                        placeholder="Course title..."
                                        value=""
                                    />        
                                </div>
                                <p>By (userName)</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        className="" 
                                        placeholder="Course description...">
                                        Lorem ipsum dolor sit amet
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
                                                placeholder="How many hours will it take?"
                                                value=""
                                            />        
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea 
                                                id="materialsNeeded"
                                                name="materialsNeeded"
                                                className=""
                                                placeholder="List materials...">
                                                Materials Needed
                                            </textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Update Course</button>
                            <button className="button button-secondary" onClick={(e) => this.handleCancelClick(e)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateCourse;
