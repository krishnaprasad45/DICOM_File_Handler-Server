import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import dicomParser from "dicom-parser";
import formatDate from "../frameworks/Utilities/helperFunction/formatedDate";
import removeCarat from "../frameworks/Utilities/helperFunction/removeCarat";

const upload = multer({ dest: "uploads/" }); // Configure upload directory

export const uploadFile = (req: Request, res: Response) => {
  try {
    console.log(1)
    const currentFile = req.file;
    if (currentFile) {
      const dicomBuffer = currentFile.buffer;

      // Parse the DICOM file
      const dataSet = dicomParser.parseDicom(dicomBuffer);

      // Extract specific data elements
      const patientName = dataSet.string("x00100010") || "--";
      const formatedPatientName = patientName !== "--" ? removeCarat(patientName) : "--";
      const patientID = dataSet.string("x00100020") || "--";
      const patientDOB = dataSet.string("x00100030") || "--";
      const formattedPatientDOB =patientDOB !== "--" ? formatDate(patientDOB) : "--";
      const patientGender = dataSet.string("x00100040") || "--";
      const studyID = dataSet.string("x0020000d") || "--";
      const studyDescription = dataSet.string("x00081030") || "--";
      const studyDate = dataSet.string("x00080020") || "--";
      const formattedStudyDate = studyDate !== "--" ? formatDate(studyDate) : "--";
      const modality = dataSet.string("x00080060") || "--";
      const pixelSpacing = dataSet.string("x00280030") || "--";
      const imageType = dataSet.string("x00080008") || "--";
      const docimType = dataSet.string("x00080016") || "--";
      const instanceUID = dataSet.string("x00080031") || "--";
      const accessionNumber = dataSet.string("x00080050") || "--";
      const doctorName = dataSet.string("x00080090") || "--";
      const physician = dataSet.string("x00080060") || "--";
      const studyReason = dataSet.string("x00080068") || "--";
      const studyInstitution = dataSet.string("x00080070") || "--";
      const reviewedInstitution = dataSet.string("x00080080") || "--";
      const institutionLocation = dataSet.string("x00080081") || "--";
      const bodyPart = dataSet.string("x00180015") || "--";
      const acquisitionTechnique = dataSet.string("x00180038") || "--";
      const imgProcedure = dataSet.string("x00321060") || "--";

    console.log(patientName)

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
    } else {
      console.error("No file uploaded"); // Log an error if no file is uploaded
    }
    res.send("File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file");
  }
};
