import './Comments.scss';

export type CommentsProps = {
  prop?: string;
}

export function Comments({ prop = 'default value' }: CommentsProps) {
  return <div className={`Comments`}>Comments {prop}</div>;
}
