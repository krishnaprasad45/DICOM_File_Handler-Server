import formatDate from "./formatedDate";
import removeCarat from "./removeCarat";

const { PDFDocument, rgb } = require('pdf-lib');

export async function createPDF(dataSet: { string: (arg0: string) => string; }) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    const fontSize = 12;
    let yPosition = height - fontSize * 2;

    function drawText(page: { drawText: (arg0: string, arg1: { x: number; y: number; size: number; color: any; }) => void; }, label: string, value: string) {
        if (yPosition < fontSize * 2) {
            yPosition = height - fontSize * 2;
            page = pdfDoc.addPage([600, 800]);
        }
        page.drawText(`${label}: ${value}`, {
            x: 50,
            y: yPosition,
            size: fontSize,
            color: rgb(0, 0, 0),
        });
        yPosition -= fontSize * 1.5;
    }

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

    drawText(page, 'Patient Name', formattedPatientName);
    drawText(page, 'Patient ID', patientID);
    drawText(page, 'Patient DOB', formattedPatientDOB);
    drawText(page, 'Patient Gender', patientGender);
    drawText(page, 'Study ID', studyID);
    drawText(page, 'Study Description', studyDescription);
    drawText(page, 'Study Date', formattedStudyDate);
    drawText(page, 'Modality', modality);
    drawText(page, 'Pixel Spacing', pixelSpacing);
    drawText(page, 'Image Type', imageType);
    drawText(page, 'Docim Type', docimType);
    drawText(page, 'Instance UID', instanceUID);
    drawText(page, 'Accession Number', accessionNumber);
    drawText(page, 'Doctor Name', doctorName);
    drawText(page, 'Physician', physician);
    drawText(page, 'Study Reason', studyReason);
    drawText(page, 'Study Institution', studyInstitution);
    drawText(page, 'Reviewed Institution', reviewedInstitution);
    drawText(page, 'Institution Location', institutionLocation);
    drawText(page, 'Body Part', bodyPart);
    drawText(page, 'Acquisition Technique', acquisitionTechnique);
    drawText(page, 'Image Procedure', imgProcedure);

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
