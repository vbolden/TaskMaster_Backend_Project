const taskRouter = require('express').Router();
const Task = require('../models/Task');
const Project = require('../models/Project');
const authMiddleware = require('../utils/auth');

// CREATE
taskRouter.post("/:projectId/tasks", authMiddleware, async (req, res) => {
    try {
        // FIND PROJECT BY ID
        const project = await Project.findOne({
            _id: req.params.projectId,
            user: req.user._id,
        });

        // CHECK IF OWNED BY USER
        if (!project) {
            return res.status(403).json({
                message: "Unauthorized or project not found."
            });
        }

        // CREATE TASK
        const task = await Task.create({
            ...req.body,
            project: req.params.projectId,
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ALL TASKS
taskRouter.get("/:projectId/tasks", authMiddleware, async (req, res) => {
    try {
        // FIND PROJECT BY ID
        const project = await Project.findOne({
            _id: req.params.projectId,
            user: req.user._id,
        });

        // CHECK IF OWNED BY USER
        if (!project) {
            return res.status(403).json({
                message: "Unauthorized or project not found."
            });
        }

        // GET ALL TASKS FOR THIS PROJECT
        const tasks = await Task.find({
            project: req.params.projectId,
        });

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});