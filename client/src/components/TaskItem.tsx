import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillSave } from "react-icons/ai";
import { TaskStatus, type Task } from "../types";

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newTitle: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.title);

    const handleEditClick = () => {
        if (task.status === TaskStatus.COMPLETED) {
            return;
        }
        setIsEditing(true);
    };

    const handleSave = () => {
        const trimmedText = editText.trim();
        if (trimmedText === "") {
            setEditText(task.title);
            setIsEditing(false);
            return;
        }

        if (trimmedText !== task.title) {
            onEdit(task._id, trimmedText);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(task.title);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            handleCancel();
        }
    };

    const handleDelete = () => {
        onDelete(task._id);
    };

    return (
        <div className="task-item">
            <input
                type="checkbox"
                checked={task.status === TaskStatus.COMPLETED}
                onChange={() => onToggle(task._id)}
            />
            <input
                className={`task-text ${task.status == TaskStatus.COMPLETED ? "checked" : ""}`}
                value={isEditing ? editText : task.title}
                readOnly={!isEditing}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={isEditing ? handleSave : handleEditClick}
                disabled={task.status === TaskStatus.COMPLETED}
                style={{ opacity: task.status === TaskStatus.COMPLETED ? 0.5 : 1 }}
            >
                {isEditing ? (
                    <AiFillSave size={20} />
                ) : (
                    <AiFillEdit size={20} color="#f3b827" />
                )}
            </button>
            <button onClick={handleDelete}>
                <AiFillDelete size={20} color="#e53935" />
            </button>
        </div>
    );
};

export default TaskItem;