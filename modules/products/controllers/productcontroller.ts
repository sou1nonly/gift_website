import { Request, Response } from "express";
import * as productService from "../services/productservice";

// -------- CATEGORY CONTROLLERS --------
export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await productService.createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to create category", details: err });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { category_id } = req.params;
    const updated = await productService.updateCategory(Number(category_id), req.body);
    res.status(200).json({ message: "Category updated", updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update category", details: err });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { category_id } = req.params;
    await productService.deleteCategory(Number(category_id));
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category", details: err });
  }
};

// -------- PRODUCT CONTROLLERS --------
export const createProductWithImages = async (req: Request, res: Response) => {
  try {
    const { productData, images } = req.body;
    const product = await productService.createProductWithImages(productData, images);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product", details: err });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.getProductById(Number(req.params.id));
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve product", details: err });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await productService.updateProduct(Number(req.params.id), req.body);
    res.status(200).json({ message: "Product updated", updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product", details: err });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(Number(req.params.id));
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product", details: err });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts(req.query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products", details: err });
  }
};

// -------- ATTRIBUTE CONTROLLERS --------
export const createAttribute = async (req: Request, res: Response) => {
  try {
    const { name, data_type } = req.body;
    const attribute = await productService.createAttribute(name, data_type);
    res.status(201).json(attribute);
  } catch (err) {
    res.status(500).json({ error: "Failed to create attribute", details: err });
  }
};

export const addAttributeValues = async (req: Request, res: Response) => {
  try {
    console.log("REQ BODY:", req.body);
    const { product_id, attribute_id, values } = req.body;
    const result = await productService.addAttributeValues(product_id, attribute_id, values);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to add attribute valuesdsadsa", details: err });
  }
};

// -------- VARIANT CONTROLLERS --------
export const createVariantWithAttributes = async (req: Request, res: Response) => {
  try {
    const { product_id, sku, price_override, stock_qty, attribute_value_id } = req.body;
    const variant = await productService.createVariantWithAttributes(
      product_id,
      sku,
      price_override,
      stock_qty,
      attribute_value_id
    );
    res.status(201).json(variant);
  } catch (err) {
    res.status(500).json({ error: "Failed to create variant", details: err });
  }
};
