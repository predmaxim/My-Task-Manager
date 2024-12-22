import * as process from "node:process";

export const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
export const JWT_ACCESS_TOKEN_EXPIRES = process.env.JWT_ACCESS_TOKEN_EXPIRES || "15m";
export const JWT_REFRESH_TOKEN_EXPIRES = process.env.JWT_REFRESH_TOKEN_EXPIRES || "30d";

export enum TASK_STATUSES {
  queue = "queue",
  development = "development",
  done = "done",
}
