var Sequelize = require('sequelize');

var db = require('../database');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "First name is a required field"
            }
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Last name is a required field"
            }
        }
    },
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "User email is a required field"
            }
        }
      },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Password is a required field"
            }
        }
    },
});

User.associate = (models) => {
    User.hasMany(models.Course, {
        foreignKey: {
            fieldName: 'userId',
            allowNull: false
        }
    });
};

module.exports = User;
