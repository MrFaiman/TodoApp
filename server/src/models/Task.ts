import { Schema, model, Document, InferSchemaType } from "mongoose";

const taskModel = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

interface ITask extends Document { }
interface ITask extends InferSchemaType<typeof taskModel> { }

const TaskModel = model<ITask>("Task", taskModel);

export type { ITask };
export default TaskModel;