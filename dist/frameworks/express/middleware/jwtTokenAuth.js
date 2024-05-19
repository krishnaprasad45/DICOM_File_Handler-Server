"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.generateAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv = __importStar(require("dotenv"));
var decryption_1 = __importDefault(require("../../../business/shared/utilities/decryption"));
dotenv.config();
function generateAuthToken(existingUser) {
    var email = existingUser.email, password = existingUser.password;
    var jwtSecretKey = process.env.JWT_SECRETKEY || '';
    var token = jsonwebtoken_1.default.sign({ email: email, password: password }, jwtSecretKey);
    return token;
}
exports.generateAuthToken = generateAuthToken;
function validateRequest(req, res, next) {
    try {
        var requestedRoute = req.path;
        var publicRoutes = ["/login", "/signup", "/otp"];
        if (publicRoutes.includes(requestedRoute)) {
            return next();
        }
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log("Unauthorized: Missing Authorization Header");
            return res.status(401).json({ error: "Unauthorized: Missing Authorization Header" });
        }
        var token = authHeader.split(" ")[1];
        if (!token) {
            console.log("Unauthorized: Token not provided");
            return res.status(401).json({ error: "Unauthorized: Token not provided" });
        }
        var decodedToken = decryption_1.default.decryptdata(token);
        if (!decodedToken) {
            console.log("Unauthorized: Invalid Token");
            return res.status(401).json({ error: "Unauthorized: Invalid Token" });
        }
        req.token = decodedToken;
        next();
    }
    catch (error) {
        console.error("Error in validateRole middleware:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.validateRequest = validateRequest;
module.exports = {
    generateAuthToken: generateAuthToken,
    validateRequest: validateRequest,
};
