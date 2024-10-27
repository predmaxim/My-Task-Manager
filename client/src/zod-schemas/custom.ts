import { CommentSchema, PrioritySchema, ProjectSchema, StatusSchema, TaskSchema } from '@/zod-schemas/generated';
import { z } from 'zod';

export const TaskPopulatedSchema = TaskSchema.extend({
  status: StatusSchema,
  parent: z.lazy(() => TaskSchema),
  children: z.array(z.lazy(() => TaskSchema)),
  project: ProjectSchema,
  priority: PrioritySchema,
  comments: CommentSchema.array(),
}).omit({
  parentId: true,
  priorityId: true,
  statusId: true,
  projectId: true,
});

export const TokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
