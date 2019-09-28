// Third party imports
const express = require("express");
const router = express.Router();

// Local imports
const courseController = require('../controllers/courseController');
const authentication = require('../utils/authentication');
const promiseErrorHandler = require('../utils/promiseErrorHandler');

router.get('/', async (req, res) => {
    const controllerResponse = await courseController.getCourses();
    controllerResponse.sendResponse(res);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const controllerResponse = await courseController.getCourse(id)
    controllerResponse.sendResponse(res);
});

router.post('/', authentication, async (req, res, next) => {
    const { title, description, estimatedTime, materialsNeeded, userId } = req.body;
    const controllerResponse =  await courseController.addCourse(userId, title, description, estimatedTime, materialsNeeded)
        .catch(promiseErrorHandler(next));
    controllerResponse.sendResponse(res);
});

router.put('/:id', authentication, async (req, res, next) => {
    const paramsId = req.params.id;
    const { id, userId, title, description, estimatedTime, materialsNeeded} = req.body;

    const courseId = paramsId ? paramsId : id;

    const updateFields = {
        userId,
        title,
        description,
        estimatedTime,
        materialsNeeded
    }

    const controllerResponse = await courseController.updateCourse(courseId, req.authenticatedUser, updateFields)
        .catch(promiseErrorHandler(next));
    controllerResponse.sendResponse(res);
});

router.delete('/:id', authentication, async(req, res, next) => {
    const { id } = req.params;
    const userId = req.authenticatedUser.id;

    const controllerResponse = await courseController.deleteCourse(id, userId)
        .catch(promiseErrorHandler(next));
    controllerResponse.sendResponse(res);
});

module.exports = router;
