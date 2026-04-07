import express from "express";
import { listProperties, searchProperty } from "../controllers/property.controller.js";

const router = express.Router();
router.get("/", listProperties);
router.get("/search", searchProperty);


export default router;
