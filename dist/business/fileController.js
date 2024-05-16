"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
var multer_1 = __importDefault(require("multer"));
var dicom_parser_1 = __importDefault(require("dicom-parser"));
var upload = (0, multer_1.default)({ dest: "uploads/" }); // Configure upload directory
var uploadFile = function (req, res) {
    try {
        var currentFile = req.file;
        console.log("Uploaded file:", currentFile); // Access file information
        if (currentFile) {
            var dicomBuffer = currentFile.buffer;
            // Parse the DICOM file
            var dataSet = dicom_parser_1.default.parseDicom(dicomBuffer);
            // Extract specific data elements
            var patientName = dataSet.string("x00100010");
            var studyDate = dataSet.string("x00080020");
            var studyDescription = dataSet.string("x00081030");
            // Print extracted data
            console.log("Patient Name:", patientName);
            console.log("Study Date:", studyDate);
            console.log("Study Description:", studyDescription);
            console.log("........................");
            var elements = dataSet.elements;
            // Iterate over each element
            for (var tag in elements) {
                // Access the element using the tag
                var element = elements[tag];
                // Get the value of the element
                var value = dataSet.string(tag);
                // Print tag and value
                console.log("".concat(tag, ": ").concat(value));
            }
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
