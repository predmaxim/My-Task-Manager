import * as process from "node:process";

export const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
export const JWT_EXPIRES = process.env.JWT_EXPIRES || "15m";

export enum TASK_STATUSES {
  queue = "queue",
  development = "development",
  done = "done",
}
