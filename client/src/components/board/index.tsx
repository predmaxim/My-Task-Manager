import { useCallback, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useUpdateTaskMutation } from '@/services/tasks-service.ts';
import { TaskStatus } from '@/components/board/task-status';
import { AddNewStatus } from '@/components/board/add-new-status';
import { ProjectType, TaskStatusType } from '@/types';
import { Loading } from '@/components/layout/loading';
import { useGetTaskStatusesQuery, useUpdateTaskStatusesMutation } from '@/services/task-statuses-service.ts';
import { useAppDispatch, useAppSelector } from '@/lib/store.ts';
import { setTaskStatuses } from '@/lib/features/task-statuses-slice';
import styles from './styles.module.scss';

type BoardProps = {
  projectId: ProjectType['id'];
}

const groupTasksByStatus = (statuses: TaskStatusType[], searchQuery: string): TaskStatusType[] => {
  if (!statuses) {
    return [];
  }

  const query = new RegExp(searchQuery.toLowerCase().trim());
  const grouped = statuses.map((status) => ({
    ...status,
    tasks: status.tasks.filter(task =>
      // task.statusId === status.id &&
      (task.name.match(query) || task.id.toString().match(query)))
      .sort((a, b) => a.order - b.order),
  })).sort((a, b) => a.order - b.order);

  return grouped;
};

export function Board({ projectId }: BoardProps) {
  const dispatch = useAppDispatch();
  const [updateTask] = useUpdateTaskMutation();
  const [updateTaskStatuses] = useUpdateTaskStatusesMutation();

  const { data: taskStatuses, isLoading: isTaskStatusesLoading } = useGetTaskStatusesQuery(projectId);
  const statuses = useAppSelector(state => state.statuses.taskStatuses);
  const searchQuery = useAppSelector(state => state.search.query);

  useEffect(() => {
    if (taskStatuses) {
      const newStatuses = groupTasksByStatus(taskStatuses, searchQuery);
      dispatch(setTaskStatuses(newStatuses));
    }
  }, [taskStatuses, dispatch, searchQuery]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (
      active.data.current?.type === 'task' &&
      over.data.current?.type === 'status'
    ) {
      const task = active.data.current.task;
      const newStatusId = over.data.current.statusId;
      if (task.statusId !== newStatusId) {
        updateTask({
          ...task,
          statusId: newStatusId,
        });
      }
    }
  }, [updateTask]);

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !statuses) {
      return;
    }

    if (active.data.current?.type === 'status') {
      const oldIndex = statuses.findIndex(status => status.id === active.id);
      const newIndex = statuses.findIndex(status => status.id === over.id);

      if (newIndex < 0 || newIndex >= statuses.length) {
        return;
      }

      if (oldIndex !== newIndex) {
        const newStatuses = arrayMove(statuses, oldIndex, newIndex);
        dispatch(setTaskStatuses(newStatuses));

        const updatedStatuses = newStatuses.map((status, index) => ({
          ...status,
          order: index,
        }));
        await updateTaskStatuses(updatedStatuses);
      }
    }

    if (active.data.current?.type === 'task') {
      const oldColumnIndex = statuses.findIndex(status => status.id === active.data.current?.columnId);
      const newColumnIndex = statuses.findIndex(status => status.id === over.data.current?.columnId);

      if (oldColumnIndex === -1 || newColumnIndex === -1) {
        return;
      }

      const oldTaskIndex = statuses[oldColumnIndex].tasks.findIndex(task => task.id === active.id);
      const newTaskIndex = statuses[newColumnIndex].tasks.findIndex(task => task.id === over.id);

      if (oldTaskIndex === -1) {
        return;
      }

      const newStatuses = statuses.map(status => ({
        ...status,
        tasks: status.tasks.slice(),
      }));

      const [movedTask] = newStatuses[oldColumnIndex].tasks.splice(oldTaskIndex, 1);

      if (oldColumnIndex === newColumnIndex) {
        newStatuses[newColumnIndex].tasks.splice(newTaskIndex, 0, movedTask);
      } else {
        newStatuses[newColumnIndex].tasks.splice(newTaskIndex, 0, {
          ...movedTask,
          statusId: newStatuses[newColumnIndex].id,
        });
      }

      newStatuses[oldColumnIndex].tasks = newStatuses[oldColumnIndex].tasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      newStatuses[newColumnIndex].tasks = newStatuses[newColumnIndex].tasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      dispatch(setTaskStatuses(newStatuses));
      await updateTaskStatuses(newStatuses);
    }
  }, [dispatch, statuses, updateTaskStatuses]);

  if (isTaskStatusesLoading) {
    return <Loading />;
  }

  if (!statuses || statuses.length === 0) {
    return <AddNewStatus projectId={projectId} />;
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      modifiers={[restrictToParentElement]}
    >
      <SortableContext items={statuses.map(status => status.id)} strategy={rectSortingStrategy}>
        <div className={styles.Board}>
          {statuses.map(status => (
            <TaskStatus key={status.id} status={status} />
          ))}
          <AddNewStatus projectId={projectId} />
        </div>
      </SortableContext>
    </DndContext>
  );
}
