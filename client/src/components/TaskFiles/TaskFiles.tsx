import './TaskFiles.scss';

export type TaskFilesProps = {
  prop?: string;
}

export function TaskFiles({ prop = 'default value' }: TaskFilesProps) {
  return <div className={`TaskFiles`}>TaskFiles {prop}</div>;
}
