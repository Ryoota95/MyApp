import { Router } from "express";
import { createThread, getThread} from "../controllers/thread";
import { authmiddleware } from "../middlewares/auth.middleware";
import  upload  from "../middlewares/uploud.middleware"


const router = Router();

router.post("/threads",authmiddleware, upload.single("image"), createThread);
router.get("/threads",authmiddleware, getThread)


export default router;
