import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class UserRole extends Model {
  public id!: number;
  public user_id!: number;
  public role_id!: number;
}

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserRole",
    tableName: "auth_user_role",
    timestamps: false,
  }
);

export default UserRole;
