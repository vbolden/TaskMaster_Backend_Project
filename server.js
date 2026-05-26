const express = require("express");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const taskRouter = require('./routes/taskRoutes');

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error.message));

// MIDDLEWARE
app.use(express.json());

// ROUTES & ROUTE MOUNTS
app.get("/", (req, res) => {
    res.send("Testing...");
});

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);

// PORT
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});