import MedicalDocumenInterface from "../../../business/Interfaces/dicomInterface";
import MedicalDocument from "../models/dicomModel";


export const saveMedicalDocument = async (documentData:MedicalDocumenInterface) => {
  const newMedicalDocument = new MedicalDocument(documentData);
  await newMedicalDocument.save();
  console.log('Medical document saved successfully');
};
