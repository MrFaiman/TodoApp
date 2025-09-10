import { Request, Response, NextFunction } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    const userId = req.session.userId;

    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    next();
};

export default requireAuth;