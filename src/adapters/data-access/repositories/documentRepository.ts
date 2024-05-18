import { Types } from "mongoose";
import MedicalDocumenInterface from "../../../business/Interfaces/dicomInterface";
import MedicalDocument from "../models/dicomModel";


export const saveMedicalDocument = async (documentData: MedicalDocumenInterface) => {
  const newMedicalDocument = new MedicalDocument(documentData);
  await newMedicalDocument.save();
};
export const getRecordsFromDB = async (userId: Types.ObjectId) => {
  const userIdStr = userId.toString();
  const records = await MedicalDocument.find({ userId: userIdStr });

  return records ? records : null;
};
