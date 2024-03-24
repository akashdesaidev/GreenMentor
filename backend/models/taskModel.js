const mongoose = require("mongoose");

const taskSchema = ({
    id: { type: Number },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    user_id: { type: String, required: true }
})

const TaskModel = mongoose.model("task", taskSchema);

module.exports = { TaskModel };