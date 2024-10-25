import { CreateNewTask } from '@/components/create-new-task';
import { Task } from '@/components/task';
import { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useGetTasksQuery, useUpdateTaskMutation } from '@/services/tasks';
import { upperCaseFirstLetter } from '@/utils/helpers';
import { ProjectType, TaskStatusType, TaskType } from '@/types';
import { TASK_STATUSES } from '@/constants';
import styles from './styles.module.scss';
import { ButtonWithIcon } from '@/components/button-with-iIcon';
import { useAppSelector } from '@/lib/store';

export type BoardType = {
  currentProjectId: ProjectType['id'];
};

export type ColumnType = {
  id: TaskStatusType;
  title: TaskStatusType;
  tasks: TaskType[];
};

export function Board({ currentProjectId }: BoardType) {
  const { data: tasks = [], refetch } = useGetTasksQuery(currentProjectId, {
    skip: !currentProjectId,
  });
  const [updateTask] = useUpdateTaskMutation();
  const [board, setBoard] = useState<ColumnType[]>([]);
  const { query } = useAppSelector((state) => state.search);

  const genColumn = useCallback((status: TaskStatusType): ColumnType => {
    const newQuery = new RegExp(query.toLowerCase());
    const tasksByStatus = tasks
      .filter(task => task.status === status && (task.name.toLowerCase().match(newQuery) || String(task.number).toLowerCase().match(newQuery)))
      .sort((a, b) => a.index - b.index);

    return {
      id: status,
      title: status,
      tasks: tasksByStatus,
    };
  }, [query, tasks]);

  const genBoard = useCallback(() => {
    const newColumns = (Object.keys(TASK_STATUSES) as TaskStatusType[]).map((status: TaskStatusType) =>
      genColumn(status),
    );
    setBoard(newColumns);
  }, [genColumn]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) return;

    const newBoard = [...board];
    const sourceColumn = newBoard.find(column => column.id === source.droppableId);
    const destinationColumn = newBoard.find(column => column.id === destination.droppableId);

    if (!sourceColumn || !destinationColumn) return;

    const [removedTask] = sourceColumn.tasks.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      removedTask.done = destination.droppableId === TASK_STATUSES.done ? new Date() : false;
      removedTask.status = destination.droppableId as TaskStatusType;
    }

    destinationColumn.tasks.splice(destination.index, 0, removedTask);

    [sourceColumn, destinationColumn].forEach(column =>
      column.tasks.forEach((task, i) => {
        task.index = i;
        updateTask(task);
      }),
    );

    setBoard(newBoard);
  };

  useEffect(() => {
    genBoard();
  }, [genBoard, tasks]);

  useEffect(() => {
    if (currentProjectId) {
      refetch();
    }
  }, [currentProjectId, refetch]);

  return (
    <div className={styles.Board}>
      <DragDropContext key="Board" onDragEnd={onDragEnd}>
        {board.map(({ id, title, tasks }: ColumnType) => (
          <div className={`${styles.column} ${styles[`column-${title}`]}`} key={`column-${id}`}>
            <div className={styles.column__header}>
              <div className={styles.column__title}>{upperCaseFirstLetter(title)}</div>
              <ButtonWithIcon
                className={styles.column__menuBtn}
                onClick={() => console.log('onClickMenu')}
                icon="RiMore2Line"
              />
            </div>
            <div className={styles.column__CreateNewTask}>
              {currentProjectId && (
                <CreateNewTask projectName={currentProjectId} taskStatus={title} />
              )}
            </div>
            <Droppable droppableId={id} type="column">
              {(provided) => (
                <div
                  className={styles.column__body}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.map((task: TaskType, i) => (
                    <Draggable
                      draggableId={`${task.number}`}
                      key={task.number}
                      index={i}
                    >
                      {(provided) => (
                        <div
                          key={task.number}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <Task task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}
