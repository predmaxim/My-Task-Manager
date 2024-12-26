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
import { setTasks } from '@/lib/features/tasks-slice';
import styles from './styles.module.scss';

type BoardProps = {
  projectId: ProjectType['id'];
}

const groupTasksByStatus = (statuses: TaskStatusType[], searchQuery: string): TaskStatusType[] => {
  if (!statuses) {
    return [];
  }

  const query = new RegExp(searchQuery.toLowerCase().trim());
  return statuses.map((status) => ({
    ...status,
    tasks: status.tasks.filter(task =>
      (task.name.match(query) || task.id.toString().match(query)))
      .sort((a, b) => a.order - b.order),
  })).sort((a, b) => a.order - b.order);
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
      const newStatusId = over.data.current.status.id;
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
      const oldStatusIndex = statuses.findIndex(status => status.id === active.data.current?.statusId);
      const newStatusIndex = statuses.findIndex(status => status.id === over.data.current?.statusId);

      if (oldStatusIndex === -1 || newStatusIndex === -1) {
        return;
      }

      const oldTaskIndex = statuses[oldStatusIndex].tasks.findIndex(task => task.id === active.id);
      const newTaskIndex = over.id ? statuses[newStatusIndex].tasks.findIndex(task => task.id === over.id) : statuses[newStatusIndex].tasks.length;

      if (oldTaskIndex === -1) {
        return;
      }

      const newStatuses = statuses.map(status => ({
        ...status,
        tasks: status.tasks.slice(),
      }));

      const [movedTask] = newStatuses[oldStatusIndex].tasks.splice(oldTaskIndex, 1);

      newStatuses[newStatusIndex].tasks.splice(newTaskIndex, 0, {
        ...movedTask,
        statusId: newStatuses[newStatusIndex].id,
      });

      newStatuses[oldStatusIndex].tasks = newStatuses[oldStatusIndex].tasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      newStatuses[newStatusIndex].tasks = newStatuses[newStatusIndex].tasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      dispatch(setTaskStatuses(newStatuses));
      await updateTaskStatuses(newStatuses.map(status => ({
        ...status,
        tasks: status.tasks.map(task => ({
          ...task,
          statusId: status.id,
        })),
      })));
      await updateTask({
        ...movedTask,
        statusId: newStatuses[newStatusIndex].id,
        order: newTaskIndex,
      });

      dispatch(setTasks(newStatuses.flatMap(status => status.tasks)));
    }
  }, [dispatch, statuses, updateTask, updateTaskStatuses]);

  if (isTaskStatusesLoading) {
    return <Loading />;
  }

  if (!statuses || statuses.length === 0) {
    return <AddNewStatus projectId={projectId} />;
  }

  const allTaskIds = statuses.flatMap(status => status.tasks.map(task => task.id));

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      modifiers={[restrictToParentElement]}
    >
      <SortableContext items={allTaskIds} strategy={rectSortingStrategy}>
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
