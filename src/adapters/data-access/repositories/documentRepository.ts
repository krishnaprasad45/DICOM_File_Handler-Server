import { Types } from "mongoose";
import MedicalDocumenInterface from "../../../business/Interfaces/dicomInterface";
import MedicalDocument from "../models/dicomModel";

export const saveMedicalDocument = async (documentData: MedicalDocumenInterface) => {
  try {
    const newMedicalDocument = new MedicalDocument(documentData);
    await newMedicalDocument.save();
  } catch (error) {
    console.error("Error saving medical document:", error);
    throw error;
  }
};

export const getRecordsFromDB = async (userId: Types.ObjectId) => {
  try {
    const userIdStr = userId.toString();
    const records = await MedicalDocument.find({ userId: userIdStr });
    return records ? records : null;
  } catch (error) {
    console.error("Error fetching records from database:", error);
    throw error;
  }
};
