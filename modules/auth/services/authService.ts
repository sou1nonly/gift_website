import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthUser, AuthRole, AuthUserRole } from "../models";
import { Op } from "sequelize";

interface LoginResult {
  token: string;
  user: {
    user_id: number;
    email: string;
    username: string;
  };
}

export const createUser = async (
  username: string,
  email: any,
  password: any
): Promise<{ user_id: number; email: any; username: any }> => {
  const existing = await AuthUser.findOne({ where: { email } });
  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);
  const newUser = await AuthUser.create({
    username,
    email,
    password_hash: hashedPassword,
  });

  const customerRole = await AuthRole.findOne({ where: { system_name: "customer" } });
  if (!customerRole) {
    throw new Error("Default role 'customer' not found");
  }

  await AuthUserRole.create({
    user_id: newUser.user_id,
    role_id: customerRole.role_id,
  });

  return {
    user_id: newUser.user_id,
    email: newUser.email,
    username: newUser.username,
  };
};

export const loginService = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  const user = await AuthUser.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const payload = {
    user_id: user.user_id,
    email: user.email,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return {
    token,
    user: payload,
  };
};

export const getUserByResetToken = async (
  token: string
): Promise<AuthUser | null> => {
  return AuthUser.findOne({
    where: {
      password_reset_token: token,
      password_reset_expiry: { [Op.gt]: new Date() },
    },
  });
};
