import styles from './styles.module.scss';

export const Error = ({ error }: { error?: Record<string, unknown> }) => {
  if (!error) {
    return <div className={styles.Error}>
      <h4 className={styles.header}>
        Something went wrong!
      </h4>
      <p className={styles.description}>
        Please reload page or come in later.
      </p>
    </div>;
  }
  return <div className={styles.Error}>{JSON.stringify(error)}</div>;
};
