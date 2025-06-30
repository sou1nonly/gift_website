import { Router } from "express";
import {registerUser, loginUser, requestPasswordReset, resetPassword } from "../controllers/authController";

const router = Router();

router.get("/ping", (req, res) => res.json({ message: "pong" }));
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password-reset/request", requestPasswordReset);
router.post("/password-reset/confirm", resetPassword);

export default router;


