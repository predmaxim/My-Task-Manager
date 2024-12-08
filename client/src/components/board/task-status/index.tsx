import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from '@/components/board/task-card';
import { CreateNewTask } from '@/components/task/create-new-task';
import { useAppSelector } from '@/lib/store.ts';
import styles from './styles.module.scss';
import { ButtonWithIcon } from '@/components/ui/button-with-iIcon';
import { TaskStatusType } from '@/types';

type TaskStatusProps = {
  status: TaskStatusType;
}

export function TaskStatus({ status }: TaskStatusProps) {
  const currentProject = useAppSelector((state) => state.projects.currentProject);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
    isDragging,
  } = useSortable({
    id: status.id,
    data: {
      type: 'status',
      status,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
  };

  const onClickMenu = () => {
    console.log('menu');
  };

  if (!currentProject) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.column} ${isDragging ? styles.dragging : ''}`}
      {...attributes}
    >
      <div className={`${styles.column__header} handle`} ref={setActivatorNodeRef} {...listeners}>
        <h2 className={styles.column__title}>{status.name}</h2>
        <ButtonWithIcon
          className={styles.column__menuBtn}
          onClick={onClickMenu}
          icon="RiMore2Line"
        />
      </div>
      <CreateNewTask statusId={status.id} project={currentProject} />
      <div className={styles.column__body}>
        <SortableContext items={status.tasks.map(task => task.id)}>
          {status.tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              columnId={status.id}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
