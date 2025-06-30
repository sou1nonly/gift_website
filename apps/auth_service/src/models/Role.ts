import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Role extends Model {
  public role_id!: number;
  public name!: string;
  public system_name!: string;
}

Role.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    system_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "auth_role",
    timestamps: false,
  }
);

export default Role;
