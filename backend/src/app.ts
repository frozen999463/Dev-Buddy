import express from "express";
import cors from "cors";
import profileRoutes from "./routes/profile";

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 API routes
app.use("/api", profileRoutes);

export default app;
