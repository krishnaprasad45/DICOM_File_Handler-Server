"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    decryptdata: function (data) {
        try {
            var secretKey = process.env.JWT_SECRETKEY || "";
            var decodedToken = jsonwebtoken_1.default.verify(data, secretKey);
            return decodedToken;
        }
        catch (error) {
            console.error("Error decrypting data:", error);
            throw new Error(error.message);
        }
    }
};
