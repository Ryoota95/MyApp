import { Response, Request} from "express";
import prisma from "../lib/prisma";



export const followUser = async (req: any, res: Response) => {
  try {
    const followerId = req.user.id;
    const { followingId } = req.body;

    const follow = await prisma.following.create({
      data: {
        followerId,
        followingId
      }
    });

    res.status(201).json({
      status: "success",
      message: "Follow success",
      data: follow
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to follow user"
    });
  }
};

export const unfollowUser = async (req: any, res: Response) => {
  try {
    const followerId = req.user.id;
    const { followingId } = req.body;

    await prisma.following.deleteMany({
      where: {
        followerId,
        followingId
      }
    });

    res.json({
      status: "success",
      message: "Unfollow success"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to unfollow user"
    });
  }
};

export const getFollows = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const type = req.query.type;

    let data;

    if (type === "followers") {
      data = await prisma.following.findMany({
        where: {
          followingId: userId
        },
        include: {
          follower: true
        }
      });
    } else {
      data = await prisma.following.findMany({
        where: {
          followerId: userId
        },
        include: {
          following: true
        }
      });
    }

    res.json({
      status: "success",
      data
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch follows"
    });
  }
};