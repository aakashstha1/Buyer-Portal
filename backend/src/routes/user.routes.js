import express from "express";
import { getMe } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/me", getMe);

export default router;
