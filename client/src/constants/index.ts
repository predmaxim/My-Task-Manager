export const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost';
export const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || '5000';
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

export const STATUS_COLOR_KEYS = [
  'coral',
  'amber',
  'lime',
  'mint',
  'sky',
  'blue',
  'violet',
  'rose',
] as const;

export type StatusColorKeyType = (typeof STATUS_COLOR_KEYS)[number];
