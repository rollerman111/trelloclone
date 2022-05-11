

const User = require("./user");
const Project = require("./project")
const User_Project = require("./userProject")
const Task = require("./task")
const Status = require("./status")

// associations
User.belongsToMany(Project, { through: User_Project });

module.exports = {
  User,
  Project,
  User_Project,
  Task,
  Status
};
