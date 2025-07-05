import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/dbConnection";

export class ProductVariantAttributes extends Model {}

ProductVariantAttributes.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  variant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "product_variant",
      key: "variant_id",
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
  attribute_value_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "product_attribute_value",
      key: "value_id",
    },
    onDelete: "CASCADE",
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
  modelName: "product_variant_attribute",
  tableName: "ProductVariantAttributes",
   timestamps: true,
    createdAt: "created_at", // ✅ match DB naming
    updatedAt: "updated_at",
});
