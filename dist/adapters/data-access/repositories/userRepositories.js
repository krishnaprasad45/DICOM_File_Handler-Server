"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOtp = exports.storeOtp = exports.saveUser = exports.getUserIdByEmail = exports.findUserByEmail = void 0;
var userModel_1 = __importDefault(require("../models/userModel"));
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var userData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("findUserByEmail");
                    console.log("email..", email);
                    return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
                case 1:
                    userData = _a.sent();
                    console.log("userData..", userData);
                    return [2 /*return*/, userData];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error finding user by email:", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findUserByEmail = findUserByEmail;
function getUserIdByEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("getUserIdByEmail");
                    console.log("email..", email);
                    if (!email) {
                        throw new Error("Email is undefined");
                    }
                    return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    console.log("user..", user);
                    if (user) {
                        return [2 /*return*/, user._id];
                    }
                    else {
                        throw new Error("User not found");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error getting user ID by email:", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserIdByEmail = getUserIdByEmail;
function saveUser(data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = new userModel_1.default(__assign({}, data));
                    return [4 /*yield*/, user.save()];
                case 1:
                    result = _a.sent();
                    console.log("user saved 4");
                    return [2 /*return*/, result];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.saveUser = saveUser;
function storeOtp(generatedOtp, email) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_4;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, findUserByEmail(email)];
                case 1:
                    user = _a.sent();
                    if (!(user !== null)) return [3 /*break*/, 3];
                    return [4 /*yield*/, userModel_1.default.updateOne({ email: email }, {
                            $set: {
                                otp: generatedOtp,
                                otpCreatedAt: new Date(),
                            },
                        })];
                case 2:
                    _a.sent();
                    // Schedule deletion after 5 minutes
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, userModel_1.default.updateOne({ email: email }, {
                                        $unset: {
                                            otp: "",
                                            otpCreatedAt: "",
                                        },
                                    })];
                                case 1:
                                    _a.sent();
                                    console.log("otp and createdAt fields deleted after 5 minutes.");
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 5 * 60 * 1000); // 5 minutes in milliseconds
                    console.log("otp stored..");
                    return [3 /*break*/, 4];
                case 3:
                    console.log("User not found.");
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.storeOtp = storeOtp;
function getOtp(email) {
    return __awaiter(this, void 0, void 0, function () {
        var user, otp1, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, findUserByEmail(email)];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 3];
                    return [4 /*yield*/, userModel_1.default
                            .findOne({ email: email }, { otp: 1, _id: 0 })
                            .exec()];
                case 2:
                    otp1 = _a.sent();
                    console.log("OTP retrieved from DB:", otp1);
                    return [2 /*return*/, otp1 ? otp1.otp : null];
                case 3:
                    console.log("User not found");
                    return [2 /*return*/, null];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_5 = _a.sent();
                    console.error("Error retrieving OTP from DB:", error_5);
                    throw error_5;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getOtp = getOtp;
