import User from "../models/User.js";

export const getStudentCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "student" });
    return res.json({ count });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
