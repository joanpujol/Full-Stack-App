const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');

const User = require('../db/models/user');

const authentication = async (req,res,next) => {
    let responseMessage = "";

    const credentials = auth(req);

    if (credentials) {
        const users = await User.findAll();
        const user = users.find( (user) => user.emailAddress === credentials.name );
        if (user) {
            const authenticated = bcryptjs.compareSync(credentials.pass, user.password);

            if (authenticated) {
                req.authenticatedUser = user;
            } else {
                responseMessage = `Authentication failure for email address: ${user.emailAddress}`;
            }

        } else {
            responseMessage = `User not found for email address: ${credentials.name}`;
        }   
    } else {
        responseMessage = 'Auth header not found';
    }

    if (responseMessage) {
        console.warn(responseMessage);
        res.status(401).json({ responseMessage: 'Access Denied' });
    } else {
        next();
    }
};

module.exports = authentication;
