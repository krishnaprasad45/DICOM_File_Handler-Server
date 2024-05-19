const generateOtp = (): string => {
    try {
        const otp = String(Math.floor(1000 + Math.random() * 9000));
        return otp;
    } catch (error) {
        console.error("Error generating OTP:", error);
        throw error;
    }
};

export default generateOtp;
