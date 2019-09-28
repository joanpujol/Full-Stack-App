const bcryptjs = require('bcryptjs');

const User = require('../db/models/user');
const controllerResponse = require('../utils/controllerResponse');
const isValidEmail = require('../utils/isValidEmail');

exports.getCurrentlyAuthenticatedUser = (authenticatedUser) => {
    const { id, firstName, lastName, emailAddress } = authenticatedUser;
    return new controllerResponse(200, { id, firstName, lastName, emailAddress });
}

exports.addUser = async (firstName, lastName, emailAddress, password) => {
    if(!isValidEmail(emailAddress)) {
        return new controllerResponse(400, {message: "Invalid email address"});
    }

    // check for existing user email address
    const isExistingEmail = await User.findOne({ 
        where: {emailAddress} 
    });

    if (isExistingEmail) {
        return new controllerResponse(400, {message: "The provided Email already exists, try using a different one."});
    }

    // hash password if supplied by the user
    if (password) {
        password = bcryptjs.hashSync(password);
    }

    // create the new user
    await User.create({
        firstName,
        lastName,
        emailAddress,
        password
    });
    
    let controllerResp = new controllerResponse(201);
    controllerResp.setLocation("/");
    return controllerResp;
}
