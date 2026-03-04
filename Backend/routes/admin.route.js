import { Router } from "express";
import {
  getComplaintsAdmin,
  getDashBoardStats,
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";
import { superAdminOnly } from "../middleware/superAdmin.middleware.js";

const adminDashboard = Router();

// admin dashboard route
adminDashboard.get("/stats", authMiddleware, adminOnly, getDashBoardStats);
adminDashboard.get(
  "/complaints",
  authMiddleware,
  adminOnly,
  getComplaintsAdmin,
);

export default adminDashboard;
