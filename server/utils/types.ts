import { ROLES } from './constants';
import { PROJECT_STATUSES, TASK_PRIORITY, TASK_STATUSES } from './constants';

export type ThemeType = 'dark' | 'light';
export type LanguageType = 'ru' | 'en';

export type GlobalStateType = {
  theme: ThemeType,
  language: LanguageType,
};

export type UserType = {
  _id?: string,
  name: string,
  email: string,
  password: string,
  role: RoleType,
  created: Date,
  lastVisit: Date,
  avatarURL?: string,
  projects?: ProjectType[]
};

export type ProjectType = {
  _id?: string,
  name: string,
  status: ProjectStatusType,
  created: Date,
  user?: UserType,
  icon?: string,
  color?: string,
  tasks?: TaskType[],
};

export type TaskType = {
  _id?: string,
  number: number,
  name: string,
  user: UserType,
  project: string,
  created: Date,
  description?: string,
  done?: Date,
  priority?: TaskPriorityType,
  status?: TaskStatusType,
  lastStatus?: TaskStatusType,
  parent?: string,
  due?: Date,
  inWork?: Date,
  files?: FileType[],
  comments?: CommentType[]
};

export type ProjectStatusType = keyof typeof PROJECT_STATUSES;

export type RoleType = keyof typeof ROLES;

export type TaskStatusType = keyof typeof TASK_STATUSES;

export type TaskPriorityType = {
  name: keyof typeof TASK_PRIORITY,
  color?: string,
};

export type FileType = string;

export type CommentType = {
  _id?: string,
  comment: string,
  author: UserType,
  task: string,
  parent?: string
};

export type TasksFilteredByStatusType = {
  queue: TaskType[],
  development: TaskType[],
  done: TaskType[],
};