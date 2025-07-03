import { Model, DataTypes, Sequelize } from "sequelize";
import { CustomerProfile } from "./customerprofile";

export class CustomerAddress extends Model {
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
    this.belongsTo(models.CustomerProfile, {
      foreignKey: "customer_id",
      as: "customer",
    });
  }

  static initModel(sequelize: Sequelize) {
    CustomerAddress.init(
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
        modelName: "CustomerAddress",
        tableName: "customer_address",
        timestamps: false,
      }
    );
    return CustomerAddress;
  }
}
