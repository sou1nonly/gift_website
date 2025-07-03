import { Router, Request, Response, NextFunction } from "express";
import { customerController } from "../controllers/customercontroller";

const router = Router();

// Async handler to catch errors in async route handlers
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/profile", asyncHandler(customerController.createProfile));
router.put("/profile/:id", asyncHandler(customerController.updateProfile));
router.get("/profile/:user_id", asyncHandler(customerController.getProfileByUserId)); // fixed name

router.post("/address", asyncHandler(customerController.addAddress));
router.get("/addresses/:profileId", asyncHandler(customerController.getAddresses));

// Optional test route
router.post("/test", (req, res) => {
  console.log("Test endpoint hit");
  res.send("Test endpoint hit");
});

// Log mounted routes
router.stack.forEach((layer: any) => {
  if (layer.route && layer.route.path) {
    const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
    console.log(`   ${methods} /customer${layer.route.path}`);
  }
});

export default router;
