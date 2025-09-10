import { Router } from "express"
import { InferSchemaType } from "mongoose"
import TaskModel from "../models/Task"
import { requireAuth } from "../middleware/auth"

type Task = InferSchemaType<typeof TaskModel>;

const router = Router()

router.use(requireAuth);

router.get("/", async (req, res): Promise<void> => {
    const userId = req.session.userId!;

    try {
        const tasks = await TaskModel.find({ userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
})

router.post("/", async (req, res): Promise<void> => {
    const newTask = req.body;
    console.log("Received new task:", newTask);
    const userId = req.session.userId!;

    try {
        const createdTask = await TaskModel.create({
            title: newTask.title,
            description: newTask.description,
            status: newTask.status,
            userId
        });
        res.status(201).json(createdTask);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
})

router.put("/:id", async (req, res): Promise<void> => {
    const taskId = req.params.id;
    const updatedTask = req.body as Partial<Task>;
    const userId = req.session.userId!;

    try {
        const task = await TaskModel.findOneAndUpdate(
            { _id: taskId, userId },
            { $set: updatedTask },
            { new: true }
        );
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
})

router.delete("/:id", async (req, res): Promise<void> => {
    const taskId = req.params.id;
    const userId = req.session.userId!;

    try {
        const task = await TaskModel.findOneAndDelete({ _id: taskId, userId });
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
})

export default router;