import { customer_profile } from "../models/customerprofile";
import { customer_address } from "../models/customeraddress";

type ProfileCreateInput = {
  user_id: number;
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  date_of_birth: Date;
};

type ProfileUpdateInput = Partial<ProfileCreateInput>;

type AddressInput = {
  customer_id: number;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

export const customerService = {
  async createProfile(data: ProfileCreateInput) {
    const existing = await customer_profile.findOne({ where: { user_id: data.user_id } });
    if (existing) {
      throw new Error("Profile for this user already exists");
    }

    return await customer_profile.create(data);
  },

  async updateProfile(profile_id: number, data: ProfileUpdateInput) {
    await customer_profile.update(data, { where: { profile_id } });
    return await customer_profile.findByPk(profile_id);
  },

  async getProfileByUserId(user_id: number) {
    return await customer_profile.findOne({
      where: { user_id },
      include: [{ model: customer_address, as: "addresses" }],
    });
  },

  async addAddress(data: AddressInput) {
    return await customer_address.create(data);
  },

  async getAddresses(profile_id: number) {
    return await customer_address.findAll({
      where: { customer_id: profile_id },
    });
  },
};
