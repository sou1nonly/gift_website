import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS
} = process.env;

if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USER || !DB_PASS) {
  throw new Error("Missing database environment variables!");
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  logging: false,  // set true for debugging SQL queries
});

export default sequelize;
