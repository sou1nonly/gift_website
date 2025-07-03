import { Model, DataTypes, Sequelize } from "sequelize";

export class AuthRole extends Model {
  public role_id!: number;
  public name!: string;
  public system_name!: string;

  static associate(models: any) {
    this.hasMany(models.AuthUserRole, {
      foreignKey: "role_id",
      as: "userRoles",
    });
  }

  static initModel(sequelize: Sequelize) {
    AuthRole.init(
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
        modelName: "AuthRole",
        tableName: "auth_role",
        timestamps: false,
      }
    );
    return AuthRole;
  }
}