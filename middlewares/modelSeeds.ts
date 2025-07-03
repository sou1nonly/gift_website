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
    const seedFolders: string[] = [];

    (modules as Module[]).forEach((element) => {
      const basePath = path.join(__dirname, "../modules/");
      const moduleDir = path.join(basePath, `${element.name}`);
      if (fs.existsSync(moduleDir)) {
        const seedDir = path.join(basePath, `${element.name}/seeders`);
        if (fs.existsSync(seedDir)) {
          seedFolders.push(path.resolve(basePath, `${element.name}/seeders`));
        }
      } else {
        logger.error({
          message: `SEED MODELS: module directory not found  ${element.name}`,
        });
      }
    });

    const runSeeds = async () => {
      try {
        for (const folder of seedFolders) {
          const seeds = fs
            .readdirSync(folder)
            .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
          for (const seed of seeds) {
            const seedPath = path.join(folder, seed);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const seedModule = require(seedPath);
            await seedModule.up(sequelize.getQueryInterface(), Sequelize);
            console.log(`Seeded: ${seed}`);
          }
        }
        await sequelize.close();
      } catch (error) {
        console.error("Error running seeds:", error);
        process.exit(1);
      }
    };

    await runSeeds();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();