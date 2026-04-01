import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  listFavourites,
  addToFavourite,
  removeFromFavourite,
} from "../controllers/favourite.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();
router.use(authMiddleware);
router.get("/", listFavourites);
router.post("/", authorizeRoles("buyer"), addToFavourite);
router.delete("/:propertyId", authorizeRoles("buyer"), removeFromFavourite);

export default router;
