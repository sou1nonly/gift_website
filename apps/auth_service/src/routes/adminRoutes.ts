import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/checkRole"; 
import { assignRoleToUser } from "../controllers/adminController";

const router = Router();

router.get("/test-admin", (req, res) => res.json({ msg: "admin route works" }));

router.post("/assign-role", authenticateJWT, checkRole("admin"), assignRoleToUser);

router.get("/admin/users", authenticateJWT, checkRole("admin"), (req, res) => {
  res.json({ message: `Welcome Admin User ${req.user?.user_id}` });
});

export default router;
