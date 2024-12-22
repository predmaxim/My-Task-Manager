import { ButtonWithIcon } from '@/components/button-with-iIcon';
import { Modal } from '@/components/modal';
import { TaskContent } from '@/components/task-content';
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { formatDate } from '@/utils/helpers';
import { TaskMenuActionType, TaskStatusType, TaskType } from '@/types';
import { PopupMenu } from '@/components/popup-menu';
import styles from './styles.module.scss';
import { TASK_STATUSES } from '@/constants';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/services/tasks';

export type TaskProps = {
  task: TaskType
};

export function Task({ task: initialTask }: TaskProps) {
  const [task, setTask] = useState<TaskType>(initialTask);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const updateTaskHandler = async (taskFieldsToUpdate: Partial<TaskType>) => {
    const updatedTask: TaskType = {
      ...task,
      ...taskFieldsToUpdate,
    };
    setTask(updatedTask);
    await updateTask(updatedTask);
  };

  const onClickDone = (e: MouseEvent<HTMLInputElement>) => e.stopPropagation();

  const onDone = () => {
    updateTaskHandler({
      done: task.done ? false : new Date(),
      status: task.done ? TASK_STATUSES.queue as TaskStatusType : 'done',
    });
  };

  const onClickEditBtn = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  const onPressKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      task.name.trim() ? updateTaskHandler({ ...task, name: task.name.trim() }) : initialTask.name;
      setIsEdit(false);
    }
    if (e.code === 'Escape') {
      if (initialTask.name !== task.name.trim()) {
        updateTaskHandler({ name: initialTask.name });
      }
      setIsEdit(false);
    }
  };

  const onBlurTaskName = () => {
    updateTaskHandler({ name: task.name.trim() ? task.name.trim() : initialTask.name });
    setIsEdit(false);
  };

  const onChangeTaskName = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTask({ ...task, name: e.currentTarget.value });
  };

  const onClickTask = () => {
    if (!isEdit) {
      setShowModal(true);
    } else {
      setIsEdit(true);
    }
  };

  const onSubmitForm = (updatedTask: Partial<TaskType>) => {
    updateTaskHandler({ ...task, ...updatedTask });
    setShowModal(false);
  };

  const onClickMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuActive(true);
  };

  const editTask = () => {
    setIsEdit(true);
  };

  const removeTask = async () => {
    await deleteTask(task._id);
  };

  const actions: TaskMenuActionType[] = [
    {
      name: 'edit',
      action: editTask,
    },
    {
      name: 'remove',
      action: removeTask,
    },
  ];

  const activeClassMenu = isMenuActive ? 'active' : '';

  return (
    <>
      <div
        className={`${styles.Task}  ${task.done ? 'done' : ''}`}
        onClick={onClickTask}
      >
        {<PopupMenu
          className={`${styles.Task__popup} ${activeClassMenu}`}
          actions={actions}
          closeMenu={() => setIsMenuActive(false)}
        />}
        <div className={styles.Task_header}>
          <input
            className={styles.Task__checkbox}
            type="checkbox"
            checked={!!task.done}
            value={task.name}
            onChange={onDone}
            onClick={onClickDone}
          />
          <div className={styles.TaskNameWrap}>
            <div
              className={`Task__name`}
            >
              {!isEdit
                ? <>
                  {task.name}
                  <ButtonWithIcon
                    className={styles.Task__editBtn}
                    onClick={onClickEditBtn}
                    icon="RiPencilLine"
                  />
                </>
                : <TextareaAutosize
                  className={styles.Task__editText}
                  onBlur={onBlurTaskName}
                  onChange={onChangeTaskName}
                  onKeyDown={onPressKey}
                  value={task.name}
                  autoFocus={true}
                />}
            </div>
          </div>
          <ButtonWithIcon
            className={styles.Task__menuBtn}
            onClick={onClickMenu}
            icon="RiMore2Line"
          />
        </div>
        {(!!task.due || !!task.done) &&
          <div className={styles.Task_footer}>
            {task.due &&
              <div className={styles.Task__due}>
                <div className={styles.due}>
                  <span className={styles.due__title}>due:</span>
                  <span className={styles.due__date}>
                    {formatDate(task.due)}
                  </span>
                </div>
              </div>}
            {!!task.done &&
              <div className={styles.Task__done}>
                <div className={styles.done}>
                  <span className={styles.done__title}>done:</span>
                  <span className={styles.done__date}>
                    {formatDate(task.done)}
                  </span>
                </div>
              </div>}
          </div>}
      </div>
      {showModal &&
        createPortal(
          <Modal
            className={styles.TaskContentModal}
            isActive={true}
            onClose={() => setShowModal(false)}
            header={`#${task.number} - ${task.name}`}
            width="930px"
            formId="TaskContentForm"
          >
            <TaskContent
              task={task}
              onSubmit={onSubmitForm}
            />
          </Modal>,
          document.body,
        )}
    </>
  );
}
