import { Router, Response, Request } from "express"
import mongoose from "mongoose"
import UserModel, { IUser } from "../models/User"

interface UserCredentials {
    username: string
    password: string
}

const router = Router()

router.get("/", (req, res) => {
    if (req.session.userId) {
        return res.status(200).json({ message: "User is authenticated" })
    }
    return res.status(401).json({ message: "User is not authenticated" })
})

router.post("/login", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body as UserCredentials
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" })
        }

        let user: IUser | null = await UserModel.findOne({ username }) as IUser | null

        if (!user) {
            const newUser = new UserModel({ username, password })
            user = await newUser.save() as IUser
            req.session.userId = user._id as mongoose.Types.ObjectId
            return res.status(201).json({ message: "User created and logged in successfully" })
        }

        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        req.session.userId = user._id as mongoose.Types.ObjectId
        return res.status(200).json({ message: "Login successful" })
    } catch (error) {
        console.error("Login error:", error)
        return res.status(500).json({ message: "Server error" })
    }
})

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Server error" })
        }
        return res.status(200).json({ message: "Logout successful" })
    })
})

export default router