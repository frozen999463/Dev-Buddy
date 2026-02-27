"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFirebaseToken = verifyFirebaseToken;
const User_1 = require("../models/User");
const admin_1 = __importDefault(require("../firebase/admin"));
// export interface AuthRequest extends Request {
//   firebaseUser?: any;
//   user?: {
//     uid: string;
//     email: string;
//     role: "user" | "admin";
//     onboarded: boolean;
//     selectedCourse?: string;
//   };
// }
async function verifyFirebaseToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        // 1️⃣ Verify Firebase token
        const decoded = await admin_1.default.auth().verifyIdToken(token);
        // 2️⃣ Find user in MongoDB (optional for some routes like onboarding)
        const dbUser = await User_1.User.findOne({ uid: decoded.uid });
        // Attach both Firebase and MongoDB user data
        req.user = {
            uid: decoded.uid,
            email: decoded.email || "",
            name: decoded.name,
            firebase: decoded,
            role: dbUser?.role || "user",
            onboarded: dbUser?.onboarded || false,
            selectedCourse: dbUser?.selectedCourse,
        };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
