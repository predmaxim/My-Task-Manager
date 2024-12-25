import { z } from 'zod';
import { PROJECT_STATUSES } from '@/constants';
import {
  AuthSchema,
  LoginSchema,
  ProjectPopulatedSchema,
  RegisterSchema,
  StatusSchema,
  TaskPopulatedSchema,
  TaskSchema,
  TaskStatusPartialSchema,
  ThemeSchema,
  UserWithoutPassSchema,
} from '@/zod-schemas/custom.ts';
import { IconType } from 'react-icons';
import type { Comment, Project, Task, User } from '../../../server/zod-schemas/generated';
export const TaskStatusPopulatedSchema = StatusSchema.extend({ tasks: TaskSchema.array() })

export type PartialUserType = Partial<Pick<User, 'id'>> & Omit<User, 'id'>;
export type PartialProjectType = Partial<Pick<Project, 'id'>> & Omit<Project, 'id'>;
export type ProjectType = Project;
export type PopulatedProjectType = z.infer<typeof ProjectPopulatedSchema>;
export type TaskInProject = number;
export type PartialTaskType = Partial<Pick<Task, 'id'>> & Omit<Task, 'id'>;
export type ProjectStatusType = keyof typeof PROJECT_STATUSES;
export type PartialCommentType = Partial<Pick<Comment, 'id'>> & Omit<Comment, 'id'>;
export type CommentType = Comment;

export type MenuActionType = {
  name: 'edit' | 'remove',
  action: () => void,
  icon: IconType['name']
};

export type TaskUpdateFieldsType =
  Pick<Task, 'id' | 'projectId'>
  & Partial<Exclude<Task, 'id' | 'number' | 'project'>>


export type AuthType = z.infer<typeof AuthSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;

export type TaskStatusType = z.infer<typeof TaskStatusPopulatedSchema>;
export type TaskStatusPartialType = z.infer<typeof TaskStatusPartialSchema>;

export type TaskType = Task;
export type PopulatedTaskType = z.infer<typeof TaskPopulatedSchema>;

export type UserType = User;
export type UserWithoutPassType = z.infer<typeof UserWithoutPassSchema>;

export type ThemeType = z.infer<typeof ThemeSchema>;
