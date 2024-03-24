const express = require("express");
const { TaskModel } = require("../models/taskModel");

const router = express.Router();

router.get("/", async(req, res) => {
     const userId = req.userId;
    const tasks = await TaskModel.find({
        user_id:userId
    });
    res.send({ "Tasks": tasks });
})

router.get("/:taskID", async(req, res) => {
    // const userId = req.params.userId;
    const taskId = req.params.taskID;
    const task = await TaskModel.find({ _id: taskId,user_id:userId });
    res.send({ "Task": task });
})

router.post("/create", async (req, res) => {
    try {
        const { title, description, status } = req.body;

        // Check if all required fields are present
        if (!title || !description || !status) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Retrieve user id from authentication middleware
        const user_id = req.userId;
        if (!user_id) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create task
        const task = await TaskModel.create({ title, description, status, user_id });

        // Respond with success message
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "An error occurred while creating the task" });
    }
});
router.patch("/:taskID", async(req, res) => {
    const taskId = req.params.taskID;
    const payload = req.body;
    const user_id = req.userId;
    try {
        const task = await TaskModel.findOne({ _id: taskId,user_id:user_id });

        // if (task.user_id === user_id) {
        await TaskModel.findByIdAndUpdate(taskId, payload);
        res.send("Task Updated");
        // } else {
        // res.status(404).send({ message: "Task not found" });
        // }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:taskID", async(req, res) => {
    const taskId = req.params.taskID;
    const userId = req.userId;

    try {
        const task = await TaskModel.findOne({ _id: taskId ,user_id:userId});
        if (task) {
            await TaskModel.findByIdAndDelete(taskId);
            res.send("Task Deleted");
        } else {
            res.status(404).send("Task not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = { router };