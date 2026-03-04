import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { superAdminOnly } from "../middleware/superAdmin.middleware.js";
import {
  getAllUsers,
  promoteToAdmin,
} from "../controllers/userPromote.controller.js";

const promoteRouter = Router();

promoteRouter.put(
  "/promote/:userId",
  authMiddleware,
  superAdminOnly,
  promoteToAdmin,
);

promoteRouter.get("/get/users", authMiddleware, superAdminOnly, getAllUsers);

export default promoteRouter;
