"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateOtp = function () {
    try {
        var otp = String(Math.floor(1000 + Math.random() * 9000));
        return otp;
    }
    catch (error) {
        console.error("Error generating OTP:", error);
        throw error;
    }
};
exports.default = generateOtp;
