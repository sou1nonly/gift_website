// index.js

require("dotenv").config({ path: process.env.ENV_PATH || ".env" });
import { connectDatabase } from "./config/dbConnection";
import { Request, Response } from "express";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";

(async () => {
  const sequelize = await connectDatabase(process.env.DB_TYPE || "postgres");

  const express = require("express");
  // const logger = require("./config/logger");
  const cors = require("cors");
  // Only import routes once (already imported above)
  // const { routes, fields: routeFields } = require("./routes");
  const { default: helmet } = require("helmet");
  const { default: rateLimit } = require("express-rate-limit");
  const { dynamicModuleLoader } = require("./moduleLoader");
  // const errorHandler = require("./middlewares/errorHandler"); // Already imported above
  const swaggerUi = require("swagger-ui-express");
  const { generateSwaggerJSONFromRouter } = require("./config/swagger");
  const { exec } = require("child_process");

  const app = express();
  const port = process.env.PORT || 3000;
  const apiVersion = process.env.API_VERSION ? process.env.API_VERSION : "v1";

  app.use(express.json());
  app.use(helmet());
  app.use(cors());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);

  // ✅ Health check
  app.get("/", (req: Request, res: Response) => {
    // logger.info("Hello, Node.js is running");
    res.send("Hello, Node.js is running!");
  });

  app.get("/api", (req: Request, res: Response) => {
    res.send("API is running!");
  });

  // ✅ Database migration/seed trigger
  app.get("/db-exec", function (req: Request, res: Response) {
    exec("yarn db:migrate", (err: Error | null, stdout: string) => {
      if (err) {
        console.error(`exec error: ${err}`);
        res.send(`exec error db:migrate: ${err}`);
        return;
      }
      exec("yarn db:seeds", (err2: Error | null, stdout2: string) => {
        if (err2) {
          console.error(`exec error: ${err2}`);
          res.send(`exec error db:seeds: ${err2}`);
          return;
        }
        console.log(`Number of files ${stdout2}`);
      });
      console.log(`Number of files ${stdout}`);
    });

    res.send("Success");
  });

  // ✅ Load dynamic modules (custom logic)
  dynamicModuleLoader(app);

  // ✅ Mount all module routes under /api/:version/
  //app.use(`/api/${apiVersion}`, routes);
  app.use("/api", routes);
  // ✅ Swagger documentation
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(generateSwaggerJSONFromRouter(routes /*, routeFields*/))
  );

  // ✅ Global error handler
  app.use(errorHandler);

  app.listen(port, () => {
    // logger.info(`Server running at http://localhost:${port}`);
    console.log(`Server running at http://localhost:${port}`);
  });
})();

