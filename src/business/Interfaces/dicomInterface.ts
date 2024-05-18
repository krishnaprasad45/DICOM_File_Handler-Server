 export default interface MedicalDocument {
    userId : string | null ;
    patientName: string;
    patientID: string;
    patientDOB: string;
    patientGender: string;
    studyID: string;
    studyDescription: string;
    studyDate: string;
    StudyDate: string;
    modality: string;
    pixelSpacing: string;
    imageType: string;
    docimType: string;
    instanceUID: string;
    accessionNumber: string;
    doctorName: string;
    physician: string;
    studyReason: string;
    studyInstitution: string;
    reviewedInstitution: string;
    institutionLocation: string;
    bodyPart: string;
    acquisitionTechnique: string;
    imgProcedure: string;
    createdAt?: Date;
  }
  
  
  