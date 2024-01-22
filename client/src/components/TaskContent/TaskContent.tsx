import {FormEventHandler} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {TASK_PRIORITY, TASK_STATUSES} from 'utils/constants';
import {formatDate, upperCaseFirstLetter} from 'utils/helpers';
import {TaskPriorityType, TaskStatusType, TaskType} from 'utils/types';
import './TaskContent.scss';

type TaskFormFields = {
  name: HTMLTextAreaElement;
  status: HTMLSelectElement;
  description?: HTMLTextAreaElement;
  priority: HTMLSelectElement;
  due?: HTMLInputElement;
  comments?: HTMLTextAreaElement;
  subTasks?: HTMLTextAreaElement;
};

export type TaskContentType = {
  task: TaskType;
  onSubmit: (task: Partial<TaskType>) => void;
};

export function TaskContent({task, onSubmit}: TaskContentType) {
  const genDone = (status: TaskStatusType) => {
    if (status === TASK_STATUSES.done && !task.done) {
      return new Date();
    } else if (status === TASK_STATUSES.done && task.done) {
      return task.done;
    }
    return false;
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement & TaskFormFields> = (e) => {
    e.preventDefault();
    const form: TaskFormFields = e.currentTarget;
    onSubmit({
      name: form.name.value,
      description: form.description?.value,
      status: form.status.value as TaskStatusType,
      due: form.due && form.due.valueAsDate ? form.due.valueAsDate : false,
      done: genDone(form.status.value as TaskStatusType),
      priority: form.priority.value as TaskPriorityType['name']
      // comments: form.comments && form.comments?.value,
      // subTasks: form.subTasks && form.subTasks?.value
    });
  };

  return (
    <form className="TaskContent" id="TaskContentForm" onSubmit={onSubmitHandler}>
      <div className="TaskContent__name">
        <span className="label label-textarea-name">Name:</span>
        <TextareaAutosize
          name="name"
          className="nameInput"
          autoFocus={true}
          defaultValue={task.name}
        />
      </div>
      <div className="TaskContent__status">
        <span className="label label-status">Status:</span>
        <select
          name="status"
          className="statusSelect"
          defaultValue={task.status}
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
      <div className="TaskContent__priority">
        <span className="label label-priority">Priority:</span>
        <select
          name="priority"
          className="prioritySelect"
          defaultValue={task.priority}
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
      <div className="TaskContent__due">
        <span className="label label-due">Due:</span>
        <input
          name="due"
          className="dueSelect"
          type="date"
          defaultValue={task.due ? formatDate(task.due) : ''}
        />
      </div>
      <div className="TaskContent__description">
        <span className="label label-description">Description:</span>
        <textarea
          name="description"
          className="descriptionInput"
          placeholder="Some Description"
          defaultValue={task.description}
        />
      </div>
      <div className="TaskContent__info">
        {task.created &&
          <div className="created">
            <span className="created__title">Created:</span>
            <span className="created__date">
              {formatDate(task.created)}
            </span>
          </div>}
        {task.inWork &&
          <div className="inWork">
            <span className="inWork__title">In work:</span>
            <span className="inWork__date">
              {formatDate(task.inWork)}
            </span>
          </div>}
        {task.done &&
          <div className="done">
            <span className="done__title">Done:</span>
            <span className="done__date">
              {formatDate(task.done)}
            </span>
          </div>
        }
      </div>
      <div className="TaskContent__files">
        {task.files?.length
          ? task.files?.map(file => (
            <button key={file} type="button" className="button-big">
              {file}
            </button>
          ))
          : <button className="addFilesBtn" type="button">+ Add File</button>
        }
      </div>
      <hr className="TaskContent__hr"/>
      <div className="TaskContent__comments">
        <span className="label label-comments">Comment:</span>
        <TextareaAutosize
          name="comment"
          className="commentInput"
          // placeholder="Comment Hear"
        />
      </div>
      <div className="TaskContent__commentBtn">
        <button type="button" className="button button-big commentBtn">
          Comment
        </button>
      </div>
      <div className="TaskContent__subTasks">
        <span className="label label-subTasks">SubTasks:</span>
        <TextareaAutosize
          className="subTasks"
          // placeholder="+ Add Subtask"
        />
        {task.subTasks &&
          <div className="subTasks">
            {task.subTasks.map(task => (
              <button
                key={task._id}
                type="button"
                className="button button-big"
              >
                {task.name}
              </button>
            ))}
          </div>}
      </div>
    </form>
  );
}
