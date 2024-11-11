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
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useGetTasksQuery, useUpdateTasksMutation } from '@/services/tasks';
import { upperCaseFirstLetter } from '@/utils/helpers';
import { ColumnType, PopulatedProjectType, TaskStatusType } from '@/types';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setTasks } from '@/lib/features/tasks-slice.ts';
import { AddNewStatus } from '@/components/add-new-status';
import { Column } from '@/components/column';

export function Board({ currentProject }: { currentProject: PopulatedProjectType }) {
  const [updateTasks] = useUpdateTasksMutation();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const query = useAppSelector((state) => state.search.query);
  const [board, setBoard] = useState<ColumnType[]>([]);
  const { data: tasksData = [], currentData: tasksCurrentData } = useGetTasksQuery(currentProject.id, {
    skip: !currentProject.statuses.length,
  });

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );

  const genColumn = useCallback((status: TaskStatusType): ColumnType => {
    const newQuery = new RegExp(query.toLowerCase());
    const tasksByStatus = currentProject.tasks
      ?.filter(task => task.statusId === status.id && (task.name.toLowerCase().match(newQuery)))
      .sort((a, b) => a.order - b.order);

    return {
      id: status.id,
      title: upperCaseFirstLetter(status.name),
      tasks: tasksByStatus || [],
    };
  }, [query, currentProject.tasks]);

  useEffect(() => {
    const newBoard = tasks?.map((status) => genColumn(status)) || [];
    if (newBoard.length) {
      setBoard(newBoard);
    }
  }, [genColumn, currentProject, tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (typeof active.id === 'string' && typeof over.id === 'string' && active.id.startsWith('column-') && over.id.startsWith('column-')) {
      const activeIndex = board.findIndex(column => `column-${column.id}` === active.id);
      const overIndex = board.findIndex(column => `column-${column.id}` === over.id);
      const newBoard = arrayMove(board, activeIndex, overIndex);
      setBoard(newBoard);
      return;
    }

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
      movedTask.statusId = overColumn.id;
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

  return (
    <div className={styles.Board}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={board.map(column => `column-${column.id}`)} strategy={horizontalListSortingStrategy}>
          {board.map((column: ColumnType) => (
            <Column key={column.id} column={column} currentProject={currentProject} />
          ))}
        </SortableContext>
      </DndContext>
      <AddNewStatus />
    </div>
  );
}
