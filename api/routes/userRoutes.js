const express = require('express');

const authentication = require('../utils/authentication');
const userController = require('../controllers/userController');
const promiseErrorHandler = require('../utils/promiseErrorHandler');

const router = express.Router();

router.get('/', authentication, (req, res, next) => {
    try {
        const { authenticatedUser } = req;
        const controllerResponse = userController.getCurrentlyAuthenticatedUser(authenticatedUser);
        controllerResponse.sendResponse(res);
    } catch(error) {
        next(error);
    }  
});

// Route to create new users
router.post('/' , async (req, res, next) => {
    const { firstName, lastName, emailAddress, password } = req.body;
    const controllerResponse = await userController.addUser(firstName, lastName, emailAddress, password)
        .catch(promiseErrorHandler(next));
    controllerResponse.sendResponse(res);
});

module.exports = router;
