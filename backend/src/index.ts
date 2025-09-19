import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import pitches from "./routes/pitches.js";
import users from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.100.11:5173"
];

app.use(helmet());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/pitches", pitches);
app.use("/api/users", users);

// 404
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

console.log('Loaded Firebase ENV:', {
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? '[REDACTED]' : undefined
});
app.listen(PORT, () => {
  console.log(`PulseProof API listening on :${PORT}`);
});
