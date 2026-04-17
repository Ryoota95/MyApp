import { Router } from "express";
import { getUser, searchUsers} from "../controllers/user";
import { authmiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/user", authmiddleware, getUser);
router.get("/users", authmiddleware, searchUsers);

export default router;