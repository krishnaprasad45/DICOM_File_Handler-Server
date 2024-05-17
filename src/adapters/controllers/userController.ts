import { Request, Response } from "express";
import UserInterface from "../../business/Interfaces/userInterface";
import { createUser } from "../../business/usecases/userUsecases/createUser";
import { sentEmailWithOtp } from "../../business/usecases/userUsecases/sentEmailWithOtp";

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userData = await createUser({
      email,
      password,
    } as UserInterface);
    const verification = await sentEmailWithOtp(email)
    console.log(7, verification);
    res.status(201).json(userData);
  } catch (error) {
    console.error(error);
    res.json({ message: error as Error });
  }
};
