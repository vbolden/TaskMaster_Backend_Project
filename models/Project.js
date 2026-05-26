const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const Project = model("Project", projectSchema);
module.exports = Project;