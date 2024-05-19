import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../frameworks/database/mongo';
import userRoute from '../frameworks/express/routes/userRoutes';
import loggingMiddleware from '../frameworks/express/middleware/loggingMiddleware';
import { errorHandler } from '../frameworks/express/middleware/errorHandler';
import { validateRequest } from '../frameworks/express/middleware/jwtTokenAuth';

// Load environment variables early
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Middleware
app.use(express.json()); // Parse JSON bodies
// Use the logging middleware
app.use(loggingMiddleware);

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

app.use(validateRequest);
// Routes
app.use("/", userRoute);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
