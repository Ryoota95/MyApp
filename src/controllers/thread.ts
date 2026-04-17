import {Request, Response} from "express";
import prisma from "../lib/prisma";
import {io} from "../app"
import { imageQueue } from "../queues/image.queue";



export const createThread = async (req: any, res: any) => {
  const { content} = req.body;
  const image = req.file;

  console.log("file", req.file);
  
  console.log("user", req.user);
  

  const threads = await prisma.thread.create({
    data: {
      content,
      image: image ? image.filename : null,
      userId: req.user.id,
    },
    include: {
      user: true,
      likes: true
    }
  });

  io.emit("thread:new", threads)

  await imageQueue.add("processing-image", {
    threadId: threads.id,
    image: threads.image,
  });

  console.log("queue added");
  
  
  
  res.json(threads);
};

export const getThread = async (req: any, res: any) => {
  const userId = req.user.id;

  const threads = await prisma.thread.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      user: true,
      likes: true,
      _count: {
        select: {replys: true}
      }
    }
  }) as any[];

 const threadswithisliked = threads.map((thread) => {
  const likes = (thread as any).likes ?? [];
  return {
    ...thread,
    isliked: likes.some((like: any) => like.userId === userId),
  };
});

  res.json(threadswithisliked);
};