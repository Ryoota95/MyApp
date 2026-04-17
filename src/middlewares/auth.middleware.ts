import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

export const authmiddleware = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (req.method === "OPTIONS") {
    return next();
  }

  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = Jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};