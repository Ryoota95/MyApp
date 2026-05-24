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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const prisma_1 = require("../lib/prisma");
// GET PROFILE
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const user = yield prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                photoProfile: true,
            },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error get profile" });
    }
});
exports.getProfile = getProfile;
// UPDATE PROFILE
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { name, bio } = req.body;
        const updated = yield prisma_1.prisma.user.update({
            where: { id: userId },
            data: {
                name,
                bio,
            },
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: "Error update profile" });
    }
});
exports.updateProfile = updateProfile;
