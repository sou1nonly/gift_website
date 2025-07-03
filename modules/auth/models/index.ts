import sequelize from "../../../config/dbConnection";
import { AuthUser } from "./authuser";
import { AuthRole } from "./authrole";
import { AuthUserRole } from "./authuserrole";

// Initialize all models
AuthUser.initModel(sequelize);
AuthRole.initModel(sequelize);
AuthUserRole.initModel(sequelize);

// Define associations
AuthUser.associate({ AuthUserRole });
AuthRole.associate({ AuthUserRole });
AuthUserRole.associate({ AuthUser, AuthRole });

export { AuthUser, AuthRole, AuthUserRole };