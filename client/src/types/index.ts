import { z } from 'zod';
import { PROJECT_STATUSES } from '@/constants';
import { Comment, Project, StatusSchema, Task, User } from '../../../server/zod-schemas/generated';
import {
  AuthSchema,
  LoginSchema,
  RegisterSchema,
  TaskPopulatedSchema,
  ThemeSchema,
  UserWithoutPassSchema,
} from '@/zod-schemas/custom.ts';


export type PartialUserType = Partial<Pick<User, 'id'>> & Omit<User, 'id'>;
export type PartialProjectType = Partial<Pick<Project, 'id'>> & Omit<Project, 'id'>;
export type ProjectType = Project;
export type TaskInProject = number;
export type PartialTaskType = Partial<Pick<Task, 'id'>> & Omit<Task, 'id'>;
export type ProjectStatusType = keyof typeof PROJECT_STATUSES;
export type PartialCommentType = Partial<Pick<Comment, 'id'>> & Omit<Comment, 'id'>;
export type CommentType = Comment;

export type TaskMenuActionType = {
  name: 'edit' | 'remove',
  action: () => void
};

export type TaskUpdateFieldsType =
  Pick<Task, 'id' | 'projectId'>
  & Partial<Exclude<Task, 'id' | 'number' | 'project'>>


export type AuthType = z.infer<typeof AuthSchema>
export type LoginType = z.infer<typeof LoginSchema>
export type RegisterType = z.infer<typeof RegisterSchema>
export type TaskPopulatedType = z.infer<typeof TaskPopulatedSchema>;
export type TaskStatusType = z.infer<typeof StatusSchema>;
export type TaskType = Task;
export type UserType = User;
export type UserWithoutPassType = z.infer<typeof UserWithoutPassSchema>
export type ThemeType = z.infer<typeof ThemeSchema>
