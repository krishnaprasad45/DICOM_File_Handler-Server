import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../frameworks/database/mongo';
import { uploadFile } from '../business/fileController';
import multer from 'multer';
const upload = multer();

const app = express();
const PORT = process.env.PORT ;
const HOST = process.env.HOST ;    

// Middleware
app.use(bodyParser.json());
app.use(cors());
const allowedOrigins = [HOST]; // Protected, Only allowed for HOST
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// Connect to Database
connectDB();

// Load environment variables
dotenv.config();

// Routes
app.post('/uploadfile', upload.single('file'), uploadFile);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

