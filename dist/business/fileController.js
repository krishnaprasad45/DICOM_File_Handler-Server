"use strict";
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
exports.uploadFile = void 0;
var multer_1 = __importDefault(require("multer"));
var dicom_parser_1 = __importDefault(require("dicom-parser"));
var formatedDate_1 = __importDefault(require("../frameworks/Utilities/helperFunction/formatedDate"));
var removeCarat_1 = __importDefault(require("../frameworks/Utilities/helperFunction/removeCarat"));
var documentRepository_1 = require("../adapters/data-access/repositories/documentRepository");
var userRepositories_1 = require("../adapters/data-access/repositories/userRepositories");
var createPDF_1 = require("../frameworks/Utilities/helperFunction/createPDF");
var upload = (0, multer_1.default)({ dest: "uploads/" }); // Configure upload directory
var uploadFile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentFile, userEmail, userId, dicomBuffer, dataSet, patientName, formattedPatientName, patientID, patientDOB, formattedPatientDOB, patientGender, studyID, studyDescription, studyDate, formattedStudyDate, modality, pixelSpacing, imageType, docimType, instanceUID, accessionNumber, doctorName, physician, studyReason, studyInstitution, reviewedInstitution, institutionLocation, bodyPart, acquisitionTechnique, imgProcedure, documentData, pdfBytes, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                currentFile = req.file;
                userEmail = req.body.userEmail;
                return [4 /*yield*/, (0, userRepositories_1.getUserIdByEmail)(userEmail)];
            case 1:
                userId = _a.sent();
                console.log("userId", userId);
                if (!currentFile) return [3 /*break*/, 4];
                dicomBuffer = currentFile.buffer;
                dataSet = dicom_parser_1.default.parseDicom(dicomBuffer);
                patientName = dataSet.string("x00100010") || "--";
                formattedPatientName = patientName !== "--" ? (0, removeCarat_1.default)(patientName) : "--";
                patientID = dataSet.string("x00100020") || "--";
                patientDOB = dataSet.string("x00100030") || "--";
                formattedPatientDOB = patientDOB !== "--" ? (0, formatedDate_1.default)(patientDOB) : "--";
                patientGender = dataSet.string("x00100040") || "--";
                studyID = dataSet.string("x0020000d") || "--";
                studyDescription = dataSet.string("x00081030") || "--";
                studyDate = dataSet.string("x00080020") || "--";
                formattedStudyDate = studyDate !== "--" ? (0, formatedDate_1.default)(studyDate) : "--";
                modality = dataSet.string("x00080060") || "--";
                pixelSpacing = dataSet.string("x00280030") || "--";
                imageType = dataSet.string("x00080008") || "--";
                docimType = dataSet.string("x00080016") || "--";
                instanceUID = dataSet.string("x00080031") || "--";
                accessionNumber = dataSet.string("x00080050") || "--";
                doctorName = dataSet.string("x00080090") || "--";
                physician = dataSet.string("x00080060") || "--";
                studyReason = dataSet.string("x00080068") || "--";
                studyInstitution = dataSet.string("x00080070") || "--";
                reviewedInstitution = dataSet.string("x00080080") || "--";
                institutionLocation = dataSet.string("x00080081") || "--";
                bodyPart = dataSet.string("x00180015") || "--";
                acquisitionTechnique = dataSet.string("x00180038") || "--";
                imgProcedure = dataSet.string("x00321060") || "--";
                documentData = {
                    userId: userId,
                    patientName: formattedPatientName,
                    patientID: patientID,
                    patientDOB: formattedPatientDOB,
                    patientGender: patientGender,
                    studyID: studyID,
                    studyDescription: studyDescription,
                    studyDate: formattedStudyDate,
                    modality: modality,
                    pixelSpacing: pixelSpacing,
                    imageType: imageType,
                    docimType: docimType,
                    instanceUID: instanceUID,
                    accessionNumber: accessionNumber,
                    doctorName: doctorName,
                    physician: physician,
                    studyReason: studyReason,
                    studyInstitution: studyInstitution,
                    reviewedInstitution: reviewedInstitution,
                    institutionLocation: institutionLocation,
                    bodyPart: bodyPart,
                    acquisitionTechnique: acquisitionTechnique,
                    imgProcedure: imgProcedure,
                };
                return [4 /*yield*/, (0, documentRepository_1.saveMedicalDocument)(documentData)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, createPDF_1.createPDF)(dataSet)];
            case 3:
                pdfBytes = _a.sent();
                console.log("PDF>>", pdfBytes);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');
                res.send(Buffer.from(pdfBytes));
                return [3 /*break*/, 5];
            case 4:
                console.error("No file uploaded"); // Log an error if no file is uploaded
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error("Error uploading file:", error_1);
                res.status(500).send("Error uploading file");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.uploadFile = uploadFile;
