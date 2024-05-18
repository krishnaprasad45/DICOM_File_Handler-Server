"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var medicalDocumentSchema = new mongoose_1.default.Schema({
    userId: {
        type: String
    },
    patientName: {
        type: String,
        default: "--",
    },
    patientID: {
        type: String,
        default: "--",
    },
    patientDOB: {
        type: String,
        default: "--",
    },
    patientGender: {
        type: String,
        default: "--",
    },
    studyID: {
        type: String,
        default: "--",
    },
    studyDescription: {
        type: String,
        default: "--",
    },
    studyDate: {
        type: String,
        default: "--",
    },
    StudyDate: {
        type: String,
        default: "--",
    },
    modality: {
        type: String,
        default: "--",
    },
    pixelSpacing: {
        type: String,
        default: "--",
    },
    imageType: {
        type: String,
        default: "--",
    },
    docimType: {
        type: String,
        default: "--",
    },
    instanceUID: {
        type: String,
        default: "--",
    },
    accessionNumber: {
        type: String,
        default: "--",
    },
    doctorName: {
        type: String,
        default: "--",
    },
    physician: {
        type: String,
        default: "--",
    },
    studyReason: {
        type: String,
        default: "--",
    },
    studyInstitution: {
        type: String,
        default: "--",
    },
    reviewedInstitution: {
        type: String,
        default: "--",
    },
    institutionLocation: {
        type: String,
        default: "--",
    },
    bodyPart: {
        type: String,
        default: "--",
    },
    acquisitionTechnique: {
        type: String,
        default: "--",
    },
    imgProcedure: {
        type: String,
        default: "--",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
var MedicalDocument = mongoose_1.default.model("MedicalDocument", medicalDocumentSchema);
exports.default = MedicalDocument;
