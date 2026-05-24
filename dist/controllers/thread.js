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
exports.getThread = exports.createThread = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const app_1 = require("../app");
const image_queue_1 = require("../queues/image.queue");
const createThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const image = req.file;
    console.log("file", req.file);
    console.log("user", req.user);
    const threads = yield prisma_1.default.thread.create({
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
    app_1.io.emit("thread:new", threads);
    yield image_queue_1.imageQueue.add("processing-image", {
        threadId: threads.id,
        image: threads.image,
    });
    console.log("queue added");
    res.json(threads);
});
exports.createThread = createThread;
const getThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const threads = yield prisma_1.default.thread.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true,
            likes: true,
            _count: {
                select: { replys: true }
            }
        }
    });
    const threadswithisliked = threads.map((thread) => {
        var _a;
        const likes = (_a = thread.likes) !== null && _a !== void 0 ? _a : [];
        return Object.assign(Object.assign({}, thread), { isliked: likes.some((like) => like.userId === userId) });
    });
    res.json(threadswithisliked);
});
exports.getThread = getThread;
