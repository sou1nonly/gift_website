import fs from "fs";
import path from "path";
import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import connectDatabase from "../config/dbConnection";
import { supportedDbTypes } from "../utils/staticData";
import { unsupportedDBType, unableConnect } from "../utils/messages";
import modules from "../module.json";
import logger from "../config/logger";

interface ModuleEntry {
  name: string;
}

interface ModelsMap {
  [key: string]: ModelStatic<Model<any, any>> | Sequelize;
  sequelize: Sequelize;
}

const getSequelizeModels = async (): Promise<ModelsMap> => {
   const sequelize: Sequelize = connectDatabase;
  const models: ModelsMap = { sequelize };

  try {
    const modelPaths: string[] = [];

    (modules as ModuleEntry[]).forEach((element) => {
      const basePath = path.join(__dirname, `../modules/`);
      const moduleDir = path.join(basePath, `${element.name}`);
      if (fs.existsSync(moduleDir)) {
        const modelDir = path.join(basePath, `${element.name}/models`);
        if (fs.existsSync(modelDir)) {
          modelPaths.push(path.resolve(basePath, `${element.name}/models`));
        }
      } else {
        logger.error({
          message: `LOAD MODELS: module directory not found  ${element.name}`,
        });
      }
    });

    const loadModels = (dir: string) => {
      fs.readdirSync(dir)
        .filter((file) => file.endsWith(".js") || file.endsWith(".ts"))
        .forEach((file) => {
          const modelPath = path.join(dir, file);
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const modelFactory = require(modelPath);
          // Support both ES module default export and CommonJS
          const model =
            typeof modelFactory === "function"
              ? modelFactory(sequelize, DataTypes)
              : modelFactory.default(sequelize, DataTypes);
          models[model.name] = model;
        });
    };

    // Load models from each specified model path
    modelPaths.forEach((modelsPath) => {
      loadModels(modelsPath);
    });

    Object.keys(models).forEach((modelName) => {
      const model = models[modelName] as ModelStatic<Model<any, any>> & {
        associate?: (models: ModelsMap) => void;
      };
      if (model && typeof model.associate === "function") {
        model.associate(models);
      }
    });
  } catch (error) {
    console.error(unableConnect, error);
  }

  return models;
};

const getAllModels = async (dbType: string): Promise<ModelsMap> => {
  switch (dbType) {
    case supportedDbTypes.postgres:
    case supportedDbTypes.mysql:
    case supportedDbTypes.mssql:
      return getSequelizeModels();
    default:
      throw new Error(unsupportedDBType);
  }
};

export { getAllModels };