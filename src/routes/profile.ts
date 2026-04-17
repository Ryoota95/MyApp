import express  from "express";
import { getProfile, updateProfile } from "../controllers/profile";
import { authmiddleware } from "../middlewares/auth.middleware";



const router = express.Router();

router.get("/profile",authmiddleware, getProfile);
router.patch("/profile",authmiddleware, updateProfile);



export default router;