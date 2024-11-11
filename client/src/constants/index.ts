export const SERVER_URL = 'http://localhost';
export const SERVER_PORT = '5000';
export const BASE_URL = `${SERVER_URL}:${SERVER_PORT}`;
export const API_URL = `${BASE_URL}/api`;
export const BASE_PROJECT_URL = '/project';
export const APP_NAME = 'MyTaskManager';
export const TEMP_USER = '651bf0065fb59a873e3adc4d';

export const TASK_STATUSES = {
  queue: 'queue',
  development: 'development',
  done: 'done',
} as const;

export const TASK_PRIORITY = {
  low: 'low',
  normal: 'normal',
  high: 'high',
  critical: 'critical',
} as const;

export const PROJECT_STATUSES = {
  active: 'active',
  inactive: 'inactive',
} as const;

export const ROLES = {
  admin: 'admin',
  user: 'user',
} as const;
