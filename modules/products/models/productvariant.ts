import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/dbConnection";

export class ProductVariants extends Model {}

ProductVariants.init({
  variant_id: {
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
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price_override: {
    type: DataTypes.DECIMAL,
    allowNull: true, // Can be null if base product price is used
  },
  stock_qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
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
  modelName: "product_variant",
  tableName: "ProductVariants",
    timestamps: true,
    createdAt: "created_at", // ✅ match DB naming
    updatedAt: "updated_at",
});
