import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/dbConnection";


export class Products extends Model {}

Products.init({
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  sku: DataTypes.STRING,
  short_description: DataTypes.TEXT,
  description: DataTypes.TEXT,
  price: DataTypes.DECIMAL,
  final_price: DataTypes.DECIMAL,
  stock_qty: DataTypes.INTEGER,
  image_url: DataTypes.TEXT,
  category_id: DataTypes.INTEGER,
  is_published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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
  modelName: "product",
  tableName: "Products",
  timestamps: true,
  createdAt: "created_at",
  updatedAt:"updated_at"
});
