import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getComplain,
  createComplaint,
  getAllComplaint,
  updateComplainetstatus,
} from "../controllers/complain.controller.js";
import adminOnly from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js";


const complainRouter = Router();

// for user route
complainRouter.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  createComplaint,
);
complainRouter.get("/get", authMiddleware, getComplain);

// for admin
complainRouter.get(
  "/all",
  authMiddleware,
  adminOnly,
  getAllComplaint,
);
complainRouter.put(
  "/update/status/:complaintId",
  authMiddleware,
  adminOnly,
  updateComplainetstatus,
);

export default complainRouter;
