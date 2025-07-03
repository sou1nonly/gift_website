import { Request, Response } from "express";
import { customerService } from "../services/customerService";

export const customerController = {
  async createProfile(req: Request, res: Response) {
    try {
      console.log("HOW TO DEBUG CODE STEP 1..");
      const profile = await customerService.createProfile(req.body);
      res.status(201).json(profile);
    } catch (err) {
      res.status(500).json({ message: "Error creating profile", error: err });
    }
  },

  async updateProfile(req: Request, res: Response) {
    try {
      const profile_id = Number(req.params.id);
      await customerService.updateProfile(profile_id, req.body);
      res.status(200).json({ message: "Profile updated" });
    } catch (err) {
      res.status(500).json({ message: "Error updating profile", error: err });
    }
  },

  async getProfile(req: Request, res: Response) {
    try {
      const user_id = Number(req.params.userId);
      const profile = await customerService.getProfileByUserId(user_id);
      res.status(200).json(profile);
    } catch (err) {
      res.status(500).json({ message: "Error fetching profile", error: err });
    }
  },

  async addAddress(req: Request, res: Response) {
    try {
      const address = await customerService.addAddress(req.body);
      res.status(201).json(address);
    } catch (err) {
      res.status(500).json({ message: "Error adding address", error: err });
    }
  },

  async getAddresses(req: Request, res: Response) {
    try {
      const profile_id = Number(req.params.profileId);
      const addresses = await customerService.getAddresses(profile_id);
      res.status(200).json(addresses);
    } catch (err) {
      res.status(500).json({ message: "Error fetching addresses", error: err });
    }
  },
};
