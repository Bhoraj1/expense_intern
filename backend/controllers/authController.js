import bcrypt from "bcrypt";
import { db } from "../config/dbConnect.js";
import { generateToken } from "../utils/generateToken.js";
import { validatePassword } from "../utils/passwordValidator.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, role = "user" } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1.Password validation with separate function
    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    // 2. First steup we are checking email and username to register user
    const [existingUser] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. We are hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Now Pushing into and Database
    const [result] = await db.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role]
    );

    res.status(201).json({
      message: "User register successfully",
      userId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "User name and password is required" });
    }

    // 1.Finding user by email to login
    const [users] = await db.execute(
      "SELECT id, username, email, password, role FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // 2. If user exist then we are comparing password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. After comparing Generate JWT token using separate function
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // 4. Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successfull",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "Successfully signed out" });
  } catch (error) {
    next(error);
  }
};
