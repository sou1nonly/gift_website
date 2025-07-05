import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/dbConnection";

export class product_category extends Model {}

product_category.init({
  category_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "product_category",
      key: "category_id",
    },
    onDelete: "SET NULL",
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
  modelName: "product_category",
  tableName: "ProductCategories",
  timestamps: true,
  createdAt: "created_at", // ✅ match DB naming
  updatedAt: "updated_at",
   underscored: true,
});
