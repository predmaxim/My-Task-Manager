import React, {FocusEvent, KeyboardEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import {RootState} from '../../store';
import {createNewTaskThunk} from '../../store/asyncActions/createNewTaskThunk';
import {ProjectsReducerStateType} from '../../store/reducers/projectReducer';
import {TASK_STATUSES, TEMP_USER} from '../../utils/constants';
import {TaskStatusType, TaskType, ThunkDispatchType} from '../../utils/types';
import {ButtonWithIcon} from 'components/ButtonWithIcon';
import './CreateNewTask.scss';

export type CreateNewTaskType = {
  projectName: string;
  taskStatus: TaskStatusType;
};

export function CreateNewTask({projectName, taskStatus}: CreateNewTaskType) {
  const dispatch: ThunkDispatchType = useDispatch();
  const {currentProject}: ProjectsReducerStateType = useSelector((state: RootState) => state.projects);

  const [newTaskName, setNewTaskName] = useState<string>('');
  const [showTaskCreator, setShowTaskCreator] = useState(false);

  const createNewTask = () => {
    if (currentProject) {
      const newTask: TaskType = {
        name: newTaskName,
        project: projectName,
        user: TEMP_USER,
        status: taskStatus,
        done: taskStatus === TASK_STATUSES.done ? new Date() : undefined,
        comments: [],
        created: new Date(),
        priority: 'low',
        number: currentProject.tasks + 1,
        index: 0
      };
      dispatch(createNewTaskThunk(newTask));
      setNewTaskName('');
      setShowTaskCreator(false);
    }
  };

  const onClickNewBtn = () => setShowTaskCreator(true);

  const onKeyDownTaskName = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      newTaskName ? createNewTask() : setShowTaskCreator(false);
    }
    if (e.code === 'Escape') {
      setShowTaskCreator(false);
      setNewTaskName('');
    }
  };

  const onBlurNewTaskCreator = () => (newTaskName ? createNewTask() : setShowTaskCreator(false));

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
      {showTaskCreator && (
        <TextareaAutosize
          className="CreateNewTask__newTaskText"
          onBlur={onBlurNewTaskCreator}
          onKeyDown={onKeyDownTaskName}
          onChange={onChangeHandler}
          value={newTaskName}
          autoFocus={true}
        />
      )}
    </div>
  );
}
