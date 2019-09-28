const Course = require('../db/models/course');
const User = require('../db/models/user');
const controllerResponse = require('../utils/controllerResponse');

exports.addCourse = async (userId, title, description, estimatedTime, materialsNeeded) => {
    const course = await Course.create({
        userId,
        title,
        description,
        estimatedTime,
        materialsNeeded
    });

    let controllerRes = new controllerResponse(201);
    controllerRes.setLocation(`/api/courses/${course.id}`);
    return controllerRes;
}

exports.getCourse = async (courseId) => {
    const course = await Course.findByPk(courseId);
    const { id, userId, title, description, estimatedTime, materialsNeeded } = course;
    return new controllerResponse(200, {id, userId, title, description, estimatedTime, materialsNeeded });
}

exports.getCourses = async () => {
    const courses = await Course.findAndCountAll({
        attributes: {
            include: ['id', 'userId', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
            exclude: ['createdAt','updatedAt']
        }
    });
    return new controllerResponse(200, courses);
}

exports.updateCourse = async (id, authenticatedUser, updateFields) => {
    // Deletes undefined fields
    Object.keys(updateFields).forEach(key => updateFields[key] === undefined ? delete updateFields[key] : '');

    const mandatoryFields = ['userId', 'title', 'description'];
    let errors = [];
    mandatoryFields.forEach((field) => {
        if(!updateFields[field]){
            errors.push(`Please provide a value for ${field}`);
          }
    });

    if(errors.length){
        return new controllerResponse(400, {errors});
    }

    const course = await Course.findByPk(id);
    if(course.userId !== authenticatedUser.id){
        return new controllerResponse(403, {message:'Only the owner of the course can edit it'});
    }

    await Course.update(
        updateFields,
        { where: { id } }
    );
    return new controllerResponse(204);
}

exports.deleteCourse = async (courseId, userId) => {
    const course = await Course.findByPk(courseId);
    const user = await User.findByPk(userId);

    if(course.userId !== user.id) {
        return new controllerResponse(403, {message : `Current user doesn't own the course`});
    }

    await course.destroy();
    return new controllerResponse(204);
}
