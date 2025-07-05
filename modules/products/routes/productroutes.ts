// src/routes/product.routes.ts
import express from "express";
import * as controller from "../controllers/productcontroller";
import { authenticateJWT } from "../../../middlewares/authMiddleware";
import { checkRole } from "../../../middlewares/checkRole";
import { optionalAuthenticate } from "../../../middlewares/authMiddleware";

const router = express.Router();

// Category routes
router.post("/categories",  authenticateJWT,
  checkRole("admin"), controller.createCategory);
router.put("/categories/:category_id", authenticateJWT,
  checkRole("admin"), controller.updateCategory);
router.delete("/categories/:category_id", authenticateJWT,
  checkRole("admin"), controller.deleteCategory);

// Product routes
router.post("/products", authenticateJWT,
  checkRole("admin"), controller.createProductWithImages);
router.get("/products/:id", authenticateJWT,
  checkRole("admin"), controller.getProductById);
router.put("/products/:id", authenticateJWT,
  checkRole("admin"), controller.updateProduct);
router.delete("/products/:id", authenticateJWT,
  checkRole("admin"), controller.deleteProduct);

router.get("/products", optionalAuthenticate, controller.getAllProducts);

// Attribute routes
router.post("/attributes", authenticateJWT,
  checkRole("admin"), controller.createAttribute);
router.post("/attribute-values", authenticateJWT,
  checkRole("admin"), controller.addAttributeValues);

// Variant routes
router.post("/variants", authenticateJWT,
  checkRole("admin"), controller.createVariantWithAttributes);

export default router;
