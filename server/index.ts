import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import projectRoute from './routes/projects-route';
import taskRoute from './routes/tasks-route';
import commentRoute from './routes/comments-route';
import authRoute from './routes/auth-route';
import taskStatuses from './routes/task-statuses-route';
import { authCheck } from '@/utils/auth-check';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: Express = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));
app.use(cookieParser());
app.use(authCheck);

// Routes
app.use(authRoute);
app.use(projectRoute);
app.use(taskRoute);
app.use(commentRoute);
app.use(taskStatuses);

const start = () => {
  try {
    app.listen(PORT, () =>
      console.log(`⚡️[server]: Server started on port: ${PORT}`),
    );
  } catch (error) {
    console.log('❌ [server]:', error);
  }
};

start();
