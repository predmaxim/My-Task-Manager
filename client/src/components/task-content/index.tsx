import { FormEventHandler } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { TASK_PRIORITY, TASK_STATUSES } from '@/constants';
import { formatDate, upperCaseFirstLetter } from '@/utils/helpers';
import { PopulatedTaskType, TaskStatusType, TaskType } from '@/types';
import styles from './styles.module.scss';

type TaskFormFields = {
  name: HTMLTextAreaElement;
  statusId: HTMLSelectElement;
  description?: HTMLTextAreaElement;
  priorityId: HTMLSelectElement;
  due?: HTMLInputElement;
  comments?: HTMLTextAreaElement;
  subTasks?: HTMLTextAreaElement;
};

export type TaskContentType = {
  task: PopulatedTaskType;
  onSubmit: (task: Partial<TaskType>) => void;
};

export function TaskContent({ task, onSubmit }: TaskContentType) {
  const genDone = (statusName: TaskStatusType['name']) => {
    if (statusName === TASK_STATUSES.done && !task.done) {
      return new Date();
    } else if (statusName === TASK_STATUSES.done && task.done) {
      return task.done;
    }
    return null;
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement & TaskFormFields> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    onSubmit({
      name: form.name.value,
      description: form.description?.value,
      due: form.due?.valueAsDate || null,
      done: genDone(form.status.value as TaskStatusType['name']),
      statusId: form.status.id,
      priorityId: parseInt(form.priority.id),
      // comments: form.comments?.value,
      // files: form.files.value,
      // subTasks: form?.subTasks.value
    });
  };

  return (
    <form className={styles.TaskContent} id="TaskContentForm" onSubmit={onSubmitHandler}>
      <div className={styles.TaskContent__name}>
        <span className={`${styles.label} ${styles['label-textarea-name']}`}>Name:</span>
        <TextareaAutosize
          name="name"
          className={styles.nameInput}
          autoFocus={true}
          defaultValue={task.name}
        />
      </div>
      <div className={styles.TaskContent__status}>
        <span className={`${styles.label} ${styles['label-status']}`}>Status:</span>
        <select
          name="status"
          className={styles.statusSelect}
          defaultValue={task.status.name}
        >
          {Object.values(TASK_STATUSES).map((status) => (
            <option
              value={status}
              key={status}
            >
              {upperCaseFirstLetter(status)}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.TaskContent__priority}>
        <span className={`${styles.label} ${styles['label-priority']}`}>Priority:</span>
        <select
          name="priority"
          className={styles.prioritySelect}
          defaultValue={task.priority.name}
        >
          {Object.values(TASK_PRIORITY).map((priority) => (
            <option
              value={priority}
              key={priority}
            >
              {upperCaseFirstLetter(priority)}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.TaskContent__due}>
        <span className={`${styles.label} ${styles['label-due']}`}>Due:</span>
        <input
          name="due"
          className={styles.dueSelect}
          type="date"
          defaultValue={task.due ? formatDate(task.due) : ''}
        />
      </div>
      <div className={styles.TaskContent__description}>
        <span className={`${styles.label} ${styles['label-description']}`}>Description:</span>
        <textarea
          name="description"
          className={styles.descriptionInput}
          placeholder="Some Description"
          defaultValue={task?.description || ''}
        />
      </div>
      <div className={styles.TaskContent__info}>
        {task.created &&
          <div className={styles.created}>
            <span className={styles.created__title}>Created:</span>
            <span className={styles.created__date}>
              {formatDate(task.created)}
            </span>
          </div>}
        {task.inWork &&
          <div className={styles.inWork}>
            <span className={styles.inWork__title}>In work:</span>
            <span className={styles.inWork__date}>
              {formatDate(task?.inWork)}
            </span>
          </div>}
        {task.done &&
          <div className={styles.done}>
            <span className={styles.done__title}>Done:</span>
            <span className={styles.done__date}>
              {formatDate(task.done)}
            </span>
          </div>
        }
      </div>
      {/*<div className={styles.TaskContent__files}>*/}
      {/*  {task.files?.length*/}
      {/*    ? task.files?.map(file => (*/}
      {/*      <button key={file} type="button" className={`${styles.button} big`}>*/}
      {/*        {file}*/}
      {/*      </button>*/}
      {/*    ))*/}
      {/*    : <button className={styles.addFilesBtn} type="button">+ Add File</button>*/}
      {/*  }*/}
      {/*</div>*/}
      <hr className={styles.TaskContent__hr} />
      <div className={styles.TaskContent__comments}>
        <span className={`${styles.label} ${styles['label-comments']}`}>Comment:</span>
        <TextareaAutosize
          name="comment"
          className={styles.commentInput}
          // placeholder="Comment Hear"
        />
      </div>
      <div className={styles.TaskContent__commentBtn}>
        <button type="button" className={`button button-big ${styles.commentBtn}`}>
          Comment
        </button>
      </div>
      {/*<div className={styles.TaskContent__subTasks}>*/}
      {/*  <span className={`${styles.label} ${styles['label-subTasks']}`}>SubTasks:</span>*/}
      {/*  <TextareaAutosize*/}
      {/*    className={styles.subTasks}*/}
      {/*    // placeholder="+ Add Subtask"*/}
      {/*  />*/}
      {/*  {task.subTasks &&*/}
      {/*    <div className={styles.subTasks}>*/}
      {/*      {task.subTasks.map(task => (*/}
      {/*        <button*/}
      {/*          key={task.id}*/}
      {/*          type="button"*/}
      {/*          className="button button-big"*/}
      {/*        >*/}
      {/*          {task.name}*/}
      {/*        </button>*/}
      {/*      ))}*/}
      {/*    </div>}*/}
      {/*</div>*/}
    </form>
  );
}
