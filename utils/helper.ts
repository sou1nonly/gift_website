import { Response } from "express";
import jwt, { VerifyCallback } from "jsonwebtoken";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

export const sendResponse = (
  res: Response,
  statusCode = 200,
  success = true,
  message = "",
  data: any = null,
  token: string | null = null
) => {
  return res.status(statusCode).json({
    statusCode,
    success,
    message,
    data,
    token,
  });
};

export const verifyToken = (
  token: string,
  callback: VerifyCallback
) => {
  return jwt.verify(token, process.env.JWT_SECRET as string, {}, callback);
};

export const sendOtp = async (phoneNumber: string, otp: string) => {
  try {
    await client.messages.create({
      body: `Your OTP code for PredixyAI is ${otp}.`,
      from: process.env.TWILIO_PHONE_NUMBER as string,
      to: phoneNumber,
    });
    console.log(`OTP sent to ${phoneNumber}`);
  } catch (error) {
    throw { error };
  }
};