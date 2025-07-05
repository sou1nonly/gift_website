import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/dbConnection";

export class ProductTags extends Model {}

ProductTags.init({
  tag_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
  modelName: "product_tag",
  tableName: "ProductTags",
   timestamps: true,
    createdAt: "created_at", // ✅ match DB naming
    updatedAt: "updated_at",
});
