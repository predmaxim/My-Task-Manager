import { useCallback, useEffect, useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useGetTasksQuery, useUpdateTasksMutation } from '@/services/tasks';
import { upperCaseFirstLetter } from '@/utils/helpers';
import { PopulatedProjectType, PopulatedTaskType, TaskStatusType } from '@/types';
import styles from './styles.module.scss';
import { ButtonWithIcon } from '@/components/button-with-iIcon';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { CreateNewTask } from '@/components/create-new-task';
import { Task } from '@/components/task';
import { Loading } from '@/components/loading';
import { setTasks } from '@/lib/features/tasks-slice.ts';
import { AddNewStatus } from '@/components/add-new-status';

export type ColumnType = {
  id: TaskStatusType['id'];
  title: TaskStatusType['name'];
  tasks: PopulatedTaskType[];
};

export type BoardType = {
  currentProject: PopulatedProjectType;
};

export function SortableItem({ id, task }: { id: string, task: PopulatedTaskType }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Task task={task} />
    </div>
  );
}

export function Board({ currentProject }: BoardType) {
  const dispatch = useAppDispatch();
  const [updateTasks] = useUpdateTasksMutation();
  const { data: tasks = [], isLoading: tasksLoading } = useGetTasksQuery(currentProject.id, {
    skip: !currentProject.statuses.length,
  });
  const query = useAppSelector((state) => state.search.query);
  const [board, setBoard] = useState<ColumnType[]>([]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );

  const genColumn = useCallback((status: TaskStatusType): ColumnType => {
    const newQuery = new RegExp(query.toLowerCase());
    const tasksByStatus = tasks
      .filter(task => task.status.id === status.id && (task.name.toLowerCase().match(newQuery)))
      .sort((a, b) => a.order - b.order);

    return {
      id: status.id,
      title: status.name,
      tasks: tasksByStatus,
    };
  }, [query, tasks]);

  useEffect(() => {
    setBoard(currentProject.statuses?.map((status) => genColumn(status)) || []);
  }, [genColumn, currentProject.statuses]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
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
      movedTask.status.id = overColumn.id;
      overColumn.tasks.splice(overIndex, 0, movedTask);

      const newBoard = board.map(column => {
        if (column.id === activeColumn.id) return { ...column, tasks: activeColumn.tasks };
        if (column.id === overColumn.id) return { ...column, tasks: overColumn.tasks };
        return column;
      });

      setBoard(newBoard);
    }

    const newTasks = [activeColumn, overColumn]
      .flatMap(column => column.tasks)
      .map((task, index) => {
        return { ...task, order: index };
      });

    dispatch(setTasks(newTasks));
    updateTasks({ projectId: currentProject.id, tasks: newTasks });
  };

  if (tasksLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.Board}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {board.map((column: ColumnType) => (
          <div className={`${styles.column} ${styles[`column-${column.title}`]}`} key={`column-${column.id}`}>
            <div className={styles.column__header}>
              <div className={styles.column__title}>{upperCaseFirstLetter(column.title)}</div>
              <ButtonWithIcon
                className={styles.column__menuBtn}
                onClick={() => console.log('onClickMenu')}
                icon="RiMore2Line"
              />
              <div className={styles.column__CreateNewTask}>
                {currentProject && (
                  <CreateNewTask project={currentProject} taskStatus={{
                    id: column.id,
                    name: column.title,
                    projectId: currentProject.id,
                  }} />
                )}
              </div>
            </div>
            <div className={styles.column__body}>
              <SortableContext items={column.tasks} strategy={verticalListSortingStrategy}>
                {column.tasks.map((task: PopulatedTaskType) => (
                  <SortableItem key={task.id} id={task.id.toString()} task={task} />
                ))}
              </SortableContext>
            </div>
          </div>
        ))}
      </DndContext>
      <AddNewStatus />
    </div>
  );
}
