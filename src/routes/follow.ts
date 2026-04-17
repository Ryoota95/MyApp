import express  from "express";
import { followUser, unfollowUser, getFollows} from  "../controllers/follow"
import { authmiddleware } from "../middlewares/auth.middleware";



const router = express.Router();


router.get("/follows", authmiddleware, getFollows);
router.post("/follows", authmiddleware, followUser);
router.delete("/follows", authmiddleware, unfollowUser);



export default router;