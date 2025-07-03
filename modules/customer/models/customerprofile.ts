import { Model, DataTypes, Sequelize } from "sequelize";
//import { CustomerAddress } from "./customeraddress";

export class CustomerProfile extends Model {
  public profile_id!: number;
  public user_id!: number;
  public first_name!: string;
  public last_name!: string;
  public phone!: string;
  public gender!: string;
  public date_of_birth!: Date;
  public created_at!: Date;

  static associate(models: any) {
    this.hasMany(models.CustomerAddress, {
      foreignKey: "customer_id",
      as: "addresses",
    });
  }

  static initModel(sequelize: Sequelize) {
    CustomerProfile.init(
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
        modelName: "CustomerProfile",
        tableName: "customer_profile",
        timestamps: false,
      }
    );
    return CustomerProfile;
  }
}
