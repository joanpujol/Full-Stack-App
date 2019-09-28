module.exports = (next) => {
    return (e) => {
        if (e.name === 'SequelizeValidationError') {
            const errors = e.errors.map( (error) => `${error.message} `);
            e.status = 400;
            console.error('Sequelize validation errors: ', errors);
        }    
        next(e);
    }
}
