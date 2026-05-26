const express = require("express");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
const mongoose = require('mongoose');

const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const taskRouter = require('./routes/taskRoutes');

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));

// MIDDLEWARE
app.use(express.json());

// ROUTES & ROUTE MOUNTS
app.get("/test", (req, res) => {
    res.send("Testing...");
});

// PORT
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});