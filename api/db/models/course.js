
var Sequelize = require('sequelize');

var db = require('../database');

const Course = db.define('course', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type:Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "userId is a required field"
            },
            notNull:{
                msg: "userId is a required field"
            }
        }
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Title is a required field"
            },
            notNull: {
                msg: "Title is a required field"
            }
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Title is a required field"
            },
            notNull: {
                msg: "Title is a required field"
            }
        }
    },
    estimatedTime: {
        type: Sequelize.STRING,
        allowNull: true
    },
    materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

Course.associate = (models) => {
    Course.belongsTo(models.User, {
        foreignKey: {
            fieldName: 'userId',
            allowNull: false
        }
    });
};

module.exports = Course;
