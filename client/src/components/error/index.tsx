import styles from './styles.module.scss';

export const Error = ({error}: {error?: Record<string, unknown>}) => {
  if(!error) {
    return <div className={styles.Error}>Something went wrong! Please reload page or come in later.</div>;
  }
  return <div className={styles.Error}>{JSON.stringify(error)}</div>;
}
