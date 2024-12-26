import { useCallback, useEffect, useRef, useState } from 'react';
import {
  closestCorners,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useUpdateTaskMutation } from '@/services/tasks-service.ts';
import { TaskStatus } from '@/components/board/task-status';
import { TaskCardPreview } from '@/components/board/task-card';
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

const isSameId = (left: number | string, right: number | string) => String(left) === String(right);

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const toStatusDndId = (statusId: number | string) => `status-${String(statusId)}`;

const fromTaskDndId = (value: number | string) => {
  const stringValue = String(value);
  if (!stringValue.startsWith('task-')) {
    return null;
  }

  return stringValue.slice(5);
};

const fromStatusDndId = (value: number | string) => {
  const stringValue = String(value);
  if (!stringValue.startsWith('status-')) {
    return null;
  }

  return stringValue.slice(7);
};

const isDndDebugEnabled = () => {
  if (!import.meta.env.DEV || typeof window === 'undefined') {
    return false;
  }

  try {
    const debugFlagFromStorage = window.localStorage.getItem('mtm:dnd-debug') === '1';
    const debugFlagFromWindow = (window as Window & { __MTM_DND_DEBUG?: boolean }).__MTM_DND_DEBUG === true;
    return debugFlagFromStorage || debugFlagFromWindow;
  } catch {
    return false;
  }
};

const debugDnd = (label: string, payload?: unknown) => {
  if (!isDndDebugEnabled()) {
    return;
  }

  if (typeof payload === 'undefined') {
    console.log(`[BoardDnd] ${label}`);
    return;
  }

  console.log(`[BoardDnd] ${label}`, payload);
};

const getClientYFromActivatorEvent = (event: unknown) => {
  if (!event) {
    return null;
  }

  if (event instanceof MouseEvent || event instanceof PointerEvent) {
    return event.clientY;
  }

  if (event instanceof TouchEvent) {
    const touch = event.touches[0] ?? event.changedTouches[0];
    return touch ? touch.clientY : null;
  }

  return null;
};

const findTaskPosition = (statuses: TaskStatusType[], taskId: number | string) => {
  const statusIndex = statuses.findIndex(status => status.tasks.some(task => isSameId(task.id, taskId)));
  if (statusIndex === -1) {
    return null;
  }

  const taskIndex = statuses[statusIndex].tasks.findIndex(task => isSameId(task.id, taskId));
  if (taskIndex === -1) {
    return null;
  }

  return { statusIndex, taskIndex };
};

const getDestinationStatusId = (
  statuses: TaskStatusType[],
  over: DragOverEvent['over'] | DragEndEvent['over'],
) => {
  if (!over) {
    return null;
  }

  if (over.data.current?.type === 'task') {
    return over.data.current.statusId;
  }

  if (over.data.current?.type === 'status') {
    return over.data.current.status.id;
  }

  const statusIdFromDndId = fromStatusDndId(over.id);
  if (statusIdFromDndId !== null) {
    return statusIdFromDndId;
  }

  const taskIdFromDndId = fromTaskDndId(over.id);
  if (taskIdFromDndId !== null) {
    const taskPosition = findTaskPosition(statuses, taskIdFromDndId);
    if (!taskPosition) {
      return null;
    }

    return statuses[taskPosition.statusIndex].id;
  }

  const statusByContainerId = statuses.find(status => isSameId(status.id, over.id));
  if (statusByContainerId) {
    return statusByContainerId.id;
  }

  const taskPosition = findTaskPosition(statuses, over.id);
  if (!taskPosition) {
    return null;
  }

  return statuses[taskPosition.statusIndex].id;
};

const getDestinationTaskIndex = (
  event: Pick<DragOverEvent, 'active' | 'over'>,
  tasks: TaskStatusType['tasks'],
  pointerOffsetY: number | null,
) => {
  const { active, over } = event;

  if (!over || over.data.current?.type !== 'task') {
    return tasks.length;
  }

  const overTaskId = over.data.current.task?.id ?? fromTaskDndId(over.id);
  if (overTaskId === null || typeof overTaskId === 'undefined') {
    return tasks.length;
  }

  const overTaskIndex = tasks.findIndex(task => isSameId(task.id, overTaskId));
  if (overTaskIndex === -1) {
    return tasks.length;
  }

  const translatedTop = active.rect.current.translated?.top;
  const activeHeight = active.rect.current.translated?.height ?? active.rect.current.initial?.height;
  if (typeof translatedTop !== 'number' || typeof activeHeight !== 'number') {
    return overTaskIndex;
  }

  const pointerY = pointerOffsetY === null
    ? null
    : translatedTop + pointerOffsetY;
  const activeMiddleY = translatedTop + activeHeight / 2;
  const overMiddleY = over.rect.top + over.rect.height / 2;
  const compareY = pointerY ?? activeMiddleY;
  const isBelowOverItem = compareY > overMiddleY;

  return overTaskIndex + (isBelowOverItem ? 1 : 0);
};

const groupTasksByStatus = (statuses: TaskStatusType[], searchQuery: string): TaskStatusType[] => {
  if (!statuses) {
    return [];
  }

  const normalizedQuery = searchQuery.toLowerCase().trim();
  let query: RegExp;

  try {
    query = new RegExp(normalizedQuery);
  } catch {
    query = new RegExp(escapeRegExp(normalizedQuery));
  }

  return statuses.map((status) => ({
    ...status,
    tasks: status.tasks.filter(task =>
      (task.name.match(query) || task.id.toString().match(query)))
      .sort((a, b) => a.order - b.order),
  })).sort((a, b) => a.order - b.order);
};

export function Board({ projectId }: BoardProps) {
  const dispatch = useAppDispatch();
  const [activeTask, setActiveTask] = useState<TaskStatusType['tasks'][number] | null>(null);
  const [updateTask] = useUpdateTaskMutation();
  const [updateTaskStatuses] = useUpdateTaskStatusesMutation();
  const lastOverSignatureRef = useRef<string | null>(null);
  const pointerOffsetYRef = useRef<number | null>(null);

  const { data: taskStatuses, isLoading: isTaskStatusesLoading } = useGetTaskStatusesQuery(projectId);
  const statuses = useAppSelector(state => state.statuses.taskStatuses);
  const searchQuery = useAppSelector(state => state.search.query);

  useEffect(() => {
    if (taskStatuses) {
      const newStatuses = groupTasksByStatus(taskStatuses, searchQuery);
      dispatch(setTaskStatuses(newStatuses));
    }
  }, [taskStatuses, dispatch, searchQuery]);

  useEffect(() => {
    if (!isDndDebugEnabled()) {
      return;
    }

    const onError = (event: ErrorEvent) => {
      debugDnd('window.error', {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        error: event.error,
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      debugDnd('window.unhandledrejection', {
        reason: event.reason,
      });
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);

    debugDnd('debug enabled', {
      projectId,
      hint: 'Disable with localStorage.removeItem("mtm:dnd-debug")',
    });

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, [projectId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const collisionDetection: CollisionDetection = useCallback((args) => {
    const pointerIntersections = pointerWithin(args);
    if (pointerIntersections.length > 0) {
      return pointerIntersections;
    }

    return closestCorners(args);
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    lastOverSignatureRef.current = null;

    const initialTop = event.active.rect.current.initial?.top;
    const dragStartEvent = event as DragStartEvent & { activatorEvent?: Event };
    const activatorClientY = getClientYFromActivatorEvent(dragStartEvent.activatorEvent ?? null);
    pointerOffsetYRef.current =
      typeof initialTop === 'number' && typeof activatorClientY === 'number'
        ? activatorClientY - initialTop
        : null;

    debugDnd('drag:start', {
      activeId: String(event.active.id),
      activeType: event.active.data.current?.type,
      activeData: event.active.data.current,
      pointerOffsetY: pointerOffsetYRef.current,
    });

    if (event.active.data.current?.type === 'task') {
      setActiveTask(event.active.data.current.task);
      return;
    }

    setActiveTask(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    debugDnd('drag:cancel');
    lastOverSignatureRef.current = null;
    pointerOffsetYRef.current = null;
    setActiveTask(null);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;

    const activeTaskId = active.data.current?.type === 'task'
      ? active.data.current.task.id
      : fromTaskDndId(active.id);

    if (!over || !statuses || active.data.current?.type !== 'task' || activeTaskId === null) {
      debugDnd('drag:over:skip', {
        reason: 'missing-over-or-statuses-or-not-task-or-taskId',
        hasOver: Boolean(over),
        hasStatuses: Boolean(statuses),
        activeType: active.data.current?.type,
        activeTaskId,
      });
      return;
    }

    if (isSameId(active.id, over.id)) {
      debugDnd('drag:over:skip', {
        reason: 'active-equals-over',
        activeId: String(active.id),
      });
      return;
    }

    try {
      const sourcePosition = findTaskPosition(statuses, activeTaskId);
      if (!sourcePosition) {
        return;
      }

      const destinationStatusId = getDestinationStatusId(statuses, over);
      if (!destinationStatusId) {
        return;
      }

      const destinationStatusIndex = statuses.findIndex(status => isSameId(status.id, destinationStatusId));
      if (destinationStatusIndex === -1) {
        return;
      }

      const overSignature = [
        String(activeTaskId),
        String(over.id),
        String(destinationStatusId),
        String(sourcePosition.statusIndex),
        String(sourcePosition.taskIndex),
        String(destinationStatusIndex),
      ].join('|');

      if (lastOverSignatureRef.current !== overSignature) {
        debugDnd('drag:over', {
          activeId: String(active.id),
          activeTaskId,
          overId: String(over.id),
          overType: over.data.current?.type,
          source: sourcePosition,
          destinationStatusId: String(destinationStatusId),
          destinationStatusIndex,
        });
        lastOverSignatureRef.current = overSignature;
      }
    } catch (error) {
      debugDnd('drag:over:error', {
        activeId: String(active.id),
        overId: over ? String(over.id) : null,
        overType: over?.data.current?.type,
        error,
      });
      console.error('Drag over failed:', error);
    }
  }, [statuses]);

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;

    const activeTaskId = active.data.current?.type === 'task'
      ? active.data.current.task.id
      : fromTaskDndId(active.id);

    const activeStatusId = active.data.current?.type === 'status'
      ? active.data.current.status.id
      : fromStatusDndId(active.id);

    setActiveTask(null);
    lastOverSignatureRef.current = null;
    const pointerOffsetY = pointerOffsetYRef.current;
    pointerOffsetYRef.current = null;

    debugDnd('drag:end', {
      activeId: String(active.id),
      activeType: active.data.current?.type,
      overId: over ? String(over.id) : null,
      overType: over?.data.current?.type,
    });

    try {
      if (!over || !statuses) {
        debugDnd('drag:end:skip', {
          reason: 'missing-over-or-statuses',
          hasOver: Boolean(over),
          hasStatuses: Boolean(statuses),
        });
        return;
      }

      if (active.data.current?.type === 'status') {
        const overStatusId = over.data.current?.type === 'status'
          ? over.data.current.status.id
          : fromStatusDndId(over.id);

        if (activeStatusId === null || overStatusId === null) {
          debugDnd('drag:end:skip', {
            reason: 'status-id-not-found',
            activeStatusId,
            overStatusId,
          });
          return;
        }

        const oldIndex = statuses.findIndex(status => isSameId(status.id, activeStatusId));
        const newIndex = statuses.findIndex(status => isSameId(status.id, overStatusId));

        if (oldIndex < 0 || newIndex < 0 || newIndex >= statuses.length) {
          debugDnd('drag:end:skip', {
            reason: 'status-index-out-of-range',
            oldIndex,
            newIndex,
            statusesLength: statuses.length,
          });
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
        if (activeTaskId === null) {
          debugDnd('drag:end:skip', {
            reason: 'task-id-not-found',
            activeId: String(active.id),
          });
          return;
        }

        const currentPosition = findTaskPosition(statuses, activeTaskId);
        if (!currentPosition) {
          debugDnd('drag:end:skip', {
            reason: 'task-position-not-found-after-drag',
            activeId: String(active.id),
            activeTaskId,
          });
          return;
        }

        const destinationStatusId = getDestinationStatusId(statuses, over);
        if (!destinationStatusId) {
          debugDnd('drag:end:skip', {
            reason: 'destination-status-not-found-for-task',
            overId: String(over.id),
            overType: over.data.current?.type,
          });
          return;
        }

        const destinationStatusIndex = statuses.findIndex(status => isSameId(status.id, destinationStatusId));
        if (destinationStatusIndex === -1) {
          debugDnd('drag:end:skip', {
            reason: 'destination-status-index-not-found-for-task',
            destinationStatusId: String(destinationStatusId),
          });
          return;
        }

        if (currentPosition.statusIndex === destinationStatusIndex && isSameId(active.id, over.id)) {
          debugDnd('drag:end:skip', {
            reason: 'same-item-drop',
            activeId: String(active.id),
          });
          return;
        }

        const nextStatuses = statuses.map(status => ({
          ...status,
          tasks: status.tasks.slice(),
        }));

        const [movedTask] = nextStatuses[currentPosition.statusIndex].tasks.splice(currentPosition.taskIndex, 1);
        if (!movedTask) {
          debugDnd('drag:end:skip', {
            reason: 'moved-task-not-found-on-end',
            currentPosition,
          });
          return;
        }

        const rawDestinationTaskIndex = getDestinationTaskIndex(
          event,
          nextStatuses[destinationStatusIndex].tasks,
          pointerOffsetY,
        );
        const destinationTaskIndex = Math.max(
          0,
          Math.min(rawDestinationTaskIndex, nextStatuses[destinationStatusIndex].tasks.length),
        );

        if (currentPosition.statusIndex === destinationStatusIndex) {
          nextStatuses[destinationStatusIndex].tasks.splice(destinationTaskIndex, 0, {
            ...movedTask,
            statusId: nextStatuses[destinationStatusIndex].id,
          });
        } else {
          nextStatuses[destinationStatusIndex].tasks.splice(destinationTaskIndex, 0, {
            ...movedTask,
            statusId: nextStatuses[destinationStatusIndex].id,
          });
        }

        nextStatuses[currentPosition.statusIndex].tasks = nextStatuses[currentPosition.statusIndex].tasks.map((task, index) => ({
          ...task,
          order: index,
        }));

        nextStatuses[destinationStatusIndex].tasks = nextStatuses[destinationStatusIndex].tasks.map((task, index) => ({
          ...task,
          order: index,
        }));

        const updatedTaskPosition = findTaskPosition(nextStatuses, activeTaskId);
        if (!updatedTaskPosition) {
          debugDnd('drag:end:skip', {
            reason: 'updated-task-position-not-found-after-reorder',
            activeTaskId,
          });
          return;
        }

        const updatedTask = nextStatuses[updatedTaskPosition.statusIndex].tasks[updatedTaskPosition.taskIndex];

        if (!updatedTask) {
          debugDnd('drag:end:skip', {
            reason: 'updated-task-missing',
            currentPosition,
          });
          return;
        }

        dispatch(setTaskStatuses(nextStatuses));

        await updateTaskStatuses(nextStatuses.map(status => ({
          ...status,
          tasks: status.tasks.map(task => ({
            ...task,
            statusId: status.id,
          })),
        })));
        await updateTask(updatedTask);

        dispatch(setTasks(nextStatuses.flatMap(status => status.tasks)));
      }
    } catch (error) {
      debugDnd('drag:end:error', {
        activeId: String(active.id),
        overId: over ? String(over.id) : null,
        error,
      });
      console.error('Drag end failed:', error);
    }
  }, [dispatch, statuses, updateTask, updateTaskStatuses]);

  if (isTaskStatusesLoading) {
    return <Loading />;
  }

  if (!statuses || statuses.length === 0) {
    return <AddNewStatus projectId={projectId} />;
  }

  const allStatusIds = statuses.map(status => toStatusDndId(status.id));

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
      collisionDetection={collisionDetection}
    >
      <SortableContext items={allStatusIds} strategy={rectSortingStrategy}>
        <div className={styles.Board}>
          {statuses.map(status => (
            <TaskStatus key={status.id} status={status} />
          ))}
          <AddNewStatus projectId={projectId} />
        </div>
      </SortableContext>
      <DragOverlay>
        {activeTask ? <TaskCardPreview task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
