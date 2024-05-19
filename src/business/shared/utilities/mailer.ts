/* eslint-disable no-mixed-spaces-and-tabs */
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();
const { NODEMAILER_EMAIL, NODEMAILER_PASS } = process.env;

const sendOTPByEmail = async (email: string, otp: string) => {
  try {
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASS,
      },
    });

    const msg = `Dear user  OTP to reset your  login  is  ${otp}.Do not share this to any one`;

    const mailDetails = {
      from: NODEMAILER_EMAIL,
      to: email,
      subject: "OTP-Verification",
      text: msg,
    };

    const send = await mailTransporter.sendMail(mailDetails);
    if (send) console.log("Otp sent successfully", otp);
    else console.log("Error in sending otp");
  } catch (error) {
    console.error("Error sending OTP by email:", error);
    throw error;
  }
};

export default sendOTPByEmail;
