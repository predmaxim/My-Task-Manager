import './styles.scss';

export type SubTasksProps = {
  prop?: string;
}

export function SubTasks({prop = 'default value'}: SubTasksProps) {
  return <div className={`SubTasks`}>SubTasks {prop}</div>;
}
