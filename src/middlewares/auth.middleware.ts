import { Request, Response } from "express";
import  Jwt  from "jsonwebtoken";

export const authmiddleware = (req: Request, res: Response, next: Function) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token tidak valid" });
    }

}