"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollows = exports.unfollowUser = exports.followUser = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followerId = req.user.id;
        const { followingId } = req.body;
        const follow = yield prisma_1.default.following.create({
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
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to follow user"
        });
    }
});
exports.followUser = followUser;
const unfollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followerId = req.user.id;
        const { followingId } = req.body;
        yield prisma_1.default.following.deleteMany({
            where: {
                followerId,
                followingId
            }
        });
        res.json({
            status: "success",
            message: "Unfollow success"
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to unfollow user"
        });
    }
});
exports.unfollowUser = unfollowUser;
const getFollows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const type = req.query.type;
        let data;
        if (type === "followers") {
            data = yield prisma_1.default.following.findMany({
                where: {
                    followingId: userId
                },
                include: {
                    follower: true
                }
            });
        }
        else {
            data = yield prisma_1.default.following.findMany({
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
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch follows"
        });
    }
});
exports.getFollows = getFollows;
