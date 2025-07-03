import sequelize from "../../../config/dbConnection";
import { CustomerProfile } from "./customerprofile";
import { CustomerAddress } from "./customeraddress";

// Initialize models
CustomerProfile.initModel(sequelize);
CustomerAddress.initModel(sequelize);

// Define associations
CustomerProfile.associate({ CustomerAddress });
CustomerAddress.associate({ CustomerProfile });

export { CustomerProfile, CustomerAddress };
