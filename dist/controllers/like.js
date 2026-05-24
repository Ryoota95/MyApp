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
exports.toggleLike = void 0;
const app_1 = require("../app");
const prisma_1 = __importDefault(require("../lib/prisma"));
const toggleLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { threadId } = req.body;
    try {
        const existingLike = yield prisma_1.default.like.findFirst({
            where: {
                userId,
                threadId,
            },
        });
        if (existingLike) {
            yield prisma_1.default.like.delete({
                where: { id: existingLike.id },
            });
            const totallike = yield prisma_1.default.like.count({
                where: { threadId }
            });
            app_1.io.emit("thread:like", {
                threadId,
                userId,
                action: "unlike",
                totallike,
            });
            return res.json({ message: "unliked" });
        }
        else {
            yield prisma_1.default.like.create({
                data: {
                    userId,
                    threadId
                },
            });
            const totallike = yield prisma_1.default.like.count({
                where: { threadId }
            });
            console.log("emit data", {
                threadId,
                userId,
                action: "like",
                totallike,
            });
            app_1.io.emit("thread:like", {
                threadId,
                userId,
                action: "like",
                totallike,
            });
            return res.json({ message: "liked" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "error toggle like" });
    }
});
exports.toggleLike = toggleLike;
