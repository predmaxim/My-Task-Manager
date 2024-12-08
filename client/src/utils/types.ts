import { ROLES } from './constants';
import { PROJECT_STATUSES, TASK_PRIORITY, TASK_STATUSES } from 'src/utils/constants';
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
  created: Date,
  lastVisit: Date,
  avatarURL?: string,
  role?: string,
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
  isSubtask: false | {
    order: number
  },
  name: string,
  description?: string,
  created: Date,
  done?: Date,
  priority?: string,
  status?: TaskStatusType,
  lastStatus?: TaskStatusType,
  user: UserType,
  parentTask?: false | TaskType,
  project: ProjectType,
  due?: Date,
  inWork?: Date,
  files?: [FileType],
  comments?: CommentType[]
};

export type ProjectStatusType = keyof typeof PROJECT_STATUSES;

export type RoleType = keyof typeof ROLES;

export type TaskStatusType = keyof typeof TASK_STATUSES;

export type TaskPriorityType = {
  name: keyof typeof TASK_PRIORITY,
  color?: string,
};

export type FileType = {
  src: string
};

export type CommentType = {
  _id?: string,
  comment: string,
  author: UserType,
  task: TaskType,
  parent: boolean | CommentType
};

export type TasksFilteredByStatusType = {
  queue: TaskType[],
  development: TaskType[],
  done: TaskType[],
};