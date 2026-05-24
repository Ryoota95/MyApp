"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const detail_1 = require("../controllers/detail");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/threads/:id", detail_1.getThreadDetail);
router.get("/threads/replies/:id", detail_1.getReplies);
router.post("/threads/replies/:id", auth_middleware_1.authmiddleware, detail_1.createReply);
exports.default = router;
