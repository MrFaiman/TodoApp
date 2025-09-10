import axios from "axios"
import type { Task, CreateTaskData } from "./types"

const API_URL = "http://localhost:3000/api"

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 5000,
})

const isAuthenticated = async (): Promise<boolean> => {
    try {
        const res = await api.get("/users")
        return res.status === 200
    } catch (error) {
        return false
    }
}

const login = async (username: string, password: string): Promise<boolean> => {
    try {
        const res = await api.post("/users/login", { username, password })
        return res.status === 200 || res.status === 201
    } catch (error) {
        return false
    }
}

const logout = async (): Promise<boolean> => {
    try {
        const res = await api.post("/users/logout")
        return res.status === 200
    } catch (error) {
        return false
    }
}

const getTasks = async (): Promise<Task[]> => {
    const res = await api.get("/tasks")
    return res.data
}

const createTask = async (task: CreateTaskData): Promise<Task> => {
    const res = await api.post("/tasks", task)
    return res.data
}

const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
    const res = await api.put(`/tasks/${id}`, updates)
    return res.data
}

const deleteTask = async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`)
}

export { API_URL, isAuthenticated, login, logout, getTasks, createTask, updateTask, deleteTask }