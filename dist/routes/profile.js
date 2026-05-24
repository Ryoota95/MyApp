"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_1 = require("../controllers/profile");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/profile", auth_middleware_1.authmiddleware, profile_1.getProfile);
router.patch("/profile", auth_middleware_1.authmiddleware, profile_1.updateProfile);
exports.default = router;
