
import { io } from "../app";
import prisma from "../lib/prisma";

export const toggleLike = async (req: any, res: any) => {
  const userId = req.user.id;
  const { threadId } = req.body;

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        threadId,
      },
    });



    if (existingLike) {
      
      await prisma.like.delete({
        where: { id: existingLike.id },
      });

      const totallike = await prisma.like.count({
        where: { threadId }
      })

    

      io.emit("thread:like", {
        threadId,
        userId,
        action: "unlike",
        totallike,
      });

      return res.json({ message: "unliked" });
    } else {
  
      await prisma.like.create({
        data: {
          userId,
          threadId
        },
      });

      const totallike = await prisma.like.count({
        where: { threadId }
      })

    console.log("emit data", {
        threadId,
        userId,
        action: "like",
        totallike,
      });
    
      

      io.emit("thread:like", {
        threadId,
        userId,
        action: "like",
        totallike,
      });

      return res.json({ message: "liked" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error toggle like" });
  }
};