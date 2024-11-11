import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ColumnType, ProjectType, TaskType } from '@/types';
import { CreateNewTask } from '@/components/create-new-task';
import { SortableItem } from '@/components/sortable-item';
import { ButtonWithIcon } from '@/components/button-with-iIcon';
import styles from './styles.module.scss';

export function Column({ column, currentProject }: { column: ColumnType, currentProject: ProjectType }) {
  return (
    <div className={`${styles.column} ${styles[`column-${column.title}`]}`} key={`column-${column.id}`}>
      <div className={styles.column__header}>
        <div className={styles.column__title}>{column.title}</div>
        <ButtonWithIcon
          className={styles.column__menuBtn}
          onClick={() => console.log('onClickMenu')}
          icon="RiMore2Line"
        />
      </div>
      <div className={styles.column__CreateNewTask}>
        {currentProject && (
          <CreateNewTask project={currentProject} taskStatus={{
            id: column.id,
            name: column.title,
            projectId: currentProject.id,
          }} />
        )}
      </div>
      <SortableContext items={column.tasks} strategy={verticalListSortingStrategy}>
        {column.tasks.map((task: TaskType) => (
          <SortableItem key={task.id} id={task.id.toString()} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}
