import { useState, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import * as Api from "./api";
import LoginForm from "./components/LoginForm";
import TaskItem from "./components/TaskItem";
import { TaskStatus, type Task } from "./types";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const pendingTasksSize = tasks.filter(task => task.status === TaskStatus.PENDING).length;

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError("");
      const fetchedTasks = await Api.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
      setError("Failed to load tasks. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async () => {
    if (taskInput.trim() === "") return;

    try {
      setIsLoading(true);
      setError("");
      const newTask = await Api.createTask({
        title: taskInput.trim(),
        status: TaskStatus.PENDING
      });
      setTasks(prevTasks => [...prevTasks, newTask]);
      setTaskInput("");
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const toggleTaskStatus = async (id: string) => {
    try {
      const task = tasks.find(t => t._id === id);
      if (!task) return;

      const newStatus = task.status === TaskStatus.PENDING ? TaskStatus.COMPLETED : TaskStatus.PENDING;
      const updatedTask = await Api.updateTask(id, { status: newStatus });

      setTasks(prevTasks =>
        prevTasks.map((task) =>
          task._id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await Api.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const editTask = async (id: string, newTitle: string) => {
    try {
      const updatedTask = await Api.updateTask(id, { title: newTitle });
      setTasks(prevTasks =>
        prevTasks.map((task) =>
          task._id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error editing task:", error);
    }
  }


  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    loadTasks(); // Load tasks after successful login
  };

  const handleLogout = async () => {
    try {
      await Api.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const checkAuthentication = async () => {
    try {
      const authStatus = await Api.isAuthenticated();
      setIsAuthenticated(authStatus);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    }
  }, [isAuthenticated]);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  // Show main app if authenticated
  return (
    <div className="container">
      <div className="header">
        <h1>Pending Tasks ({pendingTasksSize})</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError("")} style={{ marginLeft: "10px", fontSize: "12px" }}>
            ✕
          </button>
        </div>
      )}
      <div className="task-list">
        {isLoading ? (
          <div>Loading tasks...</div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={toggleTaskStatus}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))
        )}
      </div>
      <div className="task-input">
        <input
          className="task-input-field"
          type="text"
          placeholder="Add a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button onClick={addTask} disabled={isLoading}>
          <AiFillPlusCircle size={30} color={isLoading ? "#888" : "#59d75fff"} />
        </button>
      </div>
    </div>
  )
}

export default App
