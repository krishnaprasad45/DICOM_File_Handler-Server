import { Request, Response } from "express";
import UserInterface from "../../business/Interfaces/userInterface";
import { createUser } from "../../business/usecases/userUsecases/createUser";
import { sentEmailWithOtp } from "../../business/usecases/userUsecases/sentEmailWithOtp";
import { loginUser } from "../../business/usecases/userUsecases/loginUser";

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userData = await createUser({
      email,
      password,
    } as UserInterface);
    const verification = await sentEmailWithOtp(email);
    res.status(201).json(userData);
  } catch (error) {
    console.error(error);
    res.json({ message: error as Error });
  }
};
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const response = await loginUser(email, password);
    const { userData, token } = response;
    res.json({ userData, token });
  } catch (error) {
    res.json(error as Error);
  }
};
