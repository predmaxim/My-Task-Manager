import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import authRoute from './routes/auth';
import projectRoute from './routes/projects';
import taskRoute from './routes/tasks';
import commentRoute from './routes/comments';

dotenv.config();

const PORT = process.env.PORT || 5001;
const DB_URI = `mongodb://${process.env.DB_SERVICE_NAME}/${process.env.DB_NAME}:${process.env.DB_PORT}`;


const app: Express = express();

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

// Routes
app.use(authRoute);
app.use(projectRoute);
app.use(taskRoute);
app.use(commentRoute);

const start = async () => {
  try {
    await mongoose.connect(DB_URI);
    app.listen(PORT,
      () => console.log(`⚡️[server]: Server started on port: ${PORT}`)
    );
  } catch (error) {
    console.log(`❌ [server]: ${error}`);
  }
}

start();
