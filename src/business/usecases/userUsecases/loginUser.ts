import { findUserByEmail } from "../../../adapters/data-access/repositories/userRepositories";
import { matchPassword } from "../../../adapters/external-services/bcrypt";
import { generateAuthToken } from "../../../frameworks/express/middleware/jwtTokenAuth";

export async function loginUser(email: string, password: string) {
    const existingUser:any= await findUserByEmail(email);
    console.log("existing user data",existingUser)
    if (existingUser) {
      const isMatch = await matchPassword(password, existingUser.password);
      console.log("ismatch",isMatch)
      if (isMatch) {
        const token =  generateAuthToken(existingUser);
        console.log(token,"token..")
        return { userData: existingUser, token };
      } else {
        throw new Error("Password Not Match");
      }
    } else {
      throw new Error("User not found");
    }
  }