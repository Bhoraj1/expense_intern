import { db } from "../config/dbconnect.js";

export const isAdmin = async (req, res, next) => {
  try {
    const userId = req?.userAuth?.id;

    if (!userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Find user and check role
    const [rows] = await db.query("SELECT role FROM users WHERE id = ?", [
      userId,
    ]);
    const user = rows[0];

    if (user?.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    next(error);
  }
};
