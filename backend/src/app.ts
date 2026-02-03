import express from "express";
import cors from "cors";
import profileRoutes from "./routes/profile";
import adminRoutes from "./routes/admin";


const app = express();

app.use(cors());
app.use(express.json());

// 🔥 API routes
app.use("/api", profileRoutes);

app.use("/api/admin", adminRoutes);


export default app;
