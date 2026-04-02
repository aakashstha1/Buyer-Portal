import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  listFavourites,
  addToFavourite,
  removeFromFavourite,
  getFavouriteIds,
} from "../controllers/favourite.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { modifyLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();
router.use(authMiddleware);
router.get("/ids", authMiddleware, getFavouriteIds);
router.get("/", listFavourites);
router.post("/", authorizeRoles("buyer"), modifyLimiter, addToFavourite);
router.delete(
  "/:propertyId",
  authorizeRoles("buyer"),
  modifyLimiter,
  removeFromFavourite,
);

export default router;
