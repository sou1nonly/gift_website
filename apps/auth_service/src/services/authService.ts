import bcrypt from "bcrypt";
import { User, Role, UserRole } from "../models";
import jwt from "jsonwebtoken";

export const createUser = async (username: string, email: string, password: string) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password_hash: hashedPassword,
  });

  const customerRole = await Role.findOne({ where: { system_name: "customer" } });

  if (!customerRole) {
    throw new Error("Default role 'customer' not found");
  }

  await UserRole.create({
    user_id: newUser.user_id,
    role_id: customerRole.role_id,
  });

  return {
    user_id: newUser.user_id,
    email: newUser.email,
    username: newUser.username,
  };
};

export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const payload = { user_id: user.user_id };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return {
    token,
    user: {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
    },
  };
};