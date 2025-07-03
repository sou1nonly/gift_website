import { supportedDbTypes } from "../utils/staticData";

require("dotenv").config({ path: process.env.ENV_PATH || ".env" });

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number | string;
  dialect: string;
  dialectOptions?: any;
}

const getDConfig = (): DBConfig => {
  const obj: DBConfig = {
    username: "",
    password: "",
    database: "",
    host: "",
    port: 0,
    dialect: "",
  };

  switch (process.env.DB_TYPE) {
    case supportedDbTypes.postgres:
      obj.username = process.env.POSTGRES_USER || "";
      obj.password = process.env.POSTGRES_PASSWORD || "";
      obj.database = process.env.POSTGRES_DB || "";
      obj.host = process.env.POSTGRES_HOST || "";
      obj.port = process.env.POSTGRES_PORT || 0;
      obj.dialect = process.env.POSTGRES_DIALECT || "postgres";
      obj.dialectOptions = {
        ssl: false,
      };
      return obj;
    case supportedDbTypes.mysql:
      obj.username = process.env.MYSQL_USER || "";
      obj.password = process.env.MYSQL_PASSWORD || "";
      obj.database = process.env.MYSQL_DB || "";
      obj.host = process.env.MYSQL_HOST || "";
      obj.port = process.env.MYSQL_PORT || 0;
      obj.dialect = process.env.MYSQL_DIALECT || "mysql";
      return obj;
    case supportedDbTypes.mssql:
      obj.username = process.env.MSSQL_USER || "";
      obj.password = process.env.MSSQL_PASSWORD || "";
      obj.database = process.env.MSSQL_DB || "";
      obj.host = process.env.MSSQL_HOST || "";
      obj.port = process.env.MSSQL_PORT || 0;
      obj.dialect = process.env.MSSQL_DIALECT || "mssql";
      obj.dialectOptions = {
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      };
      return obj;
    default:
      throw new Error("Unsupported database type");
  }
};

export default {
  development: getDConfig(),
  test: getDConfig(),
  production: getDConfig(),
};