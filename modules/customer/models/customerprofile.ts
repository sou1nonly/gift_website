import { Model, DataTypes, Sequelize } from "sequelize";

export class customer_profile extends Model {
  public profile_id!: number;
  public user_id!: number;
  public first_name!: string;
  public last_name!: string;
  public phone!: string;
  public gender!: string;
  public date_of_birth!: Date;
  public created_at!: Date;

  static associate(models: any) {
    // Ensure models.customer_address exists before associating
    if (models.customer_address) {
      this.hasMany(models.customer_address, {
        foreignKey: "customer_id",
        as: "addresses",
      });
    }
  }

  static initModel(sequelize: Sequelize) {
    customer_profile.init(
      {
        profile_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        first_name: {
          type: DataTypes.STRING,
        },
        last_name: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
        gender: {
          type: DataTypes.STRING,
        },
        date_of_birth: {
          type: DataTypes.DATE,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: "customer_profile",
        tableName: "customer_profile",
        timestamps: false,
      }
    );
    return customer_profile;
  }
}
