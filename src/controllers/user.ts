import { Request, Response } from "express";
import prisma from "../lib/prisma";

declare module "express"{
    interface Request {
        user?: any;
    }
}

export const getUser = async (req: Request, res: Response) => {
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


export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: search as string,
          mode: "insensitive",
        },
        NOT: {
          id: req.user.id
        }
      },
      select: {
        id: true,
        name: true,
    
      },
    });

    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed search user",
    });
  }
};