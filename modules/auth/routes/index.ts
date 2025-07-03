import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
// import profileRoutes from "./profileRoutes"; // optional

export default [
  { path: "/auth", route: authRoutes },
  { path: "/admin", route: adminRoutes },
  // { path: "/profile", route: profileRoutes },
];
