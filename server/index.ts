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
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.huzyqov.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=AtlasApp`;

const app: Express = express();

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

// Routes
app.get("/", (req: Request, res: Response) => res.send('⚡️ App is work'));
app.use('/api/auth', authRoute);
app.use('/api/projects', projectRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/comments', commentRoute);

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