import {z} from 'zod';

const TaskSchema = z.lazy(() => z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  created: z.date().default(new Date()),
  done: z.boolean().default(false),
  priority_id: z.number(),
  status_id: z.number(),
  parent_id: z.number().optional(),
  project_id: z.number(),
  index: z.number().default(0),
  due: z.date().optional(),
  in_work: z.number().optional(),
  files: z.array(FileSchema).optional(),
  comments: z.array(CommentSchema).optional(),
  children: z.array(TaskSchema).optional()
}));

const UserSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().optional(),
  created: z.date().default(new Date()),
  projects: z.array(z.number()).optional(),
  role_id: z.number()
});

const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  created: z.date().default(new Date()),
  icon: z.string().optional(),
  color: z.string().optional(),
  tasks: z.array(TaskSchema).optional(),
  user_id: z.number()
});

const CommentSchema = z.lazy(() => z.object({
  id: z.number(),
  content: z.string(),
  parent_id: z.number().optional(),
  task_id: z.number(),
  created: z.date().default(new Date()),
  children: z.array(CommentSchema).optional()
}));

const FileSchema = z.object({
  id: z.number(),
  src: z.string(),
  task_id: z.number(),
  created: z.date().default(new Date())
});

const RoleSchema = z.object({
  id: z.number(),
  name: z.string()
});

const PrioritySchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string().optional()
});

const StatusSchema = z.object({
  id: z.number(),
  name: z.string()
});

export {
  TaskSchema,
  UserSchema,
  ProjectSchema,
  CommentSchema,
  FileSchema,
  RoleSchema,
  PrioritySchema,
  StatusSchema
};
