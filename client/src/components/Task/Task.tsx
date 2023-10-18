import { ButtonWithIcon } from 'components/ButtonWithIcon';
import { Modal } from 'components/Modal';
import { TaskContent } from 'components/TaskContent';
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { formatDate, onActionModal } from 'utils/helpers';
import { TaskStatusType, TaskType, ThunkDispatchType } from 'utils/types';
import { deleteTaskThunk } from '../../store/asyncActions/deleteTaskThunk';
import { updateTaskThunk } from '../../store/asyncActions/updateTaskThunk';
import { TASK_STATUSES } from '../../utils/constants';
import './Task.scss';

export type TaskProps = {
  task: TaskType;
}

export function Task({ task }: TaskProps) {
  const dispatch: ThunkDispatchType = useDispatch();

  const [
    showTaskModal,
    setShowTaskModal
  ] = useState(false);
  const [
    taskName,
    setTaskName
  ] = useState<typeof task.name>(task.name);
  const [
    taskDone,
    setTaskDone
  ] = useState<typeof task.done>(task.done);
  const [
    taskLastStatus,
    setTaskLastStatus
  ] = useState<typeof task.lastStatus>(task.lastStatus);
  const [
    taskStatus,
    setTaskStatus
  ] = useState<typeof task.status>(task.status);
  const [
    isEdit,
    setIsEdit
  ] = useState<boolean>(!taskName);
  const [
    isMenuActive,
    setIsMenuActive
  ] = useState(false);

  const removeTask = () => {
    dispatch(deleteTaskThunk(task._id));
  };

  const saveTask = (taskFieldsToUpdate: Partial<TaskType>) => {
    taskName.trim()
      ? dispatch(updateTaskThunk({ _id: task._id, ...taskFieldsToUpdate } as TaskType))
      : dispatch(deleteTaskThunk(task._id));
  };

  //done
  const onDone = () => {
    if (!taskDone) {
      setTaskDone(new Date);
      setTaskStatus(TASK_STATUSES.done as TaskStatusType);
    } else {
      setTaskDone(false);
      setTaskStatus(taskLastStatus);
    }
    setTaskLastStatus(taskStatus !== TASK_STATUSES.done as TaskStatusType
      ? taskStatus
      : TASK_STATUSES.queue as TaskStatusType
    );
  };

  const onClickDone = (e: MouseEvent<HTMLInputElement>) => e.stopPropagation();

  const onInputDone = () => queueMicrotask(() =>
    saveTask({
      ...task,
      done: taskDone,
      status: taskStatus,
      lastStatus: taskLastStatus
    }));

  //edit
  const onClickEditBtn = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  const saveName = () => {
    if (taskName.trim() !== task.name) {
      setTaskName(taskName.trim());
      saveTask({ ...task, name: taskName.trim() });
    } else {
      setTaskName(task.name);
    }
    setIsEdit(false);
  };

  const onPressKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      saveName();
    }
    if (e.code === 'Escape') {
      setTaskName(task.name);
      setIsEdit(false);
    }
  };

  const onBlurTaskName = () => {
    if (taskName) {
      saveName();
    } else {
      setTaskName(task.name);
      setIsEdit(false);
    }
  };

  const onChangeTaskName = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setTaskName(e.currentTarget.value);

  //delete
  const onClickDeleteBtn = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  // Modal
  const onClickTask = () => {
    if (!isEdit) {
      setShowTaskModal(true);
    } else {
      setIsEdit(true);
    }
  };

  const onSubmitForm = (updatedTask: Partial<TaskType>) => {
    setShowTaskModal(false);
    saveTask({ ...task, ...updatedTask });
  };

  const actions = [
    {
      name: 'remove',
      action: removeTask
    }
  ];

  const activeClassMenu = isMenuActive ? 'active' : '';

  const onClickMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuActive(true);
  };

  return (
    <>
      <div
        className={`Task  ${taskDone ? 'done' : ''}`}
        onClick={onClickTask}
      >
        {<PopupMenu
          className={`Task__popup ${activeClassMenu}`}
          actions={actions}
          closeMenu={() => setIsMenuActive(false)}
        />}
        <div className="Task-header">
          <input
            className="Task__checkbox"
            type="checkbox"
            checked={!!taskDone}
            value={task.name}
            onChange={onDone}
            onInput={onInputDone}
            onClick={onClickDone}
          />
          <div className="TaskNameWrap">
            <div
              className={`Task__name`}
            >
              {!isEdit
                ? taskName
                : <TextareaAutosize
                  className="Task__editText"
                  onBlur={onBlurTaskName}
                  onChange={onChangeTaskName}
                  onKeyDown={onPressKey}
                  value={taskName}
                  autoFocus={true}
                />}
              {!isEdit &&
                <ButtonWithIcon
                  className="Task__editBtn"
                  onClick={onClickEditBtn}
                  icon="RiPencilLine"
                />}
            </div>
          </div>
          <ButtonWithIcon
            className="Task__menuBtn"
            onClick={onClickMenu}
            icon="RiMore2Line"
          />
        </div>
        {(!!task.due || !!taskDone) &&
          <div className="Task-footer">
            {task.due &&
              <div className="Task__due">
                <div className="due">
                  <span className="due__title">due:</span>
                  <span className="due__date">
                    {formatDate(task.due)}
                  </span>
                </div>
              </div>}
            {taskDone &&
              <div className="Task__done">
                <div className="done">
                  <span className="done__title">done:</span>
                  <span className="done__date">
                    {formatDate(taskDone)}
                  </span>
                </div>
              </div>}
          </div>}
      </div>
      {showTaskModal &&
        createPortal(
          <Modal
            className="TaskContentModal"
            isActive={true}
            onClose={() => onActionModal(setShowTaskModal, false)}
            header={`#${task.number} - ${task.name}`}
            width="930px"
            formId="TaskContentForm"
          >
            <TaskContent
              task={{ ...task, done: taskDone, name: taskName }}
              onSubmit={onSubmitForm}
            />
          </Modal>,
          document.body
        )}
    </>
  );
}
