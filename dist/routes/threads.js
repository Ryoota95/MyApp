"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thread_1 = require("../controllers/thread");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const uploud_middleware_1 = __importDefault(require("../middlewares/uploud.middleware"));
const router = (0, express_1.Router)();
router.post("/threads", auth_middleware_1.authmiddleware, uploud_middleware_1.default.single("image"), thread_1.createThread);
router.get("/threads", auth_middleware_1.authmiddleware, thread_1.getThread);
exports.default = router;
