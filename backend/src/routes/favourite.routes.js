import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  listFavourites,
  addToFavourite,
  removeFromFavourite,
} from "../controllers/favourite.controller.js";

const router = express.Router();
router.use(authMiddleware);
router.get("/", listFavourites);
router.post("/", addToFavourite);
router.delete("/:propertyId", removeFromFavourite);

export default router;
