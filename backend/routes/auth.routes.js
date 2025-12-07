import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Public routes — no token required
router.post("/register", registerUser);   // create user
router.post("/login", loginUser);         // generate token

export default router;
