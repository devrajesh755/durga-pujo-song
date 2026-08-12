import { Router } from "express";
import { getOnlineUsers } from "../controllers/userController.js";

const router = Router();

router.get("/online", getOnlineUsers);

export default router;
