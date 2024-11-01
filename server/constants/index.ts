import * as process from "node:process";

export const DOMAIN_NAME_PROD = process.env.DOMAIN_NAME_PROD || "mydomain.com";
export const DOMAIN_NAME_DEV = process.env.DOMAIN_NAME_DEV || "localhost";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_ACCESS_TOKEN_EXPIRES = process.env.JWT_ACCESS_TOKEN_EXPIRES || "15m";
export const JWT_REFRESH_TOKEN_EXPIRES = process.env.JWT_REFRESH_TOKEN_EXPIRES || "30d";
export const TOKEN_COOKIE_NAME = process.env.TOKEN_COOKIE_NAME || "mtm_token";
export enum TASK_STATUSES {
  queue = "queue",
  development = "development",
  done = "done",
}
