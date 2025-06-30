import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public user_id!: number;
  public username!: string;
  public email!: string;
  public password_hash!: string;
  public readonly created_at!: Date;
  public is_active!: boolean;
  public password_reset_token!: string;
  public password_reset_expiry!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    password_reset_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password_reset_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "auth_user",
    timestamps: false,
  }
);

export default User;
