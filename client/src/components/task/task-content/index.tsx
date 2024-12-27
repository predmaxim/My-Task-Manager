import { CSSProperties, FormEventHandler, useMemo, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { STATUS_COLOR_KEYS, StatusColorKeyType, TASK_PRIORITY } from '@/constants';
import { formatDate, formatDateTimeLocal, getContrastTextColor, upperCaseFirstLetter } from '@/utils/helpers.ts';
import { CommentType, PartialTaskType, TaskType } from '@/types';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib/store';
import { TaskSchema } from '@/zod-schemas/custom';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from '@/services/tasks-service.ts';
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useUpdateCommentMutation,
} from '@/services/comments-service.ts';
import { ActionMenuItem, ActionsMenu } from '@/components/ui/actions-menu';
import { ColorPicker } from '@/components/ui/color-picker';

type TaskFormFields = {
  name: HTMLTextAreaElement;
  statusId: HTMLSelectElement;
  description?: HTMLTextAreaElement;
  priorityId: HTMLSelectElement;
  due?: HTMLInputElement;
  comments?: HTMLTextAreaElement;
  subTasks?: HTMLTextAreaElement;
};

export type TaskContentType = {
  task: TaskType;
  onSubmit: (task: Partial<TaskType>) => void;
};

export function TaskContent({ task, onSubmit }: TaskContentType) {  
  const taskStatuses = useAppSelector((state) => state.statuses.taskStatuses) || [];
  const currentStatus = taskStatuses.find((status) => status.id === task.statusId);
  const [subTaskDraft, setSubTaskDraft] = useState('');
  const [editingSubTaskId, setEditingSubTaskId] = useState<TaskType['id'] | null>(null);
  const [editingSubTaskName, setEditingSubTaskName] = useState('');
  const [commentDraft, setCommentDraft] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<CommentType['id'] | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');

  const { data: projectTasks = [] } = useGetTasksQuery(task.projectId);
  const { data: comments = [] } = useGetCommentsQuery(task.id);
  const [createSubTask, { isLoading: isSubTaskCreating }] = useCreateTaskMutation();
  const [updateSubTask, { isLoading: isSubTaskUpdating }] = useUpdateTaskMutation();
  const [deleteSubTask] = useDeleteTaskMutation();
  const [createComment, { isLoading: isCommentCreating }] = useCreateCommentMutation();
  const [updateComment, { isLoading: isCommentUpdating }] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  // const genDone = () => {
  //   if (task.done) {
  //     return new Date();
  //   } 
    
  //   return null;
  // };

  const onSubmitHandler: FormEventHandler<HTMLFormElement & TaskFormFields> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    const parsedTask = TaskSchema.partial().parse({
      ...formData,
      statusId: Number(formData.statusId),
      due: formData.due ? formData.due : null,
    });

    onSubmit(parsedTask);
  };

  const onCreateComment = async () => {
    const content = commentDraft.trim();
    if (!content) {
      return;
    }

    await createComment({
      content,
      parentId: null,
      taskId: task.id,
      color: null,
    }).unwrap();

    setCommentDraft('');
  };

  const onStartCommentEdit = (comment: CommentType) => {
    setEditingCommentId(comment.id);
    setEditingCommentContent(comment.content);
  };

  const onCancelCommentEdit = () => {
    setEditingCommentId(null);
    setEditingCommentContent('');
  };

  const onSaveCommentEdit = async (comment: CommentType) => {
    const nextContent = editingCommentContent.trim();
    if (!nextContent) {
      return;
    }

    await updateComment({
      id: comment.id,
      content: nextContent,
      taskId: task.id,
    }).unwrap();

    onCancelCommentEdit();
  };

  const onDeleteComment = async (commentId: CommentType['id']) => {
    if (!window.confirm('Удалить комментарий?')) {
      return;
    }

    await deleteComment({ id: commentId, taskId: task.id }).unwrap();

    if (editingCommentId === commentId) {
      onCancelCommentEdit();
    }
  };

  const onColorComment = async (commentId: CommentType['id'], color: StatusColorKeyType | null) => {
    await updateComment({
      id: commentId,
      color,
      taskId: task.id,
    }).unwrap();
  };

  const getCommentItemStyle = useMemo(() => {
    return (comment: CommentType): CSSProperties => {
      if (!comment.color) {
        return {};
      }

      const cssVarName = `--status-column-${comment.color}`;
      const resolvedColor = getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim();
      const textColor = getContrastTextColor(resolvedColor || '#ffffff');

      return {
        '--comment-bg': `var(${cssVarName})`,
        '--comment-text': textColor,
      } as CSSProperties;
    };
  }, []);

  const sortedComments = useMemo(
    () => [...comments].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()),
    [comments],
  );

  const subTasks = useMemo(
    () => projectTasks
      .filter((projectTask) => projectTask.parentId === task.id)
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()),
    [projectTasks, task.id],
  );

  const doneSubTasksCount = useMemo(
    () => subTasks.filter((subTask) => Boolean(subTask.done)).length,
    [subTasks],
  );

  const subTasksProgress = subTasks.length
    ? Math.round((doneSubTasksCount / subTasks.length) * 100)
    : 0;

  const onCreateSubTask = async () => {
    const name = subTaskDraft.trim();
    if (!name) {
      return;
    }

    const newSubTask: PartialTaskType = {
      name,
      projectId: task.projectId,
      statusId: task.statusId,
      done: null,
      priority: 'low',
      order: 0,
      description: '',
      inWork: null,
      created: new Date(),
      due: null,
      parentId: task.id,
    };

    await createSubTask(newSubTask).unwrap();
    setSubTaskDraft('');
  };

  const onStartSubTaskEdit = (subTask: TaskType) => {
    setEditingSubTaskId(subTask.id);
    setEditingSubTaskName(subTask.name);
  };

  const onCancelSubTaskEdit = () => {
    setEditingSubTaskId(null);
    setEditingSubTaskName('');
  };

  const onSaveSubTaskEdit = async (subTask: TaskType) => {
    const nextName = editingSubTaskName.trim();
    if (!nextName) {
      return;
    }

    await updateSubTask({
      ...subTask,
      name: nextName,
    }).unwrap();

    onCancelSubTaskEdit();
  };

  const onDeleteSubTask = async (subTaskId: TaskType['id']) => {
    if (!window.confirm('Удалить подзадачу?')) {
      return;
    }

    await deleteSubTask(subTaskId).unwrap();

    if (editingSubTaskId === subTaskId) {
      onCancelSubTaskEdit();
    }
  };

  const onToggleSubTaskDone = async (subTask: TaskType) => {
    await updateSubTask({
      ...subTask,
      done: subTask.done ? null : new Date(),
    }).unwrap();
  };

  const onColorSubTask = async (subTask: TaskType, priority: TaskType['priority']) => {
    await updateSubTask({
      ...subTask,
      priority,
    }).unwrap();
  };

  if (!currentStatus) {
    return null;
  }

  return (
    <form className={styles.TaskContent} id="TaskContentForm" onSubmit={onSubmitHandler}>
      <div className={styles.TaskContent__name}>
        <span className={`${styles.label} ${styles['label-textarea-name']}`}>Name:</span>
        <TextareaAutosize
          name="name"
          className={styles.nameInput}
          autoFocus={true}
          defaultValue={task.name}
        />
      </div>
      <div className={styles.TaskContent__status}>
        <span className={`${styles.label} ${styles['label-status']}`}>Status:</span>
        <select
          name="statusId"
          className={styles.statusSelect}
          defaultValue={String(currentStatus.id)}
        >
          {taskStatuses.map((status) => (
            <option
              value={status.id}
              key={status.id}
            >
              {upperCaseFirstLetter(status.name)}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.TaskContent__priority}>
        <span className={`${styles.label} ${styles['label-priority']}`}>Priority:</span>
        <select
          name="priority"
          className={styles.prioritySelect}
          defaultValue={task.priority}
        >
          {Object.values(TASK_PRIORITY).map((priority) => (
            <option
              value={priority}
              key={priority}
            >
              {upperCaseFirstLetter(priority)}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.TaskContent__due}>
        <span className={`${styles.label} ${styles['label-due']}`}>Due:</span>
        <input
          name="due"
          className={styles.dueSelect}
          type="date"
          defaultValue={task.due ? formatDate(task.due) : ''}
        />
      </div>
      <div className={styles.TaskContent__description}>
        <span className={`${styles.label} ${styles['label-description']}`}>Description:</span>
        <textarea
          name="description"
          className={styles.descriptionInput}
          placeholder="Some Description"
          defaultValue={task?.description || ''}
        />
      </div>
      <div className={styles.TaskContent__info}>
        {task.created &&
          <div className={styles.created}>
            <span className={styles.created__title}>Created:</span>
            <span className={styles.created__date}>
              {formatDate(task.created)}
            </span>
          </div>}
        {task.inWork &&
          <div className={styles.inWork}>
            <span className={styles.inWork__title}>In work:</span>
            <span className={styles.inWork__date}>
              {formatDate(task?.inWork)}
            </span>
          </div>}
        {task.done &&
          <div className={styles.done}>
            <span className={styles.done__title}>Done:</span>
            <span className={styles.done__date}>
              {formatDate(task.done)}
            </span>
          </div>
        }
      </div>
      {/*<div className={styles.TaskContent__files}>*/}
      {/*  {task.files?.length*/}
      {/*    ? task.files?.map(file => (*/}
      {/*      <button key={file} type="button" className={`${styles.button} big`}>*/}
      {/*        {file}*/}
      {/*      </button>*/}
      {/*    ))*/}
      {/*    : <button className={styles.addFilesBtn} type="button">+ Add File</button>*/}
      {/*  }*/}
      {/*</div>*/}
      <hr className={styles.TaskContent__hr} />

      <div className={styles.TaskContent__subTaskProgress}>
        <div className={styles.subTaskProgress__head}>
          <span className={styles.subTaskProgress__label}>SubTasks Progress</span>
          <span className={styles.subTaskProgress__meta}>{doneSubTasksCount}/{subTasks.length}</span>
        </div>
        <div className={styles.subTaskProgress__track}>
          <div
            className={styles.subTaskProgress__value}
            style={{ width: `${subTasksProgress}%` }}
          />
        </div>
      </div>

      <div className={styles.TaskContent__subTasks}>
        <span className={`${styles.label} ${styles['label-subTasks']}`}>SubTasks:</span>
        <div className={styles.subTaskCreator}>
          <input
            type="text"
            className={styles.subTaskCreator__input}
            value={subTaskDraft}
            onChange={(e) => setSubTaskDraft(e.currentTarget.value)}
            onKeyDown={async (e) => {
              if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                await onCreateSubTask();
              }
            }}
            placeholder="Новая подзадача"
          />
          <button
            type="button"
            className={`button button-big ${styles.subTaskCreator__addBtn}`}
            disabled={!subTaskDraft.trim() || isSubTaskCreating}
            onClick={onCreateSubTask}
          >
            Add
          </button>
        </div>
      </div>

      <div className={styles.TaskContent__subTasksList}>
        {!subTasks.length && (
          <div className={styles.emptySubTasks}>Подзадач пока нет</div>
        )}
        {!!subTasks.length && subTasks.map((subTask) => {
          const isEditing = editingSubTaskId === subTask.id;

          const subTaskActions: ActionMenuItem<TaskType['id']>[] = [
            {
              key: 'edit',
              label: 'Редактировать',
              onSelect: () => onStartSubTaskEdit(subTask),
            },
            {
              key: 'remove',
              label: 'Удалить',
              variant: 'danger',
              onSelect: async () => {
                await onDeleteSubTask(subTask.id);
              },
            },
          ];

          return (
            <div
              key={subTask.id}
              className={`${styles.subTaskItem} ${subTask.done ? styles.subTaskItem_done : ''}`}
              style={{ '--subtask-line-color': `var(--task-priority-${subTask.priority})` } as CSSProperties}
            >
              <div className={styles.subTaskItem__header}>
                <input
                  type="checkbox"
                  className={styles.subTaskItem__checkbox}
                  checked={Boolean(subTask.done)}
                  onChange={async () => {
                    await onToggleSubTaskDone(subTask);
                  }}
                />

                {!isEditing && (
                  <span className={styles.subTaskItem__name}>{subTask.name}</span>
                )}

                {isEditing && (
                  <input
                    type="text"
                    className={styles.subTaskItem__nameInput}
                    value={editingSubTaskName}
                    onChange={(e) => setEditingSubTaskName(e.currentTarget.value)}
                    autoFocus
                  />
                )}

                <ActionsMenu
                  id={subTask.id}
                  buttonClassName={styles.subTaskItem__menuBtn}
                  actions={subTaskActions}
                  renderContent={({ closeMenu }) => (
                    <ColorPicker<TaskType['priority']>
                      colorKeys={Object.values(TASK_PRIORITY)}
                      currentColor={subTask.priority}
                      noColorLabel="Без цвета"
                      colorVarPrefix="--task-priority"
                      onSelectColor={async (priority) => {
                        await onColorSubTask(subTask, priority || 'low');
                        closeMenu();
                      }}
                    />
                  )}
                />
              </div>

              {isEditing && (
                <div className={styles.subTaskItem__editActions}>
                  <button
                    type="button"
                    className={`button button-s ${styles.subTaskItem__saveBtn}`}
                    disabled={!editingSubTaskName.trim() || isSubTaskUpdating}
                    onClick={async () => {
                      await onSaveSubTaskEdit(subTask);
                    }}
                  >
                    Сохранить
                  </button>
                  <button
                    type="button"
                    className={`button button-s ${styles.subTaskItem__cancelBtn}`}
                    onClick={onCancelSubTaskEdit}
                  >
                    Отмена
                  </button>
                </div>
              )}

              {subTask.done && (
                <p className={styles.subTaskItem__doneDate}>done: {formatDate(subTask.done)}</p>
              )}
            </div>
          );
        })}
      </div>

      <hr className={styles.TaskContent__subTasksHr} />

      <div className={styles.TaskContent__comments}>
        <span className={`${styles.label} ${styles['label-comments']}`}>Comment:</span>
        <TextareaAutosize
          value={commentDraft}
          onChange={(e) => setCommentDraft(e.currentTarget.value)}
          className={styles.commentInput}
          placeholder="Оставить комментарий"
          minRows={3}
          maxRows={3}
        />
      </div>
      <div className={styles.TaskContent__commentBtn}>
        <button
          type="button"
          className={`button button-big ${styles.commentBtn}`}
          onClick={onCreateComment}
          disabled={!commentDraft.trim() || isCommentCreating}
        >
          Comment
        </button>
      </div>

      <div className={styles.TaskContent__commentsList}>
        {!comments.length && (
          <div className={styles.emptyComments}>Комментариев пока нет</div>
        )}
        {!!sortedComments.length && sortedComments.map((comment) => {
          const isEditing = editingCommentId === comment.id;
          const isEdited = new Date(comment.updated).getTime() > new Date(comment.created).getTime() + 1000;

          const commentActions: ActionMenuItem<CommentType['id']>[] = [
            {
              key: 'edit',
              label: 'Редактировать',
              onSelect: () => onStartCommentEdit(comment),
            },
            {
              key: 'remove',
              label: 'Удалить',
              variant: 'danger',
              onSelect: async () => {
                await onDeleteComment(comment.id);
              },
            },
          ];

          return (
            <div
              key={comment.id}
              className={`${styles.commentItem} ${comment.color ? styles.commentItem_colored : ''}`}
              style={getCommentItemStyle(comment)}
            >
              <div className={styles.commentItem__header}>
                <span className={styles.commentItem__date}>{formatDateTimeLocal(comment.created)}</span>
                <ActionsMenu
                  id={comment.id}
                  buttonClassName={styles.commentItem__menuBtn}
                  actions={commentActions}
                  renderContent={({ closeMenu }) => (
                    <ColorPicker<StatusColorKeyType>
                      colorKeys={STATUS_COLOR_KEYS}
                      currentColor={comment.color as StatusColorKeyType | null}
                      onSelectColor={async (color) => {
                        await onColorComment(comment.id, color);
                        closeMenu();
                      }}
                    />
                  )}
                />
              </div>

              {!isEditing && (
                <p className={styles.commentItem__content}>{comment.content}</p>
              )}

              {isEditing && (
                <div className={styles.commentItem__editWrap}>
                  <TextareaAutosize
                    className={styles.commentItem__editInput}
                    value={editingCommentContent}
                    onChange={(e) => setEditingCommentContent(e.currentTarget.value)}
                    autoFocus
                  />
                  <div className={styles.commentItem__editActions}>
                    <button
                      type="button"
                      className={`button button-s ${styles.commentItem__saveBtn}`}
                      disabled={!editingCommentContent.trim() || isCommentUpdating}
                      onClick={async () => {
                        await onSaveCommentEdit(comment);
                      }}
                    >
                      Сохранить
                    </button>
                    <button
                      type="button"
                      className={`button button-s ${styles.commentItem__cancelBtn}`}
                      onClick={onCancelCommentEdit}
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              )}

              {isEdited && (
                <p className={styles.commentItem__edited}>редактирован {formatDateTimeLocal(comment.updated)}</p>
              )}
            </div>
          );
        })}
      </div>
      {/*<div className={styles.TaskContent__subTasks}>*/}
      {/*  <span className={`${styles.label} ${styles['label-subTasks']}`}>SubTasks:</span>*/}
      {/*  <TextareaAutosize*/}
      {/*    className={styles.subTasks}*/}
      {/*    // placeholder="+ Add Subtask"*/}
      {/*  />*/}
      {/*  {task.subTasks &&*/}
      {/*    <div className={styles.subTasks}>*/}
      {/*      {task.subTasks.map(task => (*/}
      {/*        <button*/}
      {/*          key={task.id}*/}
      {/*          type="button"*/}
      {/*          className="button button-big"*/}
      {/*        >*/}
      {/*          {task.name}*/}
      {/*        </button>*/}
      {/*      ))}*/}
      {/*    </div>}*/}
      {/*</div>*/}
    </form>
  );
}
