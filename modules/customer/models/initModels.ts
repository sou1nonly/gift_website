import { Sequelize } from "sequelize";
import { customer_profile } from "./customerprofile";
import { customer_address } from "./customeraddress";

export const initModels = (sequelize: Sequelize) => {
  // 1. Initialize all models
  customer_profile.initModel(sequelize);
  customer_address.initModel(sequelize);

  // 2. Set up associations
  customer_profile.associate?.({ customer_address });
  customer_address.associate?.({ customer_profile });
};
