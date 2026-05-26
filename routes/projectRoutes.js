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
projectRouter.get("/:id", authMiddleware, async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        res.json(project);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE
projectRouter.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { name, description } = req.body;

        const updatedProject = await Project.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id,
            },
            { name, description },
            {
                new: true
            }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found." });
        }

        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE
projectRouter.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deleteProject = await Project.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!deleteProject) {
            return res.status(404).json({
                message: "Project not found."
            });
        }

        res.json({
            message: "Bookmark deleted successfully."
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = projectRouter;