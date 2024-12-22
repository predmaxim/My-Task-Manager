import styles from './styles.module.scss';

export type TaskFilesProps = {
  prop?: string;
}

export function TaskFiles({prop = 'default value'}: TaskFilesProps) {
  return <div className={styles.TaskFiles}>TaskFiles {prop}</div>;
}
