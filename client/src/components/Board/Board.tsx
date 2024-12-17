import { ButtonWithIcon } from 'components/ButtonWithIcon';
import { CreateNewTask } from 'components/CreateNewTask/CreateNewTask';
import { Task } from 'components/Task';
import { useCallback, useLayoutEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getTasksFromDbThunk } from 'store/asyncActions/getTasksFromDbThunk';
import { setTasks, TaskReducerStateType } from 'store/reducers/taskReducer';
import { upperCaseFirstLetter } from 'utils/helpers';
import { TaskStatusType, TaskType, ThunkDispatchType } from 'utils/types';
import { updateTaskThunk } from '../../store/asyncActions/updateTaskThunk';
import { SearchReducerStateType } from '../../store/reducers/searchReducer';
import { TASK_STATUSES } from '../../utils/constants';
import './Board.scss';

export type BoardType = {
  currentProjectName: string | undefined
}

export type ColumnType = {
  id: TaskStatusType,
  title: TaskStatusType,
  onClickMenu: () => void,
  tasks: TaskType[],
  total: number
}

export function Board({ currentProjectName }: BoardType) {
  const dispatch: ThunkDispatchType = useDispatch();
  const { tasks }: TaskReducerStateType = useSelector((state: RootState) => state.tasks);
  const { query }: SearchReducerStateType = useSelector((state: RootState) => state.search);
  const [board, setBoard] = useState<ColumnType[]>([]);

  const genColumn = useCallback((status: TaskStatusType): ColumnType => {
    const newQuery = new RegExp(query.toLowerCase());
    const tasksByStatus: TaskType[] = tasks.filter(
      (task: TaskType) => task.status === status
    );

    return {
      id: status,
      title: status,
      onClickMenu: () => console.log('menu'),
      tasks: tasksByStatus.filter((task: TaskType) =>
        task.name.toLowerCase().match(newQuery)
        || String(task.number).toLowerCase().match(newQuery)),
      total: tasksByStatus.length
    };
  }, [query, tasks]);

  const genBoard = useCallback(() => {
    const newColumns = (Object.keys(TASK_STATUSES) as TaskStatusType[])
      .map((status: TaskStatusType) => genColumn(status));
    setBoard(newColumns);
  }, [genColumn]);

  const onDragEnd = (result: DropResult) => {
    const {
      source,
      destination
    } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId
      && source.index === destination.index) return;

    const newBoard = [...board];

    const columnSourceIndex = newBoard
      .findIndex(column => column.id === source.droppableId);
    const columnDestinationIndex = newBoard
      .findIndex(column => column.id === destination.droppableId);

    const taskSourceIndex = source.index;
    const taskDestinationIndex = destination.index;


    const sourceColumn: ColumnType = {
      ...newBoard[columnSourceIndex]
    };
    const destinationColumn: ColumnType = {
      ...newBoard[columnDestinationIndex]
    };

    const [removedTask] = sourceColumn.tasks
      .splice(taskSourceIndex, 1);

    if (source.droppableId !== destination.droppableId) {
      removedTask.done = destination.droppableId === TASK_STATUSES.done
        ? new Date
        : false;
      removedTask.status = destination.droppableId as TaskStatusType;
      removedTask.lastStatus = destination.droppableId === TASK_STATUSES.done
        ? source.droppableId as TaskStatusType
        : TASK_STATUSES.queue as TaskStatusType;
    }

    destinationColumn.tasks.splice(taskDestinationIndex, 0, removedTask);

    setBoard(newBoard);

    const newTasks = newBoard
      .map((column) => column.tasks)
      .flat();

    dispatch(setTasks(newTasks));
    dispatch(updateTaskThunk(removedTask));
  };

  const getAllTasks = useCallback(
    () => {
      currentProjectName && dispatch(getTasksFromDbThunk(currentProjectName));
    }, [currentProjectName, dispatch]
  );

  useLayoutEffect(() => genBoard(), [genBoard]);
  useLayoutEffect(() => getAllTasks(), [getAllTasks]);

  return (
    <div className={`Board`}>
      <DragDropContext key={'Board'} onDragEnd={onDragEnd}>
        {board.map(({ id, title, onClickMenu, tasks }: ColumnType) => {
          return (
            <div className={`column column-${title}`} key={`column-${id}`}>
              <div className="column__header">
                <div className="column__title">{upperCaseFirstLetter(title)}</div>
                <ButtonWithIcon
                  className="column__menuBtn"
                  onClick={onClickMenu}
                  icon="RiMore2Line"
                />
              </div>
              <div className="column__CreateNewTask">
                {currentProjectName &&
                  <CreateNewTask
                    projectName={currentProjectName}
                    taskStatus={title}
                  />}
              </div>
              <Droppable droppableId={id} type="column">
                {(provided) => (
                  <div className="column__body" {...provided.droppableProps} ref={provided.innerRef}>
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
          );
        })}
      </DragDropContext>
    </div>
  );
}
