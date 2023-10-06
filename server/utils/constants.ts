export const BASE_URL = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`;

export const TASK_STATUSES = {
  queue: 'queue',
  development: 'development',
  done: 'done'
};

export const TASK_PRIORITY = {
  low: 'low',
  normal: 'normal',
  high: 'high'
};

export const PROJECT_STATUSES = {
  active: 'active',
  inactive: 'inactive'
};

export const ROLES = {
  admin: 'admin',
  user: 'user'
};
