import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());


app.get("/projects", async (
    req: Request,
    res: Response
) => {
    res.send('⚡️ It works');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;