import {z} from 'zod';

export const FileSchema = z.object({
  id: z.number(),
  src: z.string(),
  taskId: z.number(),
  created: z.date()
});

const BaseCommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  parentId: z.number().optional(),
  taskId: z.number(),
  created: z.date()
});

type CommentSchemaType = z.infer<typeof BaseCommentSchema> & {
  children?: CommentSchemaType[]
};

export const CommentSchema: z.ZodType<CommentSchemaType> = BaseCommentSchema.extend({
  children: z.lazy(() => CommentSchema.array()).optional()
});

const BaseTaskSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  created: z.date(),
  done: z.boolean(),
  priorityId: z.number(),
  statusId: z.number(),
  parentId: z.number().optional(),
  projectId: z.number(),
  index: z.number(),
  due: z.date().optional(),
  in_work: z.number().optional(),
  filesId: z.array(FileSchema),
  comments: z.array(CommentSchema).optional()
});

type TaskSchemaType = z.infer<typeof BaseTaskSchema> & {
  children?: TaskSchemaType[];
};

export const TaskSchema: z.ZodType<TaskSchemaType> = BaseTaskSchema.extend({
  children: z.lazy(() => TaskSchema.array()).optional()
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().optional(),
  created: z.date(),
  projects: z.array(z.number()).optional(),
  roleId: z.number()
});

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  created: z.date(),
  icon: z.string().optional(),
  color: z.string().optional(),
  tasks: z.array(TaskSchema).optional(),
  userId: z.number()
});

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string()
});

export const PrioritySchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string().optional()
});

export const StatusSchema = z.object({
  id: z.number(),
  name: z.string()
});
