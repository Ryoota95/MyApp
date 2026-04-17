import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// GET PROFILE
export const getProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        photoProfile: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error get profile" });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { name, bio } = req.body;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        bio,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error update profile" });
  }
};