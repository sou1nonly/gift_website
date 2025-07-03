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
      console.log(moduleDir);
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

    const runMigrations = async () => {
      try {
        for (const folder of migrationFolders) {
          if (!fs.existsSync(folder)) continue;
          const migrations = fs
            .readdirSync(folder)
            .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
          for (const migration of migrations) {
            const migrationPath = path.join(folder, migration);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const migrationModule = require(migrationPath);
            await migrationModule.up(sequelize.getQueryInterface(), Sequelize);
            console.log(`Migrated: ${migration}`);
          }
        }
        await sequelize.close();
      } catch (error) {
        console.error("Error running migrations:", error);
        process.exit(1);
      }
    };

    await runMigrations();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();