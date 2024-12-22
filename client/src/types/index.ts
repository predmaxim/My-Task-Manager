import { z } from 'zod';
import { PROJECT_STATUSES } from '@/constants';
import { Comment, Project, StatusSchema, Task, User } from '@/zod-schemas/generated';
import { TaskPopulatedSchema } from '@/zod-schemas/custom.ts';


export type PartialUserType = Partial<Pick<User, 'id'>> & Omit<User, 'id'>;
export type PartialProjectType = Partial<Pick<Project, 'id'>> & Omit<Project, 'id'>;
export type TaskInProject = number;
export type PartialTaskType = Partial<Pick<Task, 'id'>> & Omit<Task, 'id'>;
export type ProjectStatusType = keyof typeof PROJECT_STATUSES;
export type PartialCommentType = Partial<Pick<Comment, 'id'>> & Omit<Comment, 'id'>;

export type TaskMenuActionType = {
  name: 'edit' | 'remove',
  action: () => void
};

export type TaskUpdateFieldsType =
  Pick<Task, 'id' | 'projectId'>
  & Partial<Exclude<Task, 'id' | 'number' | 'project'>>


export type TokenType = {
  access_token: string,
  refresh_token: string,
}

export type AuthType = {
  user: UserWithoutPassType,
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

export type TaskPopulatedType = z.infer<typeof TaskPopulatedSchema>;
export type TaskStatusType = z.infer<typeof StatusSchema>;
export type TaskType = Task;
export type UserType = User;
export type UserWithoutPassType = Omit<User, 'password'>;
