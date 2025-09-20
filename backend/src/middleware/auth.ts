import type { Request, Response, NextFunction } from "express";
import { adminAuth } from "../lib/firebaseAdmin.js";

export type AuthedRequest = Request & { user?: { uid: string; name?: string; photoURL?: string } };

export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization || "";
  //
    const token = header.startsWith("Bearer ") ? header.slice(7) : undefined;
    if (!token) return res.status(401).json({ error: "Auth required" });
    const decoded = await adminAuth.verifyIdToken(token);
  //
    req.user = { uid: decoded.uid, name: decoded.name, photoURL: decoded.picture };
    next();
  } catch (err) {
  //
    res.status(401).json({ error: "Invalid token" });
  }
}
