import { verifyToken } from "../utils/JWT.js";
import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ message: "Invalid or expired token" });

    req.user = await User.findById(decoded._id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
