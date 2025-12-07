import mongoose from "mongoose";

// =========== USER SCHEMA (Admin + Student both) ===========
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,           // Full name required
        trim: true                // remove extra spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,             // No duplicate accounts
        lowercase: true
    },
    password: {
        type: String,
        required: true            // hashed stored only
    },
    role: {
        type: String,
        enum: ["admin", "student"], // only two roles allowed
        default: "student"
    }
}, { timestamps: true });           // auto add createdAt + updatedAt

export default mongoose.model("User", userSchema);
