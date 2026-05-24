"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const follow_1 = require("../controllers/follow");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/follows", auth_middleware_1.authmiddleware, follow_1.getFollows);
router.post("/follows", auth_middleware_1.authmiddleware, follow_1.followUser);
router.delete("/follows", auth_middleware_1.authmiddleware, follow_1.unfollowUser);
exports.default = router;
