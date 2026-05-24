"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/user", auth_middleware_1.authmiddleware, user_1.getUser);
router.get("/users", auth_middleware_1.authmiddleware, user_1.searchUsers);
exports.default = router;
