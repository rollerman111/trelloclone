const Sequelize = require("sequelize")
const db = require("../db")

const Task = db.define("task", {
    statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'statuses',
            key: 'id'
        }
    },
    projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'statuses',
            key: 'id'
        }
    }

})

module.exports = Task