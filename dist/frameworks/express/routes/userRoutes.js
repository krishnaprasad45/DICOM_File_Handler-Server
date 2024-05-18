"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var fileController_1 = require("../../../business/fileController");
var userController_1 = require("../../../adapters/controllers/userController");
var verifyEmailWithOtp_1 = require("../../../business/usecases/userUsecases/verifyEmailWithOtp");
var getRecords_1 = require("../../../business/usecases/fileUsecases/getRecords");
var userRoute = express_1.default.Router();
var upload = (0, multer_1.default)();
userRoute.post("/signup", userController_1.userSignup);
userRoute.post("/login", userController_1.userLogin);
userRoute.post("/otp", verifyEmailWithOtp_1.verifyEmailWithOtp);
userRoute.get("/get/records", getRecords_1.getRecords);
userRoute.post('/uploadfile', upload.single('file'), fileController_1.uploadFile);
exports.default = userRoute;
