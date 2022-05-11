const router = require("express").Router();
const { Status } = require("../../db/models")
const { Task } = require("../../db/models")
const { User_Project } = require("../../db/models");

// create task
router.post("/", async (req, res, next) => {
    try {
        if (!req.user) {
            return res.sendStatus(403)
        }

        const id = req.user.id
        const { projectId, statusId, type, content } = req.body

        const checkFound = await User_Project.findOne({
            where: {
                projectId: projectId,
                userId: id
            }
        })



        if (checkFound === null) {
            return res.sendStatus(403)
        }

        const checkStatus = await Status.findOne({
            where: {
                id: statusId
            }
        })

        if (checkStatus === null) {
            return res.sendStatus(403)
        }

        const task = await Task.create({
            projectId: projectId,
            statusId: statusId,
            type: type,
            content: content
        })

        res.status(200).json({ task })

    } catch (err) {
        next(err)
    }
})

// get tasks
router.get("/:projectId", async (req, res, next) => {
    try {
        if (!req.user) {
            return res.sendStatus(403)
        }

        const id = req.user.id
        const projectId = req.params.projectId

        const checkFound = await User_Project.findOne({
            where: {
                projectId: projectId,
                userId: id
            }
        })

        if (checkFound === null) {
            return res.sendStatus(403)
        }



        const statuses = await Status.findAll()
        const tasks = await Task.findAll({
            where: {
                projectId: projectId
            }
        })



        res.status(200).json({ tasks, statuses })



    } catch (err) {
        next(err)
    }
})

// moveTask
router.patch("/", async (req, res, next) => {
    try {
        if (!req.user) {
            return res.sendStatus(403)
        }

        const id = req.user.id
        const { taskId, statusId, projectId } = req.body

        const checkFound = await User_Project.findOne({
            where: {
                projectId: projectId,
                userId: id
            }
        })

        if (checkFound === null) {
            return res.sendStatus(403)
        }

        const task = await Task.findOne({
            where: {
                id: taskId
            }
        })

        if (task === null || task.statusId === statusId) {
            return res.sendStatus(403)
        }

        task.statusId = statusId
        task.save()
        res.sendStatus(204)

    } catch (err) {
        next(err)
    }
})


// delete task
router.delete("/", async (req, res, next) => {
    try {
        if (!req.user) {
            return res.sendStatus(403)
        }

        const id = req.user.id
        const { taskId, projectId } = req.body

        const checkFound = await User_Project.findOne({
            where: {
                projectId: projectId,
                userId: id
            }
        })

        if (checkFound === null) {
            return res.sendStatus(403)
        }

        const task = await Task.findOne({
            where: {
                id: taskId,
                projectId: projectId
            }
        })

        if (task === null) {
            return res.sendStatus(403)
        }

        task.destroy()

        res.sendStatus(204)

    } catch (err) {
        next(err)
    }
})

// assign user
router.put("/", async (req, res, next) => {
    try {
        if (!req.user) {
            return res.sendStatus(403)
        }

        const id = req.user.id
        const { taskId, projectId } = req.body

        const checkFound = await User_Project.findOne({
            where: {
                projectId: projectId,
                userId: id
            }
        })

        if (checkFound === null) {
            return res.sendStatus(403)
        }


        const task = await Task.findOne({
            where: {
                id: taskId,
                projectId: projectId
            }
        })

        if (task === null) {
            return res.sendStatus(403)
        }

        if (task.userId === id) {
            task.userId = null
            task.save()
            return res.sendStatus(204)
        } else {
            task.userId = id
            task.save()
            return res.sendStatus(204)
        }




    } catch (err) {
        next(err)
    }
})

module.exports = router;


