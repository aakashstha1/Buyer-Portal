import express from "express";
import { listProperties } from "../controllers/property.controller.js";

const router = express.Router();
router.get("/", listProperties);

export default router;
