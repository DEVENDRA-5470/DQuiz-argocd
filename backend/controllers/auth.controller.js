import User from "../models/User.js";        // DB model
import bcrypt from "bcryptjs";               // using bcryptjs for consistency
import jwt from "jsonwebtoken";              // for token generation


// ======================== REGISTER ========================
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password before saving
        const hashedPwd = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPwd,
            role: role || "student", // default student if not specified
        });

        return res.status(201).json({
            message: "Registration successful",
            userId: user._id,
            role: user.role,
        });

    } catch (err) {
        return res.status(500).json({ message: "Registration failed", error: err.message });
    }
};



// ======================== LOGIN WITH ROLE ========================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. verify email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // 2. verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // 3. generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 4. Return correct dashboard route
        return res.json({
  success: true,
  token,
  role: user.role,
  redirect: user.role === "admin" 
              ? "/admin-dashboard"
              : "/student-dashboard"
});


    } catch (err) {
        return res.status(500).json({ message: "Login failed", error: err.message });
    }
};
