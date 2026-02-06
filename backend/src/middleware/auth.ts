import { Request, Response, NextFunction } from "express";

import { User } from "../models/User";

import admin from "../firebase/admin";

export interface AuthRequest extends Request {
  firebaseUser?: any;
  user?: any;
}

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


export async function verifyFirebaseToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 1️⃣ Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    // 2️⃣ Find user in MongoDB
    const dbUser = await User.findOne({ uid: decoded.uid });

    if (!dbUser) {
      return res.status(401).json({ message: "User not found" });
    }

  req.user = {
  uid: dbUser.uid,
  email: dbUser.email,
  role: dbUser.role,
  onboarded: dbUser.onboarded,
  selectedCourse: dbUser.selectedCourse,
};


    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
