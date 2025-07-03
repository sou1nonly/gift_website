import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import connectDatabase from "../config/dbConnection";
import logger from "../config/logger";
import modules from "../module.json";

interface Module {
  name: string;
}

(async () => {
  try {
     const sequelize: Sequelize = connectDatabase;
    const migrationFolders: string[] = [];

    (modules as Module[]).forEach((element) => {
      const basePath = path.join(__dirname, "../modules/");
      const moduleDir = path.join(basePath, `${element.name}`);
      if (fs.existsSync(moduleDir)) {
        migrationFolders.push(
          path.resolve(basePath, `${element.name}/migrations`)
        );
      } else {
        logger.error({
          message: `MIGRATION MODELS: module directory not found  ${element.name}`,
        });
      }
    });

    const runRollbacks = async () => {
      try {
        for (const folder of migrationFolders.reverse()) {
          // Reverse the order for rollbacks
          if (!fs.existsSync(folder)) continue;
          const migrations = fs
            .readdirSync(folder)
            .filter((file) => file.endsWith(".js") || file.endsWith(".ts"))
            .reverse();
          for (const migration of migrations) {
            const migrationPath = path.join(folder, migration);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const migrationModule = require(migrationPath);
            await migrationModule.down(
              sequelize.getQueryInterface(),
              Sequelize
            );
            console.log(`Rolled back: ${migration}`);
          }
        }
        await sequelize.close();
      } catch (error) {
        console.error("Error running rollbacks:", error);
        process.exit(1);
      }
    };

    await runRollbacks();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();