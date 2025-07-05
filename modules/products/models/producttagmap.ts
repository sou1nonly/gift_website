import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/dbConnection";

export class ProductTagMaps extends Model {}

ProductTagMaps.init({
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "product",
      key: "product_id",
    },
    onDelete: "CASCADE",
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "product_tag",
      key: "tag_id",
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
  modelName: "product_tag_map",
  tableName: "ProductTagMaps",
    timestamps: true,
    createdAt: "created_at", // ✅ match DB naming
    updatedAt: "updated_at",
});
