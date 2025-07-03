import { Sequelize } from "sequelize";
import { AuthUser } from "./authuser";
import { AuthRole } from "./authrole";
import { AuthUserRole } from "./authuserrole";

export const initModels = (sequelize: Sequelize) => {
  AuthUser.initModel(sequelize);
  AuthRole.initModel(sequelize);
  AuthUserRole.initModel(sequelize);

  AuthUser.associate({ AuthUserRole });
  AuthRole.associate({ AuthUserRole });
  AuthUserRole.associate({ AuthUser, AuthRole });
};
