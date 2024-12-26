import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskStatusType, TaskType } from '@/types';
import styles from './styles.module.scss';
import { Task } from '@/components/task';

type TaskCardProps = {
  task: TaskType;
  statusId: TaskStatusType['id'];
}

const toTaskDndId = (taskId: TaskType['id']) => `task-${String(taskId)}`;

export function TaskCard({ task, statusId }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: toTaskDndId(task.id),
    data: {
      type: 'task',
      task,
      statusId,
    },
    animateLayoutChanges: () => false,
    transition: {
      duration: 180,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
    },
  });

  const style = {
    // Keep card size stable while dragging (dnd-kit may add scale values).
    transform: CSS.Transform.toString(
      transform ? { ...transform, scaleX: 1, scaleY: 1 } : null,
    ),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.TaskCard} ${isDragging ? styles.dragging : ''}`}
      {...attributes}
      {...listeners}
    >
      <Task task={task} />
    </div>
  );
}

type TaskCardPreviewProps = {
  task: TaskType;
}

export function TaskCardPreview({ task }: TaskCardPreviewProps) {
  return (
    <div className={styles.TaskCard}>
      <Task task={task} />
    </div>
  );
}
