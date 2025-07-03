import { Router, Request } from "express";
import { authenticateJWT } from "../../../middlewares/authMiddleware";

// Extend Express Request interface to include 'user' as JwtPayload
import type { JwtPayload } from "../../../middlewares/authMiddleware";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

const router = Router();

router.get("/", authenticateJWT, (req, res) => {
  res.json({ message: `Welcome, user ${req.user?.username}` });
});

export default router;
