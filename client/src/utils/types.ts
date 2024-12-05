export type ThemeType = 'dark' | 'light';
export type LanguageType = 'ru' | 'en';

export type GlobalStateType = {
  theme: ThemeType,
  language: LanguageType,
}

export type UserType = {
  _id: string,
  name: string,
  email: string,
  password: string,
  created: Date,
  lastVisit: Date,
  avatarURL?: string,
  role?: string,
  projects?: ProjectType[]
}

export type ProjectType = {
  _id: string,
  name: string,
  status: ProjectStatusType,
  created: Date,
  user: UserType,
  icon?: string,
  color?: string,
  tasks?: TaskType[],
}

export type TaskType = {
  _id: string,
  isSubtask: false | {
    order: number
  },
  name: string,
  description?: string,
  created: Date,
  done?: boolean | Date,
  priority?: string,
  status?: TaskStatusType,
  user: UserType,
  parentTask?: false | TaskType,
  project: ProjectType,
  due?: Date,
  inWork?: Date,
  files?: [FileType],
  comments?: CommentType[]
}

export type TaskStatusType = {
  _id: string,
  name: string,
  color?: string,
}

export type FileType = {
  src: string
}

export type ProjectStatusType = {
  _id: string,
  name: 'Active' | 'Inactive'
}

export type CommentType = {
  _id: string,
  comment: string,
  author: UserType,
  task: TaskType,
  parent: boolean | CommentType
}

export type RoleType = {
  _id: string,
  title: string,
  users?: UserType[],
}