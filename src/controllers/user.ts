import { Request, Response } from "express";
import prisma from "../lib/prisma";

declare module "express"{
    interface Request {
        user?: any;
    }
}

export const getprofile = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      select: { id: true, name: true, email: true }
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }

}