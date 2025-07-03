import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: process.env.ENV_PATH || ".env" });

// 👇 Directly include supported DB types here
const supportedDbTypes = {
  postgres: "postgres",
  mysql: "mysql",
  mssql: "mssql",
};

// === PostgreSQL ===
const connectPostgres = async (): Promise<Sequelize> => {
  const sequelize = new Sequelize(
    process.env.POSTGRES_DB as string,
    process.env.POSTGRES_USER as string,
    process.env.POSTGRES_PASSWORD as string,
    {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      dialect: process.env.POSTGRES_DIALECT as any,
      dialectOptions: {
        ssl: false,
      },
      logging: false,
    }
  );

  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL");
  } catch (err) {
    console.error("❌ Unable to connect to PostgreSQL:", err);
    throw err;
  }

  return sequelize;
};

// === MySQL ===



const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;

// === Master Function ===
export const connectDatabase = async (dbType: string): Promise<Sequelize> => {
  switch (dbType) {
    case supportedDbTypes.postgres:
      return connectPostgres();
    
    default:
      throw new Error("❌ Unsupported database type");
  }
};
