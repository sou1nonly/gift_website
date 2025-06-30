import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware"; 
const router = Router();

router.get("/profile", authenticateJWT, (req, res) => {
  res.json({ message: `Welcome user ${req.user?.user_id}` });
});

export default router;
