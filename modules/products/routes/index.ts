import express from "express";
import productRoutes from "./productroutes";

const router = express.Router();
router.use("/", productRoutes); // your actual product routes

export default [
  {
    path: "/products",
    route: router,
  },
];
