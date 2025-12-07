import mongoose from "mongoose";

export async function connectDB() {
  try {
    console.log("Checking ENV → MONGO_URI =", process.env.MONGO_URI); // DEBUG

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
}

console.log("ok")

