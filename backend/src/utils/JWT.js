import jwt from "jsonwebtoken";

// Secret key (environment variable me rakhna best practice hai)
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey123";

// ✅ Token generate karne ka function
export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },          // payload (userId bhej rahe)
    JWT_SECRET,              // secret key
    { expiresIn: "1h" }      // token expiry
  );
};

// ✅ Token verify karne ka function
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
