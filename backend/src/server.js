import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import songRoutes from "./routes/songRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFoundHandler, globalErrorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "music-dashboard-api" });
});

app.use("/api/songs", songRoutes);
app.use("/api/users", userRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`music-dashboard-api listening on port ${PORT}`);
});
