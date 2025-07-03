import { Router } from "express";
import { customerController } from "../controllers/customercontroller";

const router = Router();

router.post("/profile", customerController.createProfile);
router.put("/profile/:id", customerController.updateProfile);
router.get("/profile/:userId", customerController.getProfile);
router.post("/test", (req, res) => {
  console.log("Test endpoint hit");
  res.send("Test endpoint hit");
});
router.post("/address", customerController.addAddress);
router.get("/addresses/:profileId", customerController.getAddresses);

router.stack.forEach((layer: any) => {
  if (layer.route && layer.route.path) {
    const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
    console.log(`   ${methods} /customer${layer.route.path}`);
  }
});

export default router;
