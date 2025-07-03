import { Model, DataTypes, Sequelize } from "sequelize";

export class AuthUserRole extends Model {
  public id!: number;
  public user_id!: number;
  public role_id!: number;

  static associate(models: any) {
    this.belongsTo(models.AuthUser, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.AuthRole, { foreignKey: "role_id", as: "role" });
  }

  static initModel(sequelize: Sequelize) {
    AuthUserRole.init(
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
        modelName: "AuthUserRole",
        tableName: "auth_user_role",
        timestamps: false,
      }
    );
    return AuthUserRole;
  }
}
