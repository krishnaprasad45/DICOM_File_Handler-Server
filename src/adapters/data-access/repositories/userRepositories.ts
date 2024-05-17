import userInterface from "../../../business/Interfaces/userInterface";
import userModel from "../models/userModel";

export async function findUserByEmail(email: string | undefined) {
  try {
    console.log("findUserByEmail");
    console.log("email..", email);
    const userData = await userModel.findOne({ email });
    console.log("userData..", userData);
    return userData;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
}

export async function saveUser(data: userInterface) {
  try {
    const user = new userModel({ ...data });
    const result = await user.save();
    console.log("user saved 4");
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function storeOtp(generatedOtp: string, email: string) {
  try {
    let user = await findUserByEmail(email);
    if (user !== null) {
      await userModel.updateOne(
        { email },
        {
          $set: {
            otp: generatedOtp,
            otpCreatedAt: new Date(),
          },
        }
      );
      console.log("otp stored..");
    } else {
      console.log("User not found.");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getOtp(email: string) {
  try {
    const user = await findUserByEmail(email);
    if (user) {
      const otp1 = await userModel
        .findOne({ email: email }, { otp: 1, _id: 0 })
        .exec();
      console.log("OTP retrieved from DB:", otp1);
      return otp1 ? otp1.otp : null;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving OTP from DB:", error);
    throw error;
  }
}
