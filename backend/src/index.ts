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

app.listen(PORT);
