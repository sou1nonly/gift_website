import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { createUser, loginService, getUserByResetToken } from "../services/authService";
import { AuthUser } from "../models";

// In-memory store for tokens (for demonstration only, not recommended for production)
const passwordResetCache: {
  [email: string]: {
    token: string;
    expiry: Date;
  };
} = {};

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const result = await createUser(username, email, password);
    res.status(201).json({ message: "User registered successfully.", user: result });
  } catch (err: any) {
    console.error("Registration error:", err);
    res.status(500).json({ message: err.message || "Something went wrong." });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    const { token, user } = await loginService(email, password);

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err: any) {
    console.error("Login error:", err.message);
    res.status(401).json({ message: err.message });
  }
};

// Request password reset
export const requestPasswordReset = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Email required" });
    return;
  }

  try {
    const user = await AuthUser.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store in memory
    passwordResetCache[email] = { token: resetToken, expiry };

    res.json({
      message: "Password reset token generated (in-memory)",
      resetToken,
      expiry,
    });
  } catch (err) {
    console.error("requestPasswordReset error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Confirm password reset
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token, newPassword, email } = req.body;
  if (!token || !newPassword || !email) {
    res.status(400).json({ message: "Token, email and newPassword are required" });
    return;
  }

  try {
    const user = await AuthUser.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const resetData = passwordResetCache[email];
    if (!resetData || resetData.token !== token || resetData.expiry < new Date()) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = hashedPassword;
    await user.save();

    // Clear token
    delete passwordResetCache[email];

    res.json({ message: "Password successfully reset" });
  } catch (err) {
    console.error("resetPassword error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
