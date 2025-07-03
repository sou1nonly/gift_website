import { CustomerProfile } from "../models/customerprofile";
import { CustomerAddress } from "../models/customeraddress";

export const customerService = {
  async createProfile(data: any) {
    return await CustomerProfile.create(data);
  },

  async updateProfile(profile_id: number, data: any) {
    return await CustomerProfile.update(data, {
      where: { profile_id },
    });
  },

  async getProfileByUserId(user_id: number) {
    return await CustomerProfile.findOne({
      where: { user_id },
      include: [{ model: CustomerAddress, as: "addresses" }],
    });
  },

  async addAddress(data: any) {
    return await CustomerAddress.create(data);
  },

  async getAddresses(profile_id: number) {
    return await CustomerAddress.findAll({
      where: { customer_id: profile_id },
    });
  },
};
