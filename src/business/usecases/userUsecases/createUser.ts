import {
  findUserByEmail,
  saveUser,
} from "../../../adapters/data-access/repositories/userRepositories";
import { securePassword } from "../../../adapters/external-services/bcrypt";
import userInterface from "../../Interfaces/userInterface";

export async function createUser({ email, password }: userInterface) {
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw {
        message: "Email already exists",
        statusCode: 409,
      };
    }
    const securedPassword = await securePassword(password);
    return await saveUser({
      email,
      password: securedPassword,
    } as userInterface);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}



