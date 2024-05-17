import { Request, Response } from "express";
import {
  findUserByEmail,
  getOtp,
} from "../../../adapters/data-access/repositories/userRepositories";


export async function verifyEmailWithOtp(req: Request, res: Response) {
    try {
      console.log("verifyEmailWithOtp");
      const { email, enteredOtp } = req.body;
  
      const retrievedOtp = await getOtp(email);
      if (retrievedOtp === enteredOtp) {
        const user = await findUserByEmail(email);
        if (user) {
          user.emailVerification = true;
          await user.save();
          res.status(200).json({ message: "Email verified successfully." });
        } else {
          res.status(404).json({ message: "User not found." });
        }
      } else {
        res.status(400).json({ message: "Invalid OTP." });
      }
    } catch (error) {
      console.error("Error verifying email with OTP:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
