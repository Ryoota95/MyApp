"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const like_1 = require("../controllers/like");
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/like", auth_middleware_1.authmiddleware, like_1.toggleLike);
exports.default = router;
