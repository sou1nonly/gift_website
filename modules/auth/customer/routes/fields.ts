export const routeParams = [
  {
    route: "/customer/profile",
    method: "post",
    tag: "Customer",
    authRequired: true,
    params: {
      // Add your expected fields for creating a profile
      // Example:
      // name: "string",
      // email: "string",
      // phone: "string",
    },
    queryParams: [],
  },
  {
    route: "/customer/profile/:id",
    method: "put",
    tag: "Customer",
    authRequired: true,
    params: {
      // Add your expected fields for updating a profile
      // Example:
      // name: "string",
      // email: "string",
      // phone: "string",
    },
    queryParams: [
      { name: "id", in: "path", required: true, type: "string" },
    ],
  },
  {
    route: "/customer/profile/:userId",
    method: "get",
    tag: "Customer",
    authRequired: true,
    params: {},
    queryParams: [
      { name: "userId", in: "path", required: true, type: "string" },
    ],
  },
  {
    route: "/customer/address",
    method: "post",
    tag: "Customer",
    authRequired: true,
    params: {
      // Add your expected fields for adding an address
      // Example:
      // street: "string",
      // city: "string",
      // state: "string",
      // zip: "string",
    },
    queryParams: [],
  },
  {
    route: "/customer/addresses/:profileId",
    method: "get",
    tag: "Customer",
    authRequired: true,
    params: {},
    queryParams: [
      { name: "profileId", in: "path", required: true, type: "string" },
    ],
  },
  {
    route: "/customer/addresses",
    method: "get",
    tag: "Customer",
    authRequired: true,
    params: {},
    queryParams: [],
  },
  {
    route: "/customer/address/:id",
    method: "put",
    tag: "Customer",
    authRequired: true,
    params: {
      // Add your expected fields for updating an address
      // Example:
      // street: "string",
      // city: "string",
      // state: "string",
      // zip: "string",
    },
    queryParams: [
      { name: "id", in: "path", required: true, type: "string" },
    ],
  },
  {
    route: "/customer/address/:id",
    method: "delete",
    tag: "Customer",
    authRequired: true,
    params: {},
    queryParams: [
      { name: "id", in: "path", required: true, type: "string" },
    ],
  },
];