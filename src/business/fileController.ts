import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import dicomParser from "dicom-parser";

const upload = multer({ dest: "uploads/" }); // Configure upload directory

export const uploadFile = (req: Request, res: Response) => {
  try {
    const currentFile = req.file;
    console.log("Uploaded file:", currentFile); // Access file information
    if (currentFile) {
      const dicomBuffer = currentFile.buffer;

      // Parse the DICOM file
      const dataSet = dicomParser.parseDicom(dicomBuffer);

      // Extract specific data elements
      const patientName = dataSet.string("x00100010");
      const studyDate = dataSet.string("x00080020");
      const studyDescription = dataSet.string("x00081030");

      // Print extracted data
      console.log("Patient Name:", patientName);
      console.log("Study Date:", studyDate);
      console.log("Study Description:", studyDescription);
      console.log("........................");
      const elements = dataSet.elements;

      // Iterate over each element
      for (const tag in elements) {
        // Access the element using the tag
        const element = elements[tag];

        // Get the value of the element
        const value = dataSet.string(tag);

        // Print tag and value
        console.log(`${tag}: ${value}`);
      }
    } else {
      console.error("No file uploaded"); // Log an error if no file is uploaded
    }
    res.send("File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file");
  }
};
