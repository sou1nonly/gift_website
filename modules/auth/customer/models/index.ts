import sequelize from "../../../config/dbConnection";
import { customer_profile } from "./customerprofile";
import { customer_address } from "./customeraddress";

// Initialize models
customer_profile.initModel(sequelize);
customer_address.initModel(sequelize);

// Define associations
customer_profile.associate({ customer_address });
customer_address.associate({ customer_profile });

export { customer_profile, customer_address };
