const userRouter = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

// REGISTER
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

// LOGIN
userRouter.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        // CHECK FOR EXISTING USER
        if (!user) {
            return res.status(400).json({
                error: "Incorrect email or password."
            });
        }

        // COMPARE PROVIDED PASSWORD 
        const correctPassword = await user.isCorrectPassword(req.body.password);

        if (!correctPassword) {
            return res.status(400).json({
                error: "Incorrect email or password."
            });
        }

        // PAYLOAD
        const payload = {
            _id: user._id,
            username: user.username,
            email: user.email,
        };

        // CREATE TOKEN
        const token = jwt.sign(payload, secret, { expiresIn: '2h' });

        res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = userRouter;