import { findUserByEmail, storeOtp } from "../../../adapters/data-access/repositories/userRepositories";
import generateOtp from "../../shared/utilities/generateOtp";
import sendOTPByEmail from "../../shared/utilities/mailer";

export async function sentEmailWithOtp(email: string) {
    try {
      
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        const generatedOtp = generateOtp();
        await storeOtp(generatedOtp, email);
        await sendOTPByEmail(email, generatedOtp);
      } else {
        throw new Error("Email does not exist in the database");
      }
    } catch (error) {
      console.error("Error sending email with OTP:", error);
      throw error;
    }
  }