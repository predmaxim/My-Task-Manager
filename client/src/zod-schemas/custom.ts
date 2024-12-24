import {
  CommentSchema,
  ProjectSchema,
  StatusSchema,
  TaskSchema,
  UserSchema,
} from '../../../server/zod-schemas/generated';
import { z } from 'zod';

const PRIORITIES = z.enum(['low', 'normal', 'high', 'critical']);

export {
  CommentSchema,
  ProjectSchema,
  StatusSchema,
  TaskSchema,
  UserSchema,
};

export const TaskStatusPopulatedSchema = StatusSchema.partial({ id: true });

export const TaskPopulatedSchema = TaskSchema.extend({
  status: StatusSchema,
  parent: z.lazy(() => TaskSchema),
  children: z.array(z.lazy(() => TaskSchema)),
  project: ProjectSchema,
  priority: PRIORITIES,
  comments: CommentSchema.array(),
});

export const ProjectPopulatedSchema = ProjectSchema.extend({
  statuses: StatusSchema.array(),
});


// TODO: change min password length to 6 characters in PasswordSchema
export const PasswordSchema = z.string().refine(data => data.length >= 2 && data.length <= 100, { message: 'Passwords must contain min 2 and max 100 character(s) ' });
export const UserWithoutPassSchema = UserSchema.omit({ password: true, created: true });
export const AuthSchema = z.object({ user: UserWithoutPassSchema, token: z.string() });

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
}).extend({ password: PasswordSchema });

export const RegisterSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
}).extend({
  verifyPassword: PasswordSchema,
  password: PasswordSchema,
  email: z.string().email(),
}).refine(data => data.password === data.verifyPassword, { message: 'Passwords do not match' });

export const ThemeSchema = z.enum(['dark', 'light']);
