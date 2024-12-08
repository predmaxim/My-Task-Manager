import styles from './styles.module.scss';

export type SubTasksProps = {
  prop?: string;
}

export function SubTasks({prop = 'default value'}: SubTasksProps) {
  return <div className={styles.SubTasks}>SubTasks {prop}</div>;
}
