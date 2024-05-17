import {
  findUserByEmail,
  saveUser,
  storeOtp,
} from "../../../adapters/data-access/repositories/userRepositories";
import { securePassword } from "../../../adapters/external-services/bcrypt";
import userInterface from "../../Interfaces/userInterface";
import generateOtp from "../../shared/utilities/generateOtp";
import sendOTPByEmail from "../../shared/utilities/mailer";

export async function createUser({ email, password }: userInterface) {
  try {
    console.log("create user");
    const existingUser = await findUserByEmail(email);
    if (!existingUser && password) {
      const securedPassword = await securePassword(password);
      return await saveUser({
        email,
        password: securedPassword,
      } as userInterface);
    } else {
      throw new Error("Email already exists in the database");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}


