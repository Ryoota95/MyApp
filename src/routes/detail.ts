import express  from "express";
import { getThreadDetail, getReplies, createReply } from "../controllers/detail";
import { authmiddleware } from "../middlewares/auth.middleware";



const router = express.Router();

router.get("/threads/:id", getThreadDetail);
router.get("/threads/replies/:id", getReplies);
router.post("/threads/replies/:id",authmiddleware, createReply);


export default router;