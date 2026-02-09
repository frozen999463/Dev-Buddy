import express from "express";
import cors from "cors";
import profileRoutes from "./routes/profile";
import adminRoutes from "./routes/admin";
import courseRoutes from "./routes/course";
import nodeRoutes from "./routes/node";


const app = express();

app.use(cors());
app.use(express.json());

// 🔥 API routes
app.use("/api", profileRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/node", nodeRoutes);

export default app;
