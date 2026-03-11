import express from "express";
import cors from "cors";
import profileRoutes from "./routes/profile";
import adminRoutes from "./routes/admin";
import courseRoutes from "./routes/course";
import nodeRoutes from "./routes/node";
import progressRoutes from "./routes/progress";
import reviewRoutes from "./routes/review";
import forumRoutes from "./routes/forum";


import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 🔥 API routes
app.use("/api/profile", profileRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/node", nodeRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/forum", forumRoutes);

export default app;
