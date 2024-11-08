import { useCallback, useEffect, useState } from 'react';
import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useGetTasksQuery, useUpdateTaskMutation } from '@/services/tasks';
import { upperCaseFirstLetter } from '@/utils/helpers';
import { ProjectType, TaskStatusType, TaskType } from '@/types';
import { TASK_STATUSES } from '@/constants';
import styles from './styles.module.scss';
import { ButtonWithIcon } from '@/components/button-with-iIcon';
import { useAppSelector } from '@/lib/store';
import { CreateNewTask } from '@/components/create-new-task';
import { Task } from '@/components/task';

export type ColumnType = {
  id: TaskStatusType;
  title: TaskStatusType;
  tasks: TaskType[];
};

export type BoardType = {
  currentProjectId: ProjectType['id'];
};

export function SortableItem({ id, task }: { id: string, task: TaskType }) {
  const taskStatuses = useAppSelector((state) => state.taskStatuses.taskStatuses);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Task task={task} />
    </div>
  );
}

export function Board({ currentProjectId }: BoardType) {
  const { data: tasks = [] } = useGetTasksQuery(currentProjectId, {
    skip: !currentProjectId,
  });
  const [updateTask] = useUpdateTaskMutation();
  const [board, setBoard] = useState<ColumnType[]>([]);
  const query = useAppSelector((state) => state.search.query);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );

  const genColumn = useCallback((status: TaskStatusType): ColumnType => {
    const newQuery = new RegExp(query.toLowerCase());
    const tasksByStatus = tasks
      .filter(task => task.statusId === status.id && (task.name.toLowerCase().match(newQuery)))
      .sort((a, b) => a.index - b.index);

    return {
      id: status,
      title: status,
      tasks: tasksByStatus,
    };
  }, [query, tasks]);

  const genBoard = useCallback(() => {
    const newColumns = Object.values(TASK_STATUSES).map((status) =>
      genColumn(status),
    );
    setBoard(newColumns);
  }, [genColumn]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumn = board.find(column => column.tasks.some(task => task.id === active.id));
    const overColumn = board.find(column => column.tasks.some(task => task.id === over.id));

    if (!activeColumn || !overColumn) return;

    const activeIndex = activeColumn.tasks.findIndex(task => task.id === active.id);
    const overIndex = overColumn.tasks.findIndex(task => task.id === over.id);

    if (activeColumn.id === overColumn.id) {
      const newTasks = arrayMove(activeColumn.tasks, activeIndex, overIndex);
      const newBoard = board.map(column => column.id === activeColumn.id ? { ...column, tasks: newTasks } : column);
      setBoard(newBoard);
    } else {
      const [movedTask] = activeColumn.tasks.splice(activeIndex, 1);
      movedTask.statusId = overColumn.id.id;
      overColumn.tasks.splice(overIndex, 0, movedTask);

      const newBoard = board.map(column => {
        if (column.id === activeColumn.id) return { ...column, tasks: activeColumn.tasks };
        if (column.id === overColumn.id) return { ...column, tasks: overColumn.tasks };
        return column;
      });

      setBoard(newBoard);
    }

    [activeColumn, overColumn].forEach(column =>
      column.tasks.forEach((task) => {
        task.index = task.index;
        updateTask(task);
      }),
    );
  };

  useEffect(() => {
    genBoard();
  }, [genBoard, tasks]);

  return (
    <div className={styles.Board}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {board.map(({ id, title, tasks }: ColumnType) => (
          <div className={`${styles.column} ${styles[`column-${title.name}`]}`} key={`column-${id.name}`}>
            <div className={styles.column__header}>
              <div className={styles.column__title}>{upperCaseFirstLetter(title.name)}</div>
              <ButtonWithIcon
                className={styles.column__menuBtn}
                onClick={() => console.log('onClickMenu')}
                icon="RiMore2Line"
              />
            </div>
            <div className={styles.column__CreateNewTask}>
              {currentProjectId && (
                <CreateNewTask projectName={currentProjectId.toString()} taskStatus={title} />
              )}
            </div>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
              {tasks.map((task: TaskType) => (
                <SortableItem key={task.id} id={task.id.toString()} task={task} />
              ))}
            </SortableContext>
          </div>
        ))}
      </DndContext>
    </div>
  );
}
