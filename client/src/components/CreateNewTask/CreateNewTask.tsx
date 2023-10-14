import { ButtonWithIcon } from 'components/ButtonWithIcon';
import { FocusEvent, KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { RootState } from '../../store';
import { createNewTaskThunk } from '../../store/asyncActions/createNewTaskThunk';
import { TASK_STATUSES, TEMP_USER } from '../../utils/constants';
import { TaskStatusType, TaskType, ThunkDispatchType } from '../../utils/types';
import './CreateNewTask.scss';

export type CreateNewTaskType = {
  projectName: string,
  taskStatus: TaskStatusType
}

export function CreateNewTask({ projectName, taskStatus }: CreateNewTaskType) {
  const dispatch: ThunkDispatchType = useDispatch();
  const { total } = useSelector((state: RootState) => state.tasks);
  const [newTaskName, setNewTaskName] = useState<string>();
  const [showTaskCreator, setShowTaskCreator] = useState(false);

  const createNewTask = () => {
    const newTask: TaskType = {
      name: newTaskName || '',
      project: projectName,
      user: TEMP_USER,
      status: taskStatus,
      lastStatus: taskStatus === TASK_STATUSES.done as TaskStatusType
        ? TASK_STATUSES.queue as TaskStatusType
        : taskStatus,
      done: taskStatus === TASK_STATUSES.done as TaskStatusType
        ? new Date()
        : undefined,
      comments: [],
      number: total + 1,
      created: new Date()
    };
    dispatch(createNewTaskThunk(newTask));
    setNewTaskName(undefined);
    setShowTaskCreator(false);
  };

  const onClickNewBtn = () => setShowTaskCreator(true);

  const onKeyDownTaskName = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.code === 'Enter' || e.code === 'NumpadEnter')) {
      newTaskName ? createNewTask() : setShowTaskCreator(false);
    }
    if (e.code === 'Escape') {
      setShowTaskCreator(false);
      setNewTaskName(undefined);
    }
  };

  const onBlurNewTaskCreator = () =>
    newTaskName ? createNewTask() : setShowTaskCreator(false);

  const onChangeHandler = (e: FocusEvent<HTMLTextAreaElement>) =>
    setNewTaskName(e.currentTarget.value);

  return (
    <div className="CreateNewTask">
      <ButtonWithIcon
        className="CreateNewTask__newTaskBtn"
        onClick={onClickNewBtn}
        icon="RiAddLine"
        text="New Task"
      />
      {showTaskCreator &&
        <TextareaAutosize
          className="CreateNewTask__newTaskText"
          onBlur={onBlurNewTaskCreator}
          onKeyDown={onKeyDownTaskName}
          onChange={onChangeHandler}
          value={newTaskName}
          autoFocus={true}
        />}
    </div>
  );
}
