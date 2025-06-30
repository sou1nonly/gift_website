import express from "express";
import dotenv from "dotenv";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import { profile } from "console";
import profileRoutes from "./profileRoutes";
import { Request, Response, NextFunction } from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);


// Optional: sanity route
app.get("/", (req, res) => {
  res.send("Auth service is running");
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Something went wrong" });
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Auth service running on port ${PORT}`);
});
