import {
  CommentSchema,
  FileSchema,
  PrioritySchema,
  ProjectSchema,
  RoleSchema,
  StatusSchema,
  TaskSchema,
  UserSchema
} from '@/zod-schemas';
import {z} from 'zod';

export type ThemeType = 'dark' | 'light';
export type LanguageType = 'ru' | 'en';

export type GlobalStateType = {
  theme: ThemeType,
  language: LanguageType,
};

export type UserType = z.infer<typeof UserSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;
export type TaskType = z.infer<typeof TaskSchema>;
export type RoleType = z.infer<typeof RoleSchema>;
export type TaskStatusType = z.infer<typeof StatusSchema>;
export type TaskPriorityType = z.infer<typeof PrioritySchema>;
export type FileType = z.infer<typeof FileSchema>;
export type CommentType = z.infer<typeof CommentSchema>;
