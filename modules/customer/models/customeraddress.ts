import { Model, DataTypes, Sequelize } from "sequelize";
import { customer_profile } from "./customerprofile";
import sequelize from "../../../config/dbConnection";
// Update the import path below to the correct relative path for your project structure
import { initModels as initAuthModels } from "../../auth/models/initModels";
import { initModels as initCustomerModels } from "./initModels";

export class customer_address extends Model {
  public address_id!: number;
  public customer_id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public phone_number!: string;
  public address_line1!: string;
  public address_line2!: string;
  public city!: string;
  public state!: string;
  public postal_code!: string;
  public country!: string;
  public created_at!: Date;

  static associate(models: any) {
    this.belongsTo(models.customer_profile, {
      foreignKey: "customer_id",
      as: "customer",
    });
  }

  static initModel(sequelize: Sequelize) {
    customer_address.init(
      {
        address_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        customer_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        first_name: {
          type: DataTypes.STRING,
        },
        last_name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        phone_number: {
          type: DataTypes.STRING,
        },
        address_line1: {
          type: DataTypes.TEXT,
        },
        address_line2: {
          type: DataTypes.TEXT,
        },
        city: {
          type: DataTypes.STRING,
        },
        state: {
          type: DataTypes.STRING,
        },
        postal_code: {
          type: DataTypes.STRING,
        },
        country: {
          type: DataTypes.STRING,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: "customer_address",
        tableName: "customer_address",
        timestamps: false,
      }
    );
    return customer_address;
  }
}

initAuthModels(sequelize);
initCustomerModels(sequelize);
