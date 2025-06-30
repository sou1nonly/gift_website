import crypto from "crypto";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models";
import { createUser, loginService } from "../services/authService";
import { Op } from "sequelize";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const result = await createUser(username, email, password);
    return res.status(201).json({ message: "User registered successfully.", user: result });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const loginUser = async (req: Request, res: Response) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const { token, user } = await loginService(email, password);

    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err: any) {
    console.error("Login error:", err.message);
    return res.status(401).json({ message: err.message });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000); 

    user.password_reset_token = resetToken;
    user.password_reset_expiry = expiry;

    await user.save();

    res.json({
      message: "Password reset token generated",
      resetToken,
      expiry,
    });
  } catch (err) {
    console.error("requestPasswordReset error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword)
    return res.status(400).json({ message: "Token and newPassword required" });

  try {
    const user = await User.findOne({
      where: {
        password_reset_token: token,
        password_reset_expiry: { [Op.gt]: new Date() }, // expiry date > now
      },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = hashedPassword;

    // Invalidate reset token & expiry
    user.password_reset_token = "";
    user.password_reset_expiry = new Date(0); 

    await user.save();

    res.json({ message: "Password successfully reset" });
  } catch (err) {
    console.error("resetPassword error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
