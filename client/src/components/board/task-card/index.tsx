import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskStatusType, TaskType } from '@/types';
import styles from './styles.module.scss';
import { Task } from '@/components/task';

type TaskCardProps = {
  task: TaskType;
  columnId: TaskStatusType['id'];
}

export function TaskCard({ task, columnId }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
      columnId,
    },
  });

  const style = {
    // FIX: wrong spaces when drugging TaskCard
    transform: CSS.Transform.toString(transform),
    // transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
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
