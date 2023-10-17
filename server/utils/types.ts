import { PROJECT_STATUSES, ROLES, TASK_PRIORITY, TASK_STATUSES } from './constants';

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
  projects?: ProjectType['_id'][]
};

export type ProjectType = {
  _id?: string,
  name: string,
  status: ProjectStatusType,
  created: Date,
  user: UserType['_id'],
  current?: boolean,
  icon?: string,
  color?: string,
  tasks?: TaskType[],
};

export type TaskType = {
  _id?: string,
  number: number,
  name: string,
  created: Date,
  user: UserType['_id'],
  project: ProjectType['name']
  status: TaskStatusType,
  lastStatus: TaskStatusType,
  description?: string,
  done?: false | Date,
  priority: TaskPriorityType['name'],
  parent?: string,
  due?: false | Date,
  inWork?: false | Date,
  files?: FileType[],
  comments?: CommentType[],
  subTasks?: TaskType[]
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
  parent?: string
};
