import { Request, Response, NextFunction } from "express";
import admin from "../firebase/admin";

import { User } from "../models/User"; // adjust if needed

export interface AuthRequest extends Request {
  firebaseUser?: admin.auth.DecodedIdToken;
  user?: any;
}


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
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
