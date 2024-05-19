import { NextFunction, Request, Response } from "express";
import { createUser } from "../../business/usecases/userUsecases/createUser";
import { sentEmailWithOtp } from "../../business/usecases/userUsecases/sentEmailWithOtp";
import { loginUser } from "../../business/usecases/userUsecases/loginUser";
import userInterface from "../../business/Interfaces/userInterface";

export const userSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    }

    const result = await createUser({ email, password } as userInterface);
    await sentEmailWithOtp(email);
    res.status(201).json(result);
  } catch (error) {
    console.error('Signup error:', error);
    next(error);
  }
};


export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const { email, password } = req.body;
    const response = await loginUser(email, password);
    const { userData, token } = response;
    res.json({ userData, token });
  } catch (error) {
    next(error); 
  }
};
