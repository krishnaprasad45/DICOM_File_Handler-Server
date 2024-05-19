import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import * as dotenv from "dotenv";
import userInterface from "../../../business/Interfaces/userInterface";
import encryptionDecryption from "../../../business/shared/utilities/decryption";
dotenv.config();

interface CustomRequest extends Request {
  token?: any;
}

export function generateAuthToken(existingUser: userInterface) {
  const { email, password } = existingUser;
  const jwtSecretKey = process.env.JWT_SECRETKEY || '';
  const token = Jwt.sign({ email, password }, jwtSecretKey);
  return token;
}

interface CustomHeaders extends Record<string, string | string[] | undefined> {
  authorization?: string;
}

export function validateRequest(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const requestedRoute = req.path;
    const publicRoutes = ["/login", "/signup", "/otp"];

    if (publicRoutes.includes(requestedRoute)) {
      return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Unauthorized: Missing Authorization Header");
      return res.status(401).json({ error: "Unauthorized: Missing Authorization Header" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("Unauthorized: Token not provided");
      return res.status(401).json({ error: "Unauthorized: Token not provided" });
    }
    const decodedToken = encryptionDecryption.decryptdata(token);
    if (!decodedToken) {
      console.log("Unauthorized: Invalid Token");
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }
    req.token = decodedToken;
    next();

  } catch (error) {
    console.error("Error in validateRole middleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = {
  generateAuthToken,
  validateRequest,
};
