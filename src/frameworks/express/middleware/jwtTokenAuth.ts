import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import * as dotenv from "dotenv";
import encryptionDecryption from "../../../business/shared/utilities/encryptionDecryption";
import userInterface from "../../../business/Interfaces/userInterface";
dotenv.config();


export function generateAuthToken(existingUser: userInterface) {
  const { email, password } = existingUser;
  const jwtSecretKey = process.env.JWT_SECRETKEY || ''; // Provide a default value if process.env.JWT_SECRETKEY is undefined
  const token = Jwt.sign({ email, password }, jwtSecretKey);
  return token;
}

interface CustomHeaders extends Record<string, string | string[] | undefined> {
  authorization?: string;
}

export async function verifyToken(
  req: Request<{}, {}, {}, CustomHeaders>,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      console.log("token verification failed");
      return res.status(401).json({ error: "No token provided" });
    }
    const jwtSecretKey = process.env.JWT_SECRETKEY || "";
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
}

// export function validateRole(req: Request, res: Response, next: NextFunction) {
//   try {
//     const requestedRoute = req.path;
//     console.log(req.path);
//     const publicRoutes = ["/", "/login", "/signup", "/otp"];
//     if (publicRoutes.includes(requestedRoute)) {
//       return next();
//     }
//     const authorizationHeader = req.header("Authorization");
//     if (!authorizationHeader) {
//       console.log("Unauthorized!!");
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const token = authorizationHeader.replace("Bearer ", "");
//     const decodedToken = encryptionDecryption.decryptdata(token);
//     const userRouteSegment = "/";

//     if (token) {
//       req.token = decodedToken;
//       next();
//     } else {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = {
  generateAuthToken,
  verifyToken,
  // validateRole,
};
