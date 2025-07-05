import { Products } from "./product";
import { product_category } from "./productcategory";
import { ProductImages } from "./productimage";
import { ProductTags } from "./producttag";
import { ProductTagMaps } from "./producttagmap";
import { ProductAttributes } from "./productattribute";
import { ProductAttributeValues } from "./productattributevalue";
import { ProductVariants } from "./productvariant";
import { ProductVariantAttributes } from "./productvariantattribute";

// Product ↔ Category
Products.belongsTo(product_category, {
  foreignKey: "category_id",
  as: "category",
});
product_category.hasMany(Products, {
  foreignKey: "category_id",
  as: "products",
});

// Product ↔ Image
Products.hasMany(ProductImages, {
  foreignKey: "product_id",
  as: "images",
});
ProductImages.belongsTo(Products, {
  foreignKey: "product_id",
  as: "product",
});

// Product ↔ Tag (Many-to-Many)
Products.belongsToMany(ProductTags, {
  through: ProductTagMaps,
  foreignKey: "product_id",
  otherKey: "tag_id",
  as: "tags",
});
ProductTags.belongsToMany(Products, {
  through: ProductTagMaps,
  foreignKey: "tag_id",
  otherKey: "product_id",
  as: "products",
});

// Product ↔ AttributeValue (One-to-Many)
Products.hasMany(ProductAttributeValues, {
  foreignKey: "product_id",
  as: "attribute_values",
});
ProductAttributeValues.belongsTo(Products, {
  foreignKey: "product_id",
  as: "product",
});

// Attribute ↔ AttributeValue (One-to-Many)
ProductAttributes.hasMany(ProductAttributeValues, {
  foreignKey: "attribute_id",
  as: "values",
});
ProductAttributeValues.belongsTo(ProductAttributes, {
  foreignKey: "attribute_id",
  as: "attribute",
});

// Product ↔ Variant (One-to-Many)
Products.hasMany(ProductVariants, {
  foreignKey: "product_id",
  as: "variants",
});
ProductVariants.belongsTo(Products, {
  foreignKey: "product_id",
  as: "product",
});

// Variant ↔ VariantAttribute (One-to-Many)
ProductVariants.hasMany(ProductVariantAttributes, {
  foreignKey: "variant_id",
  as: "variant_attributes",
});
ProductVariantAttributes.belongsTo(ProductVariants, {
  foreignKey: "variant_id",
  as: "variant",
});

// Attribute ↔ VariantAttribute
ProductAttributes.hasMany(ProductVariantAttributes, {
  foreignKey: "attribute_id",
  as: "variant_attributes",
});
ProductVariantAttributes.belongsTo(ProductAttributes, {
  foreignKey: "attribute_id",
  as: "attribute",
});

// AttributeValue ↔ VariantAttribute
ProductAttributeValues.hasMany(ProductVariantAttributes, {
  foreignKey: "attribute_value_id",
  as: "variant_attribute_links",
});
ProductVariantAttributes.belongsTo(ProductAttributeValues, {
  foreignKey: "attribute_value_id",
  as: "attribute_value",
});
