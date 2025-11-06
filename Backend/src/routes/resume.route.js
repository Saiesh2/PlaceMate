import express from "express";
import { summarizeResume, saveResume } from "../controllers/resume.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js"; // Auth middleware

const router = express.Router();

router.post("/summarize", summarizeResume);
router.post("/save", protectRoute, saveResume);

export default router;
