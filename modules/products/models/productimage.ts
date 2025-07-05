import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/dbConnection";

export class ProductImages extends Model {}

ProductImages.init({
  image_id: {
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
  image_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  alt_text: {
    type: DataTypes.TEXT,
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
  modelName: "product_image",
  tableName: "ProductImages",
   timestamps: true,
    createdAt: "created_at", // ✅ match DB naming
    updatedAt: "updated_at",
});
