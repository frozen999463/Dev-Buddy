"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const mongo_1 = require("./db/mongo");
require("./execution/server"); // 🐳 Start the code execution WebSocket server on port 3001
const PORT = process.env.PORT || 5000;
// ✅ Define routes BEFORE listen
app_1.default.get("/", (req, res) => {
    res.send("DevBuddy backend is running 🚀");
});
const startServer = async () => {
    try {
        await (0, mongo_1.connectDB)();
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error("❌ Failed to start server:", err);
    }
};
startServer();
