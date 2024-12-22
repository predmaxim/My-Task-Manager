import {PROJECT_STATUSES, ROLES, TASK_PRIORITY, TASK_STATUSES} from '@/constants';


export type ThemeType = 'dark' | 'light';
export type LanguageType = 'ru' | 'en';

export type GlobalStateType = {
  theme: ThemeType,
  language: LanguageType,
};

export type UserType = {
  _id: string,
  name: string,
  email: string,
  password: string,
  role: RoleType,
  created: Date,
  lastVisit: Date,
  avatarURL?: string,
  projects?: ProjectType['_id'][]
};

export type PartialUserType = Partial<Pick<UserType, '_id'>> & Omit<UserType, '_id'>;

export type ProjectType = {
  _id: string,
  name: string,
  slug: string,
  status: ProjectStatusType,
  created: Date,
  tasks: TaskInProject,
  user?: UserType['_id'],
  current?: boolean,
  icon?: string,
  color?: string,
};

export type PartialProjectType = Partial<Pick<ProjectType, '_id'>> & Omit<ProjectType, '_id'>;

export type TaskInProject = number;

export type TaskType = {
  _id: string,
  number: number,
  name: string,
  created: Date,
  user: UserType['_id'],
  project: ProjectType['name']
  status: TaskStatusType,
  index: number,
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

export type PartialTaskType = Partial<Pick<TaskType, '_id'>> & Omit<TaskType, '_id'>;

export type ProjectStatusType = keyof typeof PROJECT_STATUSES;
export type RoleType = keyof typeof ROLES;
export type TaskStatusType = keyof typeof TASK_STATUSES;

export type TaskPriorityType = {
  name: keyof typeof TASK_PRIORITY,
  color?: string,
};

export type FileType = string;

export type CommentType = {
  _id: string,
  comment: string,
  author: UserType,
  parent?: string
};

export type PartialCommentType = Partial<Pick<CommentType, '_id'>> & Omit<CommentType, '_id'>;

export type TaskMenuActionType = {
  name: 'edit' | 'remove',
  action: () => void
};

export type TaskUpdateFieldsType =
  Pick<TaskType, '_id' | 'number' | 'project'>
  & Partial<Exclude<TaskType, '_id' | 'number' | 'project'>>


export type TokenType = {
  access_token: string,
  refresh_token: string,
}
