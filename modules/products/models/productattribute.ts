import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/dbConnection";

export class ProductAttributes extends Model {}

ProductAttributes.init({
  attribute_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_type: {
    type: DataTypes.STRING,
    allowNull: false, // Examples: "string", "number", "boolean"
  },
   created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // ✅ insert automatically
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // ✅ insert automatically and will auto-update too
    },
}, {
  sequelize,
  modelName: "product_attribute",
  tableName: "ProductAttributes",
   timestamps: true,
    createdAt: "created_at", // ✅ match DB naming
    updatedAt: "updated_at",
});
