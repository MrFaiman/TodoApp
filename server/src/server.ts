import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";
import cors from "cors";
import helmet from "helmet"; // security headers

dotenv.config();

// db
import mongoose from "mongoose";
import { connectDB } from "./database";
import MongoStore from "connect-mongo";

import session from "express-session";
declare module "express-session" {
    interface SessionData {
        userId?: mongoose.Types.ObjectId;
    }
}

const app: Application = express();
const PORT = process.env.PORT || 3001;
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24; // 1 day

connectDB();

app.use(helmet());
app.use(cors({
    origin: process.env.ORIGIN_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET || "terra",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE,
    },
}));

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Todo API" });
});

app.get("/api/health", (req: Request, res: Response) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    res.json({
        status: "OK",
        database: dbStatus,
    });
});

// Routes
import { userRoutes, taskRoutes } from "./routes";
app.use("/api/users", userRoutes)
app.use("/api/tasks", taskRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to see the server`);
});