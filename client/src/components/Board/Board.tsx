import { ButtonWithIcon } from 'components/ButtonWithIcon';
import { CreateNewTask } from 'components/CreateNewTask/CreateNewTask';
import { Task } from 'components/Task';
import { nanoid } from 'nanoid';
import { useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getTasksFromDbThunk } from 'store/asyncActions/getTasksFromDbThunk';
import { TaskReducerStateType } from 'store/reducers/taskReducer';
import { TASK_STATUSES } from 'utils/constants';
import { upperCaseFirstLetter } from 'utils/helpers';
import { TaskStatusType, TaskType, ThunkDispatchType } from 'utils/types';
import { SearchReducerStateType } from '../../store/reducers/searchReducer';
import { Loading } from '../Loading';
import './Board.scss';

export type BoardType = {
  currentProjectName: string | undefined
}

export type ColumnType = {
  title: TaskStatusType,
  onClickMenu: () => void,
  currentColumnTasks: TaskType[],
  total: number
}

export function Board({ currentProjectName }: BoardType) {
  const dispatch: ThunkDispatchType = useDispatch();
  const { tasks, isLoading }: TaskReducerStateType = useSelector((state: RootState) => state.tasks);
  const { query }: SearchReducerStateType = useSelector((state: RootState) => state.search);

  const genColumn = (status: TaskStatusType): ColumnType => {
    const newQuery = new RegExp(query.toLowerCase());
    const tasksByStatus: TaskType[] = tasks.filter(
      (task: TaskType) => task.status === status
    );

    return {
      title: status,
      onClickMenu: () => console.log('menu'),
      currentColumnTasks: tasksByStatus.filter((task: TaskType) =>
        task.name.toLowerCase().match(newQuery)
        || String(task.number).toLowerCase().match(newQuery)),
      total: tasksByStatus.length
    };
  };

  const columns: ColumnType[] = (Object.keys(TASK_STATUSES) as TaskStatusType[])
    .map((status: TaskStatusType) => genColumn(status));

  const getAllTasks = useCallback(
    () => {
      currentProjectName && dispatch(getTasksFromDbThunk(currentProjectName));
    }, [currentProjectName, dispatch]);

  useLayoutEffect(() => getAllTasks(), [getAllTasks]);

  return (
    <div className={`Board`}>
      {columns.map(({ title, onClickMenu, currentColumnTasks }: ColumnType) => {
        return (
          <div className={`column column-${title}`} key={title}>
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
            <div className="column__body">
              {isLoading
                ? <Loading />
                : currentColumnTasks.map((task: TaskType) =>
                  <Task
                    task={task}
                    key={nanoid()}
                  />)
              }
            </div>
          </div>
        );
      })}
    </div>
  );
}
