import { PROJECT_STATUSES, ROLES, TASK_PRIORITY, TASK_STATUSES } from '@/constants';


export type ThemeType = 'dark' | 'light';
export type LanguageType = 'ru' | 'en';

export type GlobalStateType = {
  theme: ThemeType,
  language: LanguageType,
};

export type UserType = {
  id: string,
  name: string,
  email: string,
  password: string,
  role: RoleType,
  created: Date,
  lastVisit: Date,
  avatarURL?: string,
  projects?: ProjectType['id'][]
};

export type PartialUserType = Partial<Pick<UserType, 'id'>> & Omit<UserType, 'id'>;

export type ProjectType = {
  id: string,
  name: string,
  slug: string,
  status: ProjectStatusType,
  created: Date,
  tasks: TaskInProject,
  user?: UserType['id'],
  current?: boolean,
  icon?: string,
  color?: string,
};

export type PartialProjectType = Partial<Pick<ProjectType, 'id'>> & Omit<ProjectType, 'id'>;

export type TaskInProject = number;

export type TaskType = {
  id: string,
  number: number,
  name: string,
  created: Date,
  user: UserType['id'],
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

export type PartialTaskType = Partial<Pick<TaskType, 'id'>> & Omit<TaskType, 'id'>;

export type ProjectStatusType = keyof typeof PROJECT_STATUSES;
export type RoleType = keyof typeof ROLES;
export type TaskStatusType = keyof typeof TASK_STATUSES;

export type TaskPriorityType = {
  name: keyof typeof TASK_PRIORITY,
  color?: string,
};

export type FileType = string;

export type CommentType = {
  id: string,
  comment: string,
  author: UserType,
  parent?: string
};

export type PartialCommentType = Partial<Pick<CommentType, 'id'>> & Omit<CommentType, 'id'>;

export type TaskMenuActionType = {
  name: 'edit' | 'remove',
  action: () => void
};

export type TaskUpdateFieldsType =
  Pick<TaskType, 'id' | 'number' | 'project'>
  & Partial<Exclude<TaskType, 'id' | 'number' | 'project'>>


export type TokenType = {
  access_token: string,
  refresh_token: string,
}

export type AuthType = {
  user: UserType,
  token: TokenType
}

export type LoginType = {
  email: string,
  password: string
}

export type RegisterType = {
  name: string,
  email: string,
  password: string
}
