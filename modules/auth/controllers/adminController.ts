import { Request, Response, NextFunction } from "express";
import { AuthUser, AuthRole, AuthUserRole } from "../models";
import { CustomError } from "../utils/customError";

// Assign Role to User
export const assignRoleToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user_id, role } = req.body;

    if (!user_id || !role) {
      throw new CustomError("user_id and role are required", 400);
    }

    const user = await AuthUser.findByPk(user_id);
    if (!user) throw new CustomError("User not found", 404);

    const roleRecord = await AuthRole.findOne({ where: { system_name: role } });
    if (!roleRecord) throw new CustomError("Role not found", 404);

    // Check if the user already has any role
    const existingUserRole = await AuthUserRole.findOne({ where: { user_id } });

    if (existingUserRole) {
      // Update existing role assignment
      existingUserRole.role_id = roleRecord.role_id;
      await existingUserRole.save();
    } else {
      // Assign new role
      await AuthUserRole.create({ user_id, role_id: roleRecord.role_id });
    }

    res.status(200).json({ message: `Role '${role}' assigned to user ${user_id}` });
  } catch (err) {
    next(err);
  }
};
