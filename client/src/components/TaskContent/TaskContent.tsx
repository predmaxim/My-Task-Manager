import { TaskType } from 'utils/types';
import { TASK_PRIORITY, TASK_STATUSES } from '../../utils/constants';
import { formatDate, upperCaseFirstLetter } from '../../utils/helpers';
import './TaskContent.scss';

export type TaskContentType = {
  task: TaskType
};

export function TaskContent({ task }: TaskContentType) {
  const {
    _id,
    number,
    created,
    name,
    comments,
    description,
    done,
    due,
    files,
    inWork,
    priority,
    status
  } = task;
  return (
    <div className={`TaskContent`}>
      <div className="TaskContent-row row-1">
        <label className="TaskContent-label">
          <span className="label-text-for-TaskContent__Name">Task Name:</span>
          <input
            className="TaskContent__Name"
            type="text"
            placeholder="ex. My Task"
            autoFocus={true}
            defaultValue={task.name}
          />
        </label>
        <label className="TaskContent-label">
          <span className="label-text-for-TaskContent__status">Status:</span>
          <select
            name="TaskContent__status"
            className="TaskContent__status"
          >
            {Object.keys(TASK_STATUSES).map((status) =>
              <option
                value={status}
                key={status}
              >
                {upperCaseFirstLetter(status)}
              </option>
            )}
          </select>
        </label>
        <label className="TaskContent-label">
          <span className="label-text-for-TaskContent__priority">Status:</span>
          <select
            name="TaskContent__priority"
            className="TaskContent__priority"
          >
            {Object.keys(TASK_PRIORITY).map((priority) =>
              <option
                value={priority}
                key={priority}
              >
                {upperCaseFirstLetter(priority)}
              </option>
            )}
          </select>
        </label>
        <label className="TaskContent-label">
          <span className="label-text-for-TaskContent__due">Due:</span>
          <input
            className="TaskContent__due"
            type="date"
            defaultValue={
              formatDate(task.due ? task.due : new Date(),
                { year: 'numeric', month: 'numeric', day: 'numeric' })
            }
          />
        </label>
      </div>
      <div className="TaskContent-row row-2">
        <label className="TaskContent-label">
          <span className="label-text-for-TaskContent__description">Due:</span>
          <textarea
            className="TaskContent__description"
            placeholder="Some Description"
          />
          {task.created &&
            <div className="TaskContent__created">
              <div className="TaskContent-created">
                <span className="TaskContent-created__title">Created:</span>
                <span className="TaskContent-created__date">
                    {formatDate(task.created, { year: 'numeric', month: 'numeric', day: 'numeric' })}
                  </span>
              </div>
            </div>}
          {task.inWork &&
            <div className="TaskContent__inWork">
              <div className="TaskContent-inWork">
                <span className="TaskContent-inWork__title">In work:</span>
                <span className="TaskContent-inWork__date">
                    {formatDate(task.inWork, { year: 'numeric', month: 'numeric', day: 'numeric' })}
                  </span>
              </div>
            </div>}
        </label>
        <button type="button" className="button button-big TaskContent__descriptionBtn">Send</button>
        <div className="TaskContent__files">
          {task.files && task.files?.map(file =>
            <button key={file} type="button"
                    className="button button-big TaskContent__fileBtn">{file}</button>)}
        </div>
        {done && <div>{formatDate(done, { year: 'numeric', month: 'numeric', day: 'numeric' })}</div>}
      </div>
      <div className="TaskContent-row row-3">
        <label className="TaskContent-label">
          <span className="label-text-for-TaskContent__comment">Comment:</span>
          <textarea
            className="TaskContent__comment"
            placeholder="Comment Hear"
          />
        </label>
        <button type="button" className="button button-big TaskContent__commentBtn">Comment</button>
        <label className="TaskContent-label">
          <span className="label-text-for-TaskContent__comment">SubTasks:</span>
          <textarea
            className="TaskContent__subTask"
            placeholder="Comment Hear"
          />
        </label>
      </div>
    </div>
  );
}
