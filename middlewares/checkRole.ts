import { Request, Response, NextFunction } from "express";
import { AuthUserRole } from "../modules/auth/models/authuserrole";
import { AuthRole } from "../modules/auth/models/authrole";

export const checkRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.user_id;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const userRoles = await AuthUserRole.findAll({
        where: { user_id: userId },
        include: [
          {
            model: AuthRole,
            as: "role", // ✅ match this alias with your association
          },
        ],
      });

      const hasRole = userRoles.some((ur: any) => ur.role?.system_name === requiredRole);

      if (!hasRole) {
        res
          .status(403)
          .json({ message: `Access denied: Requires ${requiredRole} role` });
        return;
      }

      next();
    } catch (err) {
      console.error("RBAC middleware error:", err);
      res.status(500).json({ message: "Internal server error (RBAC)" });
    }
  };
};
