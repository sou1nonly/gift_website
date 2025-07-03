import { Model, DataTypes, Sequelize } from "sequelize";

export class AuthUser extends Model {
  public user_id!: number;
  public username!: string;
  public email!: string;
  public password_hash!: string;
  public is_active!: boolean;
  public created_at!: Date;

  static associate(models: any) {
    this.hasMany(models.AuthUserRole, { foreignKey: "user_id", as: "userRoles" });
  }

  static initModel(sequelize: Sequelize) {
    AuthUser.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password_hash: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: "AuthUser",
        tableName: "auth_user",
        timestamps: false,
      }
    );
    return AuthUser;
  }
}