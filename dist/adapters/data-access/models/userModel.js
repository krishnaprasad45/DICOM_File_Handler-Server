"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    emailVerification: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    otpCreatedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
var User = mongoose_1.default.model("User", userSchema);
exports.default = User;
