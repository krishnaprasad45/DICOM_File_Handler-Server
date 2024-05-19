import { NextFunction } from "express";
import { findUserByEmail } from "../../../adapters/data-access/repositories/userRepositories";
import { matchPassword } from "../../../adapters/external-services/bcrypt";
import { generateAuthToken } from "../../../frameworks/express/middleware/jwtTokenAuth";

export async function loginUser(email: string, password: string) {
  const existingUser: any = await findUserByEmail(email);
  if (existingUser) {
    const isMatch = await matchPassword(password, existingUser.password);
    if (isMatch) {
      const token = generateAuthToken(existingUser);
      return { userData: existingUser, token };
    } else {
      throw {
        message: "Password does not match",
        statusCode: 409,
      };
    }
  } else {
    throw {
      message: "Email not exist",
      statusCode: 408,
    };
  }
}
