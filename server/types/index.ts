import {ROLES, TASK_PRIORITY, TASK_STATUSES} from '../constants';

export type ThemeType = 'dark' | 'light';
export type LanguageType = 'ru' | 'en';

export type GlobalStateType = {
  theme: ThemeType,
  language: LanguageType,
};

export type UserType = {
  id: number,
  name: string,
  email: string,
  password: string,
  role: RoleType,
  created: Date,
  avatar?: string,
  projects?: ProjectType['id'][]
};

export type ProjectType = {
  id: number,
  name: string,
  created: Date,
  tasks: TaskType[],
  user?: UserType['id'],
  icon?: string,
  color?: string,
};

export type TaskType = {
  id: number,
  name: string,
  description?: string,
  created: Date,
  done?: boolean,
  priority: TaskPriorityType,
  status: TaskStatusType,
  parent?: TaskType['id'],
  project: ProjectType['id'],
  index: number,
  due?: Date,
  inWork?: Date,
  files?: FileType[],
  comments?: CommentType[],
  children?: TaskType[]
};

export type RoleType = {
  id: number,
  name: keyof typeof ROLES,
};

export type TaskStatusType = {
  id: number,
  name: keyof typeof TASK_STATUSES,
  color?: string,
};

export type TaskPriorityType = {
  id: number,
  name: keyof typeof TASK_PRIORITY,
  color?: string,
};

export type FileType = {
  id: number,
  src: string,
  task: TaskType['id'],
  created: Date,
};

export type CommentType = {
  id: number,
  content: string,
  parent?: CommentType['id'],
  task: TaskType['id'],
  created: Date,
  children?: CommentType[],
};
