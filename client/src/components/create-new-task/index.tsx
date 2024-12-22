import { FocusEvent, KeyboardEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { TASK_STATUSES, TEMP_USER } from '@/constants';
import { PartialTaskType, TaskStatusType } from '@/types';
import { ButtonWithIcon } from '@/components/button-with-iIcon';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib/store';
import { useCreateTaskMutation } from '@/services/tasks';

export type CreateNewTaskType = {
  projectName: string;
  taskStatus: TaskStatusType;
};

export function CreateNewTask({ projectName, taskStatus }: CreateNewTaskType) {
  const { currentProject } = useAppSelector((state) => state.projects);
  const [createTask] = useCreateTaskMutation();

  const [newTaskName, setNewTaskName] = useState<string>('');
  const [showTaskCreator, setShowTaskCreator] = useState(false);

  const createNewTaskHandler = () => {
    if (currentProject) {
      const newTask: PartialTaskType = {
        name: newTaskName,
        project: projectName,
        user: TEMP_USER,
        status: taskStatus,
        done: taskStatus === TASK_STATUSES.done ? new Date() : undefined,
        comments: [],
        created: new Date(),
        priority: 'low',
        number: currentProject.tasks + 1,
        index: 0,
      };
      createTask(newTask);
      setNewTaskName('');
      setShowTaskCreator(false);
    }
  };

  const onClickNewBtn = () => setShowTaskCreator(true);

  const onKeyDownTaskName = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (newTaskName) {
        createNewTaskHandler();
      } else {
        setShowTaskCreator(false);
      }
    }
    if (e.code === 'Escape') {
      setShowTaskCreator(false);
      setNewTaskName('');
    }
  };

  const onBlurNewTaskCreator = () => (newTaskName ? createNewTaskHandler() : setShowTaskCreator(false));

  const onChangeHandler = (e: FocusEvent<HTMLTextAreaElement>) =>
    setNewTaskName(e.currentTarget.value);

  return (
    <div className={styles.CreateNewTask}>
      <ButtonWithIcon
        className={styles.CreateNewTask__newTaskBtn}
        onClick={onClickNewBtn}
        icon="RiAddLine"
        text="New Task"
      />
      {showTaskCreator && (
        <TextareaAutosize
          className={styles.CreateNewTask__newTaskText}
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
