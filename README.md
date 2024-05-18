# <span style="color:#007bff;">DICOM File Handling App 🌟</span>

## <span style="color:#28a745;">Description</span>
Web application built with MERN technology. This app lets people upload DICOM files, which are used for medical images. Once uploaded, the app extracts important information from these files, like patient details and imaging parameters, and saves them in a database. Users can then easily retrieve and view this saved information whenever they need it. It's like a digital filing cabinet for medical images, making it simple for healthcare professionals to manage and access important data.
### <span style="color:#ffc107;">Instructions to Run the App</span>
1. Frontend and Backend in the differect repository (links are provided).
2. Clone the repository SERVER - git clone https://github.com/krishnaprasad45/DICOM_File_Handler-Server.git
3. Install dependencies using `npm install`
4. Start the development server using `npm start`.
5. Note: secret values are protected in .env file, it's not accessible for you, create your own .env and run the project.

### <span style="color:#dc3545;">Authentication</span>
The app uses JWT authentication for secure access to protected endpoints.

### <span style="color:#17a2b8;"> Server developement tools,libraries and technologies used</span>
1. Clean Architecture
2. Node.js and express.js
3. MongoDB and mongoose (Database and Schema modeling)
4. TypeScript
5. JWT (Authenticate users and securely transmit data between the client and server)
6. dicom-parser (Library used to extract metadata from DICOM files)
7. Multer (Helper for handling file upload)
8. Nodemailer (Sent OTP through email)
9. bcrypt (To hash passwords)
10. CORS (To securely communicate with resources from other domain)
11. ESLint (To maintain consistent coding standards and identifies potential errors)

### <span style="color:#28a745;">How DICOM metadata extraction and storage are implemented</span>
First, when a user uploads a DICOM file, the application uses dicom-parser to read the file and extract important information like patient details, imaging parameters, and other metadata. This extracted metadata is then structured and stored in a database, using a Mongoose schema for MongoDB.
The DICOM metadata stored in the database can then be accessed and retrieved whenever needed, allowing users to view or analyze the information associated with each DICOM file they've uploaded. professionals and researchers.

[![Thumbnail](https://drive.google.com/uc?export=view&id=1yhOjVh1TkN3pu1f5-N6OXXJlqBXKAVtG)](https://drive.google.com/file/d/1ATUjrt2762PaMdyxfLyz6zc1XfcNVztJ/view?usp=drive_link)



