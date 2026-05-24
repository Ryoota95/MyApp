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
exports.createReply = exports.getReplies = exports.getThreadDetail = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getThreadDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const thread = yield prisma_1.default.thread.findUnique({
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
    const isLiked = thread.likes.some((like) => like.userId === userId);
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
});
exports.getThreadDetail = getThreadDetail;
const getReplies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const replies = yield prisma_1.default.reply.findMany({
        where: { threadId: Number(id) },
        include: {
            user: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    res.json(replies);
});
exports.getReplies = getReplies;
const createReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const reply = yield prisma_1.default.reply.create({
        data: {
            content,
            threadId,
            userId,
        },
    });
    res.json(reply);
});
exports.createReply = createReply;
