const userRouter = require('express').Router();
const User = require('../models/User');

// CREATE
userRouter.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        // CHECK FOR EXISTING USER
        if (user) {
            return res.status(400).json({
                error: "A user with this email already exists."
            });
        }

        // CREATE A NEW USER
        const newUser = await User.create(req.body);

        res.status(201).json(newUser);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = userRouter;