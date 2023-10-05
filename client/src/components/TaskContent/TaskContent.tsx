import { TaskType } from 'src/utils/types';
import './TaskContent.scss';

export type TaskContentType = {
  task: TaskType
};

export function TaskContent({ task }: TaskContentType) {
  const { number, created, name, comments, description, done, due, files, inWork, priority, status } = task;
  return (
    <div className={`TaskContent`}>
      <div className="TaskContent-row row-1">

      </div>
      <div className="TaskContent-row row-2"></div>
      <div className="TaskContent-row row-3"></div>
      <div className="TaskContent-row row-4"></div>
      <div className="TaskContent-row row-5"></div>
    </div>
  );
}
