const Sequelize = require("sequelize");
const db = require("../db");

const Project = db.define("project", {
    createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    priority: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    progress: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    favorite: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

});

module.exports = Project;
