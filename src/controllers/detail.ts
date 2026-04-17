import prisma from "../lib/prisma";

export const getThreadDetail = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  const thread = await prisma.thread.findUnique({
    where: { id: Number(id) },
    include: {
      user: true,
      likes: true,
      _count: {
        select: { likes: true }
      }
    },
  });

  if (!thread) {
    return res.status(404).json({ message: "not found" });
  }

  const isLiked = thread.likes.some(
    (like) => like.userId === userId
  );

  res.json({
  id: thread.id,
  content: thread.content,
  image: thread.image,
  createdAt: thread.createdAt,
  user: {
    id: thread.user.id,
    name: thread.user.name,
    photoProfile: thread.user.photoProfile,
  },
  likesCount: thread._count.likes,
  isLiked,
});
};

export const getReplies = async (req, res) => {
  const { id } = req.params;

  const replies = await prisma.reply.findMany({
    where: { threadId: Number(id) },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(replies);
};

export const createReply = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const threadId = Number(id);
  const userId = req.user.id;

  if (isNaN(threadId)) {
    return res.status(400).json({ message: "Invalid threadId" });
  }

  const reply = await prisma.reply.create({
    data: {
      content,
      threadId,
      userId,
    },
  });

  res.json(reply);
};