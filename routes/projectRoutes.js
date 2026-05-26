const projectRouter = require('express').Router();
const authMiddleware = require('../utils/auth');
const Project = require('../models/Project');

// CREATE
projectRouter.post("/", authMiddleware, async (req, res) => {
    try {
        const project = await Project.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ALL
projectRouter.get("/", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find({
            user: req.user._id,
        });

        res.json(projects);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ONE 

// UPDATE

// DELETE