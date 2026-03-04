import express from "express";
import cors from "cors";
import userAuthRouter from "./routes/userAuth.route.js";
import complainRouter from "./routes/complain.route.js";
import promoteRouter from "./routes/userPromote.route.js";
import adminDashboard from "./routes/admin.route.js";
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// create route
app.use("/api/user", userAuthRouter);
app.use("/api/complain", complainRouter);
app.use("/api/admin/role", promoteRouter);
app.use("/api/admin/dashboard", adminDashboard);

export default app;
