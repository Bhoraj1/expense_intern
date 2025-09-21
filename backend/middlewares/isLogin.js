import { db } from "../config/dbConnect.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLogin = async (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2. Verify token
    const verifiedToken = verifyToken(token);

    if (!verifiedToken) {
      return res.status(401).json({ message: "Token expired or invalid" });
    }

    // 3. Find user by ID using raw SQL
    const [rows] = await db.execute(
      "SELECT id, email, role FROM users WHERE id = ?",
      [verifiedToken.userId]
    );
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4. Save user to request object
    req.user = { userId: user.id, email: user.email, role: user.role };
    next();
  } catch (error) {
    next(error);
  }
};
