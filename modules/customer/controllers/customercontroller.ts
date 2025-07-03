import { Request, Response } from "express";
import { customerService } from "../services/customerService";

export const customerController = {
  async createProfile(req: Request, res: Response) {
    try {
      const { user_id, first_name, last_name, gender, phone, date_of_birth } = req.body;

      // Basic validation (expand or use schema validation library)
      if (!user_id || !first_name || !last_name || !gender || !phone || !date_of_birth) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const profile = await customerService.createProfile({
        user_id,
        first_name,
        last_name,
        gender,
        phone,
        date_of_birth: new Date(date_of_birth),
      });

      return res.status(201).json(profile);
    } catch (error) {
      console.error("Error creating profile:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async updateProfile(req: Request, res: Response) {
    try {
      const profile_id = parseInt(req.params.id);
      const updated = await customerService.updateProfile(profile_id, req.body);

      return res.status(200).json({ message: "Profile updated", result: updated });
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getProfileByUserId(req: Request, res: Response) {
    try {
      const user_id = parseInt(req.params.user_id);
      const profile = await customerService.getProfileByUserId(user_id);

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.status(200).json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async addAddress(req: Request, res: Response) {
    try {
      const data = req.body;

      // Optional: Validate address fields
      const address = await customerService.addAddress(data);
      return res.status(201).json(address);
    } catch (error) {
      console.error("Error adding address:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getAddresses(req: Request, res: Response) {
    try {
      const profile_id = parseInt(req.params.profileId);
      const addresses = await customerService.getAddresses(profile_id);
      return res.status(200).json(addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
