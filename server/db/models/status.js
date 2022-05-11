const Sequelize = require("sequelize")
const db = require("../db")

const Status = db.define("status", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Status;
