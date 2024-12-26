import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { TaskCard } from '@/components/board/task-card';
import { CreateNewTask } from '@/components/task/create-new-task';
import { Task } from '@/components/task';
import { useAppSelector } from '@/lib/store.ts';
import styles from './styles.module.scss';
import { TaskStatusType } from '@/types';
import { useDeleteTaskStatusMutation, useUpdateTaskStatusMutation } from '@/services/task-statuses-service.ts';
import { ActionMenuItem, ActionsMenu } from '@/components/ui/actions-menu';
import { STATUS_COLOR_KEYS, StatusColorKeyType } from '@/constants';
import { ColorPicker } from '@/components/ui/color-picker';

type TaskStatusProps = {
  status: TaskStatusType;
}

const toStatusDndId = (statusId: TaskStatusType['id']) => `status-${String(statusId)}`;
const toTaskDndId = (taskId: TaskStatusType['tasks'][number]['id']) => `task-${String(taskId)}`;

export function TaskStatus({ status }: TaskStatusProps) {
  const currentProject = useAppSelector((state) => state.projects.currentProject);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(status.name);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteTaskStatus] = useDeleteTaskStatusMutation();
  const isTitleSavingRef = useRef(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
    isDragging,
  } = useSortable({
    id: toStatusDndId(status.id),
    data: {
      type: 'status',
      status,
    },
  });

  useEffect(() => {
    setTitle(status.name);
  }, [status.id, status.name]);

  const saveTitle = async () => {
    if (isTitleSavingRef.current) {
      return;
    }

    const nextTitle = title.trim();
    if (!nextTitle) {
      setTitle(status.name);
      setIsEditingTitle(false);
      return;
    }

    if (nextTitle === status.name) {
      setIsEditingTitle(false);
      return;
    }

    isTitleSavingRef.current = true;

    try {
      await updateTaskStatus({
        ...status,
        name: nextTitle,
      }).unwrap();
      setIsEditingTitle(false);
    } catch (error) {
      console.error('Failed to update status name:', error);
      setTitle(status.name);
      setIsEditingTitle(false);
    } finally {
      isTitleSavingRef.current = false;
    }
  };

  const onClickEditTitle = () => {
    setIsEditingTitle(true);
  };

  const onClickDeleteStatus = async () => {
    if (!window.confirm('Удалить этот столбик?')) {
      return;
    }

    await deleteTaskStatus(status.id);
  };

  const onSelectColor = async (color: StatusColorKeyType | null) => {
    try {
      await updateTaskStatus({
        ...status,
        color,
      }).unwrap();
    } catch (error) {
      console.error('Failed to update status color:', error);
    }
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyDownTitle = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      await saveTitle();
    }

    if (e.code === 'Escape') {
      setTitle(status.name);
      setIsEditingTitle(false);
    }
  };

  const dragListeners = isEditingTitle || isMenuOpen ? undefined : listeners;
  const currentStatusColor = status.color && STATUS_COLOR_KEYS.includes(status.color as StatusColorKeyType)
    ? status.color as StatusColorKeyType
    : null;
  const hasColumnColor = Boolean(currentStatusColor);

  const menuActions: ActionMenuItem<TaskStatusType['id']>[] = [
    {
      key: 'edit',
      label: 'Редактировать название',
      onSelect: onClickEditTitle,
    },
    {
      key: 'remove',
      label: 'Удалить',
      variant: 'danger',
      onSelect: onClickDeleteStatus,
    },
  ];

  if (!currentProject) {
    return null;
  }

  const style = {
    transform: CSS.Transform.toString(
      transform ? { ...transform, scaleX: 1, scaleY: 1 } : null,
    ),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
    '--column-color': currentStatusColor ? `var(--status-column-${currentStatusColor})` : 'transparent',
    '--column-color-strong': currentStatusColor ? `var(--status-column-${currentStatusColor}-strong)` : 'transparent',
  } as CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.column} ${isDragging ? styles.dragging : ''} ${hasColumnColor ? styles.column_colored : ''}`}
      {...attributes}
    >
      <div className={`${styles.column__header} handle`} ref={setActivatorNodeRef} {...dragListeners}>
        {!isEditingTitle && <h2 className={styles.column__title}>{status.name}</h2>}
        {isEditingTitle && (
          <input
            className={styles.column__titleInput}
            value={title}
            onChange={onChangeTitle}
            onBlur={saveTitle}
            onKeyDown={onKeyDownTitle}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        )}
        <ActionsMenu
          id={status.id}
          buttonClassName={styles.column__menuBtn}
          actions={menuActions}
          renderContent={({ closeMenu }) => (
            <ColorPicker<StatusColorKeyType>
              colorKeys={STATUS_COLOR_KEYS}
              currentColor={currentStatusColor}
              onSelectColor={async (color) => {
                await onSelectColor(color);
                closeMenu();
              }}
            />
          )}
          onOpenChange={setIsMenuOpen}
        />
      </div>
      <CreateNewTask statusId={status.id} project={currentProject} />
      <div className={styles.column__body}>
        <SortableContext items={status.tasks.map(task => toTaskDndId(task.id))} strategy={verticalListSortingStrategy}>
          {status.tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              statusId={status.id}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

type TaskStatusPreviewProps = {
  status: TaskStatusType;
}

export function TaskStatusPreview({ status }: TaskStatusPreviewProps) {
  const currentStatusColor = status.color && STATUS_COLOR_KEYS.includes(status.color as StatusColorKeyType)
    ? status.color as StatusColorKeyType
    : null;

  const style = {
    '--column-color': currentStatusColor ? `var(--status-column-${currentStatusColor})` : 'transparent',
    '--column-color-strong': currentStatusColor ? `var(--status-column-${currentStatusColor}-strong)` : 'transparent',
  } as CSSProperties;

  return (
    <div
      style={style}
      className={`${styles.column} ${styles.column_preview} ${currentStatusColor ? styles.column_colored : ''}`}
    >
      <div className={styles.column__header}>
        <h2 className={styles.column__title}>{status.name}</h2>
      </div>
      <div className={styles.column__body}>
        {status.tasks.map(task => (
          <div key={task.id} className={styles.column__previewTask}>
            <Task task={task} />
          </div>
        ))}
      </div>
    </div>
  );
}
