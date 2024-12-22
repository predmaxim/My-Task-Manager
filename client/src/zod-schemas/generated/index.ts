import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','password','avatar','created']);

export const ProjectScalarFieldEnumSchema = z.enum(['id','name','created','icon','color','userId']);

export const TaskScalarFieldEnumSchema = z.enum(['id','name','description','created','done','priorityId','statusId','parentId','projectId','index','due','in_work']);

export const CommentScalarFieldEnumSchema = z.enum(['id','content','parentId','taskId','created']);

export const FileScalarFieldEnumSchema = z.enum(['id','src','taskId','created']);

export const PriorityScalarFieldEnumSchema = z.enum(['id','name','color']);

export const StatusScalarFieldEnumSchema = z.enum(['id','name']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const TASK_STATUSESSchema = z.enum(['queue','development','done']);

export type TASK_STATUSESType = `${z.infer<typeof TASK_STATUSESSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  avatar: z.string().nullable(),
  created: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  created: z.coerce.date(),
  icon: z.string().nullable(),
  color: z.string().nullable(),
  userId: z.number().int(),
})

export type Project = z.infer<typeof ProjectSchema>

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  created: z.coerce.date(),
  done: z.coerce.date().nullable(),
  priorityId: z.number().int(),
  statusId: z.number().int(),
  parentId: z.number().int().nullable(),
  projectId: z.number().int(),
  index: z.number().int(),
  due: z.coerce.date().nullable(),
  in_work: z.coerce.date().nullable(),
})

export type Task = z.infer<typeof TaskSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.number().int(),
  content: z.string(),
  parentId: z.number().int().nullable(),
  taskId: z.number().int(),
  created: z.coerce.date(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// FILE SCHEMA
/////////////////////////////////////////

export const FileSchema = z.object({
  id: z.number().int(),
  src: z.string(),
  taskId: z.number().int(),
  created: z.coerce.date(),
})

export type File = z.infer<typeof FileSchema>

/////////////////////////////////////////
// PRIORITY SCHEMA
/////////////////////////////////////////

export const PrioritySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  color: z.string(),
})

export type Priority = z.infer<typeof PrioritySchema>

/////////////////////////////////////////
// STATUS SCHEMA
/////////////////////////////////////////

export const StatusSchema = z.object({
  name: TASK_STATUSESSchema,
  id: z.number().int(),
})

export type Status = z.infer<typeof StatusSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  projects: z.union([z.boolean(),z.lazy(() => ProjectFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  projects: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  avatar: z.boolean().optional(),
  created: z.boolean().optional(),
  projects: z.union([z.boolean(),z.lazy(() => ProjectFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROJECT
//------------------------------------------------------

export const ProjectIncludeSchema: z.ZodType<Prisma.ProjectInclude> = z.object({
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProjectArgsSchema: z.ZodType<Prisma.ProjectDefaultArgs> = z.object({
  select: z.lazy(() => ProjectSelectSchema).optional(),
  include: z.lazy(() => ProjectIncludeSchema).optional(),
}).strict();

export const ProjectCountOutputTypeArgsSchema: z.ZodType<Prisma.ProjectCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProjectCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProjectCountOutputTypeSelectSchema: z.ZodType<Prisma.ProjectCountOutputTypeSelect> = z.object({
  tasks: z.boolean().optional(),
}).strict();

export const ProjectSelectSchema: z.ZodType<Prisma.ProjectSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  created: z.boolean().optional(),
  icon: z.boolean().optional(),
  color: z.boolean().optional(),
  userId: z.boolean().optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TASK
//------------------------------------------------------

export const TaskIncludeSchema: z.ZodType<Prisma.TaskInclude> = z.object({
  priority: z.union([z.boolean(),z.lazy(() => PriorityArgsSchema)]).optional(),
  status: z.union([z.boolean(),z.lazy(() => StatusArgsSchema)]).optional(),
  parent: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  files: z.union([z.boolean(),z.lazy(() => FileFindManyArgsSchema)]).optional(),
  children: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TaskArgsSchema: z.ZodType<Prisma.TaskDefaultArgs> = z.object({
  select: z.lazy(() => TaskSelectSchema).optional(),
  include: z.lazy(() => TaskIncludeSchema).optional(),
}).strict();

export const TaskCountOutputTypeArgsSchema: z.ZodType<Prisma.TaskCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TaskCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TaskCountOutputTypeSelectSchema: z.ZodType<Prisma.TaskCountOutputTypeSelect> = z.object({
  files: z.boolean().optional(),
  children: z.boolean().optional(),
  comments: z.boolean().optional(),
}).strict();

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  created: z.boolean().optional(),
  done: z.boolean().optional(),
  priorityId: z.boolean().optional(),
  statusId: z.boolean().optional(),
  parentId: z.boolean().optional(),
  projectId: z.boolean().optional(),
  index: z.boolean().optional(),
  due: z.boolean().optional(),
  in_work: z.boolean().optional(),
  priority: z.union([z.boolean(),z.lazy(() => PriorityArgsSchema)]).optional(),
  status: z.union([z.boolean(),z.lazy(() => StatusArgsSchema)]).optional(),
  parent: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  files: z.union([z.boolean(),z.lazy(() => FileFindManyArgsSchema)]).optional(),
  children: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
  parent: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  children: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z.object({
  select: z.lazy(() => CommentSelectSchema).optional(),
  include: z.lazy(() => CommentIncludeSchema).optional(),
}).strict();

export const CommentCountOutputTypeArgsSchema: z.ZodType<Prisma.CommentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CommentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CommentCountOutputTypeSelectSchema: z.ZodType<Prisma.CommentCountOutputTypeSelect> = z.object({
  children: z.boolean().optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  parentId: z.boolean().optional(),
  taskId: z.boolean().optional(),
  created: z.boolean().optional(),
  parent: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  children: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FILE
//------------------------------------------------------

export const FileIncludeSchema: z.ZodType<Prisma.FileInclude> = z.object({
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
}).strict()

export const FileArgsSchema: z.ZodType<Prisma.FileDefaultArgs> = z.object({
  select: z.lazy(() => FileSelectSchema).optional(),
  include: z.lazy(() => FileIncludeSchema).optional(),
}).strict();

export const FileSelectSchema: z.ZodType<Prisma.FileSelect> = z.object({
  id: z.boolean().optional(),
  src: z.boolean().optional(),
  taskId: z.boolean().optional(),
  created: z.boolean().optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
}).strict()

// PRIORITY
//------------------------------------------------------

export const PriorityIncludeSchema: z.ZodType<Prisma.PriorityInclude> = z.object({
  task: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PriorityCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PriorityArgsSchema: z.ZodType<Prisma.PriorityDefaultArgs> = z.object({
  select: z.lazy(() => PrioritySelectSchema).optional(),
  include: z.lazy(() => PriorityIncludeSchema).optional(),
}).strict();

export const PriorityCountOutputTypeArgsSchema: z.ZodType<Prisma.PriorityCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PriorityCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PriorityCountOutputTypeSelectSchema: z.ZodType<Prisma.PriorityCountOutputTypeSelect> = z.object({
  task: z.boolean().optional(),
}).strict();

export const PrioritySelectSchema: z.ZodType<Prisma.PrioritySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  color: z.boolean().optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PriorityCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STATUS
//------------------------------------------------------

export const StatusIncludeSchema: z.ZodType<Prisma.StatusInclude> = z.object({
  task: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StatusCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StatusArgsSchema: z.ZodType<Prisma.StatusDefaultArgs> = z.object({
  select: z.lazy(() => StatusSelectSchema).optional(),
  include: z.lazy(() => StatusIncludeSchema).optional(),
}).strict();

export const StatusCountOutputTypeArgsSchema: z.ZodType<Prisma.StatusCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StatusCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StatusCountOutputTypeSelectSchema: z.ZodType<Prisma.StatusCountOutputTypeSelect> = z.object({
  task: z.boolean().optional(),
}).strict();

export const StatusSelectSchema: z.ZodType<Prisma.StatusSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StatusCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projects: z.lazy(() => ProjectListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  projects: z.lazy(() => ProjectOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  projects: z.lazy(() => ProjectListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProjectWhereInputSchema: z.ZodType<Prisma.ProjectWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  icon: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ProjectOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  icon: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ProjectWhereUniqueInputSchema: z.ZodType<Prisma.ProjectWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  icon: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const ProjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  icon: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  color: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProjectCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProjectAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProjectSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  icon: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  color: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const TaskWhereInputSchema: z.ZodType<Prisma.TaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  done: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  priorityId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  statusId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  parentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  projectId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  index: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  due: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  in_work: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  priority: z.union([ z.lazy(() => PriorityRelationFilterSchema),z.lazy(() => PriorityWhereInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelationFilterSchema),z.lazy(() => StatusWhereInputSchema) ]).optional(),
  parent: z.union([ z.lazy(() => TaskNullableRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional().nullable(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  files: z.lazy(() => FileListRelationFilterSchema).optional(),
  children: z.lazy(() => TaskListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict();

export const TaskOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  done: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  priorityId: z.lazy(() => SortOrderSchema).optional(),
  statusId: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  due: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  in_work: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  priority: z.lazy(() => PriorityOrderByWithRelationInputSchema).optional(),
  status: z.lazy(() => StatusOrderByWithRelationInputSchema).optional(),
  parent: z.lazy(() => TaskOrderByWithRelationInputSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional(),
  files: z.lazy(() => FileOrderByRelationAggregateInputSchema).optional(),
  children: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  done: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  priorityId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  statusId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  parentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  projectId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  index: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  due: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  in_work: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  priority: z.union([ z.lazy(() => PriorityRelationFilterSchema),z.lazy(() => PriorityWhereInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusRelationFilterSchema),z.lazy(() => StatusWhereInputSchema) ]).optional(),
  parent: z.union([ z.lazy(() => TaskNullableRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional().nullable(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional(),
  files: z.lazy(() => FileListRelationFilterSchema).optional(),
  children: z.lazy(() => TaskListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict());

export const TaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  done: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  priorityId: z.lazy(() => SortOrderSchema).optional(),
  statusId: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  due: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  in_work: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TaskCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TaskAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TaskSumOrderByAggregateInputSchema).optional()
}).strict();

export const TaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  done: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  priorityId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  statusId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  parentId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  projectId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  index: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  due: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  in_work: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  taskId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  parent: z.union([ z.lazy(() => CommentNullableRelationFilterSchema),z.lazy(() => CommentWhereInputSchema) ]).optional().nullable(),
  children: z.lazy(() => CommentListRelationFilterSchema).optional(),
  task: z.union([ z.lazy(() => TaskRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
}).strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  parent: z.lazy(() => CommentOrderByWithRelationInputSchema).optional(),
  children: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  task: z.lazy(() => TaskOrderByWithRelationInputSchema).optional()
}).strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  taskId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  parent: z.union([ z.lazy(() => CommentNullableRelationFilterSchema),z.lazy(() => CommentWhereInputSchema) ]).optional().nullable(),
  children: z.lazy(() => CommentListRelationFilterSchema).optional(),
  task: z.union([ z.lazy(() => TaskRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
}).strict());

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CommentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CommentSumOrderByAggregateInputSchema).optional()
}).strict();

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  parentId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  taskId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FileWhereInputSchema: z.ZodType<Prisma.FileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  src: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  task: z.union([ z.lazy(() => TaskRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
}).strict();

export const FileOrderByWithRelationInputSchema: z.ZodType<Prisma.FileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  src: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => TaskOrderByWithRelationInputSchema).optional()
}).strict();

export const FileWhereUniqueInputSchema: z.ZodType<Prisma.FileWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileWhereInputSchema),z.lazy(() => FileWhereInputSchema).array() ]).optional(),
  src: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  task: z.union([ z.lazy(() => TaskRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
}).strict());

export const FileOrderByWithAggregationInputSchema: z.ZodType<Prisma.FileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  src: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FileCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FileAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FileMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FileSumOrderByAggregateInputSchema).optional()
}).strict();

export const FileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FileScalarWhereWithAggregatesInputSchema),z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileScalarWhereWithAggregatesInputSchema),z.lazy(() => FileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  src: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PriorityWhereInputSchema: z.ZodType<Prisma.PriorityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PriorityWhereInputSchema),z.lazy(() => PriorityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriorityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriorityWhereInputSchema),z.lazy(() => PriorityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  task: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict();

export const PriorityOrderByWithRelationInputSchema: z.ZodType<Prisma.PriorityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PriorityWhereUniqueInputSchema: z.ZodType<Prisma.PriorityWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PriorityWhereInputSchema),z.lazy(() => PriorityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriorityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriorityWhereInputSchema),z.lazy(() => PriorityWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  task: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict());

export const PriorityOrderByWithAggregationInputSchema: z.ZodType<Prisma.PriorityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PriorityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PriorityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PriorityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PriorityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PrioritySumOrderByAggregateInputSchema).optional()
}).strict();

export const PriorityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PriorityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PriorityScalarWhereWithAggregatesInputSchema),z.lazy(() => PriorityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriorityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriorityScalarWhereWithAggregatesInputSchema),z.lazy(() => PriorityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  color: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const StatusWhereInputSchema: z.ZodType<Prisma.StatusWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StatusWhereInputSchema),z.lazy(() => StatusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatusWhereInputSchema),z.lazy(() => StatusWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => EnumTASK_STATUSESFilterSchema),z.lazy(() => TASK_STATUSESSchema) ]).optional(),
  task: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict();

export const StatusOrderByWithRelationInputSchema: z.ZodType<Prisma.StatusOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  task: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional()
}).strict();

export const StatusWhereUniqueInputSchema: z.ZodType<Prisma.StatusWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => StatusWhereInputSchema),z.lazy(() => StatusWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatusWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatusWhereInputSchema),z.lazy(() => StatusWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => EnumTASK_STATUSESFilterSchema),z.lazy(() => TASK_STATUSESSchema) ]).optional(),
  task: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict());

export const StatusOrderByWithAggregationInputSchema: z.ZodType<Prisma.StatusOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StatusCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StatusAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StatusMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StatusMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StatusSumOrderByAggregateInputSchema).optional()
}).strict();

export const StatusScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StatusScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StatusScalarWhereWithAggregatesInputSchema),z.lazy(() => StatusScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StatusScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StatusScalarWhereWithAggregatesInputSchema),z.lazy(() => StatusScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => EnumTASK_STATUSESWithAggregatesFilterSchema),z.lazy(() => TASK_STATUSESSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  avatar: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  projects: z.lazy(() => ProjectCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  avatar: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  projects: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => ProjectUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  projects: z.lazy(() => ProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  avatar: z.string().optional().nullable(),
  created: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectCreateInputSchema: z.ZodType<Prisma.ProjectCreateInput> = z.object({
  name: z.string(),
  created: z.coerce.date().optional(),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutProjectInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutProjectsInputSchema)
}).strict();

export const ProjectUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  created: z.coerce.date().optional(),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  userId: z.number().int(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUpdateInputSchema: z.ZodType<Prisma.ProjectUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskUpdateManyWithoutProjectNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProjectsNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateManyInputSchema: z.ZodType<Prisma.ProjectCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  created: z.coerce.date().optional(),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  userId: z.number().int()
}).strict();

export const ProjectUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  priority: z.lazy(() => PriorityCreateNestedOneWithoutTaskInputSchema),
  status: z.lazy(() => StatusCreateNestedOneWithoutTaskInputSchema),
  parent: z.lazy(() => TaskCreateNestedOneWithoutChildrenInputSchema).optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutTasksInputSchema),
  files: z.lazy(() => FileCreateNestedManyWithoutTaskInputSchema).optional(),
  children: z.lazy(() => TaskCreateNestedManyWithoutParentInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateInputSchema: z.ZodType<Prisma.TaskUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  priorityId: z.number().int(),
  statusId: z.number().int(),
  parentId: z.number().int().optional().nullable(),
  projectId: z.number().int(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutTaskInputSchema).optional(),
  children: z.lazy(() => TaskUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUpdateInputSchema: z.ZodType<Prisma.TaskUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.lazy(() => PriorityUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  status: z.lazy(() => StatusUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  parent: z.lazy(() => TaskUpdateOneWithoutChildrenNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  files: z.lazy(() => FileUpdateManyWithoutTaskNestedInputSchema).optional(),
  children: z.lazy(() => TaskUpdateManyWithoutParentNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priorityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  statusId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutTaskNestedInputSchema).optional(),
  children: z.lazy(() => TaskUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskCreateManyInputSchema: z.ZodType<Prisma.TaskCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  priorityId: z.number().int(),
  statusId: z.number().int(),
  parentId: z.number().int().optional().nullable(),
  projectId: z.number().int(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable()
}).strict();

export const TaskUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priorityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  statusId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  content: z.string(),
  created: z.coerce.date().optional(),
  parent: z.lazy(() => CommentCreateNestedOneWithoutChildrenInputSchema).optional(),
  children: z.lazy(() => CommentCreateNestedManyWithoutParentInputSchema).optional(),
  task: z.lazy(() => TaskCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  parentId: z.number().int().optional().nullable(),
  taskId: z.number().int(),
  created: z.coerce.date().optional(),
  children: z.lazy(() => CommentUncheckedCreateNestedManyWithoutParentInputSchema).optional()
}).strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => CommentUpdateOneWithoutChildrenNestedInputSchema).optional(),
  children: z.lazy(() => CommentUpdateManyWithoutParentNestedInputSchema).optional(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taskId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  children: z.lazy(() => CommentUncheckedUpdateManyWithoutParentNestedInputSchema).optional()
}).strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  parentId: z.number().int().optional().nullable(),
  taskId: z.number().int(),
  created: z.coerce.date().optional()
}).strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taskId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileCreateInputSchema: z.ZodType<Prisma.FileCreateInput> = z.object({
  src: z.string(),
  created: z.coerce.date().optional(),
  task: z.lazy(() => TaskCreateNestedOneWithoutFilesInputSchema)
}).strict();

export const FileUncheckedCreateInputSchema: z.ZodType<Prisma.FileUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  src: z.string(),
  taskId: z.number().int(),
  created: z.coerce.date().optional()
}).strict();

export const FileUpdateInputSchema: z.ZodType<Prisma.FileUpdateInput> = z.object({
  src: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutFilesNestedInputSchema).optional()
}).strict();

export const FileUncheckedUpdateInputSchema: z.ZodType<Prisma.FileUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  src: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileCreateManyInputSchema: z.ZodType<Prisma.FileCreateManyInput> = z.object({
  id: z.number().int().optional(),
  src: z.string(),
  taskId: z.number().int(),
  created: z.coerce.date().optional()
}).strict();

export const FileUpdateManyMutationInputSchema: z.ZodType<Prisma.FileUpdateManyMutationInput> = z.object({
  src: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  src: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriorityCreateInputSchema: z.ZodType<Prisma.PriorityCreateInput> = z.object({
  name: z.string(),
  color: z.string(),
  task: z.lazy(() => TaskCreateNestedManyWithoutPriorityInputSchema).optional()
}).strict();

export const PriorityUncheckedCreateInputSchema: z.ZodType<Prisma.PriorityUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  color: z.string(),
  task: z.lazy(() => TaskUncheckedCreateNestedManyWithoutPriorityInputSchema).optional()
}).strict();

export const PriorityUpdateInputSchema: z.ZodType<Prisma.PriorityUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.lazy(() => TaskUpdateManyWithoutPriorityNestedInputSchema).optional()
}).strict();

export const PriorityUncheckedUpdateInputSchema: z.ZodType<Prisma.PriorityUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.lazy(() => TaskUncheckedUpdateManyWithoutPriorityNestedInputSchema).optional()
}).strict();

export const PriorityCreateManyInputSchema: z.ZodType<Prisma.PriorityCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  color: z.string()
}).strict();

export const PriorityUpdateManyMutationInputSchema: z.ZodType<Prisma.PriorityUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriorityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PriorityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StatusCreateInputSchema: z.ZodType<Prisma.StatusCreateInput> = z.object({
  name: z.lazy(() => TASK_STATUSESSchema),
  task: z.lazy(() => TaskCreateNestedManyWithoutStatusInputSchema).optional()
}).strict();

export const StatusUncheckedCreateInputSchema: z.ZodType<Prisma.StatusUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.lazy(() => TASK_STATUSESSchema),
  task: z.lazy(() => TaskUncheckedCreateNestedManyWithoutStatusInputSchema).optional()
}).strict();

export const StatusUpdateInputSchema: z.ZodType<Prisma.StatusUpdateInput> = z.object({
  name: z.union([ z.lazy(() => TASK_STATUSESSchema),z.lazy(() => EnumTASK_STATUSESFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.lazy(() => TaskUpdateManyWithoutStatusNestedInputSchema).optional()
}).strict();

export const StatusUncheckedUpdateInputSchema: z.ZodType<Prisma.StatusUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => TASK_STATUSESSchema),z.lazy(() => EnumTASK_STATUSESFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.lazy(() => TaskUncheckedUpdateManyWithoutStatusNestedInputSchema).optional()
}).strict();

export const StatusCreateManyInputSchema: z.ZodType<Prisma.StatusCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.lazy(() => TASK_STATUSESSchema)
}).strict();

export const StatusUpdateManyMutationInputSchema: z.ZodType<Prisma.StatusUpdateManyMutationInput> = z.object({
  name: z.union([ z.lazy(() => TASK_STATUSESSchema),z.lazy(() => EnumTASK_STATUSESFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StatusUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StatusUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => TASK_STATUSESSchema),z.lazy(() => EnumTASK_STATUSESFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const ProjectListRelationFilterSchema: z.ZodType<Prisma.ProjectListRelationFilter> = z.object({
  every: z.lazy(() => ProjectWhereInputSchema).optional(),
  some: z.lazy(() => ProjectWhereInputSchema).optional(),
  none: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ProjectOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProjectOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const TaskListRelationFilterSchema: z.ZodType<Prisma.TaskListRelationFilter> = z.object({
  every: z.lazy(() => TaskWhereInputSchema).optional(),
  some: z.lazy(() => TaskWhereInputSchema).optional(),
  none: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const TaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PriorityRelationFilterSchema: z.ZodType<Prisma.PriorityRelationFilter> = z.object({
  is: z.lazy(() => PriorityWhereInputSchema).optional(),
  isNot: z.lazy(() => PriorityWhereInputSchema).optional()
}).strict();

export const StatusRelationFilterSchema: z.ZodType<Prisma.StatusRelationFilter> = z.object({
  is: z.lazy(() => StatusWhereInputSchema).optional(),
  isNot: z.lazy(() => StatusWhereInputSchema).optional()
}).strict();

export const TaskNullableRelationFilterSchema: z.ZodType<Prisma.TaskNullableRelationFilter> = z.object({
  is: z.lazy(() => TaskWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TaskWhereInputSchema).optional().nullable()
}).strict();

export const ProjectRelationFilterSchema: z.ZodType<Prisma.ProjectRelationFilter> = z.object({
  is: z.lazy(() => ProjectWhereInputSchema).optional(),
  isNot: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const FileListRelationFilterSchema: z.ZodType<Prisma.FileListRelationFilter> = z.object({
  every: z.lazy(() => FileWhereInputSchema).optional(),
  some: z.lazy(() => FileWhereInputSchema).optional(),
  none: z.lazy(() => FileWhereInputSchema).optional()
}).strict();

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> = z.object({
  every: z.lazy(() => CommentWhereInputSchema).optional(),
  some: z.lazy(() => CommentWhereInputSchema).optional(),
  none: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const FileOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FileOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional(),
  priorityId: z.lazy(() => SortOrderSchema).optional(),
  statusId: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  due: z.lazy(() => SortOrderSchema).optional(),
  in_work: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TaskAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  priorityId: z.lazy(() => SortOrderSchema).optional(),
  statusId: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional(),
  priorityId: z.lazy(() => SortOrderSchema).optional(),
  statusId: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  due: z.lazy(() => SortOrderSchema).optional(),
  in_work: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional(),
  priorityId: z.lazy(() => SortOrderSchema).optional(),
  statusId: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional(),
  due: z.lazy(() => SortOrderSchema).optional(),
  in_work: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskSumOrderByAggregateInputSchema: z.ZodType<Prisma.TaskSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  priorityId: z.lazy(() => SortOrderSchema).optional(),
  statusId: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  index: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const CommentNullableRelationFilterSchema: z.ZodType<Prisma.CommentNullableRelationFilter> = z.object({
  is: z.lazy(() => CommentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CommentWhereInputSchema).optional().nullable()
}).strict();

export const TaskRelationFilterSchema: z.ZodType<Prisma.TaskRelationFilter> = z.object({
  is: z.lazy(() => TaskWhereInputSchema).optional(),
  isNot: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CommentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentSumOrderByAggregateInputSchema: z.ZodType<Prisma.CommentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileCountOrderByAggregateInputSchema: z.ZodType<Prisma.FileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  src: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FileAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  src: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileMinOrderByAggregateInputSchema: z.ZodType<Prisma.FileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  src: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FileSumOrderByAggregateInputSchema: z.ZodType<Prisma.FileSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriorityCountOrderByAggregateInputSchema: z.ZodType<Prisma.PriorityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriorityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PriorityAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriorityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PriorityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriorityMinOrderByAggregateInputSchema: z.ZodType<Prisma.PriorityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  color: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrioritySumOrderByAggregateInputSchema: z.ZodType<Prisma.PrioritySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTASK_STATUSESFilterSchema: z.ZodType<Prisma.EnumTASK_STATUSESFilter> = z.object({
  equals: z.lazy(() => TASK_STATUSESSchema).optional(),
  in: z.lazy(() => TASK_STATUSESSchema).array().optional(),
  notIn: z.lazy(() => TASK_STATUSESSchema).array().optional(),
  not: z.union([ z.lazy(() => TASK_STATUSESSchema),z.lazy(() => NestedEnumTASK_STATUSESFilterSchema) ]).optional(),
}).strict();

export const StatusCountOrderByAggregateInputSchema: z.ZodType<Prisma.StatusCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StatusAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StatusAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StatusMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StatusMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StatusMinOrderByAggregateInputSchema: z.ZodType<Prisma.StatusMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StatusSumOrderByAggregateInputSchema: z.ZodType<Prisma.StatusSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTASK_STATUSESWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTASK_STATUSESWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TASK_STATUSESSchema).optional(),
  in: z.lazy(() => TASK_STATUSESSchema).array().optional(),
  notIn: z.lazy(() => TASK_STATUSESSchema).array().optional(),
  not: z.union([ z.lazy(() => TASK_STATUSESSchema),z.lazy(() => NestedEnumTASK_STATUSESWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTASK_STATUSESFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTASK_STATUSESFilterSchema).optional()
}).strict();

export const ProjectCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ProjectCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectCreateWithoutUserInputSchema).array(),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectCreateWithoutUserInputSchema).array(),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const ProjectUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ProjectUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectCreateWithoutUserInputSchema).array(),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProjectUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProjectUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ProjectUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectScalarWhereInputSchema),z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ProjectUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectCreateWithoutUserInputSchema).array(),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProjectUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProjectUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ProjectUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectScalarWhereInputSchema),z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutProjectInputSchema),z.lazy(() => TaskCreateWithoutProjectInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TaskUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TaskCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutProjectsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProjectsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProjectsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TaskUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutProjectInputSchema),z.lazy(() => TaskCreateWithoutProjectInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TaskUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TaskCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutProjectInputSchema),z.lazy(() => TaskCreateWithoutProjectInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TaskUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TaskCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutProjectsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProjectsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProjectsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProjectsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProjectsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProjectsInputSchema),z.lazy(() => UserUpdateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProjectsInputSchema) ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutProjectInputSchema),z.lazy(() => TaskCreateWithoutProjectInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutProjectInputSchema),z.lazy(() => TaskUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutProjectInputSchema),z.lazy(() => TaskCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PriorityCreateNestedOneWithoutTaskInputSchema: z.ZodType<Prisma.PriorityCreateNestedOneWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => PriorityCreateWithoutTaskInputSchema),z.lazy(() => PriorityUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PriorityCreateOrConnectWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => PriorityWhereUniqueInputSchema).optional()
}).strict();

export const StatusCreateNestedOneWithoutTaskInputSchema: z.ZodType<Prisma.StatusCreateNestedOneWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => StatusCreateWithoutTaskInputSchema),z.lazy(() => StatusUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StatusCreateOrConnectWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => StatusWhereUniqueInputSchema).optional()
}).strict();

export const TaskCreateNestedOneWithoutChildrenInputSchema: z.ZodType<Prisma.TaskCreateNestedOneWithoutChildrenInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutChildrenInputSchema),z.lazy(() => TaskUncheckedCreateWithoutChildrenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutChildrenInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict();

export const ProjectCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutTasksInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const FileCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.FileCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutTaskInputSchema),z.lazy(() => FileCreateWithoutTaskInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutTaskInputSchema),z.lazy(() => FileUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutTaskInputSchema),z.lazy(() => FileCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutParentInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutParentInputSchema),z.lazy(() => TaskCreateWithoutParentInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutParentInputSchema),z.lazy(() => TaskUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutParentInputSchema),z.lazy(() => TaskCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutTaskInputSchema),z.lazy(() => CommentCreateWithoutTaskInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutTaskInputSchema),z.lazy(() => CommentUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutTaskInputSchema),z.lazy(() => CommentCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FileUncheckedCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.FileUncheckedCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutTaskInputSchema),z.lazy(() => FileCreateWithoutTaskInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutTaskInputSchema),z.lazy(() => FileUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutTaskInputSchema),z.lazy(() => FileCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutParentInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutParentInputSchema),z.lazy(() => TaskCreateWithoutParentInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutParentInputSchema),z.lazy(() => TaskUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutParentInputSchema),z.lazy(() => TaskCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutTaskInputSchema),z.lazy(() => CommentCreateWithoutTaskInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutTaskInputSchema),z.lazy(() => CommentUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutTaskInputSchema),z.lazy(() => CommentCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const PriorityUpdateOneRequiredWithoutTaskNestedInputSchema: z.ZodType<Prisma.PriorityUpdateOneRequiredWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => PriorityCreateWithoutTaskInputSchema),z.lazy(() => PriorityUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PriorityCreateOrConnectWithoutTaskInputSchema).optional(),
  upsert: z.lazy(() => PriorityUpsertWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => PriorityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PriorityUpdateToOneWithWhereWithoutTaskInputSchema),z.lazy(() => PriorityUpdateWithoutTaskInputSchema),z.lazy(() => PriorityUncheckedUpdateWithoutTaskInputSchema) ]).optional(),
}).strict();

export const StatusUpdateOneRequiredWithoutTaskNestedInputSchema: z.ZodType<Prisma.StatusUpdateOneRequiredWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => StatusCreateWithoutTaskInputSchema),z.lazy(() => StatusUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StatusCreateOrConnectWithoutTaskInputSchema).optional(),
  upsert: z.lazy(() => StatusUpsertWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => StatusWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StatusUpdateToOneWithWhereWithoutTaskInputSchema),z.lazy(() => StatusUpdateWithoutTaskInputSchema),z.lazy(() => StatusUncheckedUpdateWithoutTaskInputSchema) ]).optional(),
}).strict();

export const TaskUpdateOneWithoutChildrenNestedInputSchema: z.ZodType<Prisma.TaskUpdateOneWithoutChildrenNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutChildrenInputSchema),z.lazy(() => TaskUncheckedCreateWithoutChildrenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutChildrenInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutChildrenInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TaskWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutChildrenInputSchema),z.lazy(() => TaskUpdateWithoutChildrenInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutChildrenInputSchema) ]).optional(),
}).strict();

export const ProjectUpdateOneRequiredWithoutTasksNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneRequiredWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutTasksInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => ProjectUpdateWithoutTasksInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export const FileUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.FileUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutTaskInputSchema),z.lazy(() => FileCreateWithoutTaskInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutTaskInputSchema),z.lazy(() => FileUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutTaskInputSchema),z.lazy(() => FileCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FileUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => FileUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FileUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => FileUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FileUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => FileUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutParentNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutParentInputSchema),z.lazy(() => TaskCreateWithoutParentInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutParentInputSchema),z.lazy(() => TaskUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutParentInputSchema),z.lazy(() => TaskCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutParentInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutParentInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutParentInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutTaskInputSchema),z.lazy(() => CommentCreateWithoutTaskInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutTaskInputSchema),z.lazy(() => CommentUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutTaskInputSchema),z.lazy(() => CommentCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const FileUncheckedUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.FileUncheckedUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => FileCreateWithoutTaskInputSchema),z.lazy(() => FileCreateWithoutTaskInputSchema).array(),z.lazy(() => FileUncheckedCreateWithoutTaskInputSchema),z.lazy(() => FileUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FileCreateOrConnectWithoutTaskInputSchema),z.lazy(() => FileCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FileUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => FileUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FileCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FileWhereUniqueInputSchema),z.lazy(() => FileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FileUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => FileUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FileUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => FileUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutParentNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutParentInputSchema),z.lazy(() => TaskCreateWithoutParentInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutParentInputSchema),z.lazy(() => TaskUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutParentInputSchema),z.lazy(() => TaskCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutParentInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutParentInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutParentInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutTaskInputSchema),z.lazy(() => CommentCreateWithoutTaskInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutTaskInputSchema),z.lazy(() => CommentUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutTaskInputSchema),z.lazy(() => CommentCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedOneWithoutChildrenInputSchema: z.ZodType<Prisma.CommentCreateNestedOneWithoutChildrenInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedCreateWithoutChildrenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutChildrenInputSchema).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputSchema).optional()
}).strict();

export const CommentCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutParentInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutParentInputSchema),z.lazy(() => CommentCreateWithoutParentInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema),z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.TaskCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutCommentsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict();

export const CommentUncheckedCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutParentInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutParentInputSchema),z.lazy(() => CommentCreateWithoutParentInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema),z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateOneWithoutChildrenNestedInputSchema: z.ZodType<Prisma.CommentUpdateOneWithoutChildrenNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedCreateWithoutChildrenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutChildrenInputSchema).optional(),
  upsert: z.lazy(() => CommentUpsertWithoutChildrenInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CommentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CommentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CommentUpdateToOneWithWhereWithoutChildrenInputSchema),z.lazy(() => CommentUpdateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutChildrenInputSchema) ]).optional(),
}).strict();

export const CommentUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutParentNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutParentInputSchema),z.lazy(() => CommentCreateWithoutParentInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema),z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutParentInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutParentInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutParentInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutCommentsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => TaskUpdateWithoutCommentsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutParentNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutParentInputSchema),z.lazy(() => CommentCreateWithoutParentInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema),z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutParentInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutParentInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutParentInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedOneWithoutFilesInputSchema: z.ZodType<Prisma.TaskCreateNestedOneWithoutFilesInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutFilesInputSchema),z.lazy(() => TaskUncheckedCreateWithoutFilesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutFilesInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict();

export const TaskUpdateOneRequiredWithoutFilesNestedInputSchema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutFilesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutFilesInputSchema),z.lazy(() => TaskUncheckedCreateWithoutFilesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutFilesInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutFilesInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutFilesInputSchema),z.lazy(() => TaskUpdateWithoutFilesInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutFilesInputSchema) ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutPriorityInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutPriorityInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutPriorityInputSchema),z.lazy(() => TaskCreateWithoutPriorityInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutPriorityInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPriorityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutPriorityInputSchema),z.lazy(() => TaskCreateOrConnectWithoutPriorityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyPriorityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedCreateNestedManyWithoutPriorityInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutPriorityInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutPriorityInputSchema),z.lazy(() => TaskCreateWithoutPriorityInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutPriorityInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPriorityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutPriorityInputSchema),z.lazy(() => TaskCreateOrConnectWithoutPriorityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyPriorityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateManyWithoutPriorityNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutPriorityNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutPriorityInputSchema),z.lazy(() => TaskCreateWithoutPriorityInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutPriorityInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPriorityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutPriorityInputSchema),z.lazy(() => TaskCreateOrConnectWithoutPriorityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutPriorityInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutPriorityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyPriorityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutPriorityInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutPriorityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutPriorityInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutPriorityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutPriorityNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutPriorityNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutPriorityInputSchema),z.lazy(() => TaskCreateWithoutPriorityInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutPriorityInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPriorityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutPriorityInputSchema),z.lazy(() => TaskCreateOrConnectWithoutPriorityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutPriorityInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutPriorityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyPriorityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutPriorityInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutPriorityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutPriorityInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutPriorityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutStatusInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutStatusInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutStatusInputSchema),z.lazy(() => TaskCreateWithoutStatusInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutStatusInputSchema),z.lazy(() => TaskUncheckedCreateWithoutStatusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutStatusInputSchema),z.lazy(() => TaskCreateOrConnectWithoutStatusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyStatusInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedCreateNestedManyWithoutStatusInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutStatusInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutStatusInputSchema),z.lazy(() => TaskCreateWithoutStatusInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutStatusInputSchema),z.lazy(() => TaskUncheckedCreateWithoutStatusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutStatusInputSchema),z.lazy(() => TaskCreateOrConnectWithoutStatusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyStatusInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumTASK_STATUSESFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTASK_STATUSESFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TASK_STATUSESSchema).optional()
}).strict();

export const TaskUpdateManyWithoutStatusNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutStatusNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutStatusInputSchema),z.lazy(() => TaskCreateWithoutStatusInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutStatusInputSchema),z.lazy(() => TaskUncheckedCreateWithoutStatusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutStatusInputSchema),z.lazy(() => TaskCreateOrConnectWithoutStatusInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutStatusInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutStatusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyStatusInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutStatusInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutStatusInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutStatusInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutStatusInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutStatusNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutStatusNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutStatusInputSchema),z.lazy(() => TaskCreateWithoutStatusInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutStatusInputSchema),z.lazy(() => TaskUncheckedCreateWithoutStatusInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutStatusInputSchema),z.lazy(() => TaskCreateOrConnectWithoutStatusInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutStatusInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutStatusInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyStatusInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutStatusInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutStatusInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutStatusInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutStatusInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumTASK_STATUSESFilterSchema: z.ZodType<Prisma.NestedEnumTASK_STATUSESFilter> = z.object({
  equals: z.lazy(() => TASK_STATUSESSchema).optional(),
  in: z.lazy(() => TASK_STATUSESSchema).array().optional(),
  notIn: z.lazy(() => TASK_STATUSESSchema).array().optional(),
  not: z.union([ z.lazy(() => TASK_STATUSESSchema),z.lazy(() => NestedEnumTASK_STATUSESFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTASK_STATUSESWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTASK_STATUSESWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TASK_STATUSESSchema).optional(),
  in: z.lazy(() => TASK_STATUSESSchema).array().optional(),
  notIn: z.lazy(() => TASK_STATUSESSchema).array().optional(),
  not: z.union([ z.lazy(() => TASK_STATUSESSchema),z.lazy(() => NestedEnumTASK_STATUSESWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTASK_STATUSESFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTASK_STATUSESFilterSchema).optional()
}).strict();

export const ProjectCreateWithoutUserInputSchema: z.ZodType<Prisma.ProjectCreateWithoutUserInput> = z.object({
  name: z.string(),
  created: z.coerce.date().optional(),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  created: z.coerce.date().optional(),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ProjectCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ProjectCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProjectCreateManyUserInputSchema),z.lazy(() => ProjectCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProjectUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ProjectUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProjectUpdateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ProjectUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ProjectUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ProjectUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ProjectUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ProjectScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProjectUpdateManyMutationInputSchema),z.lazy(() => ProjectUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ProjectScalarWhereInputSchema: z.ZodType<Prisma.ProjectScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectScalarWhereInputSchema),z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectScalarWhereInputSchema),z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  icon: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  color: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const TaskCreateWithoutProjectInputSchema: z.ZodType<Prisma.TaskCreateWithoutProjectInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  priority: z.lazy(() => PriorityCreateNestedOneWithoutTaskInputSchema),
  status: z.lazy(() => StatusCreateNestedOneWithoutTaskInputSchema),
  parent: z.lazy(() => TaskCreateNestedOneWithoutChildrenInputSchema).optional(),
  files: z.lazy(() => FileCreateNestedManyWithoutTaskInputSchema).optional(),
  children: z.lazy(() => TaskCreateNestedManyWithoutParentInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutProjectInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  priorityId: z.number().int(),
  statusId: z.number().int(),
  parentId: z.number().int().optional().nullable(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutTaskInputSchema).optional(),
  children: z.lazy(() => TaskUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutProjectInputSchema),z.lazy(() => TaskUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const TaskCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyProjectInputSchema),z.lazy(() => TaskCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutProjectsInputSchema: z.ZodType<Prisma.UserCreateWithoutProjectsInput> = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  avatar: z.string().optional().nullable(),
  created: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutProjectsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProjectsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  avatar: z.string().optional().nullable(),
  created: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutProjectsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProjectsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProjectsInputSchema) ]),
}).strict();

export const TaskUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutProjectInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutProjectInputSchema),z.lazy(() => TaskUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutProjectInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutProjectInputSchema) ]),
}).strict();

export const TaskScalarWhereInputSchema: z.ZodType<Prisma.TaskScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  done: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  priorityId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  statusId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  parentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  projectId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  index: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  due: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  in_work: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UserUpsertWithoutProjectsInputSchema: z.ZodType<Prisma.UserUpsertWithoutProjectsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProjectsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProjectsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutProjectsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProjectsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProjectsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProjectsInputSchema) ]),
}).strict();

export const UserUpdateWithoutProjectsInputSchema: z.ZodType<Prisma.UserUpdateWithoutProjectsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutProjectsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProjectsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriorityCreateWithoutTaskInputSchema: z.ZodType<Prisma.PriorityCreateWithoutTaskInput> = z.object({
  name: z.string(),
  color: z.string()
}).strict();

export const PriorityUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.PriorityUncheckedCreateWithoutTaskInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  color: z.string()
}).strict();

export const PriorityCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.PriorityCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => PriorityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PriorityCreateWithoutTaskInputSchema),z.lazy(() => PriorityUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const StatusCreateWithoutTaskInputSchema: z.ZodType<Prisma.StatusCreateWithoutTaskInput> = z.object({
  name: z.lazy(() => TASK_STATUSESSchema)
}).strict();

export const StatusUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.StatusUncheckedCreateWithoutTaskInput> = z.object({
  id: z.number().int().optional(),
  name: z.lazy(() => TASK_STATUSESSchema)
}).strict();

export const StatusCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.StatusCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => StatusWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StatusCreateWithoutTaskInputSchema),z.lazy(() => StatusUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const TaskCreateWithoutChildrenInputSchema: z.ZodType<Prisma.TaskCreateWithoutChildrenInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  priority: z.lazy(() => PriorityCreateNestedOneWithoutTaskInputSchema),
  status: z.lazy(() => StatusCreateNestedOneWithoutTaskInputSchema),
  parent: z.lazy(() => TaskCreateNestedOneWithoutChildrenInputSchema).optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutTasksInputSchema),
  files: z.lazy(() => FileCreateNestedManyWithoutTaskInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutChildrenInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutChildrenInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  priorityId: z.number().int(),
  statusId: z.number().int(),
  parentId: z.number().int().optional().nullable(),
  projectId: z.number().int(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutTaskInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutChildrenInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutChildrenInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutChildrenInputSchema),z.lazy(() => TaskUncheckedCreateWithoutChildrenInputSchema) ]),
}).strict();

export const ProjectCreateWithoutTasksInputSchema: z.ZodType<Prisma.ProjectCreateWithoutTasksInput> = z.object({
  name: z.string(),
  created: z.coerce.date().optional(),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutProjectsInputSchema)
}).strict();

export const ProjectUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutTasksInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  created: z.coerce.date().optional(),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  userId: z.number().int()
}).strict();

export const ProjectCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutTasksInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const FileCreateWithoutTaskInputSchema: z.ZodType<Prisma.FileCreateWithoutTaskInput> = z.object({
  src: z.string(),
  created: z.coerce.date().optional()
}).strict();

export const FileUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.FileUncheckedCreateWithoutTaskInput> = z.object({
  id: z.number().int().optional(),
  src: z.string(),
  created: z.coerce.date().optional()
}).strict();

export const FileCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.FileCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FileCreateWithoutTaskInputSchema),z.lazy(() => FileUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const FileCreateManyTaskInputEnvelopeSchema: z.ZodType<Prisma.FileCreateManyTaskInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FileCreateManyTaskInputSchema),z.lazy(() => FileCreateManyTaskInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TaskCreateWithoutParentInputSchema: z.ZodType<Prisma.TaskCreateWithoutParentInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  priority: z.lazy(() => PriorityCreateNestedOneWithoutTaskInputSchema),
  status: z.lazy(() => StatusCreateNestedOneWithoutTaskInputSchema),
  project: z.lazy(() => ProjectCreateNestedOneWithoutTasksInputSchema),
  files: z.lazy(() => FileCreateNestedManyWithoutTaskInputSchema).optional(),
  children: z.lazy(() => TaskCreateNestedManyWithoutParentInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutParentInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutParentInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  priorityId: z.number().int(),
  statusId: z.number().int(),
  projectId: z.number().int(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutTaskInputSchema).optional(),
  children: z.lazy(() => TaskUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutParentInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutParentInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutParentInputSchema),z.lazy(() => TaskUncheckedCreateWithoutParentInputSchema) ]),
}).strict();

export const TaskCreateManyParentInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyParentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyParentInputSchema),z.lazy(() => TaskCreateManyParentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutTaskInputSchema: z.ZodType<Prisma.CommentCreateWithoutTaskInput> = z.object({
  content: z.string(),
  created: z.coerce.date().optional(),
  parent: z.lazy(() => CommentCreateNestedOneWithoutChildrenInputSchema).optional(),
  children: z.lazy(() => CommentCreateNestedManyWithoutParentInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutTaskInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  parentId: z.number().int().optional().nullable(),
  created: z.coerce.date().optional(),
  children: z.lazy(() => CommentUncheckedCreateNestedManyWithoutParentInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutTaskInputSchema),z.lazy(() => CommentUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const CommentCreateManyTaskInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyTaskInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyTaskInputSchema),z.lazy(() => CommentCreateManyTaskInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PriorityUpsertWithoutTaskInputSchema: z.ZodType<Prisma.PriorityUpsertWithoutTaskInput> = z.object({
  update: z.union([ z.lazy(() => PriorityUpdateWithoutTaskInputSchema),z.lazy(() => PriorityUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => PriorityCreateWithoutTaskInputSchema),z.lazy(() => PriorityUncheckedCreateWithoutTaskInputSchema) ]),
  where: z.lazy(() => PriorityWhereInputSchema).optional()
}).strict();

export const PriorityUpdateToOneWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.PriorityUpdateToOneWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => PriorityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PriorityUpdateWithoutTaskInputSchema),z.lazy(() => PriorityUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export const PriorityUpdateWithoutTaskInputSchema: z.ZodType<Prisma.PriorityUpdateWithoutTaskInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriorityUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.PriorityUncheckedUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StatusUpsertWithoutTaskInputSchema: z.ZodType<Prisma.StatusUpsertWithoutTaskInput> = z.object({
  update: z.union([ z.lazy(() => StatusUpdateWithoutTaskInputSchema),z.lazy(() => StatusUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => StatusCreateWithoutTaskInputSchema),z.lazy(() => StatusUncheckedCreateWithoutTaskInputSchema) ]),
  where: z.lazy(() => StatusWhereInputSchema).optional()
}).strict();

export const StatusUpdateToOneWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.StatusUpdateToOneWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => StatusWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StatusUpdateWithoutTaskInputSchema),z.lazy(() => StatusUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export const StatusUpdateWithoutTaskInputSchema: z.ZodType<Prisma.StatusUpdateWithoutTaskInput> = z.object({
  name: z.union([ z.lazy(() => TASK_STATUSESSchema),z.lazy(() => EnumTASK_STATUSESFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StatusUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.StatusUncheckedUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => TASK_STATUSESSchema),z.lazy(() => EnumTASK_STATUSESFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUpsertWithoutChildrenInputSchema: z.ZodType<Prisma.TaskUpsertWithoutChildrenInput> = z.object({
  update: z.union([ z.lazy(() => TaskUpdateWithoutChildrenInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutChildrenInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutChildrenInputSchema),z.lazy(() => TaskUncheckedCreateWithoutChildrenInputSchema) ]),
  where: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const TaskUpdateToOneWithWhereWithoutChildrenInputSchema: z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutChildrenInput> = z.object({
  where: z.lazy(() => TaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskUpdateWithoutChildrenInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutChildrenInputSchema) ]),
}).strict();

export const TaskUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.TaskUpdateWithoutChildrenInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.lazy(() => PriorityUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  status: z.lazy(() => StatusUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  parent: z.lazy(() => TaskUpdateOneWithoutChildrenNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  files: z.lazy(() => FileUpdateManyWithoutTaskNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutChildrenInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priorityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  statusId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutTaskNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const ProjectUpsertWithoutTasksInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutTasksInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutTasksInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const ProjectUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.ProjectUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => ProjectWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutTasksInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutTasksInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutTasksInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProjectsNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileUpsertWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.FileUpsertWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FileUpdateWithoutTaskInputSchema),z.lazy(() => FileUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => FileCreateWithoutTaskInputSchema),z.lazy(() => FileUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const FileUpdateWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.FileUpdateWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => FileWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FileUpdateWithoutTaskInputSchema),z.lazy(() => FileUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export const FileUpdateManyWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.FileUpdateManyWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => FileScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FileUpdateManyMutationInputSchema),z.lazy(() => FileUncheckedUpdateManyWithoutTaskInputSchema) ]),
}).strict();

export const FileScalarWhereInputSchema: z.ZodType<Prisma.FileScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FileScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FileScalarWhereInputSchema),z.lazy(() => FileScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  src: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TaskUpsertWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutParentInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutParentInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutParentInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutParentInputSchema),z.lazy(() => TaskUncheckedCreateWithoutParentInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutParentInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutParentInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutParentInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutParentInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutParentInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutParentInputSchema) ]),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutTaskInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutTaskInputSchema),z.lazy(() => CommentUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutTaskInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutTaskInputSchema) ]),
}).strict();

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  taskId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentCreateWithoutChildrenInputSchema: z.ZodType<Prisma.CommentCreateWithoutChildrenInput> = z.object({
  content: z.string(),
  created: z.coerce.date().optional(),
  parent: z.lazy(() => CommentCreateNestedOneWithoutChildrenInputSchema).optional(),
  task: z.lazy(() => TaskCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutChildrenInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutChildrenInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  parentId: z.number().int().optional().nullable(),
  taskId: z.number().int(),
  created: z.coerce.date().optional()
}).strict();

export const CommentCreateOrConnectWithoutChildrenInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutChildrenInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedCreateWithoutChildrenInputSchema) ]),
}).strict();

export const CommentCreateWithoutParentInputSchema: z.ZodType<Prisma.CommentCreateWithoutParentInput> = z.object({
  content: z.string(),
  created: z.coerce.date().optional(),
  children: z.lazy(() => CommentCreateNestedManyWithoutParentInputSchema).optional(),
  task: z.lazy(() => TaskCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutParentInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutParentInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  taskId: z.number().int(),
  created: z.coerce.date().optional(),
  children: z.lazy(() => CommentUncheckedCreateNestedManyWithoutParentInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutParentInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutParentInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutParentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema) ]),
}).strict();

export const CommentCreateManyParentInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyParentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyParentInputSchema),z.lazy(() => CommentCreateManyParentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TaskCreateWithoutCommentsInputSchema: z.ZodType<Prisma.TaskCreateWithoutCommentsInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  priority: z.lazy(() => PriorityCreateNestedOneWithoutTaskInputSchema),
  status: z.lazy(() => StatusCreateNestedOneWithoutTaskInputSchema),
  parent: z.lazy(() => TaskCreateNestedOneWithoutChildrenInputSchema).optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutTasksInputSchema),
  files: z.lazy(() => FileCreateNestedManyWithoutTaskInputSchema).optional(),
  children: z.lazy(() => TaskCreateNestedManyWithoutParentInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  priorityId: z.number().int(),
  statusId: z.number().int(),
  parentId: z.number().int().optional().nullable(),
  projectId: z.number().int(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutTaskInputSchema).optional(),
  children: z.lazy(() => TaskUncheckedCreateNestedManyWithoutParentInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutCommentsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const CommentUpsertWithoutChildrenInputSchema: z.ZodType<Prisma.CommentUpsertWithoutChildrenInput> = z.object({
  update: z.union([ z.lazy(() => CommentUpdateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutChildrenInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedCreateWithoutChildrenInputSchema) ]),
  where: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const CommentUpdateToOneWithWhereWithoutChildrenInputSchema: z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutChildrenInput> = z.object({
  where: z.lazy(() => CommentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CommentUpdateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutChildrenInputSchema) ]),
}).strict();

export const CommentUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.CommentUpdateWithoutChildrenInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => CommentUpdateOneWithoutChildrenNestedInputSchema).optional(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutChildrenInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taskId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutParentInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutParentInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutParentInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutParentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutParentInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutParentInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutParentInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutParentInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutParentInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutParentInputSchema) ]),
}).strict();

export const TaskUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.TaskUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => TaskUpdateWithoutCommentsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutCommentsInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const TaskUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => TaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskUpdateWithoutCommentsInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const TaskUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.TaskUpdateWithoutCommentsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.lazy(() => PriorityUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  status: z.lazy(() => StatusUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  parent: z.lazy(() => TaskUpdateOneWithoutChildrenNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  files: z.lazy(() => FileUpdateManyWithoutTaskNestedInputSchema).optional(),
  children: z.lazy(() => TaskUpdateManyWithoutParentNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priorityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  statusId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutTaskNestedInputSchema).optional(),
  children: z.lazy(() => TaskUncheckedUpdateManyWithoutParentNestedInputSchema).optional()
}).strict();

export const TaskCreateWithoutFilesInputSchema: z.ZodType<Prisma.TaskCreateWithoutFilesInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  priority: z.lazy(() => PriorityCreateNestedOneWithoutTaskInputSchema),
  status: z.lazy(() => StatusCreateNestedOneWithoutTaskInputSchema),
  parent: z.lazy(() => TaskCreateNestedOneWithoutChildrenInputSchema).optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutTasksInputSchema),
  children: z.lazy(() => TaskCreateNestedManyWithoutParentInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutFilesInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutFilesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  priorityId: z.number().int(),
  statusId: z.number().int(),
  parentId: z.number().int().optional().nullable(),
  projectId: z.number().int(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  children: z.lazy(() => TaskUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutFilesInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutFilesInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutFilesInputSchema),z.lazy(() => TaskUncheckedCreateWithoutFilesInputSchema) ]),
}).strict();

export const TaskUpsertWithoutFilesInputSchema: z.ZodType<Prisma.TaskUpsertWithoutFilesInput> = z.object({
  update: z.union([ z.lazy(() => TaskUpdateWithoutFilesInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutFilesInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutFilesInputSchema),z.lazy(() => TaskUncheckedCreateWithoutFilesInputSchema) ]),
  where: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const TaskUpdateToOneWithWhereWithoutFilesInputSchema: z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutFilesInput> = z.object({
  where: z.lazy(() => TaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskUpdateWithoutFilesInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutFilesInputSchema) ]),
}).strict();

export const TaskUpdateWithoutFilesInputSchema: z.ZodType<Prisma.TaskUpdateWithoutFilesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.lazy(() => PriorityUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  status: z.lazy(() => StatusUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  parent: z.lazy(() => TaskUpdateOneWithoutChildrenNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  children: z.lazy(() => TaskUpdateManyWithoutParentNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutFilesInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutFilesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priorityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  statusId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  children: z.lazy(() => TaskUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskCreateWithoutPriorityInputSchema: z.ZodType<Prisma.TaskCreateWithoutPriorityInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  status: z.lazy(() => StatusCreateNestedOneWithoutTaskInputSchema),
  parent: z.lazy(() => TaskCreateNestedOneWithoutChildrenInputSchema).optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutTasksInputSchema),
  files: z.lazy(() => FileCreateNestedManyWithoutTaskInputSchema).optional(),
  children: z.lazy(() => TaskCreateNestedManyWithoutParentInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutPriorityInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutPriorityInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  statusId: z.number().int(),
  parentId: z.number().int().optional().nullable(),
  projectId: z.number().int(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutTaskInputSchema).optional(),
  children: z.lazy(() => TaskUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutPriorityInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutPriorityInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutPriorityInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPriorityInputSchema) ]),
}).strict();

export const TaskCreateManyPriorityInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyPriorityInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyPriorityInputSchema),z.lazy(() => TaskCreateManyPriorityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TaskUpsertWithWhereUniqueWithoutPriorityInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutPriorityInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutPriorityInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutPriorityInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutPriorityInputSchema),z.lazy(() => TaskUncheckedCreateWithoutPriorityInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutPriorityInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutPriorityInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutPriorityInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutPriorityInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutPriorityInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutPriorityInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutPriorityInputSchema) ]),
}).strict();

export const TaskCreateWithoutStatusInputSchema: z.ZodType<Prisma.TaskCreateWithoutStatusInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  priority: z.lazy(() => PriorityCreateNestedOneWithoutTaskInputSchema),
  parent: z.lazy(() => TaskCreateNestedOneWithoutChildrenInputSchema).optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutTasksInputSchema),
  files: z.lazy(() => FileCreateNestedManyWithoutTaskInputSchema).optional(),
  children: z.lazy(() => TaskCreateNestedManyWithoutParentInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutStatusInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutStatusInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  priorityId: z.number().int(),
  parentId: z.number().int().optional().nullable(),
  projectId: z.number().int(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutTaskInputSchema).optional(),
  children: z.lazy(() => TaskUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutStatusInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutStatusInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutStatusInputSchema),z.lazy(() => TaskUncheckedCreateWithoutStatusInputSchema) ]),
}).strict();

export const TaskCreateManyStatusInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyStatusInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyStatusInputSchema),z.lazy(() => TaskCreateManyStatusInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TaskUpsertWithWhereUniqueWithoutStatusInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutStatusInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutStatusInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutStatusInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutStatusInputSchema),z.lazy(() => TaskUncheckedCreateWithoutStatusInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutStatusInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutStatusInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutStatusInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutStatusInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutStatusInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutStatusInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutStatusInputSchema) ]),
}).strict();

export const ProjectCreateManyUserInputSchema: z.ZodType<Prisma.ProjectCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  created: z.coerce.date().optional(),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable()
}).strict();

export const ProjectUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  color: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TaskCreateManyProjectInputSchema: z.ZodType<Prisma.TaskCreateManyProjectInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  priorityId: z.number().int(),
  statusId: z.number().int(),
  parentId: z.number().int().optional().nullable(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable()
}).strict();

export const TaskUpdateWithoutProjectInputSchema: z.ZodType<Prisma.TaskUpdateWithoutProjectInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.lazy(() => PriorityUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  status: z.lazy(() => StatusUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  parent: z.lazy(() => TaskUpdateOneWithoutChildrenNestedInputSchema).optional(),
  files: z.lazy(() => FileUpdateManyWithoutTaskNestedInputSchema).optional(),
  children: z.lazy(() => TaskUpdateManyWithoutParentNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priorityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  statusId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutTaskNestedInputSchema).optional(),
  children: z.lazy(() => TaskUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutProjectInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutProjectInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priorityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  statusId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FileCreateManyTaskInputSchema: z.ZodType<Prisma.FileCreateManyTaskInput> = z.object({
  id: z.number().int().optional(),
  src: z.string(),
  created: z.coerce.date().optional()
}).strict();

export const TaskCreateManyParentInputSchema: z.ZodType<Prisma.TaskCreateManyParentInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  priorityId: z.number().int(),
  statusId: z.number().int(),
  projectId: z.number().int(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable()
}).strict();

export const CommentCreateManyTaskInputSchema: z.ZodType<Prisma.CommentCreateManyTaskInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  parentId: z.number().int().optional().nullable(),
  created: z.coerce.date().optional()
}).strict();

export const FileUpdateWithoutTaskInputSchema: z.ZodType<Prisma.FileUpdateWithoutTaskInput> = z.object({
  src: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.FileUncheckedUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  src: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FileUncheckedUpdateManyWithoutTaskInputSchema: z.ZodType<Prisma.FileUncheckedUpdateManyWithoutTaskInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  src: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUpdateWithoutParentInputSchema: z.ZodType<Prisma.TaskUpdateWithoutParentInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.lazy(() => PriorityUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  status: z.lazy(() => StatusUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  files: z.lazy(() => FileUpdateManyWithoutTaskNestedInputSchema).optional(),
  children: z.lazy(() => TaskUpdateManyWithoutParentNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutParentInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutParentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priorityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  statusId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutTaskNestedInputSchema).optional(),
  children: z.lazy(() => TaskUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutParentInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutParentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priorityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  statusId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  projectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CommentUpdateWithoutTaskInputSchema: z.ZodType<Prisma.CommentUpdateWithoutTaskInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  parent: z.lazy(() => CommentUpdateOneWithoutChildrenNestedInputSchema).optional(),
  children: z.lazy(() => CommentUpdateManyWithoutParentNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  children: z.lazy(() => CommentUncheckedUpdateManyWithoutParentNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateManyWithoutTaskInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutTaskInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyParentInputSchema: z.ZodType<Prisma.CommentCreateManyParentInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  taskId: z.number().int(),
  created: z.coerce.date().optional()
}).strict();

export const CommentUpdateWithoutParentInputSchema: z.ZodType<Prisma.CommentUpdateWithoutParentInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  children: z.lazy(() => CommentUpdateManyWithoutParentNestedInputSchema).optional(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutParentInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutParentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  children: z.lazy(() => CommentUncheckedUpdateManyWithoutParentNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateManyWithoutParentInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutParentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskCreateManyPriorityInputSchema: z.ZodType<Prisma.TaskCreateManyPriorityInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  statusId: z.number().int(),
  parentId: z.number().int().optional().nullable(),
  projectId: z.number().int(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable()
}).strict();

export const TaskUpdateWithoutPriorityInputSchema: z.ZodType<Prisma.TaskUpdateWithoutPriorityInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.lazy(() => StatusUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  parent: z.lazy(() => TaskUpdateOneWithoutChildrenNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  files: z.lazy(() => FileUpdateManyWithoutTaskNestedInputSchema).optional(),
  children: z.lazy(() => TaskUpdateManyWithoutParentNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutPriorityInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutPriorityInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statusId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutTaskNestedInputSchema).optional(),
  children: z.lazy(() => TaskUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutPriorityInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutPriorityInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statusId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TaskCreateManyStatusInputSchema: z.ZodType<Prisma.TaskCreateManyStatusInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created: z.coerce.date().optional(),
  done: z.coerce.date().optional().nullable(),
  priorityId: z.number().int(),
  parentId: z.number().int().optional().nullable(),
  projectId: z.number().int(),
  index: z.number().int().optional(),
  due: z.coerce.date().optional().nullable(),
  in_work: z.coerce.date().optional().nullable()
}).strict();

export const TaskUpdateWithoutStatusInputSchema: z.ZodType<Prisma.TaskUpdateWithoutStatusInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priority: z.lazy(() => PriorityUpdateOneRequiredWithoutTaskNestedInputSchema).optional(),
  parent: z.lazy(() => TaskUpdateOneWithoutChildrenNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
  files: z.lazy(() => FileUpdateManyWithoutTaskNestedInputSchema).optional(),
  children: z.lazy(() => TaskUpdateManyWithoutParentNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutStatusInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutStatusInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priorityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutTaskNestedInputSchema).optional(),
  children: z.lazy(() => TaskUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutStatusInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutStatusInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  priorityId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  index: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  due: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  in_work: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const ProjectFindFirstArgsSchema: z.ZodType<Prisma.ProjectFindFirstArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindFirstOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectFindManyArgsSchema: z.ZodType<Prisma.ProjectFindManyArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProjectAggregateArgsSchema: z.ZodType<Prisma.ProjectAggregateArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectGroupByArgsSchema: z.ZodType<Prisma.ProjectGroupByArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithAggregationInputSchema.array(),ProjectOrderByWithAggregationInputSchema ]).optional(),
  by: ProjectScalarFieldEnumSchema.array(),
  having: ProjectScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProjectFindUniqueArgsSchema: z.ZodType<Prisma.ProjectFindUniqueArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindUniqueOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const TaskFindFirstArgsSchema: z.ZodType<Prisma.TaskFindFirstArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskFindFirstOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindManyArgsSchema: z.ZodType<Prisma.TaskFindManyArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskAggregateArgsSchema: z.ZodType<Prisma.TaskAggregateArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskGroupByArgsSchema: z.ZodType<Prisma.TaskGroupByArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithAggregationInputSchema.array(),TaskOrderByWithAggregationInputSchema ]).optional(),
  by: TaskScalarFieldEnumSchema.array(),
  having: TaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskFindUniqueArgsSchema: z.ZodType<Prisma.TaskFindUniqueArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskFindUniqueOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithAggregationInputSchema.array(),CommentOrderByWithAggregationInputSchema ]).optional(),
  by: CommentScalarFieldEnumSchema.array(),
  having: CommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const FileFindFirstArgsSchema: z.ZodType<Prisma.FileFindFirstArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FileScalarFieldEnumSchema,FileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FileFindFirstOrThrowArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FileScalarFieldEnumSchema,FileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FileFindManyArgsSchema: z.ZodType<Prisma.FileFindManyArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FileScalarFieldEnumSchema,FileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FileAggregateArgsSchema: z.ZodType<Prisma.FileAggregateArgs> = z.object({
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithRelationInputSchema.array(),FileOrderByWithRelationInputSchema ]).optional(),
  cursor: FileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FileGroupByArgsSchema: z.ZodType<Prisma.FileGroupByArgs> = z.object({
  where: FileWhereInputSchema.optional(),
  orderBy: z.union([ FileOrderByWithAggregationInputSchema.array(),FileOrderByWithAggregationInputSchema ]).optional(),
  by: FileScalarFieldEnumSchema.array(),
  having: FileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FileFindUniqueArgsSchema: z.ZodType<Prisma.FileFindUniqueArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
}).strict() ;

export const FileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FileFindUniqueOrThrowArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
}).strict() ;

export const PriorityFindFirstArgsSchema: z.ZodType<Prisma.PriorityFindFirstArgs> = z.object({
  select: PrioritySelectSchema.optional(),
  include: PriorityIncludeSchema.optional(),
  where: PriorityWhereInputSchema.optional(),
  orderBy: z.union([ PriorityOrderByWithRelationInputSchema.array(),PriorityOrderByWithRelationInputSchema ]).optional(),
  cursor: PriorityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PriorityScalarFieldEnumSchema,PriorityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PriorityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PriorityFindFirstOrThrowArgs> = z.object({
  select: PrioritySelectSchema.optional(),
  include: PriorityIncludeSchema.optional(),
  where: PriorityWhereInputSchema.optional(),
  orderBy: z.union([ PriorityOrderByWithRelationInputSchema.array(),PriorityOrderByWithRelationInputSchema ]).optional(),
  cursor: PriorityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PriorityScalarFieldEnumSchema,PriorityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PriorityFindManyArgsSchema: z.ZodType<Prisma.PriorityFindManyArgs> = z.object({
  select: PrioritySelectSchema.optional(),
  include: PriorityIncludeSchema.optional(),
  where: PriorityWhereInputSchema.optional(),
  orderBy: z.union([ PriorityOrderByWithRelationInputSchema.array(),PriorityOrderByWithRelationInputSchema ]).optional(),
  cursor: PriorityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PriorityScalarFieldEnumSchema,PriorityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PriorityAggregateArgsSchema: z.ZodType<Prisma.PriorityAggregateArgs> = z.object({
  where: PriorityWhereInputSchema.optional(),
  orderBy: z.union([ PriorityOrderByWithRelationInputSchema.array(),PriorityOrderByWithRelationInputSchema ]).optional(),
  cursor: PriorityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PriorityGroupByArgsSchema: z.ZodType<Prisma.PriorityGroupByArgs> = z.object({
  where: PriorityWhereInputSchema.optional(),
  orderBy: z.union([ PriorityOrderByWithAggregationInputSchema.array(),PriorityOrderByWithAggregationInputSchema ]).optional(),
  by: PriorityScalarFieldEnumSchema.array(),
  having: PriorityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PriorityFindUniqueArgsSchema: z.ZodType<Prisma.PriorityFindUniqueArgs> = z.object({
  select: PrioritySelectSchema.optional(),
  include: PriorityIncludeSchema.optional(),
  where: PriorityWhereUniqueInputSchema,
}).strict() ;

export const PriorityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PriorityFindUniqueOrThrowArgs> = z.object({
  select: PrioritySelectSchema.optional(),
  include: PriorityIncludeSchema.optional(),
  where: PriorityWhereUniqueInputSchema,
}).strict() ;

export const StatusFindFirstArgsSchema: z.ZodType<Prisma.StatusFindFirstArgs> = z.object({
  select: StatusSelectSchema.optional(),
  include: StatusIncludeSchema.optional(),
  where: StatusWhereInputSchema.optional(),
  orderBy: z.union([ StatusOrderByWithRelationInputSchema.array(),StatusOrderByWithRelationInputSchema ]).optional(),
  cursor: StatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StatusScalarFieldEnumSchema,StatusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StatusFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StatusFindFirstOrThrowArgs> = z.object({
  select: StatusSelectSchema.optional(),
  include: StatusIncludeSchema.optional(),
  where: StatusWhereInputSchema.optional(),
  orderBy: z.union([ StatusOrderByWithRelationInputSchema.array(),StatusOrderByWithRelationInputSchema ]).optional(),
  cursor: StatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StatusScalarFieldEnumSchema,StatusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StatusFindManyArgsSchema: z.ZodType<Prisma.StatusFindManyArgs> = z.object({
  select: StatusSelectSchema.optional(),
  include: StatusIncludeSchema.optional(),
  where: StatusWhereInputSchema.optional(),
  orderBy: z.union([ StatusOrderByWithRelationInputSchema.array(),StatusOrderByWithRelationInputSchema ]).optional(),
  cursor: StatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StatusScalarFieldEnumSchema,StatusScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StatusAggregateArgsSchema: z.ZodType<Prisma.StatusAggregateArgs> = z.object({
  where: StatusWhereInputSchema.optional(),
  orderBy: z.union([ StatusOrderByWithRelationInputSchema.array(),StatusOrderByWithRelationInputSchema ]).optional(),
  cursor: StatusWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StatusGroupByArgsSchema: z.ZodType<Prisma.StatusGroupByArgs> = z.object({
  where: StatusWhereInputSchema.optional(),
  orderBy: z.union([ StatusOrderByWithAggregationInputSchema.array(),StatusOrderByWithAggregationInputSchema ]).optional(),
  by: StatusScalarFieldEnumSchema.array(),
  having: StatusScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StatusFindUniqueArgsSchema: z.ZodType<Prisma.StatusFindUniqueArgs> = z.object({
  select: StatusSelectSchema.optional(),
  include: StatusIncludeSchema.optional(),
  where: StatusWhereUniqueInputSchema,
}).strict() ;

export const StatusFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StatusFindUniqueOrThrowArgs> = z.object({
  select: StatusSelectSchema.optional(),
  include: StatusIncludeSchema.optional(),
  where: StatusWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const ProjectCreateArgsSchema: z.ZodType<Prisma.ProjectCreateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
}).strict() ;

export const ProjectUpsertArgsSchema: z.ZodType<Prisma.ProjectUpsertArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
  create: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
  update: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProjectCreateManyArgsSchema: z.ZodType<Prisma.ProjectCreateManyArgs> = z.object({
  data: z.union([ ProjectCreateManyInputSchema,ProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProjectCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProjectCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProjectCreateManyInputSchema,ProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProjectDeleteArgsSchema: z.ZodType<Prisma.ProjectDeleteArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectUpdateArgsSchema: z.ZodType<Prisma.ProjectUpdateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
  where: ProjectWhereUniqueInputSchema,
}).strict() ;

export const ProjectUpdateManyArgsSchema: z.ZodType<Prisma.ProjectUpdateManyArgs> = z.object({
  data: z.union([ ProjectUpdateManyMutationInputSchema,ProjectUncheckedUpdateManyInputSchema ]),
  where: ProjectWhereInputSchema.optional(),
}).strict() ;

export const ProjectDeleteManyArgsSchema: z.ZodType<Prisma.ProjectDeleteManyArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
}).strict() ;

export const TaskCreateArgsSchema: z.ZodType<Prisma.TaskCreateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
}).strict() ;

export const TaskUpsertArgsSchema: z.ZodType<Prisma.TaskUpsertArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
  create: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
  update: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
}).strict() ;

export const TaskCreateManyArgsSchema: z.ZodType<Prisma.TaskCreateManyArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TaskCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TaskCreateManyAndReturnArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TaskDeleteArgsSchema: z.ZodType<Prisma.TaskDeleteArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateArgsSchema: z.ZodType<Prisma.TaskUpdateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateManyArgsSchema: z.ZodType<Prisma.TaskUpdateManyArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
}).strict() ;

export const TaskDeleteManyArgsSchema: z.ZodType<Prisma.TaskDeleteManyArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
}).strict() ;

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
}).strict() ;

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
  create: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
  update: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema,CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(),
}).strict() ;

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
}).strict() ;

export const FileCreateArgsSchema: z.ZodType<Prisma.FileCreateArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  data: z.union([ FileCreateInputSchema,FileUncheckedCreateInputSchema ]),
}).strict() ;

export const FileUpsertArgsSchema: z.ZodType<Prisma.FileUpsertArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
  create: z.union([ FileCreateInputSchema,FileUncheckedCreateInputSchema ]),
  update: z.union([ FileUpdateInputSchema,FileUncheckedUpdateInputSchema ]),
}).strict() ;

export const FileCreateManyArgsSchema: z.ZodType<Prisma.FileCreateManyArgs> = z.object({
  data: z.union([ FileCreateManyInputSchema,FileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FileCreateManyAndReturnArgs> = z.object({
  data: z.union([ FileCreateManyInputSchema,FileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FileDeleteArgsSchema: z.ZodType<Prisma.FileDeleteArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  where: FileWhereUniqueInputSchema,
}).strict() ;

export const FileUpdateArgsSchema: z.ZodType<Prisma.FileUpdateArgs> = z.object({
  select: FileSelectSchema.optional(),
  include: FileIncludeSchema.optional(),
  data: z.union([ FileUpdateInputSchema,FileUncheckedUpdateInputSchema ]),
  where: FileWhereUniqueInputSchema,
}).strict() ;

export const FileUpdateManyArgsSchema: z.ZodType<Prisma.FileUpdateManyArgs> = z.object({
  data: z.union([ FileUpdateManyMutationInputSchema,FileUncheckedUpdateManyInputSchema ]),
  where: FileWhereInputSchema.optional(),
}).strict() ;

export const FileDeleteManyArgsSchema: z.ZodType<Prisma.FileDeleteManyArgs> = z.object({
  where: FileWhereInputSchema.optional(),
}).strict() ;

export const PriorityCreateArgsSchema: z.ZodType<Prisma.PriorityCreateArgs> = z.object({
  select: PrioritySelectSchema.optional(),
  include: PriorityIncludeSchema.optional(),
  data: z.union([ PriorityCreateInputSchema,PriorityUncheckedCreateInputSchema ]),
}).strict() ;

export const PriorityUpsertArgsSchema: z.ZodType<Prisma.PriorityUpsertArgs> = z.object({
  select: PrioritySelectSchema.optional(),
  include: PriorityIncludeSchema.optional(),
  where: PriorityWhereUniqueInputSchema,
  create: z.union([ PriorityCreateInputSchema,PriorityUncheckedCreateInputSchema ]),
  update: z.union([ PriorityUpdateInputSchema,PriorityUncheckedUpdateInputSchema ]),
}).strict() ;

export const PriorityCreateManyArgsSchema: z.ZodType<Prisma.PriorityCreateManyArgs> = z.object({
  data: z.union([ PriorityCreateManyInputSchema,PriorityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PriorityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PriorityCreateManyAndReturnArgs> = z.object({
  data: z.union([ PriorityCreateManyInputSchema,PriorityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PriorityDeleteArgsSchema: z.ZodType<Prisma.PriorityDeleteArgs> = z.object({
  select: PrioritySelectSchema.optional(),
  include: PriorityIncludeSchema.optional(),
  where: PriorityWhereUniqueInputSchema,
}).strict() ;

export const PriorityUpdateArgsSchema: z.ZodType<Prisma.PriorityUpdateArgs> = z.object({
  select: PrioritySelectSchema.optional(),
  include: PriorityIncludeSchema.optional(),
  data: z.union([ PriorityUpdateInputSchema,PriorityUncheckedUpdateInputSchema ]),
  where: PriorityWhereUniqueInputSchema,
}).strict() ;

export const PriorityUpdateManyArgsSchema: z.ZodType<Prisma.PriorityUpdateManyArgs> = z.object({
  data: z.union([ PriorityUpdateManyMutationInputSchema,PriorityUncheckedUpdateManyInputSchema ]),
  where: PriorityWhereInputSchema.optional(),
}).strict() ;

export const PriorityDeleteManyArgsSchema: z.ZodType<Prisma.PriorityDeleteManyArgs> = z.object({
  where: PriorityWhereInputSchema.optional(),
}).strict() ;

export const StatusCreateArgsSchema: z.ZodType<Prisma.StatusCreateArgs> = z.object({
  select: StatusSelectSchema.optional(),
  include: StatusIncludeSchema.optional(),
  data: z.union([ StatusCreateInputSchema,StatusUncheckedCreateInputSchema ]),
}).strict() ;

export const StatusUpsertArgsSchema: z.ZodType<Prisma.StatusUpsertArgs> = z.object({
  select: StatusSelectSchema.optional(),
  include: StatusIncludeSchema.optional(),
  where: StatusWhereUniqueInputSchema,
  create: z.union([ StatusCreateInputSchema,StatusUncheckedCreateInputSchema ]),
  update: z.union([ StatusUpdateInputSchema,StatusUncheckedUpdateInputSchema ]),
}).strict() ;

export const StatusCreateManyArgsSchema: z.ZodType<Prisma.StatusCreateManyArgs> = z.object({
  data: z.union([ StatusCreateManyInputSchema,StatusCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StatusCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StatusCreateManyAndReturnArgs> = z.object({
  data: z.union([ StatusCreateManyInputSchema,StatusCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StatusDeleteArgsSchema: z.ZodType<Prisma.StatusDeleteArgs> = z.object({
  select: StatusSelectSchema.optional(),
  include: StatusIncludeSchema.optional(),
  where: StatusWhereUniqueInputSchema,
}).strict() ;

export const StatusUpdateArgsSchema: z.ZodType<Prisma.StatusUpdateArgs> = z.object({
  select: StatusSelectSchema.optional(),
  include: StatusIncludeSchema.optional(),
  data: z.union([ StatusUpdateInputSchema,StatusUncheckedUpdateInputSchema ]),
  where: StatusWhereUniqueInputSchema,
}).strict() ;

export const StatusUpdateManyArgsSchema: z.ZodType<Prisma.StatusUpdateManyArgs> = z.object({
  data: z.union([ StatusUpdateManyMutationInputSchema,StatusUncheckedUpdateManyInputSchema ]),
  where: StatusWhereInputSchema.optional(),
}).strict() ;

export const StatusDeleteManyArgsSchema: z.ZodType<Prisma.StatusDeleteManyArgs> = z.object({
  where: StatusWhereInputSchema.optional(),
}).strict() ;