const router = require("express").Router();
const { Project } = require("../../db/models");
const { Task } = require("../../db/models")
const { User_Project } = require("../../db/models");
const { Op } = require("sequelize");

// create a project
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const id = req.user.id
    const { title, description, endDate, priority, status, progress, favorite } = req.body

    const project = await Project.create({
      createdBy: id,
      title: title,
      description: description,
      endDate: endDate,
      priority: priority,
      status: status,
      progress: progress,
      favorite: favorite

    })

    await User_Project.create({
      projectId: project.id,
      userId: id
    })

    res.status(200).json({ project })

  } catch (error) {
    next(error);
  }
});

// update project
router.patch("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const id = req.user.id
    const { updateVariables, projectId } = req.body

    const project = await Project.findByPk(projectId)
    if (project === null) {
      return res.sendStatus(404)
    }

    const validUser = await User_Project.findOne({
      where: {
        [Op.and]: {
          projectId: projectId,
          userId: id
        }

      }
    })

    if (validUser === null) {
      return res.sendStatus(403)
    }

    for (const key of Object.keys(updateVariables)) {
      if (!(key in project)) {

        return res.sendStatus(400)
      }
      project[key] = updateVariables[key]
    }

    project.save()
    res.status(200).json(project)

  } catch (error) {
    next(error);
  }
});

// get projects
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const id = req.user.id
    const projectIds = await User_Project.findAll({
      where: {
        userId: id
      },
      attributes: ['projectId']
    })

    const projectIdsArray = []
    for (const projectId of projectIds) {
      projectIdsArray.push(projectId.projectId)
    }

    const projects = await Project.findAll({
      where: {
        id: {
          [Op.in]: projectIdsArray

        }

      },
      order: [
        ['id', 'DESC'],
      ]
    })

    res.status(200).json(projects)

  } catch (error) {
    next(error);
  }
});


// delete project
router.delete("/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const id = req.user.id
    const projectId = req.params.id
    const check = await User_Project.findOne({
      where: {
        userId: id,
        projectId: projectId
      },
    })

    if (check === null) {
      return res.sendStatus(403)
    }

    await Task.destroy({
      where: {
        projectId: projectId
      }
    })

    await User_Project.destroy({
      where: {
        projectId: projectId
      }
    })

    await Project.destroy({
      where: {
        id: projectId
      }
    })

    res.sendStatus(204)

  } catch (error) {
    next(error);
  }
});

module.exports = router;