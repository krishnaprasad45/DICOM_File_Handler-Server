import express from "express";
import multer from 'multer';
import { uploadFile } from "../../../business/fileController";
import { userSignup } from "../../../adapters/controllers/userController";
import { verifyEmailWithOtp } from "../../../business/usecases/userUsecases/verifyEmailWithOtp";


const userRoute = express.Router();
const upload = multer();
userRoute.post("/signup", userSignup);
userRoute.post("/otp", verifyEmailWithOtp);
userRoute.post('/uploadfile', upload.single('file'), uploadFile);
// userRoute.get("/login", userLogin);

export default userRoute;