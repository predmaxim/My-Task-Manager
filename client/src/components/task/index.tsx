import {ButtonWithIcon} from '@/components/button-with-iIcon';
import {Modal} from '@/components/modal';
import {TaskContent} from '@/components/task-content';
import {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import {createPortal} from 'react-dom';
import {useDispatch} from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import {formatDate, onActionModal} from '@/utils/helpers';
import {TaskMenuActionType, TaskStatusType, TaskType, ThunkDispatchType} from '@/utils/types';
import {deleteTask} from '@/store/async-actions/delete-task';
import {PopupMenu} from '@/components/popup-menu';
import './styles.scss';
import {TASK_STATUSES} from '@/utils/constants';

export type TaskProps = {
  task: TaskType
};

export function Task({task: initialTask}: TaskProps) {
  const dispatch: ThunkDispatchType = useDispatch();

  const [task, setTask] = useState<TaskType>(initialTask);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const updateTask = (taskFieldsToUpdate: Partial<TaskType>) => {
    const updatedTask: TaskType = {
      ...task,
      ...taskFieldsToUpdate
    };
    setTask(updatedTask);
    dispatch(updateTask(updatedTask));
  };

  const onClickDone = (e: MouseEvent<HTMLInputElement>) => e.stopPropagation();

  const onDone = () => {
    updateTask({
      done: task.done ? false : new Date,
      status: task.done ? TASK_STATUSES.queue as TaskStatusType : 'done'
    });
  };

  const onClickEditBtn = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  const onPressKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      task.name.trim() ? updateTask({...task, name: task.name.trim()}) : initialTask.name;
      setIsEdit(false);
    }
    if (e.code === 'Escape') {
      if (initialTask.name !== task.name.trim()) {
        updateTask({name: initialTask.name});
      }
      setIsEdit(false);
    }
  };

  const onBlurTaskName = () => {
    updateTask({name: task.name.trim() ? task.name.trim() : initialTask.name});
    setIsEdit(false);
  };

  const onChangeTaskName = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTask({...task, name: e.currentTarget.value});
  };

  const onClickTask = () => {
    if (!isEdit) {
      setShowModal(true);
    } else {
      setIsEdit(true);
    }
  };

  const onSubmitForm = (updatedTask: Partial<TaskType>) => {
    updateTask({...task, ...updatedTask});
    setShowModal(false);
  };

  const onClickMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuActive(true);
  };

  const editTask = () => {
    setIsEdit(true);
  };

  const removeTask = () => {
    dispatch(deleteTask(task.id));
  };

  const actions: TaskMenuActionType[] = [
    {
      name: 'edit',
      action: editTask
    },
    {
      name: 'remove',
      action: removeTask
    }
  ];

  const activeClassMenu = isMenuActive ? 'active' : '';

  return (
    <>
      <div
        className={`Task  ${!!task.done ? 'done' : ''}`}
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
            checked={!!task.done}
            value={task.name}
            onChange={onDone}
            onClick={onClickDone}
          />
          <div className="TaskNameWrap">
            <div
              className={`Task__name`}
            >
              {!isEdit
                ? <>
                  {task.name}
                  <ButtonWithIcon
                    className="Task__editBtn"
                    onClick={onClickEditBtn}
                    icon="RiPencilLine"
                  />
                </>
                : <TextareaAutosize
                  className="Task__editText"
                  onBlur={onBlurTaskName}
                  onChange={onChangeTaskName}
                  onKeyDown={onPressKey}
                  value={task.name}
                  autoFocus={true}
                />}
            </div>
          </div>
          <ButtonWithIcon
            className="Task__menuBtn"
            onClick={onClickMenu}
            icon="RiMore2Line"
          />
        </div>
        {(!!task.due || !!task.done) &&
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
            {!!task.done &&
              <div className="Task__done">
                <div className="done">
                  <span className="done__title">done:</span>
                  <span className="done__date">
                    {formatDate(task.done)}
                  </span>
                </div>
              </div>}
          </div>}
      </div>
      {showModal &&
        createPortal(
          <Modal
            className="TaskContentModal"
            isActive={true}
            onClose={() => onActionModal(setShowModal, false)}
            header={`#${task.number} - ${task.name}`}
            width="930px"
            formId="TaskContentForm"
          >
            <TaskContent
              task={task}
              onSubmit={onSubmitForm}
            />
          </Modal>,
          document.body
        )}
    </>
  );
}
