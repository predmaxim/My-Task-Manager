export type UserType = {
  _id: string,
  name: string,
  email: string,
  password: string,
  avatarURL: string,
  role: string,
  created: Date,
  lastVisit: Date,
  projects: ProjectType[]
}

export type ProjectType = {
  _id: string,
  name: string,
  status: ProjectStatusType,
  created: Date,
  user: UserType,
  icon: string,
  color: string,
  tasks: TaskType[],
}

export type TaskType = {
  _id: string,
  subsequence: number,
  name: string,
  description: string,
  created: Date,
  done: number,
  priority: string,
  status: TaskStatusType,
  user: UserType,
  parentTask: TaskType,
  project: ProjectType,
  due: Date,
  inWork: Date,
  subtasksId: [],
  filesURL: [],
  comments: CommentType[]
}

export type TaskStatusType = {
  _id: string,
  name: string,
  color: string,
}

export type ProjectStatusType = {
  _id: string,
  name: string
}

export type CommentType = {
  comment: string,
  author: UserType
}