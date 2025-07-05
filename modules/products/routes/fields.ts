// Content for fields.js

export const routeParams = [
  // Category routes
  {
    route: "/categories",
    method: "post",
    tag: "Category",
    authRequired: true,
    params: {
      name: "string",
      description: "string",
    },
    queryParams: [],
  },
  {
    route: "/categories/:category_id",
    method: "put",
    tag: "Category",
    authRequired: true,
    params: {
      name: "string",
      description: "string",
    },
    queryParams: [
      { name: "category_id", in: "path", required: true, type: "string" },
    ],
  },
  {
    route: "/categories/:category_id",
    method: "delete",
    tag: "Category",
    authRequired: true,
    params: {},
    queryParams: [
      { name: "category_id", in: "path", required: true, type: "string" },
    ],
  },

  // Product routes
  {
    route: "/products",
    method: "post",
    tag: "Product",
    authRequired: true,
    params: {
      name: "string",
      description: "string",
      price: "number",
      // Add other product fields as needed
    },
    queryParams: [],
  },
  {
    route: "/products/:id",
    method: "get",
    tag: "Product",
    authRequired: true,
    params: {},
    queryParams: [
      { name: "id", in: "path", required: true, type: "string" },
    ],
  },
  {
    route: "/products/:id",
    method: "put",
    tag: "Product",
    authRequired: true,
    params: {
      name: "string",
      description: "string",
      price: "number",
      // Add other product fields as needed
    },
    queryParams: [
      { name: "id", in: "path", required: true, type: "string" },
    ],
  },
  {
    route: "/products/:id",
    method: "delete",
    tag: "Product",
    authRequired: true,
    params: {},
    queryParams: [
      { name: "id", in: "path", required: true, type: "string" },
    ],
  },
  {
    route: "/products",
    method: "get",
    tag: "Product",
    authRequired: false,
    params: {},
    queryParams: [],
  },

  // Attribute routes
  {
    route: "/attributes",
    method: "post",
    tag: "Attribute",
    authRequired: true,
    params: {
      name: "string",
      // Add other attribute fields as needed
    },
    queryParams: [],
  },
  {
    route: "/attribute-values",
    method: "post",
    tag: "Attribute",
    authRequired: true,
    params: {
      attribute_id: "string",
      value: "string",
    },
    queryParams: [],
  },

  // Variant routes
  {
    route: "/variants",
    method: "post",
    tag: "Variant",
    authRequired: true,
    params: {
      product_id: "string",
      // Add other variant fields as needed
    },
    queryParams: [],
  },
];