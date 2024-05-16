"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
var multer_1 = __importDefault(require("multer"));
var dicom_parser_1 = __importDefault(require("dicom-parser"));
var formatedDate_1 = __importDefault(require("../frameworks/Utilities/helperFunction/formatedDate"));
var removeCarat_1 = __importDefault(require("../frameworks/Utilities/helperFunction/removeCarat"));
var upload = (0, multer_1.default)({ dest: "uploads/" }); // Configure upload directory
var uploadFile = function (req, res) {
    try {
        var currentFile = req.file;
        if (currentFile) {
            var dicomBuffer = currentFile.buffer;
            // Parse the DICOM file
            var dataSet = dicom_parser_1.default.parseDicom(dicomBuffer);
            // Extract specific data elements
            var patientName = dataSet.string("x00100010") || "--";
            var formatedPatientName = patientName !== "--" ? (0, removeCarat_1.default)(patientName) : "--";
            var patientID = dataSet.string("x00100020") || "--";
            var patientDOB = dataSet.string("x00100030") || "--";
            var formattedPatientDOB = patientDOB !== "--" ? (0, formatedDate_1.default)(patientDOB) : "--";
            var patientGender = dataSet.string("x00100040") || "--";
            var studyID = dataSet.string("x0020000d") || "--";
            var studyDescription = dataSet.string("x00081030") || "--";
            var studyDate = dataSet.string("x00080020") || "--";
            var formattedStudyDate = studyDate !== "--" ? (0, formatedDate_1.default)(studyDate) : "--";
            var modality = dataSet.string("x00080060") || "--";
            var pixelSpacing = dataSet.string("x00280030") || "--";
            var imageType = dataSet.string("x00080008") || "--";
            var docimType = dataSet.string("x00080016") || "--";
            var instanceUID = dataSet.string("x00080031") || "--";
            var accessionNumber = dataSet.string("x00080050") || "--";
            var doctorName = dataSet.string("x00080090") || "--";
            var physician = dataSet.string("x00080060") || "--";
            var studyReason = dataSet.string("x00080068") || "--";
            var studyInstitution = dataSet.string("x00080070") || "--";
            var reviewedInstitution = dataSet.string("x00080080") || "--";
            var institutionLocation = dataSet.string("x00080081") || "--";
            var bodyPart = dataSet.string("x00180015") || "--";
            var acquisitionTechnique = dataSet.string("x00180038") || "--";
            var imgProcedure = dataSet.string("x00321060") || "--";
            // const elements = dataSet.elements;
            // Iterate over each element
            // for (const tag in elements) {
            //   // Access the element using the tag
            //   const element = elements[tag];
            //   // Get the value of the element
            //   const value = dataSet.string(tag);
            //   // Print tag and value
            //   console.log(`${tag}: ${value}`);
            // }
        }
        else {
            console.error("No file uploaded"); // Log an error if no file is uploaded
        }
        res.send("File uploaded successfully!");
    }
    catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Error uploading file");
    }
};
exports.uploadFile = uploadFile;
