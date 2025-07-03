import express, { Router } from "express";
import fs from "fs";
import path from "path";

const router: Router = express.Router();
const modulesDir = path.join(__dirname, "../modules");

// Read all module directories (e.g., auth, customer, etc.)
const moduleNames = fs.readdirSync(modulesDir);

for (const moduleName of moduleNames) {
  const routeFilePath = path.join(modulesDir, moduleName, "routes", "index.ts");
  const compiledRouteFilePath = path.join(modulesDir, moduleName, "routes", "index.js"); // fallback for compiled

  let finalRoutePath = "";
  if (fs.existsSync(routeFilePath)) {
    finalRoutePath = routeFilePath;
  } else if (fs.existsSync(compiledRouteFilePath)) {
    finalRoutePath = compiledRouteFilePath;
  } else {
    console.error(`❌ Route file not found for module '${moduleName}'`);
    continue;
  }

  try {
    console.log(`Loading routes from: ${finalRoutePath}`);
    const moduleRoutes = require(finalRoutePath).default;

    if (Array.isArray(moduleRoutes)) {
      moduleRoutes.forEach((route: { path: string; route: Router }) => {
        router.use(route.path, route.route);
        console.log(`✅ Mounted ${route.path} from ${moduleName}`);
      });
    } else {
      console.warn(`⚠️ No valid route array exported from '${moduleName}/routes/index.ts'`);
    }
  } catch (err) {
    console.error(`❌ Failed to load routes for module '${moduleName}':`, err);
  }
}

export default router;
