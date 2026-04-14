import { Router } from "express";
import { getprofile } from "../controllers/user";
import { authmiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/user", authmiddleware, getprofile);

export default router;