import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./db/mongo";
import "./execution/server"; // 🐳 Start the code execution WebSocket server on port 3001

const PORT = process.env.PORT || 5000;

// ✅ Define routes BEFORE listen
app.get("/", (req, res) => {
  res.send("DevBuddy backend is running 🚀");
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
