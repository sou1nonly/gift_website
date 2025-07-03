export const routeParams = [
  // Auth routes
  {
    route: "/auth/register",
    method: "post",
    tag: "Auth",
    authRequired: false,
    params: {
      username: "string",
      email: "string",
      password: "string",
    },
    queryParams: [],
  },
  {
    route: "/auth/login",
    method: "post",
    tag: "Auth",
    authRequired: false,
    params: {
      email: "string",
      password: "string",
    },
    queryParams: [],
  },
  {
    route: "/auth/password-reset/request",
    method: "post",
    tag: "Auth",
    authRequired: false,
    params: {
      email: "string",
    },
    queryParams: [],
  },
  {
    route: "/auth/password-reset/confirm",
    method: "post",
    tag: "Auth",
    authRequired: false,
    params: {
      token: "string",
      newPassword: "string",
    },
    queryParams: [],
  },

  // Admin routes
  {
    route: "/admin/assign-role",
    method: "post",
    tag: "Admin",
    authRequired: true,
    params: {
      user_id: "string",
      role: "string",
    },
    queryParams: [],
  },

  // Profile routes (if enabled)
  // {
  //   route: "/profile/",
  //   method: "get",
  //   tag: "Profile",
  //   authRequired: true,
  //   params: {},
  //   queryParams: [],
  // },
];