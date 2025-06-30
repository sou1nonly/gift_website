// src/middleware/checkRole.ts
import { Request, Response, NextFunction } from "express";
import { UserRole, Role } from "../models";

export const checkRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.user_id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userRoles = await UserRole.findAll({
        where: { user_id: userId },
        include: [{ model: Role }]
      });

      const hasRole = userRoles.some(
        (ur: any) => ur.Role?.name === requiredRole
      );

      if (!hasRole) {
        return res.status(403).json({ message: `Access denied: Requires ${requiredRole} role` });
      }

      next();
    } catch (err) {
      console.error("RBAC error:", err);
      res.status(500).json({ message: "Internal server error (RBAC)" });
    }
  };
};
