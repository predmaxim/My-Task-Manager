import { ButtonWithIcon } from '@/components/ui/button-with-iIcon';
import { Modal } from '@/components/ui/modal';
import { ActionMenuItem, ActionsMenu } from '@/components/ui/actions-menu';
import { TaskContent } from '@/components/task/task-content';
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { formatDate } from '@/utils/helpers.ts';
import { TaskType } from '@/types';
import styles from './styles.module.scss';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/services/tasks-service.ts';

export type TaskProps = {
  task: TaskType
};

export function Task({ task: initialTask }: TaskProps) {
  const [task, setTask] = useState<TaskType>(initialTask);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const updateTaskHandler = (taskFieldsToUpdate: Partial<TaskType>) => {
    const updatedTask: TaskType = {
      ...task,
      ...taskFieldsToUpdate,
    };
    setTask(updatedTask);
    updateTask(updatedTask);
  };

  const onClickDone = (e: MouseEvent<HTMLInputElement>) => e.stopPropagation();

  const onDone = () => {
    updateTaskHandler({
      done: task.done ? null : new Date(),
    });
  };

  const onClickEditBtn = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  const onPressKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (task.name.trim()) {
        updateTaskHandler({ ...task, name: task.name.trim() });
      }
      task.name = initialTask.name;
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
    const name = task.name.trim() || initialTask.name;
    if (initialTask.name !== name) {
      updateTaskHandler({ name });
    }
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

  const onClickEditTask = () => {
    setIsEdit(true);
  };

  const onClickRemoveTask = async () => {
    await deleteTask(task.id);
  };

  const menuActions: ActionMenuItem<TaskType['id']>[] = [
    {
      key: 'edit',
      label: 'Редактировать название',
      onSelect: onClickEditTask,
    },
    {
      key: 'remove',
      label: 'Удалить',
      variant: 'danger',
      onSelect: onClickRemoveTask,
    },
  ];

  return (
    <>
      <div
        className={`${styles.Task}  ${task.done ? 'done' : ''}`}
        onClick={onClickTask}
      >
        <div className={styles.Task__header}>
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
              className={styles.Task__name}
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
          <ActionsMenu
            id={task.id}
            buttonClassName={styles.Task__menuBtn}
            actions={menuActions}
          />
        </div>
        {(!!task.due || !!task.done) &&
          <div className={styles.Task__footer}>
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
            header={`#${task.id} - ${task.name}`}
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
