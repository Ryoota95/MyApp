import {Request, Response} from "express";
import prisma from "../lib/prisma";


export const getThreads = async (req: Request, res: Response) => {
  const threads = await prisma.thread.findMany({
    include: {
      user: true,
        likes: true,
        replys: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });


if (threads.length === 0) {
    return res.json([
        {
            id: 1,
            content: "Thread pertama",
            image: null,
            likes: 1000,
            replys: [],
            user: {
                id: 1,
                name: "Rizqy aliyah",
                username: "alya",
                email: "ray@gmail.com"
            }
        }
    ])
}
 res.json(threads);
}