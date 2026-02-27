"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const profile_1 = __importDefault(require("./routes/profile"));
const admin_1 = __importDefault(require("./routes/admin"));
const course_1 = __importDefault(require("./routes/course"));
const node_1 = __importDefault(require("./routes/node"));
const progress_1 = __importDefault(require("./routes/progress"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 🔥 API routes
app.use("/api", profile_1.default);
app.use("/api/admin", admin_1.default);
app.use("/api/course", course_1.default);
app.use("/api/node", node_1.default);
app.use("/api/progress", progress_1.default);
exports.default = app;
