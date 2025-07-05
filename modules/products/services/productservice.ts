import { Products } from "../models/product";
import { Op } from "sequelize";
import { product_category } from "../models/productcategory";
import { ProductImages } from "../models/productimage"; 
import { ProductAttributes } from '../models/productattribute';
import { ProductAttributeValues } from '../models/productattributevalue';
import { ProductVariants } from '../models/productvariant';
import { ProductVariantAttributes } from '../models/productvariantattribute';

export const createCategory = async (data: { name: string; parent_id?: number }) => {
  return await product_category.create(data);
};

export const updateCategory = async (category_id: number, data: { name: string; parent_id?: number }) => {
  return await product_category.update(data, { where: { category_id } });
};

export const deleteCategory = async (category_id: number) => {
  return await product_category.destroy({ where: { category_id } });
};

export const createProductWithImages = async (productData: any, images: string[]) => {
  const createdProduct = await Products.create(productData);
  if (images && images.length > 0) {
    const imageEntries = images.map((url: string) => ({
      image_url: url,
      product_id: createdProduct.getDataValue("product_id"),
    }));
    await ProductImages.bulkCreate(imageEntries);
  }
  return createdProduct;
};

export const getProductById = async (id: number) => {
  return await Products.findByPk(id);
};

export const updateProduct = async (product_id: number, updates: any) => {
  return await Products.update(updates, { where: { product_id } });
};

export const deleteProduct = async (product_id: number) => {
  return await Products.destroy({ where: { product_id } });
};

export const getAllProducts = async (query: any) => {
  const filters: any = {};

  // Search
  if (query.search) {
    filters[Op.or] = [
      { name: { [Op.iLike]: `%${query.search}%` } },
      { description: { [Op.iLike]: `%${query.search}%` } },
    ];
  }

  // Category
  if (query.categoryId) {
    filters.categoryId = Number(query.categoryId);
  }

  // Brand
  if (query.brand) {
  filters.brand = {
    [Op.iLike]: `%${query.brand}%`
  };
}

  // Price range
  if (query.minPrice || query.maxPrice) {
    filters.price = {};
    if (query.minPrice) {
      filters.price[Op.gte] = Number(query.minPrice);
    }
    if (query.maxPrice) {
      filters.price[Op.lte] = Number(query.maxPrice);
    }
  }

  // Active status
  if (query.isActive !== undefined) {
    filters.isActive = query.isActive === "true";
  }

  return await Products.findAll({ where: filters });
};

// 1. Create a new attribute like "Color", "Size"
export const createAttribute = async (name: string, dataType: string) => {
  return await ProductAttributes.create({ name, data_type: dataType });
};


// 2. Add values for a product and attribute (e.g., "Red" for Color)
export const addAttributeValues = async (product_id: number, attribute_id: number, values: (string | number | boolean)[]) => {
  const createdValues = [];
  for (const value of values) {
    const data: {
      product_id: number;
      attribute_id: number;
      value_string?: string;
      value_number?: number;
      value_boolean?: boolean;
    } = {
      product_id: product_id,
      attribute_id: attribute_id,
    };
    if (typeof value === 'string') data.value_string = value;
    else if (typeof value === 'number') data.value_number = value;
    else if (typeof value === 'boolean') data.value_boolean = value;
    const created = await ProductAttributeValues.create(data);
    createdValues.push(created);
  }
  return createdValues;
};

export const createVariantWithAttributes = async (
  product_id: number,
  sku: string,
  price_override: number,
  stock_qty: number,
  attribute_value_ids: number[]
) => {
  try {
    // 1. Create the product variant
    const variant = await ProductVariants.create({
      product_id,
      sku,
      price_override,
      stock_qty,
    });

    // 2. Fetch all attribute values by their correct DB column: value_id
    const attributeValues = await ProductAttributeValues.findAll({
      where: {
        value_id: attribute_value_ids,
      },
    });

    // 3. Build the pivot records
    const variantAttributesToCreate = attributeValues.map((attrValue) => ({
      variant_id: variant.getDataValue("variant_id"),
      attribute_value_id: attrValue.value_id,
      attribute_id: attrValue.attribute_id,
    }));

    // 4. Bulk insert the variant-attribute links
    await ProductVariantAttributes.bulkCreate(variantAttributesToCreate);

    return variant;
  } catch (error) {
    console.error("❌ Failed to create variant with attributes:", error);
    throw new Error("Failed to create variant");
  }
};
