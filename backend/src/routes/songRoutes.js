import { Router } from "express";
import { getAllSongs, getSongById } from "../controllers/songController.js";

const router = Router();

router.get("/", getAllSongs);
router.get("/:id", getSongById);

export default router;
