import express from "express";
import multer from 'multer';
import { uploadFile } from "../../../business/fileController";
import { userLogin, userSignup } from "../../../adapters/controllers/userController";
import { verifyEmailWithOtp } from "../../../business/usecases/userUsecases/verifyEmailWithOtp";
import { getRecords } from "../../../business/usecases/fileUsecases/getRecords";


const userRoute = express.Router();
const upload = multer();
userRoute.post("/signup", userSignup);
userRoute.post("/login", userLogin);
userRoute.post("/otp", verifyEmailWithOtp);
userRoute.get("/get/records", getRecords);
userRoute.post('/uploadfile', upload.single('file'), uploadFile);


export default userRoute;