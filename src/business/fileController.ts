// controllers/uploadController.js
import { Request, Response } from "express";
import multer from "multer";
import dicomParser from "dicom-parser";
import formatDate from "../frameworks/Utilities/helperFunction/formatedDate";
import removeCarat from "../frameworks/Utilities/helperFunction/removeCarat";
import { saveMedicalDocument } from "../adapters/data-access/repositories/documentRepository";
import MedicalDocumenInterface from './Interfaces/dicomInterface';
import { getUserIdByEmail } from "../adapters/data-access/repositories/userRepositories";
import { createPDF } from "../frameworks/Utilities/helperFunction/createPDF";

const upload = multer({ dest: "uploads/" }); // Configure upload directory

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const currentFile = req.file;
    const userEmail = req.body.userEmail;
    const userId = await getUserIdByEmail(userEmail) 
    console.log("userId", userId)
    if (currentFile) {
      const dicomBuffer = currentFile.buffer;
      // Parse the DICOM file
      const dataSet = dicomParser.parseDicom(dicomBuffer);
      // Extract specific data elements
      const patientName = dataSet.string("x00100010") || "--";
      const formattedPatientName = patientName !== "--" ? removeCarat(patientName) : "--";
      const patientID = dataSet.string("x00100020") || "--";
      const patientDOB = dataSet.string("x00100030") || "--";
      const formattedPatientDOB = patientDOB !== "--" ? formatDate(patientDOB) : "--";
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

      const documentData: MedicalDocumenInterface = {
        userId,
        patientName: formattedPatientName,
        patientID,
        patientDOB: formattedPatientDOB,
        patientGender,
        studyID,
        studyDescription,
        studyDate: formattedStudyDate,
        modality,
        pixelSpacing,
        imageType,
        docimType,
        instanceUID,
        accessionNumber,
        doctorName,
        physician,
        studyReason,
        studyInstitution,
        reviewedInstitution,
        institutionLocation,
        bodyPart,
        acquisitionTechnique,
        imgProcedure,
      };

      await saveMedicalDocument(documentData);
      const pdfBytes = await createPDF(dataSet);
      console.log("PDF>>", pdfBytes)
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');
      res.send(Buffer.from(pdfBytes));

    } else {
      console.error("No file uploaded"); // Log an error if no file is uploaded
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file");
  }
};


