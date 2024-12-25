import { FocusEvent, KeyboardEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { PartialTaskType, ProjectType, TaskStatusType } from '@/types';
import { ButtonWithIcon } from '@/components/ui/button-with-iIcon';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib/store.ts';
import { useCreateTaskMutation } from '@/services/tasks-service.ts';

export type CreateNewTaskType = {
  project: ProjectType;
  statusId: TaskStatusType['id'];
  className?: string;
};

export function CreateNewTask({ project, statusId, className }: CreateNewTaskType) {
  const { currentProject } = useAppSelector((state) => state.projects);
  const [createTask] = useCreateTaskMutation();

  const [newTaskName, setNewTaskName] = useState<string>('');
  const [showTaskCreator, setShowTaskCreator] = useState(false);

  const createNewTaskHandler = async () => {
    if (currentProject) {
      const newTask: PartialTaskType = {
        name: newTaskName,
        projectId: project.id,
        statusId: statusId,
        done: null,
        priority: 'low',
        order: 0,
        description: '',
        inWork: null,
        created: new Date(),
        due: null,
        parentId: null,
      };
      await createTask(newTask).unwrap();
      setNewTaskName('');
      setShowTaskCreator(false);
    }
  };

  const onClickNewBtn = () => 
      setShowTaskCreator(true);

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

  const onBlurNewTaskCreator = () => newTaskName ? createNewTaskHandler() : setShowTaskCreator(false);

  const onChangeHandler = (e: FocusEvent<HTMLTextAreaElement>) =>
    setNewTaskName(e.currentTarget.value);

  return (
    <div className={`${styles.CreateNewTask} ${className}`}>
      <ButtonWithIcon
        className={styles.CreateNewTask__newTaskBtn}
        onClick={onClickNewBtn}
        icon="RiAddLine"
        text="New Task"
        disabled={showTaskCreator}
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