export const TaskStatus = {
    COMPLETED: "completed",
    PENDING: "pending"
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

export type Task = {
    _id: string;
    title: string;
    description?: string;
    status: TaskStatusType;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateTaskData = Pick<Task, "title" | "description" | "status">;