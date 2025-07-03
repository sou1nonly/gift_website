import { Router } from "express";
import { assignRoleToUser } from "../controllers/adminController";
import { authenticateJWT } from "../../../middlewares/authMiddleware";
import { checkRole } from "../../../middlewares/checkRole";

const router = Router();

router.post("/assign-role", authenticateJWT, checkRole("admin"), assignRoleToUser);

export default router;
