import * as process from 'node:process';

export const SERVER_URL = process.env.SERVER_URL || 'http://localhost';
export const SERVER_PORT = process.env.SERVER_PORT || '5000';
export const BASE_URL = `${SERVER_URL}:${SERVER_PORT}`;

export const TASK_STATUSES = {
  queue: 'queue',
  development: 'development',
  done: 'done'
};

export const TASK_PRIORITY = {
  low: 'low',
  normal: 'normal',
  high: 'high'
} as const;

export const ROLES = {
  admin: 'admin',
  user: 'user'
} as const;
