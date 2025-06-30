import User from "./User";
import Role from "./Role";
import UserRole from "./UserRole";

// Set up many-to-many relationships
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
  otherKey: "role_id",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
  otherKey: "user_id",
});

export { User, Role, UserRole };
