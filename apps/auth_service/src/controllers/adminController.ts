// src/controllers/adminController.ts
import { Request, Response, NextFunction } from "express";
import { User, Role, UserRole } from "../models";
import { CustomError } from "../utils/customError";

// Assign Role to User
export const assignRoleToUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, role } = req.body;

    if (!user_id || !role) {
      throw new CustomError("user_id and role are required", 400);
    }

    const user = await User.findByPk(user_id);
    if (!user) throw new CustomError("User not found", 404);

    const roleRecord = await Role.findOne({ where: { system_name: role } });
    if (!roleRecord) throw new CustomError("Role not found", 404);

    const existing = await UserRole.findOne({
      where: { user_id, role_id: roleRecord.role_id },
    });
    if (existing) throw new CustomError("User already has this role", 400);

    await UserRole.create({ user_id, role_id: roleRecord.role_id });

    res.status(200).json({ message: `Role '${role}' assigned to user ${user_id}` });
  } catch (err) {
    next(err);
  }
};

// Get All Users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll({
      attributes: ["user_id", "username", "email", "created_at"],
    });
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};
