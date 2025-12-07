import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";   
import { getStudentCount } from "./controllers/admin.controller.js";

const app = express();

// ✅ FIXED CORS (MUST COME BEFORE express.json() AND ROUTES)
app.use(
  cors({
    origin: "http://3.14.141.236:32001",   // frontend URL
    credentials: true,                    // allow cookies/tokens
  })
);

// Optional but recommended for cookies
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Body parser AFTER CORS
app.use(express.json());

// ✅ ROUTES
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("DQuiz API Backend Running");
});

app.get("/api/admin/student-count", getStudentCount);

// DB + Server
connectDB();
app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});

// Debug route
app.get("/debug/env", (req, res) => {
  res.json({
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
  });
});
