export type ThemeType = 'dark' | 'light';
export type LanguageType = 'ru' | 'en';

export type GlobalStateType = {
  theme: ThemeType,
  language: LanguageType,
}

export type UserType = {
  id: number,
  name: string,
  email: string,
  password: string,
  avatarURL: string,
  role: string,
  created: Date,
  lastVisit: Date,
  projectsID: number[]
}

export type ProjectType = {
  id: number,
  name: string,
  status: ProjectStatusType,
  created: Date,
  user: number,
  icon: string,
  color: string,
  tasks: number[],
}

export type TaskType = {
  id: number,
  subsequence: number,
  name: string,
  description: string,
  created: Date,
  done: number,
  priority: string,
  status: TaskStatusType,
  userID: number,
  parentTaskID: number,
  projectID: number,
  due: Date,
  inWork: Date,
  subtasksID: [],
  filesURL: [],
  commentID: number
}

export type TaskStatusType = {
  id: number,
  name: string,
  color: string,
}

export type ProjectStatusType = {
  id: number,
  name: string
}