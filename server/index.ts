import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import projectRoute from "./routes/projects";
import taskRoute from "./routes/tasks";
import commentRoute from "./routes/comments";
import authRoute from "./routes/auth";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: Express = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));
// app.use(authCheck);

// Routes
app.use(authRoute);
app.use(projectRoute);
app.use(taskRoute);
app.use(commentRoute);

const start = () => {
  try {
    app.listen(PORT, () =>
      console.log(`⚡️[server]: Server started on port: ${PORT}`),
    );
  } catch (error) {
    console.log("❌ [server]:", error);
  }
};

start();
