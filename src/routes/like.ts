import { toggleLike } from "../controllers/like";
import { Router } from "express";
import { authmiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/like", authmiddleware, toggleLike)

export default router;



