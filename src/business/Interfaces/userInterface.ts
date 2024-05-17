export default interface UserInterface {
  email: string;
  password: string;
  emailVerification: Boolean;
  createdAt?: Date;
  otp?:string;
  otpCreatedAt?:Date;
}
