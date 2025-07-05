import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/dbConnection";

export class ProductAttributeValues extends Model {
  [x: string]: any;
}

ProductAttributeValues.init({
  value_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "product",
      key: "product_id",
    },
    onDelete: "CASCADE",
  },
  attribute_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "product_attribute",
      key: "attribute_id",
    },
    onDelete: "CASCADE",
  },
  value_string: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  value_number: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  value_boolean: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
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
  modelName: "product_attribute_value",
  tableName: "ProductAttributeValues",
  timestamps: true,
    createdAt: "created_at", // ✅ match DB naming
    updatedAt: "updated_at",
});
